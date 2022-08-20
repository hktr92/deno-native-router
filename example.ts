import { serve } from "https://deno.land/std@0.152.0/http/server.ts";
import { Router } from "./mod.ts";

const router = new Router();
router.get("/", async (_r: Request, _p: Record<string, string>) => {
  return new Response("Hello from / handler");
});
router.get("/500", async (_r: Request, _p: Record<string, string>) => {
  throw new Error("Some simulated 500 error");
});
router.get(
  "/users/:userId",
  async (_r: Request, p: Record<string, string>) => {
    return new Response(
      "Hello from /users/:userId handler, params=" +
        Object.entries(p).join(", "),
    );
  },
);
router.put(
  "/users",
  async (_r: Request, _p: Record<string, string>) => {
    return new Response(
      "Hello from PUT /users handler",
    );
  },
);
router.put(
  "/users/:userId/attachments",
  async (_r: Request, p: Record<string, string>) => {
    return new Response(
      "Hello from PUT /users/:userId/attachments handler, params=" +
        Object.entries(p).join(", "),
    );
  },
);
router.get(
  "/users/:userId/attachments/:attachmentId",
  async (_r: Request, p: Record<string, string>) => {
    return new Response(
      "Hello from /users/:userId handler, params=" +
        Object.entries(p).join(", "),
    );
  },
);
router.post(
  "/users",
  async (_r: Request, _p: Record<string, string>) => {
    return new Response(
      "Hello from POST /users handler",
    );
  },
);
router.patch(
  "/users/:userId",
  async (_r: Request, _p: Record<string, string>) => {
    return new Response(
      "Hello from POST /users handler",
    );
  },
);

router.on("error", (error) => {
  console.error(error);
});

router.on("response", (response) => {
  console.log(response);
});

serve((req: Request) => router.match(req));
