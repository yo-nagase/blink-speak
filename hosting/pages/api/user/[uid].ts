export default function handler(req, res) {
  if (req.method === "GET") {
    // return object
    res.end(`User: ${req.query.uid}`);
  }
}
