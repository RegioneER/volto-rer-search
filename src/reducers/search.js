import { RER_SEARCH, RESET_RER_SEARCH } from 'volto-rer-search/actions';
import { mock } from './mock_search';

const initialState = {
  error: null,
  hasError: false,
  result: mock, //{}, //ToDo: remove mock
  loadingResults: false,
};

export function rerSearchReducer(state = initialState, action) {
  switch (action.type) {
    case `${RER_SEARCH}_PENDING`:
      return {
        ...state,
        loadingResults: true,
      };

    case `${RER_SEARCH}_SUCCESS`:
      return {
        ...state,
        result: action.result,
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
