import _ from 'lodash';
import { endSearch, errorSearch, startSearch } from './actions';
import { actionTypes as types } from './constants';

/**
 * Returns true if the given search is stale.
 * It will be stale if the current registered search is different
 * from the given one (deep equality check).
 *
 * @param search
 * @param getState
 * @return {boolean}
 */
const isStaleSearch = (search, getState) => {
  const latestQuery = getState().search[search.searchType].query;

  return !_.isEqual(latestQuery, search.query);
};

/**
 * Search middleware.
 * Handles only 'SEARCH' action type and dispatches start|end|errorSearch.
 * Checks if the search is stale to prevent submitting wrong results.
 *
 * @param api
 * @return {function({dispatch?: *, getState?: *}): function(*): Function}
 */
export default function makeMiddleware({ api }) {
  return ({ dispatch, getState }) => next => async (action) => {
    const { type, payload } = action;

    // Filter SEARCH action
    if (type !== types.SEARCH) {
      return next(action);
    }

    const { searchType } = payload;

    dispatch(startSearch({
      ...payload,
    }));

    const apiFn = api[searchType];

    if (!apiFn) {
      throw new Error(`No api searcher function found for search type "${searchType}"`);
    }

    try {
      const { results, meta } = await apiFn(payload);

      if (isStaleSearch(payload, getState)) {
        return;
      }

      dispatch(endSearch({
        searchType,
        meta,
        results,
      }));
    } catch (error) {
      if (isStaleSearch(payload, getState)) {
        return;
      }

      dispatch(errorSearch({
        searchType,
        error,
      }));
    }
  };
}
