import React, { useState, useEffect } from "react";

import { useFetch } from "./useFetch";
import Follower from "./Follower";

function App() {
    const { loading, data } = useFetch();
    const [page, setPage] = useState(0);
    const [followers, setFollowers] = useState([]);

    const handlePage = (index) => {
      setPage(index);
    }

    const nextPage = () => {
      setPage((oldPage)=>{
        if(oldPage===data.length - 1){
          return 0;
        }else{
          return oldPage + 1;
        }
      })
    }

    const prevPage = () => {
      setPage((oldPage)=>{
        if(oldPage===0){
          return data.length - 1;
        }else{
          return oldPage - 1;
        }
      })
    }

    useEffect(() => {
        if (loading) return;
        setFollowers(data[page]);
    }, [loading, page]);
    return (
        <main>
            <div className="section-title">
                <h1>{loading ? "loading..." : "Pagination"}</h1>
                <div className="underline"></div>
            </div>
            <section className="followers">
                <div className="container">
                    {followers.map((followerInfo) => (
                        <Follower
                            key={followerInfo.id}
                            avatar_url={followerInfo.avatar_url}
                            login={followerInfo.login}
                            html_url={followerInfo.html_url}
                        />
                    ))}
                </div>
                {!loading && (
                    <div className="btn-container">
                        <button className="prev-btn" onClick={prevPage}>prev</button>
                        {data.map((_, index) => (
                            <button key={index} className={`page-btn ${index===page&&"active-btn"}`} onClick={()=>{handlePage(index)}}>
                                {index + 1}
                            </button>
                        ))}
                        <button className="next-btn" onClick={nextPage}>next</button>
                    </div>
                )}
            </section>
        </main>
    );
}

export default App;
