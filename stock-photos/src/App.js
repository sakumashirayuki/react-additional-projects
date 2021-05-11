import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

import Photo from "./Photo";
import { throttle } from "./utils";

const clientId = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const pageUrl = `&page=${page}`;
    const queryUrl = `&query=${query}`;
    if(query){
      url = `${searchUrl}${clientId}${pageUrl}${queryUrl}`;
    }else{ // no query, use default request
      url = `${mainUrl}${clientId}${pageUrl}`;
    }
    try {
      const response = await axios.get(url);
      const data = response.data;
      setPhotos((oldPhotos) => {
        if(query && page==1){
          return data.results;
        }else if(query){
          return [...oldPhotos, ...data.results];
        }else{
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const scrollReload = () => {
    if (
      !loading &&
      (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50
    ) {
      setPage((oldPage) => {
        return oldPage + 1;
      });
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener(
      "scroll",
      throttle(scrollReload, 100)
    ); // here should be a function, or define a new function
    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            name=""
            id=""
            placeholder="search"
            className="form-input"
            value={query}
            onChange={(e)=>{
              setQuery(e.target.value);
            }}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index) => (
            <Photo key={image.id} {...image}></Photo>
          ))}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
