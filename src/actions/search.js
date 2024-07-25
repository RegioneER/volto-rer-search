export const RER_SEARCH = 'GET_RER_SEARCH';
export const RESET_RER_SEARCH = 'RESET_RER_SEARCH';

import {
  compact,
  concat,
  isArray,
  join,
  map,
  pickBy,
  toPairs,
  identity,
} from 'lodash';

/**
 * Rer Search function.
 * @function rerSearch
 * @param {string} url Url to use as base.
 * @param {Object} options Search options.
 * @param {string} subrequest Key of the subrequest.
 * @returns {Object} Search content action.
 */
export function rerSearch(url, options, subrequest = null) {
  let queryArray = [];
  options = pickBy(options, identity);
  const arrayOptions = pickBy(options, (item) => isArray(item));

  queryArray = concat(
    queryArray,
    options
      ? join(
          map(toPairs(pickBy(options, (item) => !isArray(item))), (item) => {
            if (item[0] === 'SearchableText') {
              // Adds the wildcard to the SearchableText param
              item[1] = `${item[1]}*`;
            }
            return join(item, '=');
          }),
          '&',
        )
      : '',
  );

  queryArray = concat(
    queryArray,
    arrayOptions
      ? join(
          map(pickBy(arrayOptions), (item, key) =>
            join(
              item.map((value) => `${key}:list=${value}`),
              '&',
            ),
          ),
          '&',
        )
      : '',
  );

  const querystring = join(compact(queryArray), '&');

  return {
    type: RER_SEARCH,
    subrequest,
    request: {
      op: 'get',
      path: `${url}/@rer-search${querystring ? `?${querystring}` : ''}`,
    },
  };
}

/**
 * Reset rer-search function.
 * @function resetRerSearch
 * @param {string} subrequest Key of the subrequest.
 * @returns {Object} Rer-Search action.
 */
export function resetRerSearch(subrequest = null) {
  return {
    type: RESET_RER_SEARCH,
    subrequest,
  };
}
