import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import User from "./components/User";
import Order from "./components/Order";
import FetchQuestion from "./components/FetchQuestion";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/user" exact element={<User />}></Route>
          <Route path="/order" exact element={<Order />}></Route>
          <Route path="/fetchQuestion" exact element={<FetchQuestion />}></Route>
          <Route path="/contact" exact element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
