/**
 * Action for the /search-base filters: they come from a dedicated backend
 * endpoint, which lists every content type of the site instead of only the
 * searchable ones returned by @search-filters.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-11-20
 */
export const GET_SEARCH_BASE_FILTERS = 'GET_SEARCH_BASE_FILTERS';

/**
 * Get the /search-base filters (sections, topics, portal_types).
 * @function getSearchBaseFilters
 * @returns {Object} Get search base filters action.
 */
export function getSearchBaseFilters() {
  return {
    type: GET_SEARCH_BASE_FILTERS,
    request: {
      op: 'get',
      path: '/@search-filters-base',
    },
  };
}
