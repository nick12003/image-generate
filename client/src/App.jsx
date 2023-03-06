import { useState } from "react";
import { RingLoader } from "react-spinners";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState(512);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imgWidth, setImgWidth] = useState(512);
  const [imgUrls, setImgUrls] = useState([]);

  const Generate = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:5000/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size: `${imgWidth}x${imgWidth}`,
        count,
      }),
    });

    const data = await response.json();
    if (!data.success) {
      setError(data.error);
    } else {
      setImgUrls(data.data);
    }

    setLoading(false);
    setImgWidth(size);
  };

  return (
    <main className='App'>
      {loading && (
        <div className='spinner'>
          <RingLoader color='#5f9ea0' />
        </div>
      )}
      <section className='case'>
        <h1>Image generate by Open AI</h1>
        <div className='control'>
          <div>prompt</div>
          <input
            type='text'
            value={prompt}
            placeholder='Enter your prompt.'
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
        </div>
        <div className='control'>
          <div>size</div>
          <select
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          >
            <option value={256}>small (256x256)</option>
            <option value={512}>medium (512x512)</option>
            <option value={1024}>large (1024x1024)</option>
          </select>
        </div>
        <div className='control'>
          <div>count</div>
          <input
            type='number'
            value={count}
            min={1}
            max={10}
            onChange={(e) => {
              setCount(e.target.value);
            }}
          />
        </div>
        <div className='control'>
          <button onClick={Generate}>Generator</button>
        </div>
      </section>
      <section className='image'>
        <h2 className='error-msg'>{error}</h2>
        {imgUrls.map((url) => (
          <div className='image-container'>
            <img width={imgWidth} src={url} alt='image' />
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
