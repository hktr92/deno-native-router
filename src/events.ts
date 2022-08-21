import { ResponseLike } from "./types.ts";

export interface ResponseEvent {
  request: Request;
  response: Response | ResponseLike;
}

export type Events = {
  error: [Error];
  response: [ResponseEvent];
};
