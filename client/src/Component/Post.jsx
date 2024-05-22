const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*xSQxT5-4mn4-gcyyUS9fhA.png"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>Tips on How to Write Your First Successful Technical Blog</h2>
        <p className="info">
          <a className="author">Mridul Pandey</a>
          <time>2023-01-06 16:45</time>
        </p>
        <p> 
          If you have never written a technical blog before, it can
          seem a bit overwhelming. You might even be asking yourself, “Where do
          I even start?” If you find yourself in this position, the point of
          this blog is to help break down the whole process into something a
          little more easily digestible. Once you know some of the fundamental
          building blocks, the actual writing process will be a lot easier. But
          before diving into how to create a blog, I will briefly discuss why
          you should write one.
        </p>
      </div>
    </div>
  );
};

export default Post;
