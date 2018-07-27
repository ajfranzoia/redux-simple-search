import { SearchType } from '../types';
import { actionTypes as types } from './constants';

/**
 * Launches a new search for the given searchType and query.
 * Dispatches a SEARCH action that will be catched by the search middleware.
 *
 * @param searchType
 * @param query
 * @param options
 * @return {Object}
 */
export const runSearch = (
  { searchType, query }: { searchType: SearchType; query: any },
  options: { debounce?: boolean } = {}
) => ({
  type: types.SEARCH,
  payload: {
    searchType,
    query
  },
  meta: {
    debounce: options.debounce !== false && {
      time: 300
    }
  }
});

/**
 * Marks a search as ongoing.
 *
 * @param searchType
 * @param query
 * @param meta
 * @return {Object}
 */
export const startSearch = ({
  searchType,
  query
}: {
  searchType: SearchType;
  query: any;
}) => {
  return {
    type: types.SEARCH_PENDING,
    payload: {
      searchType,
      query
    }
  };
};

/**
 * Marks a search as done and saves the results.
 *
 * @param searchType
 * @param meta
 * @param results
 * @return {Object}
 */
export const endSearch = ({
  searchType,
  meta,
  results
}: {
  searchType: SearchType;
  meta: any;
  results: any;
}) => ({
  type: types.SEARCH_OK,
  payload: {
    searchType,
    meta,
    results
  }
});

/**
 * Marks a search as errored.
 *
 * @param searchType
 * @param error
 * @return {Object}
 */
export const errorSearch = ({
  searchType,
  error
}: {
  searchType: SearchType;
  error: Error;
}) => ({
  type: types.SEARCH_REJECTED,
  payload: {
    searchType,
    error
  }
});

/**
 * Clears a given search.
 *
 * @param searchType
 * @return {Object}
 */
export const clearSearch = (searchType: SearchType) => ({
  type: types.SEARCH_CLEAR,
  payload: {
    searchType
  }
});
