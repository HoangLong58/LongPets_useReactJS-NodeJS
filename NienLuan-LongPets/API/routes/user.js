const router = require("express").Router();
const con = require("../config/database.config");
const { verifyUserToken } = require("./verifyToken");
const CryptoJS = require("crypto-js");  //Thư viện mã hóa mật khẩu

// ===================== User =====================
//LẤY KHÁCH HÀNG
router.post("/getKhachHang", async (req, res) => {
    const sql = "select * from nguoimua where manguoimua != 0";
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("LẤY KHÁCH HÀNG-success!");
    })
})

//TÌM KIẾM KHÁCH HÀNG
router.post("/findKhachHang", async (req, res) => {
    const sql = "select * from nguoimua where hotennguoimua like concat('%', ?, '%') && manguoimua != 0";
    con.query(sql, [req.body.hotennguoimua], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Tìm kiếm TÊN KHÁCH HÀNG " +req.body.hotennguoimua+ " -success!", result);
    })
})

// LẤY SỐ LƯỢNG KHÁCH HÀNG
router.post("/getSoLuongKhachHang", async (req, res) => {
    const sql = "select count(manguoimua) as soluongkhachhang from nguoimua where manguoimua != 0;";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Lỗi lấy số lượng khách hàng: ", err);
        }else {
            res.status(200).json(result);
            console.log("Lấy số lượng khách hàng thành công");
        }
    })
})

// XÓA KHÁCH HÀNG
router.post("/deleteKhachHang", (req, res) => {
    const sql = "delete from nguoimua where manguoimua = ?;";
    con.query(sql, [req.body.manguoimua], (err, result) => {
        if (err) {
            console.log("Lỗi khi xóa người mua: ", err);
        } else {
            res.status(200).json(result);
            console.log("Xóa người mua có mã là ", req.body.manguoimua + " thành công!");
        }
    })
})


// UPDATE
router.put("/:id", async (req, res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PRIVATE_KEY
        ).toString();
    }
        
    // Tìm bằng id rồi update  
    const manguoimua = req.params.id; 
    var sql = "update nguoimua set maxa = '$phuongxa', hotennguoimua = '$hoten', ngaysinhnguoimua = '$ngaysinh', gioitinhnguoimua = '$gioitinh', sdtnguoimua = '$sodienthoai', diachinguoimua = '$diachi' where manguoimua = '$manguoimua'";
    con.query(sql, [
        req.body.maxa, 
        req.body.hotennguoimua, 
        req.body.ngaysinhnguoimua, 
        req.body.gioitinhnguoimua, 
        req.body.sdtnguoimua, 
        req.body.diachinguoimua, 
        manguoimua
    ], function(err, result) {
        if(err) res.status(403).json("Cập nhật thất bại");
        res.status(200).json("Cập nhật thành công");
    });
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        // Tìm bằng id rồi xóa
    } catch(err) {
        res.status(500).json(err);
    }
});

// CẬP NHẬT THÔNG TIN NGƯỜI MUA - check sdtnguoimua
router.post("/checkSdtNguoiMua", (req, res) => {
    const sql = "select * from nguoimua where manguoimua != 0 && manguoimua != ? && sdtnguoimua = ?;";
    con.query(sql, [req.body.manguoimua, req.body.sdtnguoimua], (err, result) => {
        if (err) {
            console.log("Lấy sdt người mua thất bại: ", err);
        } else {
            if(result.length == 0) {
                res.status(200).json({message: "Chưa có sdt người mua này!"});
                console.log("Lấy sdt người mua thành công", result);
            } else {
                res.status(200).json({message: "Sdt đã tồn tại"});
            }
        }
    })
})
// CẬP NHẬT THÔNG TIN NGƯỜI MUA - UPDATE
router.post("/updateNguoiMua", (req, res) => {
    const sql = "update nguoimua set maxa = ?, hotennguoimua = ?, ngaysinhnguoimua = ?, gioitinhnguoimua = ?, sdtnguoimua = ?, diachinguoimua = ?, hinhdaidien = ? where manguoimua = ?;";
    con.query(sql, [req.body.maxa, req.body.hotennguoimua, req.body.ngaysinhnguoimua, req.body.gioitinhnguoimua, req.body.sdtnguoimua, req.body.diachinguoimua, req.body.hinhdaidien, req.body.manguoimua], (err, result) => {
        if (err) {
            console.log("Lỗi lấy Cập nhật người mua: ", err);
        }else {
            res.status(200).json({message: "Cập nhật thông tin thành công"});
            console.log("Cập nhật người mua thành công");
        }
    })
})

