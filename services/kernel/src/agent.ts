import {tools} from "./tool";
import {send,subscribe,broadcast} from "./bus";

export interface Agent{

  name:string;

  execute(task:any):Promise<void>;

}

export {
  tools,
  send,
  subscribe,
  broadcast
};
