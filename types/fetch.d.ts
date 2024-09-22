export interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
  body?: any;
}

export interface FetchError {
  errors: Record<string, any>;
  message: string;
}

export interface FetchResponse<T = any> {
  data: T;
}