// Lấy thông tin khách hàng bằng mã
router.post("/findNguoiMua", (req, res) => {
    const sql = "select * from nguoimua n join xaphuongthitran x on n.maxa = x.maxa join quanhuyen q on x.maquanhuyen = q.maquanhuyen join tinhthanhpho t on q.mathanhpho = t.mathanhpho where n.manguoimua = ?;";
    con.query(sql, [req.body.manguoimua], (err, result) => {
        if (err) {
            console.log("Lỗi lấy người mua: ", err);
        }else {
            res.status(200).json(result[0]);
            console.log("Lấy người mua thành công");
        }
    })
})

// Lấy xã phường thị trấn từ mã xã
router.post("/getXaPhuongThanhPho", (req, res) => {
    const sql = "select * from xaphuongthitran x join quanhuyen q on x.maquanhuyen = q.maquanhuyen join tinhthanhpho t on q.mathanhpho = t.mathanhpho where x.maxa = ?";
    con.query(sql, [req.body.maxa], (err, result) => {
        if (err) {
            console.log("Lỗi Lấy xã phường thị trấn từ mã xã: ", err);
        }else {
            res.status(200).json(result[0]);
            console.log("Lấy xã phường thị trấn từ mã xã thành công");
        }
    })
})
// ============================ NHÂN VIÊN =================================
//LẤY NHÂN VIÊN
router.post("/getNhanVien", async (req, res) => {
    const sql = "select * from nhanvien n join chucvunhanvien c  on n.machucvu = c.machucvu join xaphuongthitran x on n.maxa = x.maxa join quanhuyen q on q.maquanhuyen = x.maquanhuyen join tinhthanhpho t on t.mathanhpho = q.mathanhpho where n.machucvu != 5 && n.manhanvien != 0;";
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("LẤY NHÂN VIÊN-success!");
    })
})

//TÌM KIẾM NHÂN VIÊN
router.post("/findNhanVien", async (req, res) => {
    const sql = "select * from nhanvien n join chucvunhanvien c on n.machucvu = c.machucvu join xaphuongthitran x on n.maxa = x.maxa join quanhuyen q on q.maquanhuyen = x.maquanhuyen join tinhthanhpho t on t.mathanhpho = q.mathanhpho where n.hotennhanvien like concat('%', ?, '%') && n.manhanvien != 0 && n.machucvu != 5";
    con.query(sql, [req.body.hotennhanvien], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Tìm kiếm TÊN NHÂN VIÊN " +req.body.hotennhanvien+ " -success!", result);
    })
})

//TÌM KIẾM NHÂN VIÊN BẰNG ID
router.post("/findNhanVienById", async (req, res) => {
    const sql = "select * from nhanvien n join chucvunhanvien c on n.machucvu = c.machucvu join xaphuongthitran x on n.maxa = x.maxa join quanhuyen q on q.maquanhuyen = x.maquanhuyen join tinhthanhpho t on t.mathanhpho = q.mathanhpho where n.manhanvien = ? && n.manhanvien != 0 && n.machucvu != 5";
    con.query(sql, [req.body.manhanvien], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Tìm kiếm TÊN NHÂN VIÊN bằng ID " +req.body.manhanvien+ " -success!", result);
    })
})

// LẤY SỐ LƯỢNG NHÂN VIÊN
router.post("/getSoLuongNhanVien", async (req, res) => {
    const sql = "select count(n.manhanvien) as soluongnhanvien from nhanvien n join chucvunhanvien c on n.machucvu = c.machucvu where n.manhanvien != 0 && n.machucvu != 5;";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Lỗi lấy số lượng nhân viên: ", err);
        }else {
            res.status(200).json(result);
            console.log("Lấy số lượng nhân viên thành công");
        }
    })
})

