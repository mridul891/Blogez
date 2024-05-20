const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://plus.unsplash.com/premium_photo-1715876234545-88509db72eb3?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
          perspiciatis ex itaque hic obcaecati amet aut. Quo dolores vitae
          tenetur architecto quas, consectetur enim praesentium, quos cumque
          accusantium minus odit officia cum.
        </h2>
        <p className="info">
          <a className="author">Mridul Pandey</a>
          <time>2023-01-06 16:45</time>
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere non
          dolores, voluptatem totam sint nobis ipsam! Quos repellendus, debitis
          fugiat provident dolore amet quidem accusantium, atque suscipit
          corporis, aliquam esse odit rem.
        </p>
      </div>
    </div>
  );
};

export default Post;
