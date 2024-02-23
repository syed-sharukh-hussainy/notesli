import { v } from "convex/values";
import { action } from "./_generated/server";
import { OpenAI } from "openai";

export const shortSummary = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
          Summarize the text in triple quotes but keep it concise. Summarize using plain and simple language and keep the same tense.
            
          """
          ${args.prompt}
          """

          Do not return anything other than the summary. Do not wrap responses in triple quotes. Do not translate the text.
          `,
        },
      ],
    });
    return response.choices[0].message.content;
  },
});

export const fixSpellingAndGrammar = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
          Correct the text in triple quotes below into standard English and fix the grammar. If the given text is gibrish or any standard english word just tell, The given text is some gibrish words. Make your best effort.

          """
          ${args.prompt}
          """

          Do not return anything other than the corrected text. Do not wrap responses in triple quotes. Do not translate the text.
          `,
        },
      ],
    });
    return response.choices[0].message.content;
  },
});
