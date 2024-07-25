export const RER_SEARCH_FILTERS = 'GET_RER_SEARCH_FILTERS';

export function getRerSearchFilters(data) {
  return {
    type: RER_SEARCH_FILTERS,
    request: {
      op: 'get',
      path: '/@rer-search-filters',
      params: data,
    },
  };
}
