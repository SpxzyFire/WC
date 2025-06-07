const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from 'public' directory

app.post("/start", (req, res) => {
  const { gamePin, nickname, amount } = req.body;
  // Logic to start the Kahoot game with the specified parameters
  res.json({
    status: `Started ${amount} bots with name ${nickname} in game ${gamePin}`,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
