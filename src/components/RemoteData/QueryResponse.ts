export type QueryResponse<TResult extends {}> = {
  message: string;
  result: TResult;
};

export type MutationResponse<TResult extends {}> = QueryResponse<TResult>;
