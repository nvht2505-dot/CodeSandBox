import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function chat(prompt:string){

  const res = await client.responses.create({
    model:"gpt-5.5",
    input:prompt
  });

  return res.output_text;

}
