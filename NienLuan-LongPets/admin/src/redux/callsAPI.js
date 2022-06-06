import axios from "axios"
import { loginFailure, loginStart, loginSuccess, logoutAdmin } from "./adminRedux";

// Hàm đăng nhập
export const login = async (dispatch, admin) => {
    // user gồm username, mật khẩu
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:3001/api/auth/loginadmin", admin, {withCredentials: true});
        dispatch(loginSuccess(res.data));

        // Logout sau 1 khoảng time trước khi Cookie hết hạn (90000000mili giây)
        const resNhanVien = await axios.get("http://localhost:3001/api/user/findByEmailNhanVien/" + admin.emailnhanvien);
        const nhanvien = resNhanVien.data[0];
        setTimeout(() => {
            console.log("ccc123;");
            logout(dispatch, nhanvien);
        }, 80000000)
    }catch(err) {
        dispatch(loginFailure());
    }
}

// Hàm đăng xuất
export const logout = async (dispatch, admin) => {
    // User gồm: đối tượng user ở UserRedux
    console.log("Admin: ",admin);
    const res = await axios.post("http://localhost:3001/api/auth/logoutadmin", {manhanvien: admin.manhanvien}, {withCredentials: true});
    // dispatch(logoutCart()); //Khởi tạo lại người dùng
    dispatch(logoutAdmin()); //Khởi tạo lại giỏ hàng
}