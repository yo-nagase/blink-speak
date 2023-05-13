export default function handler(req, res) {
  if (req.method === "GET") {
    // read secret
    console.log("🈲secret");

    // call ai api form here

    res.status(200).json({ message: "This is some response from AI" });
  }
}
