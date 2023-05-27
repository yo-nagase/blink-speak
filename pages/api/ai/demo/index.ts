import { OpenAI } from "langchain";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIChat } from "langchain/llms/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // read secret

    const responseB = `佐藤一郎は、10年以上の経験を持つソフトウェアエンジニアで、特にフルスタック開発とAI技術に精通しています。
      東京大学の情報学部を卒業後、数々の成功したスタートアップで主導的な役割を果たしました。彼のプログラミングスキルはPython、
      JavaScript、そしてC++を含みます。また、彼はデータ分析と機械学習の専門家でもあります。
      彼のコミュニケーション能力とリーダーシップは、彼がどんなチームでも成功に導くことを可能にしています。
      一郎は新しい挑戦を常に探し求めており、次のビッグプロジェクトに向けて準備しています。`;

    console.log(responseB);
    res.status(200).json({ message: responseB });
  }
}
