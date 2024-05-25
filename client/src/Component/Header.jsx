import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../Context/UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  // fetching  whether user is logged in or not
  // useEffect(() => {
  //   fetch("http://localhost:3000/profile", {
  //     credentials: "include",
  //   })
  //     .then((response) => response.json())
  //     .then((info) => setUserInfo(info));
  // }, []);

  // Loggout functionality
  const logout = async () => {
    await fetch("https://blogez.onrender.com/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        Blogez
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create"> Create a new Blog </Link>
            <a onClick={logout}>logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
