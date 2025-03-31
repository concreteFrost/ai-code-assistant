import OpenAI from "openai";
import dotenv from "dotenv";
import { codeAssistantSchema } from "./schemas/codeAssistantSchema";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export const completion = (messageHistory: any) =>
  openai.chat.completions.create({
    model: "gpt-4o", // supports structured outputs
    max_tokens: 1000, // max length of the answer
    stream: true,
    store: false, // store conversation
    temperature: 1, // creativity (float 0 - 1)
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "code_review",
        schema: codeAssistantSchema,
      },
    },
    messages: messageHistory,
  });
