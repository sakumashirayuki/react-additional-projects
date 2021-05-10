import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

import Photo from "./Photo";

const clientId = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const  fetchImages = async() => {
    setLoading(true);
    let url;
    url = `${mainUrl}${clientId}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setPhotos(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }
  useEffect(()=>{
    fetchImages();
  }, []);
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" name="" id="" placeholder="search" className="form-input"/>
          <button type="submit" className="submit-btn" onClick={handleSubmit}><FaSearch /></button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index)=>
          <Photo key={image.id} {...image}></Photo>
          )}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
