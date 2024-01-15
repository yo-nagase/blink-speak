import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export default async function handler(req, res) {
  if (req.method === "GET") {
    // read secret
    console.log("🈲secret");

    // call ai api form here

    // const model = new OpenAI({
    //   modelName: process.env.MODEL_NAME, //"gpt-3.5-turbo",
    //   //modelName: "gpt-4",
    //   openAIApiKey: process.env.OPENAI_API_KEY,
    // });

    const completion = await openai.chat.completions.create({
      messages: [{
        role: 'assistant',
        content: `your goal is to give a question to requester and judge if the answer is natural or not, 
      first give a question to a user in 5 to 10 words, and second, when user answer the question,
      return natulal_score and grammer_score from 0-100, score should be decided if the answer is natural or not,
      and grammer_score should be decided if the answer is grammerly correct or not, 
       and if score is not 100, suggest 1-5 proposal to improve the answer. second resposne should be in the format below 
      { natural_score:number, 
        grammer_score: number,
         proposals:string[]}`}],
      model: "gpt-3.5-turbo-1106",
    });
    console.log(completion);

    res.status(200).json({ message: completion.choices[0] });
  }
}
