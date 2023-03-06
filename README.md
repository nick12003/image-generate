# image-generate

使用Open AI 產生圖片

![image](https://raw.githubusercontent.com/nick12003/image-generate/main/intro.png)

# 使用

新增檔案 `.env` 

在 [OpenAI](https://beta.openai.com/)  取得一個 API KEY 然後加入到 `.env` 裡

OPENAI_API_KEY=${your api key}

安裝套件

```bash
pnpm install

# 進到client端安裝套件
cd client 

pnpm install
```

啟動

```bash
#啟動nodejs
pnpm run server

#啟動web
pnpm run client
```

or

```bash
#同時啟動
pnpm run dev
```

打開 `http://localhost:5000` 

本地生成圖片api `POST http://localhost:5000/openai/generateimage`
