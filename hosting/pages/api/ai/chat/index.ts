import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

export default async function handler(req, res) {
  console.log("🐵Query🐵", req.query);
  if (req.method === "GET") {
    if (req.query.param1 == "sync") {
      //   これでチャットは実現できる
      const chat2 = new ChatOpenAI({
        streaming: true,
        //modelName: "gpt-3.5-turbo-0613",
        modelName: "gpt-3.5-turbo-1106",
        temperature: 0,
        callbacks: [
          {
            handleLLMNewToken(token: string) {
              process.stdout.write(token);
            },
          },
        ],
        // modelKwargs: { "response_format": "json" }
      });
    } else {
      const id = req.query.id;
      const question = req.query.question ?? "xxxxx";
      const answer = req.query.answer ?? "xxxxx";

      console.log("question", question);
      console.log("answer", answer);

      const chat = new ChatOpenAI({
        temperature: 0,
        verbose: true,
      });

      // start time so that we can measure how long it takes to get a response
      const start = new Date().getTime();

      const responseB = await chat.invoke([
        new HumanMessage(`
あなたの役割は質問に対してユーザが答えた英文を評価し、回答することです。評価スコアは、1-100の点数で答えます。評価のポイントはそれぞれ以下に示したJSONのコメントに従います。
評価結果はJSONフォーマットで回答し、以下の項目を含めてください。レスポンスはJSONのみで、それ以外の余分な文字列の追加はしないでください。
評価したスコアは英会話ゲームで利用し、スコアの合計を入力者同士で競い合いますので、特に100点は本当に正しい場合以外は出さない様にしてください。
できるだけ素早く回答をしてください。

\`\`\`
{
  "key" : string, // this is question id. set same id as you received 
  "is_correct" : boolean // the user's answer is corrct or not 
  "grammer_score" : number // if user's answer is correct grammaticaly, this score would be 100
  "natural_score" : number  //if user's expression is natural perfectly, this score would be 100
  "comment_eng" : string, // give advice to user to improve the answer in English
  "comment_jpn" : string, // 日本語で正解の為のコメントを書いてください。問題文を引用する時は問題と同じ英語を用いてください。
  "question": string, // question to user. always same sentence as below.
  "user_answer" : string, // this is user's answer
  "proposal_answer" :  string, // give a proposal answer which translate question to English. translation is NOT needed. only one proposal is enough. no advice, just give a answer only.
}

\`\`\`

This is the question id: ${id}

Here is question :

\`\`\`
${question}
\`\`\`

Here is user's answer :

\`\`\`
${answer}

\`\`\`
`),
        // new SystemChatMessage(
        //   "今朝の朝食は何を食べましたか？(Kesa no choushoku wa nani wo tabemashita ka?)"
        // ),
        // new HumanChatMessage("What do you eat for breakfast this morning?"),
      ]);
      // end time here and get the difference
      const end = new Date().getTime();
      const time = end - start;

      console.log("🐸🐸🐸🐸", { message: responseB, take: time })
      res.status(200).json({ message: responseB, take: time });
    }
  }
}
