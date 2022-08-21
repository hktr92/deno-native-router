import { EventEmitter } from "https://deno.land/x/event@2.0.1/mod.ts";
import { internalServerError, notFound } from "./response.ts";
import { ActionInfo, CallbackHandler, METHODS, Route } from "./types.ts";
import { Events } from "./events.ts";

export class Router extends EventEmitter<Events> {
  private routes: Record<string, Route[]> = {};

  constructor() {
    super();

    for (const m in METHODS) {
      this.routes[METHODS[m]] = [];
    }
  }

  /**
   * Alias for `match` method.
   */
  route = this.match;

  #add(method: string, pathname: string, handler: CallbackHandler) {
    this.routes[method].push({
      pattern: new URLPattern({ pathname }),
      handler,
    });
  }

  /**
   * Registers a dynamic route, e.g. returned by a controller file
   */
  register({ method, path, handler }: ActionInfo) {
    this.#add(method, path, handler);
  }

  get(pathname: string, handler: CallbackHandler) {
    this.#add(METHODS.GET, pathname, handler);
  }

  head(pathname: string, handler: CallbackHandler) {
    this.#add(METHODS.HEAD, pathname, handler);
  }

  post(pathname: string, handler: CallbackHandler) {
    this.#add(METHODS.POST, pathname, handler);
  }

  put(pathname: string, handler: CallbackHandler) {
    this.#add(METHODS.PUT, pathname, handler);
  }

  delete(pathname: string, handler: CallbackHandler) {
    this.#add(METHODS.DELETE, pathname, handler);
  }

  options(pathname: string, handler: CallbackHandler) {
    this.#add(METHODS.OPTIONS, pathname, handler);
  }

  trace(pathname: string, handler: CallbackHandler) {
    this.#add(METHODS.TRACE, pathname, handler);
  }

  patch(pathname: string, handler: CallbackHandler) {
    this.#add(METHODS.PATCH, pathname, handler);
  }

  async match(req: Request): Promise<Response> {
    const url = new URL(req.url);

    for (const { pattern, handler } of this.routes[req.method]) {
      if (pattern.test(req.url)) {
        const params = pattern.exec(req.url)?.pathname.groups ?? {};
        try {
          const response = await handler(req, params);
          this.emit("response", response);
          return response instanceof Response
            ? response
            : new Response(response.body, response.options);
        } catch (error) {
          this.emit(
            "error",
            new Error(`Internal Server Error: ${req.method} ${url.pathname}`, {
              cause: error,
            }),
          );
          return internalServerError();
        }
      }
    }

    this.emit("error", new Error(`Not Found: ${req.method} ${url.pathname}`));

    return notFound();
  }
}
