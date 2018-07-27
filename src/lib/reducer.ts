import { Action, handleActions } from 'redux-actions';
import { endSearch, errorSearch, startSearch } from './actions';
import { actionTypes as types } from './constants';

export interface State {
  error: Error | null;
  inProgress: boolean;
  meta: any;
  query: any;
  results: any[] | null;
}

export const INITIAL_STATE: State = {
  error: null,
  inProgress: false,
  meta: null,
  query: null,
  results: null
};

export function makeSearchableReducer(searchType: string) {
  const searchTypeSearchReducer = handleActions<State, any>(
    {
      [types.SEARCH_PENDING]: (
        state,
        { payload: { query } }: ReturnType<typeof startSearch>
      ) => ({
        ...state,
        inProgress: true,
        results: null,
        query
      }),

      [types.SEARCH_REJECTED]: (
        state,
        { payload: { error } }: ReturnType<typeof errorSearch>
      ) => ({
        ...state,
        inProgress: false,
        results: null,
        error
      }),

      [types.SEARCH_OK]: (
        state,
        { payload: { results, meta } }: ReturnType<typeof endSearch>
      ) => ({
        ...state,
        inProgress: false,
        results,
        meta: meta || null
      }),

      [types.SEARCH_CLEAR]: () => INITIAL_STATE
    },
    INITIAL_STATE
  );

  return (state = INITIAL_STATE, action: Action<any>) => {
    const { type, payload } = action;

    if (!/^SEARCH_/.test(type)) {
      return state;
    }

    if (payload.searchType !== searchType) {
      return state;
    }

    return searchTypeSearchReducer(state, action);
  };
}
