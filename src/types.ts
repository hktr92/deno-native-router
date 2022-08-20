export type CallbackHandler = (
  request: Request,
  params: Record<string, string>,
) => Promise<Response>;

export const METHODS: Record<string, string> = {
  GET: "GET",
  HEAD: "HEAD",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  OPTIONS: "OPTIONS",
  TRACE: "TRACE",
  PATCH: "PATCH",
};

export interface Route {
  pattern: URLPattern;
  handler: CallbackHandler;
}
