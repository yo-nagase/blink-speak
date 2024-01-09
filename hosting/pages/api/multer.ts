import express from 'express';
import multer, { FileFilterCallback } from 'multer';
import { Request, Response } from 'express';



import type { NextApiRequest, NextApiResponse } from 'next'
const app = express();



// Multer configuration for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        console.log("📕mine:", file.mimetype)
        //if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav') { // We accept only .mp3 or .wav files
        cb(null, true); // accept file
        // } else {
        //     cb(null, false); // reject file
        // }
    }
}).single('audio'); // 'audio' is the name of the file input field in the form

app.post('/upload', (req: Request, res: Response) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send("Something went wrong!");
        }
        // At this point, the file is available in req.file.buffer
        console.log(req.file.buffer); // This is your file data
        res.send('File uploaded successfully.');
    });
});

// // Note that AWS Lambda's handler function will look a bit different
// export const handler = app.listen(3000, () => console.log('Server started on port 3000'));
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // show contents of body in request
        //  console.log(req)

        // const fileContent: any = await new Promise((resolve, reject) => {
        //     form.parse(req, (err, _fields, files) => {
        //         console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️", _fields)
        //         console.log("🌲", files.file[0].filepath)
        //         if (isFile(files.file[0])) {
        //             resolve(fs.createReadStream(files.file[0].filepath))
        //         }
        //         return reject('ほ　file is not found')
        //     })
        // })
        // console.log("🐵", fileContent)
        // // Whisper
        // const response = await openai.createTranscription(fileContent, 'whisper-1', undefined, undefined, undefined, "en")
        // const transcript = response.data.text
        // console.log("📢transcript:", transcript)

        // // @ts-ignore
        // upload(req, res, (err) => {
        //     if (err) {
        //         res.status(400).send("Something went wrong!");
        //     }
        //     // At this point, the file is available in req.file.buffer
        //     //@ts-ignore
        //     // console.log("🌋", req); // This is your file data
        //     res.send('File uploaded successfully.');
        // });
        //         res.send('File uploaded successfully.');
        // res.status(200).json({ x: "transcript" })
    } catch (error) {
        console.error("🈲", error)
        res.status(500).send('Something went wrong')
    }
}