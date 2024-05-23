import { format } from "date-fns";
const Post = ({ title, summary, content, cover, createdAt }) => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*xSQxT5-4mn4-gcyyUS9fhA.png"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">Mridul Pandey</a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
