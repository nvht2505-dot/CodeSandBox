export async function openai(prompt:string){

  return {
    provider:"OpenAI",
    model:"gpt-5",
    message:"GPT generated: "+prompt
  };

}
