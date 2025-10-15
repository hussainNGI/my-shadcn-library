export type ExtendedColumnSort<TData = unknown> = {
  id: string;
  desc: boolean;
};

export type QueryKeys = {
  page?: string;
  perPage?: string;
  sort?: string;
  filters?: string;
  joinOperator?: string;
};
