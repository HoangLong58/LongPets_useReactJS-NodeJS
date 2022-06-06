const router = require("express").Router();
const con = require("../config/database.config");
const CryptoJS = require("crypto-js");  //Thư viện mã hóa mật khẩu
const { verifyUserToken, verifyUserTokenAndAuthorization, verifyAdminToken } = require("./verifyToken");

// Đăng ký
router.post("/register", (req, res) => {
  if(req.body.tennguoimuadangky == "" || req.body.emailnguoimua == "" || req.body.matkhaudangky == "")
    res.status(500).json("Thông tin không hợp lệ");
  else {
    // Kiếm tra trong CSDL
    con.query("SELECT emailnguoimua FROM nguoimua where emailnguoimua = ?", [req.body.emailnguoimuadangky], function (err, result, fields) {
      if (err) throw err;
      // Nếu chưa có email này
      if(result.length === 0) {
        console.log("Chưa có email này");
        var sql1 = "insert into nguoimua (hotennguoimua, maxa, emailnguoimua, matkhau) values (?, '00001', ?, ?)";
        con.query(sql1, [req.body.tennguoimuadangky, req.body.emailnguoimuadangky, CryptoJS.AES.encrypt(req.body.matkhaudangky, process.env.PRIVATE_KEY).toString()], function (err, result1) {
          if (err) throw err;
          var sql2 = "select * from nguoimua where emailnguoimua = ?";
          con.query(sql2, [req.body.emailnguoimuadangky], function (err, result2) {
            if (err) throw err;
            res.status(201).json({...result2[0], message: "Đăng ký thành công"});
            console.log("1 record inserted");
          })
        });
      } else {
        // Nếu có email
        res.status(500).json( "Email đã tồn tại");
        console.log("Đã có email "+ result[0].emailnguoimua +" trong CSDL");
      }
    });
  }
});

//Đăng nhập
router.post("/login", (req, res) => { 
  var sql1 = "select * from nguoimua n join xaphuongthitran x on n.maxa = x.maxa join quanhuyen q on x.maquanhuyen = q.maquanhuyen join tinhthanhpho t on q.mathanhpho = t.mathanhpho where n.emailnguoimua = ?";
  con.query(sql1, [req.body.emailnguoimua], function (err, result1) {
    if(err) throw err;
    // Nếu có email này
    if(result1.length !== 0) {
      // Giải mã mật khẩu trong CSDL để so sánh với mật khẩu được nhập
      const hashedPassword = CryptoJS.AES.decrypt(
        result1[0].matkhau, 
        process.env.PRIVATE_KEY
      );
      const matkhau = hashedPassword.toString(CryptoJS.enc.Utf8);
      // So sánh mật khẩu
      if(req.body.matkhau === matkhau) {
        // Token được tạo bằng cách Băm email người mua & PRIVATE_KEY
        // const usertoken = CryptoJS.AES.encrypt(req.body.emailnguoimua, process.env.PRIVATE_KEY).toString();
        // console.log(usertoken);

        res.cookie('userToken', result1[0].manguoimua + "123", { expires: new Date(Date.now() + 900000000)});
        var sql2 = "select * from tokens where manguoimua = ?";
        con.query(sql2, [result1[0].manguoimua], function (err, result2) {
          if (err) throw err;
          // Nếu trong token chưa có manguoimua này thì thêm vào
          if(result2.length === 0) {
            var sql3 = "insert into tokens (manguoimua, token, created_at) values (?, ?, ?)";
            var today = new Date();
            con.query(sql3, [result1[0].manguoimua, result1[0].manguoimua + "123", today], function (err, result) {
              if (err) throw err;
              console.log("Thêm token thành công");
            });
          }else {
            console.log("Token đã tồn tại");
          }
        });
        res.status(201).json(result1[0]);
      }else {
        res.status(401).json("Mật khẩu không đúng!");
      }
    }else {
      res.status(401).json("Email chưa được đăng ký");
    }
  });
});

