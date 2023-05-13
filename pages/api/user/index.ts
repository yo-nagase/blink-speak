export default function handler(req, res) {
  if (req.method === "GET") {
    // return object
    res.status(200).json({ name: "John Doe1" + process.env.DB_HOST });
  } else if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
