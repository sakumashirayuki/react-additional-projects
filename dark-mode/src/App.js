import React, { useState, useEffect } from "react";
import data from "./data";
import Article from "./Article";

const getStorageTheme = () => {
  let theme = 'light-theme';
  if(localStorage.getItem('theme')){
    theme = localStorage.getItem('theme');
  }
  return theme;
}

function App() {
  const [theme, setTheme] = useState(getStorageTheme());
  const handleClick = ()=> {
    setTheme((prev)=>{
      return prev==='light-theme' ? 'dark-theme' : 'light-theme';
    })
  }
  useEffect(()=>{
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <main>
      <div className="nav-center">
        <h1>overreacted</h1>
        <button className="btn" onClick={handleClick}>toggle</button>
      </div>
      <section className="articles">
        {data.map((article)=>
        <Article key={article.id} {...article}/>)}
      </section>
    </main>
  );
}

export default App;
