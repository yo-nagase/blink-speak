import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
import { PromptTemplate } from "langchain";

/**
 * 長い文章をサマリーして返す
 * @param req
 * @param res
 */
export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log("summary action called.");
    // In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
    const text = fs.readFileSync(
      //      process.cwd() + "/data/wiki-history.txt",
      process.cwd() + "/data/meeting-minutes.txt",
      "utf8"
    );
    const lang = "Japanese";

    console.log("🈲 tokenCount : ", countToken(text));
    //TODO: この辺りで利用したトークン数を集計する方法はないか？
    //

    // ここでtextのトークンサイズをチェックする
    const model = new ChatOpenAI({ temperature: 0 });

    // チャンクサイズを指定して分割（もう少し大きくても良い？）
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap:100
    });
    const docs = await textSplitter.createDocuments([text]);

    // start time so that we can measure how long it takes to get a response
    const start = new Date().getTime();

    // const prompt_template = `Write a concise summary of the following:

    //     {text}

    //     CONCISE SUMMARY IN Japanese:`;
    const prompt_template = `This is meeting minutes, write a concise summary and next actions of the following and 
    this text is genereted by text generator, so there is a lot of mistakes, please correct it and write a summary and next actions :

        {text}

        CONCISE SUMMARY IN Japanese:
        
        next actions IN Japasese:`;
    const PROMPT = new PromptTemplate({
      template: prompt_template,
      inputVariables: ["text"],
    });

    // This convenience function creates a document chain prompted to summarize a set of documents.
    // const chain = loadSummarizationChain(model, {
    //   type: "map_reduce",
    //   returnIntermediateSteps: true,
    //   verbose: true,
    //   combinePrompt: PROMPT,
    //   combineMapPrompt: PROMPT,
    // });
    const chain = loadSummarizationChain(model, {
      type: "refine",
      verbose: true,
      refinePrompt: PROMPT,
      questionPrompt: PROMPT,
    });

    const callbacks = {
      onResult: (result) => {
        console.log("🈲")
        console.log({ res });
        // end time here and get the difference
      },
      onError: (error) => {
        console.error(error);
      },
    };

    const aiResponse = await chain.call({
      input_documents: docs,
    });
    console.log({ res });
    // end time here and get the difference
    const end = new Date().getTime();
    const time = end - start;
    // レスポンス返す
    res.status(200).json({ message: aiResponse, take: time });
  }
}

import { encode, decode } from "gpt-3-encoder";
// トークン数を数える
function countToken(str: string): number {
  const encoded = encode(str);
  // console.log("Encoded this string looks like: ", encoded);
  // console.log("We can look at each token and what it represents");
  // for (let token of encoded) {
  //   console.log({ token, string: decode([token]) });
  // }
  // console.log("number of token is", encoded.length);
  // const decoded = decode(encoded);
  // console.log("We can decode it back into:\n", decoded);

  return encoded.length;
}
