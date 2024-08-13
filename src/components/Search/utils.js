/*
CUSTOMIZATINOS:

- nella getSearchParamsURL fatto il lowerCase searchableText per le ricerche con Solr / Matomo
- added dotify fn
*/
import mapValues from 'lodash/mapValues';
import moment from 'moment';
import qs from 'query-string';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { getItemsByPath } from 'design-comuni-plone-theme/helpers';
import { dotify } from 'volto-rer-search/helpers';

const defaultOptions = {
  activeContent: false,
  dateStart: undefined,
  dateEnd: undefined,
};

const getBaseUrl = (subsite, currentLang) => {
  return subsite
    ? flattenToAppURL(subsite['@id'])
    : config.settings.isMultilingual
    ? '/' + currentLang
    : '';
};

const getSearchParamsURL = ({
  getObject = false,
  searchableText,
  sortOn = {},
  currentPage,
  filters = {},
  baseUrl,
}) => {
  const b_start = currentPage
    ? (currentPage - 1) * config.settings.defaultPageSize
    : 0;

  let pathQuery = null;
  if (filters?.path?.length > 0) {
    pathQuery = { 'path.query': filters.path };
  } else if (baseUrl?.length > 0) {
    pathQuery = {
      'path.query': baseUrl,
    };
  }

  let text = searchableText
    ? { SearchableText: searchableText.toLowerCase() }
    : null;

  baseUrl += '/search';
  // console.log(
  //   baseUrl +
  //     '?' +
  //     qs.stringify({
  //       ...(text ?? {}),
  //       ...(pathQuery ?? {}),
  //       ...sortOn,
  //       ...filters,
  //     }),
  // );

  let _filters = { ...filters };
  delete _filters.path;

  //per la vera chiamata al BE
  if (getObject) {
    let obj = {
      ...(text ?? {}),
      ...(pathQuery ?? {}),
      ...sortOn,
      ..._filters,
      b_start: b_start,
      metadata_fields: [
        'Subject',
        'Date',
        'effective',
        'modified',
        'scadenza_bando',
        'path',
        'path_depth',
      ],
      //skipNull: true,
      //use_site_search_settings: true,
    };

    return obj;
  }

  //per modificare i parametri del browser
  _filters = { ...filters };
  if (!filters.path) {
    delete _filters.path;
  }

  return (
    baseUrl +
    '?' +
    qs.stringify(
      {
        ...(text ?? {}),
        ...sortOn,
        ...dotify(_filters), //comprende anche path, quindi non serve pathQuery qui
      },
      // { skipNull: true },
    ) +
    (b_start > 0 ? `&b_start=${b_start}` : '')
  );
};

const clearAdvancedFilters = (facets = {}, filters = {}) => {
  let newFilters = { ...filters };
  let advanced_filters_keys = facets
    .filter((f) => f.index === 'group')?.[0]
    .items?.filter((i) => i.advanced_filters?.length > 0)
    .reduce((acc, val) => {
      acc = [
        ...acc,
        ...val.advanced_filters
          .filter((a) => a.index != undefined)
          ?.map((f) => f.index),
      ];
      return acc;
    }, []);

  Object.keys(filters).forEach((f) => {
    if (f.endsWith('_bando')) {
      advanced_filters_keys.push(f);
    }
  });

  advanced_filters_keys.forEach((k) => {
    delete newFilters[k];
  });

  return newFilters;
};
const utils = {
  defaultOptions,
  getSearchParamsURL,
  getBaseUrl,
  clearAdvancedFilters,
};

export default utils;