// LẤY CHỨC VỤ NHÂN VIÊN
router.post("/getChucVu", async (req, res) => {
    const sql = "select * from chucvunhanvien where machucvu != 5;";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Lỗi lấy chức vụ nhân viên: ", err);
        }else {
            res.status(200).json(result);
            console.log("Lấy chức vụ nhân viên thành công");
        }
    })
})

// LẤY THÀNH PHỐ
router.post("/getTinhThanhPho", (req, res) => {
    const sql = "select * from tinhthanhpho;";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Lỗi khi lấy Thành phố: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy Thành phố thành công");
        }
    })
})

// LẤY QUẬN HUYỆN
router.post("/getQuanHuyen", (req, res) => {
    const sql = "select * from quanhuyen where mathanhpho = ?;";
    con.query(sql, [req.body.mathanhpho], (err, result) => {
        if (err) {
            console.log("Lỗi khi lấy quận huyện từ mã thành phố: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy quận huyện thành công");
        }
    })
})

// LẤY XÃ PHƯỜNG THỊ TRẤN
router.post("/getXaPhuongThiTran", (req, res) => {
    const sql = "select * from xaphuongthitran where maquanhuyen = ?;";
    con.query(sql, [req.body.maquanhuyen], (err, result) => {
        if (err) {
            console.log("Lỗi khi lấy xã phường từ quận huyện: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy xã phường thành công");
        }
    })
})
// LẤY XÃ PHƯỜNG THỊ TRẤN
router.post("/getXaPhuongThiTran", (req, res) => {
    const sql = "select * from xaphuongthitran where maquanhuyen = ?;";
    con.query(sql, [req.body.maquanhuyen], (err, result) => {
        if (err) {
            console.log("Lỗi khi lấy xã phường từ quận huyện: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy xã phường thành công");
        }
    })
})

// THÊM NHÂN VIÊN
router.post("/insertNhanVien", (req, res) => {
    if(req.body.matkhau) {
        req.body.matkhau = CryptoJS.AES.encrypt(
            req.body.matkhau,
            process.env.PRIVATE_KEY
        ).toString();
    }
    const sql = "insert into nhanvien (machucvu, maxa, emailnhanvien, matkhau, hotennhanvien, ngaysinhnhanvien, gioitinhnhanvien, sdtnhanvien, diachinhanvien, hinhdaidiennhanvien) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    con.query(sql, [req.body.machucvu, req.body.maxa, req.body.emailnhanvien, req.body.matkhau, req.body.hotennhanvien, req.body.ngaysinhnhanvien, req.body.gioitinhnhanvien, req.body.sdtnhanvien, req.body.diachinhanvien, req.body.hinhdaidiennhanvien], (err, result) => {
        if (err) {
            console.log("Thêm nhân viên thất bại: ", err);
        } else {
            res.status(200).json(result);
            console.log("Thêm nhân viên mới thành công");
        }
    })
})

// CHECK EMAILNHANVIEN VA SDTNHANVIEN
router.post("/checkEmailNhanVien", (req, res) => {
    const sql = "select * from nhanvien where machucvu != 5 & manhanvien != 0 && emailnhanvien = ?;";
    con.query(sql, [req.body.emailnhanvien], (err, result) => {
        if (err) {
            console.log("Lấy email nhân viên thất bại: ", err);
        } else {
            if(result.length == 0) {
                res.status(200).json({message: "Chưa có email nhân viên này!"});
                console.log("Lấy email nhân viên thành công", result);
            } else {
                res.status(200).json({message: "Email đã tồn tại"});
            }
        }
    })
})
router.post("/checkSdtNhanVien", (req, res) => {
    const sql = "select * from nhanvien where machucvu != 5 & manhanvien != 0 && sdtnhanvien = ?;";
    con.query(sql, [req.body.sdtnhanvien], (err, result) => {
        if (err) {
            console.log("Lấy sdt nhân viên thất bại: ", err);
        } else {
            if(result.length == 0) {
                res.status(200).json({message: "Chưa có sdt nhân viên này!"});
                console.log("Lấy sdt nhân viên thành công", result);
            } else {
                res.status(200).json({message: "Sdt đã tồn tại"});
            }
        }
    })
})

