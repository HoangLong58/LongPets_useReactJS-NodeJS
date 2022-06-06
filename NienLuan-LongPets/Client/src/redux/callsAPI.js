import axios from "axios"
import { loginFailure, loginStart, loginSuccess, logoutUser } from "./userRedux"
import { logoutCart } from "./cartRedux";
import { Navigate } from "react-router-dom";

// Hàm đăng ký
export const register = async (dispatch, user) => {
    // user gồm {tenguoimuadangky, emailnguoimuadangky, matkhaudangky}
    try {
        const res = await axios.post("http://localhost:3001/api/auth/register", user);
        console.log("Thực hiện register, gửi đến api: ", res);
        //Đăng ký thành công thì tự đăng nhập vào
        login(dispatch,{emailnguoimua: user.emailnguoimuadangky, matkhau: user.matkhaudangky});
    } catch(err) {
        console.log("Lỗi đăng ký ",err);
        user.setWrong(true);
    }
}

// Hàm đăng nhập
export const login = async (dispatch, user) => {
    // user gồm username, mật khẩu
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:3001/api/auth/login", user, {withCredentials: true});
        dispatch(loginSuccess(res.data));

        // Logout sau 1 khoảng time trước khi Cookie hết hạn (900000000mili giây)
        const resNguoiMua = await axios.get("http://localhost:3001/api/user/findByEmailNguoiMua/" + user.emailnguoimua);
        const nguoimua = resNguoiMua.data[0];
        setTimeout(() => {
            console.log("ccc123;");
            logout(dispatch, nguoimua);
        }, 800000000)
    }catch(err) {
        dispatch(loginFailure());
    }
}

// Hàm đăng xuất
export const logout = async (dispatch, user) => {
    // User gồm: đối tượng user ở UserRedux
    console.log("USER: ",user);
    const res = await axios.post("http://localhost:3001/api/auth/logout", {manguoimua: user.manguoimua}, {withCredentials: true});
    dispatch(logoutCart()); //Khởi tạo lại người dùng
    dispatch(logoutUser()); //Khởi tạo lại giỏ hàng
}