// Đăng xuất
// Xác minh người mua trước khi logout.
// Nếu người mua lấy từ token-cookie trùng với người mua gửi yêu cầu logout thì cho logout
// LOGOUT: Xóa token-cookie trong CDSDL, Xóa cookie browser;
router.post("/logout", verifyUserToken, (req, res) => {
  const manguoimua = req.body.manguoimua;
  const token = req.cookies.userToken;
  var sql = "delete from tokens where manguoimua = ? and token = ?";
  con.query(sql, [manguoimua, token], function (err, result) {
    if(err) console.log(err);
    console.log("Logout thanhcong roi nhe");
  })
  res.cookie('userToken', '', { expires: new Date(0) });

  res.json("Logout thanh cong");
  console.log("MaNguoimua: ",req.body.manguoimua);
  console.log("Token: ",req.cookies.userToken);

})

// TEST
router.get("/delete/:manguoimua", verifyUserTokenAndAuthorization, (req, res) => {
  res.status(201).json("Xac minh duoc roi ne");
  // res.json(req);
});

// ---------------------------Đăng nhập Admin------------------------------------------
// router.post("/loginadmin", (req, res) => { 
//   var sql1 = "select * from nhanvien where emailnhanvien = ?";
//   con.query(sql1, [req.body.emailnhanvien], function (err, result1) {
//     if(err) throw err;
//     // Nếu có email này
//     if(result1.length !== 0) {
//       // Giải mã mật khẩu trong CSDL để so sánh với mật khẩu được nhập
//       const hashedPassword = CryptoJS.AES.decrypt(
//         result1[0].matkhau, 
//         process.env.PRIVATE_KEY
//       );
//       const matkhau = hashedPassword.toString(CryptoJS.enc.Utf8);
//       // So sánh mật khẩu
//       if(req.body.matkhau === matkhau) {
        
//         // Token được tạo bằng cách Băm email người mua & PRIVATE_KEY
//         // const usertoken = CryptoJS.AES.encrypt(req.body.emailnguoimua, process.env.PRIVATE_KEY).toString();
//         // console.log(usertoken);

//         res.cookie('adminToken', result1[0].manhanvien + "345", { expires: new Date(Date.now() + 900000)});
//         var sql2 = "select * from nhanvien_tokens where manhanvien = ?";
//         con.query(sql2, [result1[0].manhanvien], function (err, result2) {
//           if (err) throw err;
//           // Nếu trong nhanvien_tokens chưa có manhanvien này thì thêm vào
//           if(result2.length === 0) {
//             var sql3 = "insert into nhanvien_tokens (manhanvien, token, created_at) values (?, ?, ?)";
//             var today = new Date();
//             con.query(sql3, [result1[0].manhanvien, result1[0].manhanvien + "345", today], function (err, result) {
//               if (err) throw err;
//               console.log("Thêm token thành công");
//             });
//           }else {
//             console.log("Token đã tồn tại");
//           }
//         });
//         res.status(201).json(result1[0].emailnhanvien + " đăng nhập thành công!");
//       }else {
//         res.status(401).json("Mật khẩu không đúng!");
//       }
//     }else {
//       res.status(401).json("Email chưa được đăng ký");
//     }
//   });
// });

