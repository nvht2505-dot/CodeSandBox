import {EventEmitter} from "events";

export const stream=new EventEmitter();

export function emitToken(
  agent:string,
  token:string
){
  stream.emit("token",{
    agent,
    token
  });
}

export function emitStatus(
  agent:string,
  status:string
){
  stream.emit("status",{
    agent,
    status
  });
}

export function onToken(fn:any){
  stream.on("token",fn);
}

export function onStatus(fn:any){
  stream.on("status",fn);
}
