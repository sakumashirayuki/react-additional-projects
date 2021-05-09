import React from "react";

function Follower(props) {
  return (
      <article className="card">
          <img src={props.avatar_url} alt={props.login} />
          <h4>{props.login}</h4>
          <a href="{props.html_url}" className="btn">
              view profile
          </a>
      </article>
  );
}

export default Follower;