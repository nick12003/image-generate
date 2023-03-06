const path = require("path");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/generateimage", async (req, res) => {
  const { prompt, size, count } = req.body;
  try {
    const response = await openai.createImage({
      prompt,
      n: parseInt(count),
      size,
    });
    const imageUrls = response.data.data.map(({ url }) => url);

    res.status(200).json({
      success: true,
      data: imageUrls,
    });
  } catch (error) {
    let errorMsg;
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      errorMsg = data;
    } else {
      console.log(error.message);
      errorMsg = message;
    }

    res.status(400).json({
      success: false,
      error: errorMsg ?? "The image could not be generated",
    });
  }
});

app.use("/openai", router);

app.listen(port, () => console.log(`Server started on port ${port}`));
