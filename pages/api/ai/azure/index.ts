import { OpenAI } from "langchain";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIChat } from "langchain/llms/openai";
import {
  AIChatMessage,
  HumanChatMessage,
  LLMResult,
  SystemChatMessage,
} from "langchain/schema";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // read secret
    res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("X-Accel-Buffering", "no");
    const chat = new ChatOpenAI({
      //CallOptions: { Proxy: "ss" },
      streaming: true,
      temperature: 0.3, // defaultは1
      //topP: 1, // defaultは1
      timeout: 1000 * 30, //msecで指定。ここで指定した時間以内に一度少しでもデータがこればタイムアウトにはならない
      callbacks: [
        {
          handleLLMNewToken(token: string, runId: string, parentRunId: string) {
            // デバッグ用
            console.log("⭐️" + token + "runId:", runId);
            // クライアントに送る
            res.status(200).write(token);
          },
          handleLLMEnd(output: LLMResult, runId: string, parentRunId?: string) {
            console.log("🦠end!!!", " ", runId, " ", output, " ", parentRunId);
            res.status(200).end();
          },
          handleLLMError(err: Error, runId: string, parentRunId?: string) {
            console.log("🈲Error!!!");
            res.status(200).end();
          },
        },
      ],
    });

    // ここでリクエストを送る
    const responseB = await chat.call([
      new HumanChatMessage(
        "以下のデータのサンプルを30件つくってくださいデータはExcelに貼り付けられる様にtsvで作成してください。IDは1からの連番でつけてください。必要な項目は以下のとおりです。\n```\nID,商品コード,商品名,メーカ名,商品種別, 価格, 発売日\n```"
      ),
      // AIからの返答は以下の様に書く
      //new AIChatMessage("xxxxxx"),
    ]);

    // TODO: ここでトークンサイズを測って、DBに格納したい。
    // 結果の一覧をコンソールに表示する（デバッグ用）
    console.log(responseB);
  }
}
