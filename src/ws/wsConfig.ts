import { WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import { completion } from "../ai/aiConfig";
import { codeAssistantTask } from "../ai/tasks/codeAssistantTask";

const messageHistory: Record<
  string,
  Array<{ role: "user" | "system" | "assistant"; content: string }>
> = {}; // Record is simmilar to Dictionaries in C#

const wsServer = (server: any) => new WebSocketServer({ server });

const useWebSocket = (server) => {
  wsServer(server).on("connection", (ws: any, req: IncomingMessage) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId");

    //if user does not exists
    //create new one
    messageHistory[userId] = messageHistory[userId] || [];

    ws.on("message", async (message: Buffer) => {
      const userInput = message.toString();

      //adding user message to history
      messageHistory[userId].push({ role: "user", content: userInput });

      //adding machine output to history
      messageHistory[userId].push({
        role: "system",
        content: codeAssistantTask(),
      });

      try {
        //getting message from AI
        const readableStream = await completion(messageHistory[userId]);

        //for output accumulation
        let output = "";
        for await (const chunk of readableStream) {
          const txt = chunk.choices[0].delta.content || "";
          output += txt;
        }

        ws.send(output); // Отправляем клиенту
      } catch (error) {
        ws.send("Something went wrong...");
      }
    });

    ws.on("close", () => {
      console.log(`Connection for ${userId} closed`);
        //delete conversation
      delete messageHistory[userId];
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });
};

export default useWebSocket;
