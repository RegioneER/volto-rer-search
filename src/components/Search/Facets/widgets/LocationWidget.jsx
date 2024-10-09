import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl, defineMessages } from 'react-intl';
import { FormGroup, Input, Label } from 'design-react-kit';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import SearchUtils from 'volto-rer-search/components/Search/utils';
import { isEmpty } from 'lodash';

const { getBaseUrl } = SearchUtils;

const messages = defineMessages({
  where: {
    id: 'searchsite_where',
    defaultMessage: 'Dove',
  },
  in_section: {
    id: 'searchsite_in_section',
    defaultMessage: 'Nella sezione',
  },
  sites_all_label: {
    id: 'searchsite_in_all_sites',
    defaultMessage: 'In tutti i siti della Regione',
  },
  in_this_site: {
    id: 'searchsite_in_this_site',
    defaultMessage: 'In questo sito web',
  },
});

const PathFilters = ({ setFilters, path, path_infos, site_name }) => {
  const intl = useIntl();
  const { root, path_title } = path_infos;
  return (
    <FormGroup check>
      <Input
        checked={path !== root && !site_name}
        id="currentpath"
        name="path"
        type="radio"
        onChange={(e) => {
          setFilters({ path: path });
        }}
        aria-controls="search-results-region"
      />
      <Label check htmlFor="currentpath">
        {intl.formatMessage(messages.in_section)} <strong>{path_title}</strong>
      </Label>
    </FormGroup>
  );
};

const SitesFilters = ({ filters, setFilters }) => {
  const intl = useIntl();
  const facet = useSelector(
    (state) =>
      state.rer_search?.result?.facets?.filter(
        (f) => f.type === 'SiteName',
      )?.[0] ?? null,
  );
  const sites = useSelector(
    (state) =>
      state.rer_search?.result?.facets?.filter(
        (f) => f.type === 'SiteName',
      )?.[0]?.items ?? [],
  );
  const { path } = filters;
  const current_site = useSelector(
    (state) => state.rer_search?.result?.current_site ?? [],
  );
  const index = facet?.index;
  const value =
    index && filters[index]
      ? filters[index]
      : path?.length > 0
      ? ''
      : current_site;

  return sites?.length > 0 ? (
    <>
      {sites.map((item, idx) => {
        return (
          <FormGroup check key={'sites' + item.id}>
            <Input
              checked={value == item.id}
              id={item.id}
              name={item.id}
              type="radio"
              onChange={(e) => {
                setFilters({ ...filters, [index]: item.id, path: '' });
              }}
              aria-controls="search-results-region"
            />
            <Label check htmlFor={item.id}>
              {item.label[intl.locale]}
            </Label>
          </FormGroup>
        );
      })}
    </>
  ) : (
    <></>
  );
};

const LocationWidget = ({ filters, setFilters, path }) => {
  const intl = useIntl();
  const path_infos = useSelector(
    (state) => state.rer_search?.result?.path_infos ?? {},
  );
  const currentLang = intl.locale;
  const subsite = useSelector((state) => state.subsite?.data);
  const baseUrl = getBaseUrl(subsite, currentLang);

  const facets = useSelector((state) => state.rer_search?.result?.facets ?? []);
  let hasPath = true;
  let hasSites = facets.filter((f) => f.type == 'SiteName').length > 0;

  let filtersPath = filters?.path;

  if (!filtersPath && subsite) {
    filtersPath = getBaseUrl(subsite, currentLang);
    if (isEmpty(path_infos)) {
      path_infos.path_title = subsite.title;
    }
  }

  if (!filtersPath || !path_infos) {
    hasPath = false;
  }

  if (!filtersPath && !hasSites) {
    return <></>;
  }

  return (
    <fieldset className="filter-item mb-5">
      <legend>
        <Icon
          icon="folder"
          color=""
          padding={false}
          size="s"
          className="me-2"
        />
        {intl.formatMessage(messages.where)}
      </legend>

      {filtersPath && (
        <PathFilters
          setFilters={setFilters}
          path={filtersPath}
          site_name={filters.site_name}
          path_infos={path_infos}
        />
      )}
      {hasSites && <SitesFilters filters={filters} setFilters={setFilters} />}
    </fieldset>
  );
};

LocationWidget.propTypes = {};

export default LocationWidget;
