/**
 * Search component.
 * @module components/theme/Search/Search
 *
 *
 * CUSTOMIZATIONS:
 * - use config.settings.siteSearch.extraParams in search query
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl, defineMessages } from 'react-intl';
import { values, isEmpty } from 'lodash';
import cx from 'classnames';
import qs from 'query-string';
import moment from 'moment';
import {
  Container,
  Row,
  Col,
  Collapse,
  CardCategory,
  Button,
  Toggle,
  Alert,
  Spinner,
  Skiplink,
  SkiplinkItem,
} from 'design-react-kit';
import { useLocation, useHistory } from 'react-router-dom';

import { Helmet, flattenToAppURL } from '@plone/volto/helpers';
import { resetSubsite } from 'volto-subsites';

import {
  Pagination,
  Icon,
  RemoveBodyClass,
  SearchResultItem,
} from 'design-comuni-plone-theme/components/ItaliaTheme';
import { TextInput } from 'design-comuni-plone-theme/components';
import { rerSearch } from 'volto-rer-search/actions';
import { useDebouncedEffect } from 'design-comuni-plone-theme/helpers';

import SearchUtils from 'volto-rer-search/components/Search/utils';
import {
  Facets,
  OrderingWidget,
  SpecificFilters,
} from 'volto-rer-search/components/Search';
import config from '@plone/volto/registry';

const { getSearchParamsURL, parseExtraParams, getBaseUrl } = SearchUtils;

const messages = defineMessages({
  sort_on_relevance: {
    id: 'sort_on_relevance',
    defaultMessage: 'Rilevanza',
  },
  sort_on_date: {
    id: 'sort_on_date',
    defaultMessage: 'Data (prima i più recenti)',
  },
  sort_on_title: {
    id: 'sort_on_title',
    defaultMessage: 'Alfabeticamente',
  },
  search: {
    id: 'search',
    defaultMessage: 'Cerca',
  },
  searchResults: {
    id: 'Search results',
    defaultMessage: 'Risultati della ricerca',
  },
  searchSite: {
    id: 'Search site',
    defaultMessage: 'Cerca nel sito',
  },
  orderBy: {
    id: 'order_by',
    defaultMessage: 'Ordina per',
  },
  foundNResults: {
    id: 'found_n_results',
    defaultMessage: 'Trovati {total} risultati.',
  },
  filtersCollapse: {
    id: 'filtersCollapse',
    defaultMessage: 'Filtri',
  },
  attenzione: { id: 'Attenzione!', defaultMessage: 'Attenzione!' },
  errors_occured: {
    id: 'Sono occorsi degli errori',
    defaultMessage: 'Sono occorsi degli errori',
  },
  no_results: {
    id: 'Nessun risultato ottenuto',
    defaultMessage: 'Nessun risultato soddisfa la tua ricerca',
  },
  skipToSearchResults: {
    id: 'search_skip_to_search_results',
    defaultMessage: 'Vai ai risultati di ricerca',
  },
});

const SORT_BY_RELEVANCE = 'relevance';
const SORT_BY_DATE = 'date';
const SORT_BY_SORTABLETITLE = 'sortable_title';

const SORTING_OPTIONS = {
  [SORT_BY_RELEVANCE]: {},
  [SORT_BY_DATE]: {
    sort_on: 'Date',
  },
  [SORT_BY_SORTABLETITLE]: {
    sort_on: 'sortable_title',
  },
};

const Search = () => {
  const intl = useIntl();
  const currentLang = intl.locale;
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const subsite = useSelector((state) => state.subsite?.data);
  const searchResults = useSelector((state) => state.rer_search);
  const baseUrl = getBaseUrl(subsite, currentLang);

  const [searchableText, setSearchableText] = useState(
    qs.parse(location.search)?.SearchableText ?? '',
  );
  const [extraParams, setExtraParams] = useState({
    ...parseExtraParams(qs.parse(location.search)),
  });

  const [collapseFilters, setCollapseFilters] = useState(true);
  const [sortOn, setSortOn] = useState(SORT_BY_RELEVANCE);
  const [currentPage, setCurrentPage] = useState(
    qs.parse(location.search)?.b_start
      ? qs.parse(location.search).b_start / config.settings.defaultPageSize + 1
      : 1,
  );
  const [filters, setFilters] = useState({
    path: qs.parse(location.search)?.path ?? subsite ? baseUrl : '',
  });

  const handleQueryPaginationChange = (_e, { activePage }) => {
    window.scrollTo(0, 0);
    setCurrentPage(activePage?.children ?? 1);
  };

  useEffect(() => {
    if (
      subsite &&
      !location.pathname.startsWith(flattenToAppURL(subsite['@id']))
    ) {
      /*la ricerca è stata fatta dal sito padre,
      poi dai risultati si è passato a un subsite,
      poi è stato fatto back dal browser per tornare ai risultati di ricerca del sito padre*/
      dispatch(resetSubsite());
    }
  }, [subsite, dispatch, location.pathname]);

  useDebouncedEffect(
    () => {
      doSearch();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    600,
    [dispatch, searchableText, sortOn, currentPage, extraParams, filters],
  );

  const doSearch = () => {
    const par = {
      searchableText: searchableText?.length > 0 ? `${searchableText}*` : '',
      sortOn: SORTING_OPTIONS[sortOn],
      currentPage,
      filters,
      extraParams,
      baseUrl,
    };
    const queryString = getSearchParamsURL({
      getObject: true,
      ...par,
    });

    !isEmpty(searchResults.result) &&
      history.push(
        getSearchParamsURL({
          ...par,
          searchableText,
        }),
      );
    dispatch(rerSearch(queryString));
  };

  return (
    <>
      <Helmet title={intl.formatMessage(messages.searchResults)} />

      <div className="public-ui search-view">
        <Container className="px-4 my-4">
          <Row>
            <Col>
              <Row>
                <Col className="pb-3 pb-lg-5">
                  <h1>{intl.formatMessage(messages.searchResults)}</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextInput
                    id="searchableText"
                    label={intl.formatMessage(messages.searchSite)}
                    value={searchableText}
                    onChange={(id, value) => {
                      setSearchableText(value);
                    }}
                    size="lg"
                    append={
                      <Button
                        icon
                        tag="button"
                        color="link"
                        size="xs"
                        className="rounded-0 py-0"
                        onClick={doSearch}
                        aria-label={intl.formatMessage(messages.search)}
                      >
                        <Icon
                          color=""
                          icon="it-search"
                          padding={false}
                          size="lg"
                        />
                      </Button>
                    }
                    aria-controls="search-results-region"
                  />
                </Col>
              </Row>

              <Skiplink tag="div">
                <SkiplinkItem href="#search-results-region" tag="a">
                  {intl.formatMessage(messages.skipToSearchResults)}
                </SkiplinkItem>
              </Skiplink>

              {/* Toggle filtri su mobile */}
              {(searchResults?.result?.facets?.length > 0 ||
                searchResults?.result?.path_infos) && (
                <div className="d-block d-lg-none d-xl-none">
                  <div className="row pb-3">
                    <div className="col-6">
                      {searchResults?.result?.items_total > 0 && (
                        <small aria-live="polite">
                          {intl.formatMessage(messages.foundNResults, {
                            total: searchResults.result.items_total,
                          })}
                        </small>
                      )}
                    </div>
                    <div className="col-6 align-self-center">
                      <div className="float-end">
                        <a
                          onClick={() => setCollapseFilters((prev) => !prev)}
                          href="#categoryCollapse"
                          role="button"
                          className={cx('btn btn-sm fw-bold text-uppercase', {
                            'btn-outline-primary': collapseFilters,
                            'btn-primary': !collapseFilters,
                          })}
                          data-toggle="collapse"
                          aria-expanded={!collapseFilters}
                          aria-controls="categoryCollapse"
                        >
                          {intl.formatMessage(messages.filtersCollapse)}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* ------- fine Toggle filtri su mobile ------- */}
            </Col>
          </Row>
          <Row>
            <aside className="col-lg-3 py-lg-5">
              <div className="pe-4"></div>
              <Collapse
                isOpen={!collapseFilters}
                className="d-lg-block d-xl-block"
                id="categoryCollapse"
              >
                <Facets filters={filters} setFilters={setFilters} />
              </Collapse>
            </aside>

            {/* Risultati della ricerca - colonna di destra */}
            <Col lg={9} tag="section" className="py-lg-5">
              <div
                className="search-results-wrapper"
                id="search-results-region"
                aria-live="polite"
              >
                {searchResults.loadingResults ||
                (!searchResults.hasError && isEmpty(searchResults.result)) ? (
                  <div className="searchSpinnerWrapper">
                    <Spinner active />
                  </div>
                ) : searchResults?.result?.items_total > 0 ? (
                  <>
                    {/* <SpecificFilters
                      filters={filters}
                      setFilters={setFilters}
                    /> */}
                    <OrderingWidget
                      sortOn={sortOn}
                      setSortOn={setSortOn}
                      options={SORTING_OPTIONS}
                      total={searchResults?.result?.items_total}
                    />

                    <Row>
                      {searchResults?.result?.items?.map((item, index) => (
                        <Col md={12} key={item['@id']} className="p-0">
                          <SearchResultItem
                            item={item}
                            index={index}
                            searchableText={searchableText}
                          />
                        </Col>
                      ))}
                    </Row>
                    {searchResults?.result?.batching && (
                      <Pagination
                        activePage={currentPage}
                        totalPages={Math.ceil(
                          (searchResults?.result?.items_total ?? 0) /
                            config.settings.defaultPageSize,
                        )}
                        onPageChange={handleQueryPaginationChange}
                      />
                    )}
                  </>
                ) : searchResults.error ? (
                  <Alert color="danger">
                    <strong>{intl.formatMessage(messages.attenzione)}</strong>{' '}
                    {intl.formatMessage(messages.errors_occured)}
                  </Alert>
                ) : (
                  !searchResults?.hasError &&
                  searchResults?.result?.items_total === 0 && (
                    <p>{intl.formatMessage(messages.no_results)}</p>
                  )
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/*force remove body class for subsite search pages*/}
      <RemoveBodyClass className="cms-ui" />
    </>
  );
};

export default Search;
