import { OpenAI } from "langchain";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIChat } from "langchain/llms/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

export default async function handler(req, res) {


  if (req.method === "GET") {
    // timeout
    const sleep1 = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
    const responseB = `GETでした wait...`;
    console.log(responseB, "Query: ", req.query);
    await sleep1(2000)
    res.status(200).json({ message: responseB });

  } else if (req.method === "POST") {
    const responseB = `POSTでした...wait...`;
    console.log(responseB, "Body: ", req.body, Date.now());
    const sleep2 = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
    await sleep2(3000)

    res.status(200).json({ message: responseB,id:"xxxxxd" });
  }
}
