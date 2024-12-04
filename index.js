import axios from "axios";
import dayjs from 'dayjs';
import express from "express";

const version = "v1";
const app = express();

app.use(express.json());

app.get("/api/" + version  + "/ping", async(req, res) => {
  const { text } = req.body;
  
  const respData = {
    data:dayjs().format('2024-12-04'),
    input:text.toString()
  };

  res.send(respData);
});

app.get("/api/" + version  + "/tags", async(req, res) => {
  const response = await axios.get("http://localhost:11434/api/tags");
  res.send(JSON.stringify(response));
});

app.post("/api/" + version  + "/ia", async (req, res) => {
  const { text } = req.body;
  const response = await axios.post("http://localhost:11434/api/generate", {
    model: "llama3",
    prompt: text,
    stream: false,
  });
  // const respData = response.data.response.toString()
  
  // res.send(respData);
  //res.send(JSON.stringify(response.data.response));

  return res.json(JSON.stringify(response.data))
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
