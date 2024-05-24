import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
const SinglePost = () => {
  const [postinfo, setPostinfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => setPostinfo(postInfo));
  }, []);

  if (!postinfo) return "";
  return (
    <div className="post-page">
      <h1>{postinfo.title}</h1>
      <time>{formatISO9075(new Date(postinfo.createdAt))}</time>
      <div className="author">by @{postinfo.author.username}</div>
      <div className="image">
        <img src={`http://localhost:3000/${postinfo.cover}`} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postinfo.content }}
      ></div>
    </div>
  );
};

export default SinglePost;
