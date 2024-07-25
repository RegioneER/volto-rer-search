export const RER_SEARCH = 'GET_RER_SEARCH';
export const RESET_RER_SEARCH = 'RESET_RER_SEARCH';

/**
 * Rer Search function.
 * @function rerSearch
 * @param {string} url Url to use as base.
 * @param {Object} options Search options.
 * @param {string} subrequest Key of the subrequest.
 * @returns {Object} Search content action.
 */
export function rerSearch(params) {
  return {
    type: RER_SEARCH,
    request: {
      op: 'get',
      path: `/@rer-search`,
      params: params,
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
