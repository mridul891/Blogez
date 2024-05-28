import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("https://blogez.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        // credentials: "include",
      });

      if (response.ok) {
        await response.json().then((info) => {
          setUserInfo(info);
          navigate("/");
        });
      } else {
        alert("wrong credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="login" onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
