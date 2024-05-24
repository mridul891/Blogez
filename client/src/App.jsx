import "./App.css";
import Login from "./Component/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import Register from "./Component/Register";
import { UserContextProvider } from "./Context/UserContext";
import CreatePost from "./Component/CreatePost";
import SinglePost from "./Component/SinglePost";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<SinglePost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
