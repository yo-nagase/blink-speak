import OpenAI from 'openai';
import { questionList } from './question-list';
import { createHash } from 'node:crypto'
import { QuestionRequest } from '../../../../types/Question.type';


/**
 * 質問を生成するAPI
 * level
 * @param req 
 * @param res 
 */
export default async function handler(req, res) {
  console.log("🐵🐵🐵🐵", req.query);

  const params: QuestionRequest = req.query
  console.log("🐵🐵", params);

  if (req.method === "GET") {
    // ランダムで問題を取得する

    // 0からquestionListのランダム数値を生成
    const randomNum = Math.floor(Math.random() * questionList.length);
    const returnQuestion = questionList[randomNum]

    // ここで暫定的に、問題を生成して設定する
    // TODO: ここで生成した問題を設定する。これは仮の処理
    const newQuestion = await generateQuestion(params)
    console.log("🚢", newQuestion)
    returnQuestion.contents = newQuestion.question

    //質問文からhashを生成する
    returnQuestion.hash = createHash('md5').update(newQuestion.question).digest('hex');
    console.log("Hash:", returnQuestion.hash)


    res.status(200).json(returnQuestion);

  }
}

/**
 * 問題を生成する（OpenAIのAPIを呼び出す）
 * これは暫定版であり、将来的にはあらかじめ問題をDBに登録しておく方法と比較してどちらにするかを決める
 * @param params 
 * @returns 
 */
async function generateQuestion(params: QuestionRequest): Promise<{ question: string }> {
  // OpenAIのAPIを呼び出して、問題を生成する

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log("📗パラメータ:", params)
  console.log("level:", params.level, " カテゴリ:", params.category, "の問題を作ります")

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      {
        role: "user", content: `TOEIC点くらいの人が答えられる問題を作ってください
TOEIC${params.level}点レベルの例文を日本語で作ってください
できれば、${params.category}のカテゴリに該当する様な文章を例題として出力してください。
例文の長さは5語から30語くらいになる様にしてください。例文は一つだけ出力してください。
項目名は"question"としてください。
    ` }],
    model: "gpt-3.5-turbo-1106",
    // model: "gpt-4-1106-preview",
    response_format: { type: "json_object" },
    // response_format: "json",
  });
  const resultJson = JSON.parse(chatCompletion.choices[0].message.content)

  return { question: resultJson.question }
}
