export async function gemini(prompt:string){

  return {
    provider:"Gemini",
    model:"gemini-2.5-pro",
    message:"Gemini generated: "+prompt
  };

}
