
export const ADD_FILTERS = 'ADD_FILTERS';


export function addFilters(filters) {
  return { type: ADD_FILTERS, filters: filters };
}