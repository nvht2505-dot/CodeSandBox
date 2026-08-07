export async function openrouter(prompt:string){

  return{
    provider:"OpenRouter",
    model:"auto",
    message:"OpenRouter: "+prompt
  };

}