router.post("/loginadmin", (req, res) => { 
  var sql1 = "select * from nhanvien where emailnhanvien = ?";
  con.query(sql1, [req.body.emailnhanvien], function (err, result1) {
    if(err) throw err;
    // Nếu có email này
    if(result1.length !== 0) {
      // Giải mã mật khẩu trong CSDL để so sánh với mật khẩu được nhập
      const hashedPassword = CryptoJS.AES.decrypt(
        result1[0].matkhau, 
        process.env.PRIVATE_KEY
      );
      const matkhau = hashedPassword.toString(CryptoJS.enc.Utf8);
      // So sánh mật khẩu
      if(req.body.matkhau === matkhau) {
        // Token được tạo bằng cách Băm email người mua & PRIVATE_KEY
        // const usertoken = CryptoJS.AES.encrypt(req.body.emailnguoimua, process.env.PRIVATE_KEY).toString();
        // console.log(usertoken);

        res.cookie('adminToken', result1[0].manhanvien + "123", { expires: new Date(Date.now() + 900000000)});
        var sql2 = "select * from nhanvien_tokens where manhanvien = ?";
        con.query(sql2, [result1[0].manhanvien], function (err, result2) {
          if (err) throw err;
          // Nếu trong token chưa có manguoimua này thì thêm vào
          if(result2.length === 0) {
            var sql3 = "insert into nhanvien_tokens (manhanvien, token, created_at) values (?, ?, ?)";
            var today = new Date();
            con.query(sql3, [result1[0].manhanvien, result1[0].manhanvien + "123", today], function (err, result) {
              if (err) throw err;
              console.log("Thêm nhân viên token thành công");
            });
          }else {
            console.log("Nhân viên Token đã tồn tại");
          }
        });
        res.status(201).json(result1[0]);
      }else {
        res.status(401).json("Mật khẩu không đúng!");
      }
    }else {
      res.status(401).json("Email chưa được đăng ký");
    }
  });
});

// Đăng ký admin
router.post("/registeradmin", (req, res) => {
  console.log("Admin đăng ký");
  if(req.body.hotennhanvien == "" || req.body.emailnguoimua == "" || req.body.matkhau == "")
    res.status(500).json("Thông tin không hợp lệ");
  else {
    // Kiếm tra trong CSDL
    con.query("SELECT emailnhanvien FROM nhanvien where emailnhanvien = ?", [req.body.emailnhanvien], function (err, result, fields) {
      if (err) throw err;
      // Nếu chưa có email này
      if(result.length === 0) {
        console.log("Chưa có email nhân viên này");
        var sql1 = "insert into nhanvien (machucvu, hotennhanvien, maxa, emailnhanvien, matkhau) values ('1', ?, '00001', ?, ?)";
        con.query(sql1, [req.body.hotennhanvien, req.body.emailnhanvien, CryptoJS.AES.encrypt(req.body.matkhau, process.env.PRIVATE_KEY).toString()], function (err, result1) {
          if (err) throw err;
          var sql2 = "select * from nhanvien where emailnhanvien = ?";
          con.query(sql2, [req.body.emailnhanvien], function (err, result2) {
            if (err) throw err;
            res.status(201).json({...result2[0], message: "Đăng ký thành công"});
            console.log("1 record inserted");
          })
        });
      } else {
        // Nếu có email
        res.status(500).json( "Email nhân viên đã tồn tại");
        console.log("Đã có email "+ result[0].emailnhanvien +" trong CSDL Nhân viên");
      }
    });
  }
});

// Đăng xuất Admin
// Xác minh người mua trước khi logout.
// Nếu người mua lấy từ token-cookie trùng với người mua gửi yêu cầu logout thì cho logout
// LOGOUT: Xóa token-cookie trong CDSDL, Xóa cookie browser;
router.post("/logoutadmin", verifyAdminToken, (req, res) => {
  const manhanvien = req.body.manhanvien;
  const token = req.cookies.adminToken;
  var sql = "delete from nhanvien_tokens where manhanvien = ? and token = ?";
  con.query(sql, [manhanvien, token], function (err, result) {
    if(err) console.log(err);
    console.log("Logout thanhcong roi nhe");
  })
  res.cookie('adminToken', '', { expires: new Date(0) });

  res.json("Nhan vien logout thanh cong");
  console.log("Ma nhan vien: ",req.body.manhanvien);
  console.log("Token: ",req.cookies.adminToken);

})

module.exports = router;