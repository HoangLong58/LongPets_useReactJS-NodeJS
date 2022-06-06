import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import "./css/main.css";
import { useSelector } from "react-redux";
import CapNhatThongTin from "./pages/CapNhatThongTin";
import DonMua from "./pages/DonMua";
import LoginRegister from "./pages/LoginRegister";
import DatMua from "./pages/DatMua";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.products);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/register' element={user ? <Navigate to="/" /> : <LoginRegister />} />
        <Route path='/login' element={user ? <Navigate to="/" /> : <LoginRegister />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/products/:tendanhmuc' element={<ProductList />} />
        {/* <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} /> */}
        <Route path="/success" element={<Success />} />
        <Route path='/datmua' element={cart.length > 0 ? <DatMua /> : <Home />} />

        <Route path="/capnhatthongtin" element={user ? <CapNhatThongTin /> : <Navigate to="/" />} />
        <Route path="/donmua" element={user ? <DonMua /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );

};

export default App;