// export default function handler(req, res) {
//   if (req.method === "GET") {
//     // return object
//     res.status(200).json({ name: "John Doe1" + process.env.DB_HOST });
//   } else if (req.method === "POST") {
//     // Process a POST request
//   } else {
//     // Handle any other HTTP method
//   }
// }

const fs = require('fs');

export default function handler(req, res) {
    const pathToPdf = './pages/api/pdf/benesse.pdf'
    console.log("📗　PDFをロードします。（ここはS3から読みたい）")
    fs.readFile(pathToPdf, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send('An error occurred while retrieving the PDF');
            return;
        }
        res.setHeader("content-type", "application/pdf");
        res.send(data);
    });
}