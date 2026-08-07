export async function openclaw(prompt:string){

  return{
    provider:"OpenClaw",
    model:"agent",
    message:"OpenClaw: "+prompt
  };

}
