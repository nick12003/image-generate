# image-generate

使用 Open AI 產生圖片 (server 端)

![image](https://raw.githubusercontent.com/nick12003/image-generate/main/intro.png)

# 使用

新增檔案 `.env`

在 [OpenAI](https://beta.openai.com/) 取得一個 API KEY 然後加入到 `.env` 裡

OPENAI_API_KEY=${your api key}

安裝套件

```bash
pnpm install
```

啟動

```bash
#啟動nodejs
pnpm run server
```

本地生成圖片 api 預設 `POST http://localhost:5000/openai/generateimage`

example

```javascript
const response = await fetch("http://localhost:5000/openai/generateimage", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: "可愛的貓咪",
    size: "256x256",
    count: 1,
  }),
});

const data = await response.json();
/*
 * { success: true, data: ["a image url"]}
 */
```

如有需要修改 port 則在`.env`加入

```bash
PORT=${new port}
```
