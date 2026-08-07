import {state} from "./state";
import type {Task} from "./types";

export function enqueue(task:Task){
  state.tasks.push(task);
}

export function dequeue(){
  return state.tasks.shift();
}
