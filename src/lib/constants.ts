export const actionTypes = {
  /**
   * SEARCH payload:
   * {
   *   searchType: string,
   *   query: object,
   * }
   */
  SEARCH: 'SEARCH',

  /**
   * SEARCH_PENDING payload:
   * {
   *   searchType: string,
   *   query: object,
   * }
   */
  SEARCH_PENDING: 'SEARCH_PENDING',

  /**
   * SEARCH_OK payload:
   * {
   *   searchType: string,
   *   results: any,
   * }
   */
  SEARCH_OK: 'SEARCH_OK',

  /**
   * SEARCH_REJECTED payload:
   * {
   *   searchType: string,
   *   error: instanceof Error,
   * }
   */
  SEARCH_REJECTED: 'SEARCH_REJECTED',

  /**
   * SEARCH_CLEAR payload:
   * {
   *   searchType: string,
   * }
   */
  SEARCH_CLEAR: 'SEARCH_CLEAR'
};
