import { useEffect, useState } from "react";
import Post from "../Component/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/post", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((post) => setPosts(post));
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post, index) => <Post {...post} key={index} />)}
    </>
  );
};

export default IndexPage;
