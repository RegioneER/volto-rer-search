/**
 * Tests for the /search-base filters reducer: loading, errors and reset
 * when the user logs in or out.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-11-19
 */
import { LOGIN, LOGOUT } from '@plone/volto/constants/ActionTypes';
import { GET_SEARCH_BASE_FILTERS } from 'volto-rer-search/actions';
import { searchBaseFiltersReducer } from './searchBaseFilters';

const filters = { sections: [], topics: [], portal_types: [] };
const unauthorized = { status: 401 };

describe('searchBaseFiltersReducer', () => {
  it('stores the filters on success', () => {
    const state = searchBaseFiltersReducer(undefined, {
      type: `${GET_SEARCH_BASE_FILTERS}_SUCCESS`,
      result: filters,
    });
    expect(state.result).toEqual(filters);
    expect(state.loaded).toBe(true);
  });

  it('stores the error on failure and clears it on a new request', () => {
    const failed = searchBaseFiltersReducer(undefined, {
      type: `${GET_SEARCH_BASE_FILTERS}_FAIL`,
      error: unauthorized,
    });
    expect(failed.error).toEqual(unauthorized);

    const pending = searchBaseFiltersReducer(failed, {
      type: `${GET_SEARCH_BASE_FILTERS}_PENDING`,
    });
    expect(pending.error).toBeNull();
    expect(pending.hasError).toBe(false);
  });

  it.each([LOGIN, LOGOUT])('resets on %s', (type) => {
    const failed = searchBaseFiltersReducer(undefined, {
      type: `${GET_SEARCH_BASE_FILTERS}_FAIL`,
      error: unauthorized,
    });
    const state = searchBaseFiltersReducer(failed, {
      type: `${type}_SUCCESS`,
    });
    expect(state.error).toBeNull();
    expect(state.result).toEqual({});
  });
});
