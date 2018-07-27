import 'jest';
import deepFreeze from 'deep-freeze';
import { actionTypes as types } from '../lib/constants';
import { makeSearchableReducer } from '../lib/reducer';

describe('reducer tests', () => {
  it('should handle SEARCH_PENDING action', () => {
    const initialState = {
      error: null,
      inProgress: false,
      meta: null,
      query: null,
      results: null
    };

    deepFreeze(initialState);

    const action = {
      type: types.SEARCH_PENDING,
      payload: {
        searchType: 'default',
        query: {
          text: 'abc'
        }
      }
    };

    deepFreeze(action);

    const reducer = makeSearchableReducer('default');
    expect(reducer(initialState, action)).toEqual({
        error: null,
        inProgress: true,
        meta: null,
        query: {
          text: 'abc'
        },
        results: null
    });
  });

  it('should handle SEARCH_OK action', () => {
    const initialState = {
      error: null,
      inProgress: true,
      meta: null,
      query: {
        text: 'abc'
      },
      results: null
    };

    deepFreeze(initialState);

    const action = {
      type: types.SEARCH_OK,
      payload: {
        searchType: 'default',
        query: {
          text: 'absdsc'
        },
        results: [1, 2, 3]
      }
    };

    deepFreeze(action);

    const reducer = makeSearchableReducer('default');
    expect(reducer(initialState, action)).toEqual({
      error: null,
      inProgress: false,
      meta: null,
      query: {
        text: 'abc'
      },
      results: [1, 2, 3]
    });
  })
});
