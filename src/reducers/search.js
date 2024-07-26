import { RER_SEARCH, RESET_RER_SEARCH } from 'volto-rer-search/actions';

const initialState = {
  error: null,
  hasError: false,
  result: {},
  loadingResults: false,
};

export function rerSearchReducer(state = initialState, action) {
  switch (action.type) {
    case `${RER_SEARCH}_PENDING`:
      return {
        ...state,
        hasError: false,
        loadingResults: true,
      };

    case `${RER_SEARCH}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        hasError: false,
        loadingResults: false,
      };

    case `${RER_SEARCH}_FAIL`:
      return {
        ...state,
        error: action.error,
        hasError: true,
        loadingResults: false,
      };

    case `${RESET_RER_SEARCH}`:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
