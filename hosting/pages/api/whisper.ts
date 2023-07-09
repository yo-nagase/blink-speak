import { Configuration, OpenAIApi } from 'openai'
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { File } from 'formidable'
import fs from 'fs'
import { fi } from '@faker-js/faker'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const form = formidable({ multiples: true, keepExtensions: true })

const isFile = (file: File | File[]): file is File => {
  return !Array.isArray(file) && file?.filepath !== undefined
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // show contents of body in request
    console.log(req)

    const fileContent: any = await new Promise((resolve, reject) => {
      form.parse(req, (err, _fields, files) => {
        console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️", _fields)
        console.log("🌲", files.file[0].filepath)
        if (isFile(files.file[0])) {
          resolve(fs.createReadStream(files.file[0].filepath))
        }
        return reject('ほ　file is not found')
      })
    })

    console.log("🐵", fileContent)
    // Whisper
    const response = await openai.createTranscription(fileContent, 'whisper-1', undefined, undefined, undefined, "en")
    const transcript = response.data.text
    console.log("📢transcript:", transcript)
    res.status(200).json({ transcript })
  } catch (error) {
    console.error("🈲", error)
    res.status(500).send('Something went wrong')
  }
}
