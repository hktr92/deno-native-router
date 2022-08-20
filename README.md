# Deno extended native router
A zero dependency simple native router in Deno. Only router, nothing else.
An extended native router in Deno, based on [deno-native-router](https://github.com/mayankchoubey/deno-native-router) project.

# Basic usage

## Create router

To create router, import the Router class:

```ts
import { Router } from "https://deno.land/x/nativerouter/mod.ts";
const router = new Router();
```

## Add routes
The routes can be added by calling the following functions: 
- ```router.get()``` 
- ```router.post()``` 
- ```router.put()```
- ```router.patch()```
- ```router.options()```
- ```router.head()``` 
- ```router.trace()```

Each of these function expects two inputs:
- Path name to route
  - path name could contain variables like /api/rest/something/:someId/somethingelse/:someElseId)

- Callback handler
  - The async handler must take two inputs: Request & Params and must return a Response object
```ts
router.add(
  '/something/:someId/somethingelse/:someElseId', 
  async (req:Request, params:Record<string, string>) => new Response()
);
```

## Route request
Any incoming request, represented by the ```Request``` object, can be routed using ```router.match()``` function. The only input is the ```Request``` object. The router function would look for handlers. If found, the request would be forwarded over to the handler. If not found, a 404 response would be sent. The expected output from the handler is a ```Response``` object.

```ts
await router.match(request);
```

# A sample app
```ts
import { Router } from "https://deno.land/x/nativerouter/mod.ts";
import { serve } from "https://deno.land/std@0.152.0/http/server.ts";

const router = new Router();
router.get("/", async (_r: Request, _p: Record<string, string>) => {
  return new Response("Hello from / handler");
});

router.on("error", (error) => {
  console.error(error);
});

serve((req: Request) => router.match(req));

```

## Events

This fork adds only the [event](https://deno.land/x/event@2.0.1/mod.ts) dependency to enhance the functionality for logging and some advanced usages.

Currently, there are two events emitted:
- `error` => returns the `Error` object for `Not Found` and `Internal Server Error` (the latter with the `cause` of it);
- `response` => returns the `Response` object resolved from callback handler.

# Usage
Check [Examples](./example.ts).
