import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [markdown, setMarkdown]  = useState('## markdown preview');
  const handleChange = (e) => {
    setMarkdown(e.target.value);
  }
  return (
    <main className="markdown">
      <textarea className="input" value={markdown} onChange={handleChange}> 
      </textarea>
      <ReactMarkdown className="result">
        {markdown}
      </ReactMarkdown>
    </main>
  );
}

export default App;
