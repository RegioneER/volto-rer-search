import { RER_SEARCH_FILTERS } from 'volto-rer-search/actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  subrequests: {},
};

export const rerSearchFiltersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${RER_SEARCH_FILTERS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        result: null,
      };
    case `${RER_SEARCH_FILTERS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        result: action.result,
        loading: false,
      };
    case `${RER_SEARCH_FILTERS}_FAIL`:
      return {
        ...state,
        error: action.error,
        result: null,
        loaded: true,
        loading: false,
      };
    default:
      return state;
  }
};
