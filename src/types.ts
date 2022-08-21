export type CallbackHandler = (
  request: Request,
  params: Record<string, string>,
) => Promise<Response | ResponseLike>;

export interface ResponseLike {
  body: BodyInit;
  options?: ResponseInit;
}

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

export enum RequestMethod {
  Get = "GET",
  Head = "HEAD",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
  Options = "OPTIONS",
  Trace = "TRACE",
  Patch = "PATCH",
}

export interface ActionInfo {
  method: RequestMethod;
  path: string;
  handler: CallbackHandler;
}
