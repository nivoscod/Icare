import { filtersConstants } from '../constants/filters.constants';


export function addFilters(filters) {
  return { type: filtersConstants.ADD_FILTERS, filters: filters };
}