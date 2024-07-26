/*
CUSTOMIZATINOS:
- use config.settings.siteSearch.extraParams in search query
- added parseExtraParams fn
- nella getSearchParamsURL fatto il lowerCase searchableText per le ricerche con Solr / Matomo
*/
import mapValues from 'lodash/mapValues';
import moment from 'moment';
import qs from 'query-string';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { getItemsByPath } from 'design-comuni-plone-theme/helpers';

const defaultOptions = {
  activeContent: false,
  dateStart: undefined,
  dateEnd: undefined,
};

const parseExtraParams = (params) => {
  let ret = {};
  config.settings.siteSearch.extraParams.forEach((ep) => {
    const paramValue = params?.[ep] ?? '';

    if (paramValue?.length > 0) {
      ret[ep] = paramValue;
    }
  });
  return ret;
};

// const parseCustomPath = (location) => {
//   const qsOptions = qs.parse(location?.search ?? '');
//   let customPath = null;
//   if (qsOptions['custom_path']) {
//     customPath = qsOptions['custom_path'];
//   }
//   return customPath;
// };
/*Customizations: added param extraParams*/
const getSearchParamsURL = ({
  getObject = false,
  searchableText,
  sortOn = {},
  currentPage,
  customPath,
  subsite,
  currentLang,
  filters,
  extraParams,
}) => {
  let baseUrl = subsite
    ? flattenToAppURL(subsite['@id'])
    : config.settings.isMultilingual
      ? '/' + currentLang
      : '';
  const b_start = currentPage
    ? (currentPage - 1) * config.settings.defaultPageSize
    : 0;

  let pathQuery = null;
  if (customPath?.length > 0) {
    pathQuery = { 'path.query': customPath };
  } else if (baseUrl?.length > 0) {
    pathQuery = {
      'path.query': baseUrl,
    };
  }

  let text = searchableText
    ? { SearchableText: searchableText.toLowerCase() }
    : null;

  baseUrl += '/search';
  console.log(
    baseUrl +
      '?' +
      qs.stringify({
        ...(text ?? {}),
        ...(pathQuery ?? {}),
        ...sortOn,
        ...filters,
        ...extraParams,
      }),
  );
  if (getObject) {
    let obj = {
      ...(text ?? {}),
      ...(pathQuery ?? {}),
      ...sortOn,
      ...filters,
      ...extraParams,
      b_start: b_start,
      //skipNull: true,
      //use_site_search_settings: true,
    };

    return obj;
  }

  return (
    baseUrl +
    '?' +
    qs.stringify(
      {
        ...(text ?? {}),
        ...(pathQuery ?? {}),
        ...sortOn,
        ...filters,
        ...extraParams,
      },
      // { skipNull: true },
    ) +
    (b_start > 0 ? `&b_start=${b_start}` : '')
  );
};

const utils = {
  defaultOptions,
  getSearchParamsURL,
  parseExtraParams,
};

export default utils;
