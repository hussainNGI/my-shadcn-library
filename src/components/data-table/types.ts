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


export type Task = {
  id: string;
  title: string;
  department: string;
  status: string;
  priority: string;
  assignee: string;
  category: string;
  dueDate: string;
};
