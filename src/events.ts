import { ResponseLike } from "./types.ts";

export type Events = {
  error: [Error];
  response: [Response | ResponseLike];
};
