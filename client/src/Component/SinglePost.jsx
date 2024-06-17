import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "./../Context/UserContext";
import SharePost from "./SharePost";
const SinglePost = () => {
  const [postinfo, setPostinfo] = useState(null);
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const shareUrl = window.location.href;
  const title = "Check out this awesome Blog";
  useEffect(() => {
    fetch(`https://blogez.onrender.com/post/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((postInfo) => setPostinfo(postInfo));
  }, []);

  const HandleDelete = async () => {
    const response = await fetch(`https://blogez.onrender.com/post/${id}`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      navigate("/");
    }
  };

  if (!postinfo) return "";
  return (
    <div className="post-page">
      <h1>{postinfo.title}</h1>
      <time>{formatISO9075(new Date(postinfo.createdAt))}</time>
      <SharePost shareUrl={shareUrl} title={title} />
      <div className="author">by @{postinfo.author.username}</div>

      {userInfo.id === postinfo.author._id && (
        <div className="edit-row flex">
          {/* Edit Post Button */}
          <Link to={`/edit/${postinfo._id}`} className="edit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit this Post
          </Link>

          {/* Delete Post Button */}
          <button
            style={{ marginLeft: "10px", width: "12rem" }}
            className="edit-btn"
            onClick={HandleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
            Delete Post
          </button>
        </div>
      )}

      <div className="image">
        <img src={`https://blogez.onrender.com/${postinfo.cover}`} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postinfo.content }}
      ></div>
    </div>
  );
};

export default SinglePost;
