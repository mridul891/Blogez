import ReactQuill from "react-quill";

const Editor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  
  return (
    <ReactQuill
      value={value}
      modules={modules}
      theme={"snow"}
      onChange={onChange}
    />
  );
};

export default Editor;
