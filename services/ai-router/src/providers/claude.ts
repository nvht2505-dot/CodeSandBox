export async function claude(prompt:string){

  return {
    provider:"Claude",
    model:"claude-sonnet-4",
    message:"Claude generated: "+prompt
  };

}
