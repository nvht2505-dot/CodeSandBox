import { GoogleGenAI } from "@google/genai";

const ai=new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY
});

export async function chat(prompt:string){

  const res=await ai.models.generateContent({
    model:"gemini-2.5-pro",
    contents:prompt
  });

  return res.text;

}
