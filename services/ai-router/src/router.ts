import {emitStatus} from "../../kernel/src/stream";

import {openai} from "./providers/openai";
import {claude} from "./providers/claude";
import {gemini} from "./providers/gemini";
import {qwen} from "./providers/qwen";
import {openrouter} from "./providers/openrouter";
import {openclaw} from "./providers/openclaw";

export async function route(prompt:string){

  emitStatus("router","routing");

  if(prompt.includes("review")){
    emitStatus("claude","running");
    return claude(prompt);
  }

  if(prompt.includes("ui")){
    emitStatus("openai","running");
    return openai(prompt);
  }

  if(prompt.includes("design")){
    emitStatus("gemini","running");
    return gemini(prompt);
  }

  if(prompt.includes("speed")){
    emitStatus("qwen","running");
    return qwen(prompt);
  }

  if(prompt.includes("agent")){
    emitStatus("openclaw","running");
    return openclaw(prompt);
  }

  emitStatus("openrouter","running");

  return openrouter(prompt);

}
