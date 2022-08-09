export interface Paginate<T> {
  isEmpty?: boolean;
  isNotEmpty?: boolean;
  currentPage?: number;
  lastPage?: string;
  resultsPerPage?: number;
  totalPages?: number;
  totalResults?: number;
  items?: T[];
}
