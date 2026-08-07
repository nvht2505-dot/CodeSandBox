import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey:process.env.ANTHROPIC_API_KEY
});

export async function chat(prompt:string){

  const res = await client.messages.create({
    model:"claude-sonnet-4",
    max_tokens:2048,
    messages:[
      {
        role:"user",
        content:prompt
      }
    ]
  });

  return res.content[0].text;

}
