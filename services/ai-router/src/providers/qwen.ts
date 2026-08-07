export async function qwen(prompt:string){

  return {
    provider:"Qwen",
    model:"qwen3-coder",
    message:"Qwen generated: "+prompt
  };

}