// Check sdt nhân viên update này có trùng với số đã đăng ký của nhân viên khác
router.post("/checkSdtNhanVienUpdate", (req, res) => {
    const sql = "select * from nhanvien where machucvu != 5 & manhanvien != 0 && sdtnhanvien = ? && manhanvien != ?;";
    con.query(sql, [req.body.sdtnhanvien, req.body.manhanvien], (err, result) => {
        if (err) {
            console.log("Lấy sdt nhân viên thất bại: ", err);
        } else {
            if(result.length == 0) {
                res.status(200).json({message: "Chưa có sdt nhân viên này!"});
                console.log("Lấy sdt nhân viên thành công", result);
            } else {
                res.status(200).json({message: "Sdt đã tồn tại"});
            }
        }
    })
})

// CẬP NHẬT NHÂN VIÊN
router.post("/updateNhanVien", (req, res) => {
    if(req.body.matkhaumoi) {
        req.body.matkhaumoi = CryptoJS.AES.encrypt(
            req.body.matkhaumoi,
            process.env.PRIVATE_KEY
        ).toString();
    }
    const sql = "update nhanvien set machucvu = ?, maxa = ?, matkhau = ?, hotennhanvien = ?, ngaysinhnhanvien = ?, gioitinhnhanvien = ?, sdtnhanvien = ?, diachinhanvien = ?, hinhdaidiennhanvien = ? where manhanvien = ?;";
    con.query(sql, [req.body.machucvumoi, req.body.maxamoi, req.body.matkhaumoi, req.body.hotennhanvienmoi, req.body.ngaysinhnhanvienmoi, req.body.gioitinhnhanvienmoi, req.body.sdtnhanvienmoi, req.body.diachinhanvienmoi, req.body.hinhdaidiennhanvienmoi, req.body.manhanvien], (err, result) => {
        if (err) {
            console.log("Lỗi cập nhật nhân viên: ", err);
        } else {
            res.status(200).json(result);
            console.log("Cập nhật nhân viên thành công");
        }
    })
})

// DELETE NHÂN VIÊN
router.post("/deleteNhanVien", (req, res) => {
    const sql = "delete from nhanvien where manhanvien = ?;";
    con.query(sql, [req.body.manhanvien], (err, result) => {
        if (err) {
            console.log("Lỗi xóa nhân viên: ", err);
        } else {
            res.status(200).json(result);
            console.log("Xóa nhân viên thành công");
        }
    })
})

// Lấy admin log
router.post("/getAdminLog", (req, res) => {
    const sql = "SELECT * FROM adminlog order by malog desc LIMIT 3;";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Lỗi lấy adminlog: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy adminlog thành công");
        }
    })
})



// ===============================================================================================

// GET USER - Oke
router.get("/find/:id", verifyUserToken, async (req, res) => {
    const manguoimua = req.params.id;
    var sql = "select * from nguoimua where manguoimua = ?";
    con.query(sql, [manguoimua], function (err, result) {
    if (err) res.status(403).json("Không có mã người mua này!");
    res.status(200).json(result);
    })
});

// GET USER by emailnguoimua - Oke - setTimeOut-LogOut
router.get("/findByEmailNguoiMua/:emailnguoimua", async (req, res) => {
    const emailnguoimua = req.params.emailnguoimua;
    var sql = "select * from nguoimua where emailnguoimua = ?";
    con.query(sql, [emailnguoimua], function (err, result) {
    if (err) res.status(403).json("Không có email người mua này!");
    res.status(200).json(result);
    })
});

// ===================================== NHÂN VIÊN ===========================================
// GET NHANVIEN by emailnguoimua - Oke - setTimeOut-LogOut
router.get("/findByEmailNhanVien/:emailnhanvien", async (req, res) => {
    const emailnhanvien = req.params.emailnhanvien;
    var sql = "select * from nhanvien where emailnhanvien = ?";
    con.query(sql, [emailnhanvien], function (err, result) {
    if (err) res.status(403).json("Không có email của nhân viên này!");
    res.status(200).json(result);
    })
});


module.exports = router;
