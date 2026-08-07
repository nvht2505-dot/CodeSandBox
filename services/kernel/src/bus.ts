import {EventEmitter} from "events";

export interface AgentMessage{
  from:string;
  to:string;
  type:string;
  payload:any;
}

const bus=new EventEmitter();

export function send(message:AgentMessage){
  bus.emit(message.to,message);
}

export function subscribe(
  agent:string,
  handler:(message:AgentMessage)=>void
){
  bus.on(agent,handler);
}

export function broadcast(
  type:string,
  payload:any
){
  bus.emit("*",{
    from:"kernel",
    to:"*",
    type,
    payload
  });
}
