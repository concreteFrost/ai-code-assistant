import { Request, Response } from "express";
import { completion } from "../ai/aiConfig";

export const sendRequest = async (req: Request, res: Response) => {
  const { userInput } = req.body;

  try {
    if (userInput.length === 0) {
      res.status(403).json({ success: false, message: "Input can't be blank" });
      return;
    }

    const readableStream = await completion(
      JSON.stringify(userInput) as string
    );

    let output = "";
    // Будем отправлять только новые элементы, чтобы не повторять все данные
    for await (const chunk of readableStream) {
      const txt = chunk.choices[0].delta.content || "";
      // console.log(chunk);
      // res.write(`data: ${txt}\n\n`);
      output += txt;
    }

    res.status(200).json({ success: true, message: output });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
