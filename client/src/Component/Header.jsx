import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../Context/UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
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
    await fetch("http://localhost:3000/logout", {
      credentials: "include",
      mode:"no-cors",
      method: "POST",
    });
    navigate("/");
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
