import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuanLyDanhMuc from "./pages/QuanLyDanhMuc";
import QuanLyThuCung from "./pages/QuanLyThuCung";
import QuanLyDonHang from "./pages/QuanLyDonHang";
import QuanLyKhachHang from "./pages/QuanLyKhachHang";
import QuanLyNhanVien from "./pages/QuanLyNhanVien";
import { useState } from "react";
import LoginAdmin from "./pages/LoginAdmin";
import { useSelector } from "react-redux";


const App = () => {
    // Lấy admin từ Redux
    const admin = useSelector((state) => state.admin.currentAdmin);
    const [isLogin, setIsLogin] = useState(false);
    return (
        <Router>
            <Routes>
                <Route path='/' element={admin ? <Home /> : <LoginAdmin />} />
                {
                    admin
                        ?
                        admin.machucvu === 5
                            ?
                            <>
                                <Route path='/quanlydanhmuc' element={<QuanLyDanhMuc />} />
                                <Route path='/quanlythucung' element={<QuanLyThuCung />} />
                                <Route path='/quanlykhachhang' element={<QuanLyKhachHang />} />
                                <Route path='/quanlynhanvien' element={<QuanLyNhanVien />} />
                                <Route path='/quanlydonhang' element={<QuanLyDonHang />} />
                            </>
                            :
                            admin.machucvu === 4
                                ?
                                <>
                                    <Route path='/quanlydonhang' element={<QuanLyDonHang />} />
                                </>
                                :
                                admin.machucvu === 3
                                    ?
                                    <>
                                        <Route path='/quanlythucung' element={<QuanLyThuCung />} />
                                        <Route path='/quanlydonhang' element={<QuanLyDonHang />} />
                                    </>
                                    :
                                    admin.machucvu === 2
                                        ?
                                        <>
                                            <Route path='/quanlykhachhang' element={<QuanLyKhachHang />} />
                                            <Route path='/quanlydonhang' element={<QuanLyDonHang />} />
                                        </>
                                        :
                                        admin.machucvu === 1
                                            ?
                                            <>
                                                <Route path='/quanlythucung' element={<QuanLyThuCung />} />
                                                <Route path='/quanlydonhang' element={<QuanLyDonHang />} />
                                            </>
                                            : null
                        : null
                }
                {/* <Route path='/quanlydanhmuc' element={<QuanLyDanhMuc />} />
                <Route path='/quanlythucung' element={<QuanLyThuCung />} />
                <Route path='/quanlykhachhang' element={<QuanLyKhachHang />} />
                <Route path='/quanlynhanvien' element={<QuanLyNhanVien />} />
                <Route path='/quanlydonhang' element={<QuanLyDonHang />} /> */}
            </Routes>
        </Router>
    );
};

export default App;