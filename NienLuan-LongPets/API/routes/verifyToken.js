const con = require("../config/database.config");

// Xác minh người mua: Nếu đúng thì tiếp tục xử lý & người mua trả về ở req.user 
// -(Đính thêm vào req một thuộc tính user chứa user đã được xác minh ở token & cookie)
const verifyUserToken = (req, res, next) => {
    const userToken = req.cookies.userToken;
    var sql = "select * from Tokens t join nguoimua n on t.manguoimua=n.manguoimua where t.token = ?";
    con.query(sql, [userToken], function (err, result) {
        if (err) {
            res.status(403).json("Token không đúng!");
        } else {
            if(result.length !== 0) {
                var sql1 = "select * from nguoimua where manguoimua = ?";
                con.query(sql1, [result[0].manguoimua], function(err, result1) {
                    if (err) {
                        res.status(404).json("Không tìm thấy người mua có token này!");
                    }else {
                        req.user = result1[0];
                        next();
                    }
                })
            } else {
                res.status(405).json("Xác minh thất bại!");
            }
        }
    })
}

// Xác minh user trong Token-cookie và Xác thực người dùng thực hiện hành động
const verifyUserTokenAndAuthorization = (req, res, next) => {
    verifyUserToken(req, res, () => {
        console.log("Veri&Authen: ", req.user.manguoimua, req.params.manguoimua)
        if(req.user.manguoimua === parseInt(req.params.manguoimua)) {
            next();
        } else {
            res.status(403).json("Bạn không có quyền thực hiện hành động này!");
        }
    });
};

// ======================= ADMIN ====================
// Xác minh người mua: Nếu đúng thì tiếp tục xử lý & người mua trả về ở req.user 
// -(Đính thêm vào req một thuộc tính user chứa user đã được xác minh ở token & cookie)
const verifyAdminToken = (req, res, next) => {
    const adminToken = req.cookies.adminToken;
    var sql = "select * from nhanvien_tokens t join nhanvien n on t.manhanvien=n.manhanvien where t.token = ?";
    con.query(sql, [adminToken], function (err, result) {
        if (err) {
            res.status(403).json("Token không đúng!");
        } else {
            if(result.length !== 0) {
                var sql1 = "select * from nhanvien where manhanvien = ?";
                con.query(sql1, [result[0].manhanvien], function(err, result1) {
                    if (err) {
                        res.status(404).json("Không tìm thấy nhân viên có token này!");
                    }else {
                        req.admin = result1[0];
                        next();
                    }
                })
            } else {
                res.status(405).json("Xác minh nhân viên thất bại!");
            }
        }
    })
}

// const verifyAdminToken = (req, res, next) => {
//     const adminToken = req.cookies.userToken;
//     var sql = "select * from nhanvien_tokens t join nhanvien n on t.manhanvien=n.manhanvien where t.token = ?";
//     con.query(sql, [adminToken], function (err, result) {
//         if (err) {
//             res.status(403).json("Token không đúng!");
//         } else {
//             if(result.length !== 0) {
//                 next();
//             } else {
//                 res.status(403).json("Xác minh thất bại!");
//             }
//         }
//     })
// }

// function getUserToken() {
// 	if(isset($_SESSION['nguoimua'])) {
// 		$nguoimua = $_SESSION['nguoimua'];
// 		if(isset($nguoimua['maquyentruycap']) and $nguoimua['maquyentruycap'] == 2){
// 			return $_SESSION['nguoimua'];
// 		}
// 	}
// 	$token = getCookie('tokenUser');
// 	$sql = "select * from Tokens t join nguoimua n on t.manguoimua=n.manguoimua where t.token = '$token' and n.maquyentruycap = '2'";
// 	$item = executeResult($sql, true);
// 	if($item != null) {
// 		$manguoimua = $item['manguoimua'];
// 		$sql = "select * from nguoimua where manguoimua = '$manguoimua'";
// 		$item = executeResult($sql, true);
// 		if($item != null) {
// 			$_SESSION['nguoimua'] = $item;
// 			return $item;
// 		}
// 	}
// 	return null;
// }

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.token;
//     if(authHeader) {
//         const token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//             if(err) {
//                 res.status(403).json("Token không đúng!");
//             } else {
//                 req.user = user;
//                 next();
//             }
//         });
//     } else {
//         return res.status(401).json("Xác thực không thành công!");
//     }
// };

// const verifyTokenAndAuthorization = (req, res, next) => {
//     verifyToken(req, res, () => {
//         if(req.user.id === req.params.id || req.user.isAdmin){
//             next();
//         } else {
//             res.status(403).json("Bạn không có quyền cho phép!");
//         }
//     })
// };

// const verifyTokenAndAdmin = (req, res, next) => {
//     verifyToken(req, res, () => {
//         if(req.user.isAdmin){
//             next();
//         } else {
//             res.status(403).json("Bạn không có quyền cho phép!");
//         }
//     })
// };

module.exports = { verifyUserToken, verifyAdminToken, verifyUserTokenAndAuthorization };

