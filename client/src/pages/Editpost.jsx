import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";
import Editor from "./../Component/Editor";

const Editpost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch("https://blogez.onrender.com/post/" + id)
      .then((response) => response.json())
      .then((postinfo) => {
        console.log(postinfo);
        setTitle(postinfo.title);
        setContent(postinfo.content);
        setSummary(postinfo.summary);
      });
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("https://blogez.onrender.com/post", {
      method: "PUT",
      body: data,
      // credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setFiles(e.target.files)}
        name="file"
      />

      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Edit Post</button>
    </form>
  );
};

export default Editpost;
