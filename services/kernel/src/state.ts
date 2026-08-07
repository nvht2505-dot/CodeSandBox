import type {Task} from "./types";

export const state={
  tasks:[] as Task[],
  agents:new Map(),
  memory:new Map()
};
