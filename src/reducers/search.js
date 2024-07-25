import { RER_SEARCH, RESET_RER_SEARCH } from 'volto-rer-search/actions';

export function rerSearchReducer(state = [], action) {
  switch (action.type) {
    case `${RER_SEARCH}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...(state.subrequests[action.subrequest] || {
                  items: [],
                  total: 0,
                  batching: {},
                }),
                error: null,
                loaded: false,
                loading: true,
              },
            },
          }
        : {
            ...state,
            error: null,
            loading: true,
            loaded: false,
          };
    case `${RER_SEARCH}_SUCCESS`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                error: null,
                items: map(action.result.items, (item) => ({
                  ...item,
                  '@id': flattenToAppURL(item['@id']),
                })),
                total: action.result.items_total,
                loaded: true,
                loading: false,
                batching: { ...action.result.batching },
              },
            },
          }
        : {
            ...state,
            error: null,
            items: map(action.result.items, (item) => ({
              ...item,
              '@id': flattenToAppURL(item['@id']),
            })),
            total: action.result.items_total,
            loaded: true,
            loading: false,
            batching: { ...action.result.batching },
          };
    case `${RER_SEARCH}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                error: action.error,
                items: [],
                total: 0,
                loading: false,
                loaded: false,
                batching: {},
              },
            },
          }
        : {
            ...state,
            error: action.error,
            items: [],
            total: 0,
            loading: false,
            loaded: false,
            batching: {},
          };
    case RESET_RER_SEARCH:
      return action.subrequest
        ? {
            ...state,
            subrequests: omit(state.subrequests, [action.subrequest]),
          }
        : {
            ...state,
            error: null,
            items: [],
            total: 0,
            loading: false,
            loaded: false,
            batching: {},
          };
    default:
      return state;
  }
}
