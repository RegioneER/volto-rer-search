/**
 * Reducer for the /search-base filters, kept apart from the searchFilters
 * reducer of design-comuni-plone-theme so the two lists never mix.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-11-19
 */
import { LOGIN, LOGOUT } from '@plone/volto/constants/ActionTypes';
import { GET_SEARCH_BASE_FILTERS } from 'volto-rer-search/actions';

const initialState = {
  error: null,
  hasError: false,
  result: {},
  loadingResults: false,
  loaded: false,
};

export function searchBaseFiltersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_SEARCH_BASE_FILTERS}_PENDING`:
      return {
        ...state,
        error: null,
        hasError: false,
        loadingResults: true,
        loaded: false,
      };

    case `${GET_SEARCH_BASE_FILTERS}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loadingResults: false,
        loaded: true,
      };

    case `${GET_SEARCH_BASE_FILTERS}_FAIL`:
      return {
        ...state,
        error: action.error,
        hasError: true,
        loadingResults: false,
        loaded: false,
      };

    // the endpoint may answer differently once the user logs in or out
    case `${LOGIN}_SUCCESS`:
    case `${LOGOUT}_SUCCESS`:
      return initialState;

    default:
      return state;
  }
}
