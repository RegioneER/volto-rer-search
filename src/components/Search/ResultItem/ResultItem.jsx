import React, { useState } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import moment from 'moment';
import { Card, CardBody, CardTitle } from 'design-react-kit';
import { UniversalLink } from '@plone/volto/components';

import {
  Icon,
  CardCategory,
} from 'design-comuni-plone-theme/components/ItaliaTheme';

import SearchUtils from 'volto-rer-search/components/Search/utils';

import DateAndPosition from './DateAndPosition';

import './resultItem.scss';

const { getSearchParamsURL } = SearchUtils;

const messages = defineMessages({
  published_on: {
    id: 'searchresult_published_on',
    defaultMessage: 'pubblicato il',
  },
  last_modified: {
    id: 'searchresult_last_modified',
    defaultMessage: 'ultima modifica',
  },
  similiar_results: {
    id: 'searchresult_similar_results',
    defaultMessage: 'Risultati simili',
  },
  in_evidence: {
    id: 'searchresult_in_evidence',
    defaultMessage: 'In evidenza',
  },
  scadenza_partecipazione: {
    id: 'searchresult_scadenza_bando',
    defaultMessage: 'Scadenza partecipazione',
  },
});

const Marker = ({ text = '', highlight = '' }) => {
  if (!text) {
    return '';
  }
  if (!highlight.trim()) {
    return text;
  }
  const regex = new RegExp(
    `(${highlight
      .split(' ')
      // remove any characters not in these ranges
      .map((s) => s.replace(/[^a-zA-Z0-9À-ÖØ-öø-ÿ]/g, ''))
      .filter((s) => s !== '')
      .join('|')})`,
    'gi',
  );
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        part.match(regex) ? (
          <mark key={i} className="highlighted-text">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
};

const ResultItem = ({ item, searchableText, baseUrl, filters }) => {
  const intl = useIntl();
  moment.locale(intl.locale);

  const inEvidence = item['[elevated]'];
  const hasSimilarResults =
    item.similarResults != null && item.similarResults.length > 0;

  const [showSimilarResults, setShowSimilarResults] = useState(false);

  const getIcon = (item) => {
    if (item['@type'] === 'Folder') {
      return 'folder-open';
    }
    if (item['@type'] === 'Event') {
      return 'calendar-alt';
    }
    if (item['@type'] === 'Bando') {
      return 'broadcast-tower';
    }
    // if (item['@type'] === 'File') {
    //   return 'fa-paperclip';
    // }
    if (item['@type'] === 'News Item') {
      return 'newspaper';
    }
    return 'file';
  };

  const getItemTypeLabel = (item) => {
    if (item.tipologia_notizia?.length > 0) {
      return item.tipologia_notizia[0].title;
    }
    return item.type_title;
  };

  const getTitleHover = (item) => {
    let title_parts = [
      // 'creato da Marcella Bongiovanni',
      // 'pubblicato 19/06/2013',
      // 'ultima modifica 31/01/2020 10:14',
    ];
    if (item.effective) {
      if (!item.effective.startsWith('1969-12-30')) {
        title_parts.push(
          intl.formatMessage(messages.published_on) +
            ' ' +
            moment(item.effective).format('D/MM/YYYY'),
        );
      }
    }
    if (item.modified) {
      title_parts.push(
        intl.formatMessage(messages.last_modified) +
          ' ' +
          moment(item.modified).format('D/MM/YYYY'),
      );
    }

    return title_parts.length > 0 ? title_parts.join(' - ') : '';
  };
  const description = (item.Description ?? item.description) || '';
  return (
    <Card
      noWrapper={true}
      className={cx('search-result-item mt-3 mb-3', {
        'shadow bg-light border-bottom-card card-big': inEvidence,
      })}
    >
      {/* in evidenza */}
      {inEvidence && (
        <div className="in-evidence-wrapper">
          <div className="flag-icon" />
          <div className="in-evidence-title d-none d-lg-block">
            {intl.formatMessage(messages.in_evidence)}
          </div>
        </div>
      )}
      <CardBody className="shadow-sm px-4 pt-4 pb-4 rounded">
        {/* icona + data + path */}
        <CardCategory iconName={getIcon(item)} title={getItemTypeLabel(item)}>
          <DateAndPosition item={item} />
        </CardCategory>
        <CardTitle tag="h4" title={getTitleHover(item)}>
          <UniversalLink item={item}>
            <Marker
              highlight={searchableText}
              text={
                item.title && item.title.length > 0
                  ? item.title
                  : item['@id'].split('/').pop()
              }
            />
          </UniversalLink>
        </CardTitle>
        <p className="text-paragraph">
          <Marker
            highlight={searchableText}
            text={description && description.length > 0 ? description : ''}
          />
        </p>
        {hasSimilarResults && (
          <a
            href="#"
            role="button"
            className="similar-results-link"
            onClick={(e) => {
              e.preventDefault();
              setShowSimilarResults(!showSimilarResults);
            }}
          >
            {' '}
            | {intl.formatMessage(messages.similiar_results)}
          </a>
        )}
        {showSimilarResults ? (
          <div className="similar-results">
            {item.similarResults.map((sr) => (
              <ResultItem
                item={sr}
                key={sr.id}
                baseUrl={baseUrl}
                searchableText={searchableText}
                filters={filters}
              />
            ))}
          </div>
        ) : (
          <>
            {item['@type'] === 'Bando' ? (
              // Bando
              <>
                {item.scadenza_bando && (
                  <div className="expire">
                    {intl.formatMessage(messages.scadenza_partecipazione)}:{' '}
                    {moment(item.scadenza_bando).format('D/MM/YYYY')}
                  </div>
                )}
              </>
            ) : (
              // tutti gli altri tipi di ct
              <>
                {!inEvidence && (item.themes || item.Subject) && (
                  <div className="item-tags">
                    {item.themes && (
                      <div className="item-themes">
                        <Icon icon="tag" />
                        {item.themes.map((theme) => (
                          <a href="#" key={theme}>
                            {theme}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
        {item.additional_html && (
          <div dangerouslySetInnerHTML={{ __html: item.additional_html }} />
        )}
      </CardBody>
    </Card>
  );
};
export default ResultItem;
