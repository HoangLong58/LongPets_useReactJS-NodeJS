const router = require("express").Router();
const con = require("../config/database.config");
const { verifyUserToken } = require("./verifyToken");

//LẤY DANH MỤC
router.post("/getDanhMuc", async (req, res) => {
    const sql = "select * from danhmuc";
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("LẤY DANH MỤC-success!");
    })
})

//LẤY THÚ CƯNG THEO DANH MỤC
router.get("/madanhmuc=:madanhmuc", async (req, res) => {
    const madanhmuc = req.params.madanhmuc;
    const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc join hinhanh a on t.mathucung = a.mathucung where d.madanhmuc = ? group by t.mathucung";
    con.query(sql, [madanhmuc], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("LẤY THÚ CƯNG THEO DANH MỤC-success!");
    })
})

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    const mathucung = req.params.id;
    // const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc join hinhanh a on t.mathucung = a.mathucung where t.mathucung = ?";
    const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc where t.mathucung = ?";
    con.query(sql, [mathucung], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Lấy thucung từ mathucung");
    })
})

//GET ALL IMAGE PRODUCT
router.post("/findImage", async (req, res) => {
    const sql = "select a.hinhanh from thucung t join hinhanh a on t.mathucung = a.mathucung where t.mathucung = ?";
    con.query(sql, [req.body.mathucung], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Lấy hình ảnh từ mathucung", result);
    })
})


// //GET 1 IMAGE PRODUCT
// router.get("/findImage/:id", async (req, res) => {
    //     const mathucung = req.params.id;
    //     const sql = "select a.hinhanh from thucung t join hinhanh a on t.mathucung = a.mathucung where t.mathucung = ?";
    //     con.query(sql, [mathucung], (err, result) => {
        //         if(err) throw err;
        //         res.status(200).json(result);
        //         console.log("cc2");
        //     })
        // })
        
        
// =================================== ADMIN ====================================
// ============================== Quản lý thú cưng ==============================
//LẤY SỐ LƯỢNG DANH MỤC
router.get("/getSoLuongDanhMuc", async (req, res) => {
    const sql = "select count(madanhmuc) as soluongdanhmuc from danhmuc";
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("LẤY số lượng DANH MỤC-success!");
    })
})

//TÌM KIẾM DANH MỤC
router.post("/findDanhMuc", async (req, res) => {
    const sql = "select * from danhmuc where tendanhmuc like concat('%', ?, '%')";
    con.query(sql, [req.body.tendanhmuc], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Tìm kiếm TÊN DANH MỤC " +req.body.tendanhmuc+ " -success!", result);
    })
})

//TÌM KIẾM DANH MỤC bằng ID
router.post("/findDanhMucById", async (req, res) => {
    const sql = "select * from danhmuc where madanhmuc = ?";
    con.query(sql, [req.body.madanhmuc], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Tìm kiếm TÊN DANH MỤC by ID " +req.body.madanhmuc+ " -success!", result);
    })
})

//TÌM KIẾM DANH MỤC bằng tendanhmuc
router.post("/findDanhMucByTen", async (req, res) => {
    const sql = "select * from danhmuc where tendanhmuc = ?";
    con.query(sql, [req.body.tendanhmucmoi], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Tìm kiếm TÊN DANH MỤC by Ten " +req.body.tendanhmucmoi+ " -success!", result);
    })
})

// Cập nhật danh mục
router.post("/updateDanhMuc", async (req, res) => {
    console.log(req.body.tendanhmucmoi, req.body.tieudedanhmucmoi, req.body.hinhanhdanhmucmoi, req.body.madanhmuc);
    const sql = "update danhmuc set tendanhmuc = ?, tieudedanhmuc = ?, hinhanhdanhmuc = ? where madanhmuc = ?";
    con.query(sql, [req.body.tendanhmucmoi, req.body.tieudedanhmucmoi, req.body.hinhanhdanhmucmoi, req.body.madanhmuc], (err, result) => {
        if(err) throw err;
        res.status(200).json({message: "Cập nhật danh mục thành công"});
        console.log("Cập nhật danh mục thành công");
    })
})

// Thêm danh mục
router.post("/insertDanhMuc", async (req, res) => {
    console.log(req.body.tendanhmucmoi);
    const sql = "insert into danhmuc (tendanhmuc, tieudedanhmuc, hinhanhdanhmuc) values (?, ?, ?);";
    con.query(sql, [req.body.tendanhmucmoi, req.body.tentieudemoi, req.body.linkhinhanh], (err, result) => {
        if(err) throw err;
        res.status(200).json({message: "Thêm danh mục thành công"});
        console.log("Thêm danh mục "+req.body.tendanhmucmoi+" thành công");
    })
})

// Xóa danh mục
router.post("/deleteDanhMuc", async (req, res) => {
    console.log(req.body.madanhmuc);
    const sql = "delete from danhmuc where madanhmuc = ?;";
    con.query(sql, [req.body.madanhmuc], (err, result) => {
        if(err) throw err;
        res.status(200).json({message: "Xóa danh mục thành công"});
        console.log("Xóa danh mục "+req.body.madanhmuc+" thành công");
    })
})

// ============================== Quản lý thú cưng ==============================
//LẤY THÚ CƯNG
router.post("/getThuCung", async (req, res) => {
    const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc join hinhanh a on t.mathucung = a.mathucung group by t.mathucung";
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("LẤY THÚ CƯNG-success!");
    })
})

//LẤY SỐ LƯỢNG THÚ CƯNG
router.get("/getSoLuongThuCung", async (req, res) => {
    const sql = "select count(mathucung) as soluongthucung from thucung";
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("LẤY số lượng THÚ CƯNG-success!");
    })
})

//TÌM KIẾM THÚ CƯNG
router.post("/findThuCung", async (req, res) => {
    const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc join hinhanh a on t.mathucung = a.mathucung where t.tenthucung like concat('%', ?, '%') group by t.mathucung";
    con.query(sql, [req.body.tenthucung], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Tìm kiếm TÊN THÚ CƯNG " +req.body.tenthucung+ " -success!", result);
    })
})

//TÌM KIẾM THÚ CƯNG bằng ID
router.post("/findThuCungById", async (req, res) => {
    const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc join hinhanh a on t.mathucung = a.mathucung where t.mathucung = ? group by t.mathucung";
    con.query(sql, [req.body.mathucung], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Tìm kiếm TÊN THÚ CƯNG by ID " +req.body.mathucung+ " -success!", result);
    })
})

//TÌM KIẾM THÚ CƯNG bằng tenthucung
router.post("/findThuCungByTen", async (req, res) => {
    const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc join hinhanh a on t.mathucung = a.mathucung where t.tenthucung = ? group by t.mathucung";
    con.query(sql, [req.body.tenthucungmoi], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Tìm kiếm TÊN THÚ CƯNG by Ten " +req.body.tenthucungmoi+ " -success!", result);
    })
})

// Thêm thú cưng
router.post("/insertThuCung", async (req, res) => {
    const sql = "insert into thucung (madanhmuc, tenthucung, gioitinhthucung, tuoithucung, datiemchung, baohanhsuckhoe, tieude, mota, ghichu, soluong, giaban, giamgia) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    con.query(sql, [req.body.madanhmuc, req.body.tenthucung, req.body.gioitinhthucung, req.body.tuoithucung, req.body.datiemchung, req.body.baohanhsuckhoe, req.body.tieude, req.body.mota, req.body.ghichu, req.body.soluong, req.body.giaban, req.body.giamgia ], (err, result) => {
        if(err) {
            console.log("Lỗi insert thú cưng: ", err);
        } else {
            const sql1 = "select * from thucung where madanhmuc = ? && tenthucung = ? && tuoithucung = ? && gioitinhthucung = ? && datiemchung = ? && baohanhsuckhoe = ? && tieude = ? && mota = ? && ghichu = ? && soluong = ? && giaban = ? && giamgia = ?";
            con.query(sql1, [req.body.madanhmuc, req.body.tenthucung, req.body.tuoithucung, req.body.gioitinhthucung, req.body.datiemchung, req.body.baohanhsuckhoe, req.body.tieude, req.body.mota, req.body.ghichu, req.body.soluong, req.body.giaban, req.body.giamgia], (err, result1) => {
                if(err) {
                    console.log("Lỗi tìm kiếm thú cưng vừa thêm: ", err);
                } else {
                    const mathucungvuathem = result1[0].mathucung;
                    console.log("Mã thú cưng vừa thêm: ", result1[0].mathucung);
                    const manghinhanh = req.body.hinhanh;
                    manghinhanh.map((hinhanh, key) => {
                        const sql2 = "insert into hinhanh (mathucung, hinhanh) values (?, ?);";
                        con.query(sql2, [mathucungvuathem, hinhanh], (err, result2) => {
                            if (err) {
                                console.log("Lỗi thêm hình cho thú cưng: ", err);
                            } else {
                                console.log("Thêm hình ảnh cho mã thú cưng " + mathucungvuathem + " thành công");         
                            }
                        })
                    })
                    res.status(200).json({message: "Thêm thú cưng thành công"});
                    console.log("Thêm thú cưng "+req.body.tenthucung+" thành công");  
                }
            })
        }
    })
})

// Cập nhật thú cưng
router.post("/updateThuCung", async (req, res) => {
    try {
        const sql = "update thucung set madanhmuc = ?, tenthucung = ?, gioitinhthucung =?, tuoithucung = ?, datiemchung = ?, baohanhsuckhoe = ?, tieude = ?, mota = ?, ghichu = ?, soluong = ?, giaban = ?, giamgia = ? where mathucung = ?;";
        con.query(sql, [req.body.madanhmucmoi, req.body.tenthucungmoi, req.body.gioitinhthucungmoi, req.body.tuoithucungmoi, req.body.datiemchungmoi, req.body.baohanhsuckhoemoi, req.body.tieudemoi, req.body.motamoi, req.body.ghichumoi, req.body.soluongmoi, req.body.giabanmoi, req.body.giamgiamoi, req.body.mathucung ], (err, result) => {
            if(err) {
                console.log("Lỗi Update thú cưng: ", err);
            } else {
                const sql1 = "delete from hinhanh where mathucung = ?;";
                con.query(sql1, [req.body.mathucung], (err, result1) => {
                    if(err) {
                        console.log("Lỗi xóa tất cả hình của mã thú cưng ", req.body.mathucung);
                    } else {
                        const manghinhanh = req.body.hinhanhmoi;
                        manghinhanh.map((hinhanh, key) => {
                            const sql2 = "insert into hinhanh (mathucung, hinhanh) values (?, ?);";
                            con.query(sql2, [req.body.mathucung, hinhanh], (err, result2) => {
                                if (err) {
                                    console.log("Lỗi thêm hình cho thú cưng: ", err);
                                } else {
                                    console.log("Thêm hình ảnh cho mã thú cưng " + req.body.mathucung + " thành công");         
                                }
                            })
                        })
                        res.status(200).json({message: "Cập nhật thú cưng thành công"});
                        console.log("Cập nhật thú cưng "+req.body.mathucung+" thành công");  
                        // console.log("mang hinh anh: ", manghinhanh);
                    }
                })
            }
        })
    } catch(err) {
        console.log("Lỗi khi cập nhật thú cưng");
    }
})

// Xóa thú cưng
router.post("/deleteThuCung", async (req, res) => {
    console.log(req.body.mathucung);
    const sql = "delete from hinhanh where mathucung = ?;";
    con.query(sql, [req.body.mathucung], (err, result) => {
        if(err) {
            console.log("Lỗi khi xóa hình ảnh khi Delete thú cưng: ", err);
        } else {
            const sql1 = "delete from thucung where mathucung = ?;";
            con.query(sql1, [req.body.mathucung], (err, result1) => {
                if(err) {
                    console.log("Lỗi khi Delete thú cưng: ", err);
                } else {
                    res.status(200).json({message: "Xóa thú cưng thành công"});
                    console.log("Xóa thú cưng có mã "+req.body.mathucung+" thành công");
                }
            })
        };
    })
})

// Lấy tên thú cưng
router.post("/getTenThuCung", async (req, res) => {
    const sql = "select DISTINCT t.tenthucung, d.tieudedanhmuc FROM thucung t join danhmuc d on t.madanhmuc = d.madanhmuc WHERE t.madanhmuc = ?;";
    con.query(sql, [req.body.madanhmuc], (err, result) => {
        if (err) {
            console.log("Có lỗi khi lấy tên thú cưng: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy tên thú cưng từ madanhmuc thành công");
        }
    })
})

// Tìm kiếm thú cưng
router.post("/getThuCungTimKiem", async (req, res) => {
    const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc where t.tenthucung like concat('%', ?, '%') or d.tendanhmuc like concat('%', ?, '%')";
    con.query(sql, [req.body.tenthucung, req.body.tenthucung], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Tìm kiếm TÊN THÚ CƯNG -success!");
    })
})

// ========================================== THỐNG KÊ ================================================
// Lấy thống kê theo danh mục
router.post("/getThongKeTheoDanhMuc", async (req, res) => {
    const sql = "select dm.tendanhmuc, sum(ct.tongtienchitietdathang) as tongtiengiaodich from dathang d join chitietdathang cd on d.madathang = cd.madathang join thucung t on cd.mathucung = t.mathucung join danhmuc dm on t.madanhmuc = dm.madanhmuc join nguoimua n on d.manguoimua = n.manguoimua where d.trangthaidathang = 2 GROUP by dm.madanhmuc;";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Có lỗi khi lấy Thống kê doanh thu theo danh mục: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy Thống kê doanh thu theo danh mục thành công");
        }
    })
})

// Lấy thống kê theo doanh thu chó
router.post("/getDoanhThuCho", async (req, res) => {
    if(req.body.ngay != "" && req.body.thang != "" && req.body.nam != "") {
        const sql = "select dm.tendanhmuc, sum(cd.tongtienchitietdathang) as tongtiengiaodich from dathang d join chitietdathang cd on d.madathang = cd.madathang join thucung t on cd.mathucung = t.mathucung join danhmuc dm on t.madanhmuc = dm.madanhmuc join nguoimua n on d.manguoimua = n.manguoimua where d.trangthaidathang = 2 && dm.tendanhmuc = 'Chó' && DAY(d.ngaydathang) = ? && MONTH(d.ngaydathang) = ? && YEAR(d.ngaydathang) = ?;";
        con.query(sql, [req.body.ngay, req.body.thang, req.body.nam], (err, result) => {
            if (err) {
                console.log("Có lỗi khi lấy Thống kê doanh thu chó: ", err);
            } else {
                res.status(200).json(result);
                console.log("Lấy Thống kê doanh thu chó thành công");
            }
        })
        
    } else {
        const sql = "select dm.tendanhmuc, sum(cd.tongtienchitietdathang) as tongtiengiaodich from dathang d join chitietdathang cd on d.madathang = cd.madathang join thucung t on cd.mathucung = t.mathucung join danhmuc dm on t.madanhmuc = dm.madanhmuc join nguoimua n on d.manguoimua = n.manguoimua where d.trangthaidathang = 2 && dm.tendanhmuc = 'Chó' && YEAR(d.ngaydathang) = '2022';";
        con.query(sql, [req.body.ngay, req.body.thang, req.body.nam], (err, result) => {
            if (err) {
                console.log("Có lỗi khi lấy Thống kê doanh thu chó: ", err);
            } else {
                res.status(200).json(result);
                console.log("Lấy Thống kê doanh thu chó thành công");
            }
        })
    }
})
// Lấy thống kê theo doanh thu mèo
router.post("/getDoanhThuMeo", async (req, res) => {
    if(req.body.ngay != "" && req.body.thang != "" && req.body.nam != "") {
        const sql = "select dm.tendanhmuc, sum(cd.tongtienchitietdathang) as tongtiengiaodich from dathang d join chitietdathang cd on d.madathang = cd.madathang join thucung t on cd.mathucung = t.mathucung join danhmuc dm on t.madanhmuc = dm.madanhmuc join nguoimua n on d.manguoimua = n.manguoimua where d.trangthaidathang = 2 && dm.tendanhmuc = 'Mèo' && DAY(d.ngaydathang) = ? && MONTH(d.ngaydathang) = ? && YEAR(d.ngaydathang) = ?;";
        con.query(sql, [req.body.ngay, req.body.thang, req.body.nam], (err, result) => {
            if (err) {
                console.log("Có lỗi khi lấy Thống kê doanh thu mèo: ", err);
            } else {
                res.status(200).json(result);
                console.log("Lấy Thống kê doanh thu mèo thành công");
            }
        })
    } else {
        const sql = "select dm.tendanhmuc, sum(cd.tongtienchitietdathang) as tongtiengiaodich from dathang d join chitietdathang cd on d.madathang = cd.madathang join thucung t on cd.mathucung = t.mathucung join danhmuc dm on t.madanhmuc = dm.madanhmuc join nguoimua n on d.manguoimua = n.manguoimua where d.trangthaidathang = 2 && dm.tendanhmuc = 'Mèo'  && YEAR(d.ngaydathang) = '2022';";
        con.query(sql, [req.body.ngay, req.body.thang, req.body.nam], (err, result) => {
            if (err) {
                console.log("Có lỗi khi lấy Thống kê doanh thu mèo: ", err);
            } else {
                res.status(200).json(result);
                console.log("Lấy Thống kê doanh thu mèo thành công");
            }
        })
    }
})
// Lấy thống kê theo doanh thu thú khác
router.post("/getDoanhThuKhac", async (req, res) => {
    if(req.body.ngay != "" && req.body.thang != "" && req.body.nam != "") {
        const sql = "select dm.tendanhmuc, sum(cd.tongtienchitietdathang) as tongtiengiaodich from dathang d join chitietdathang cd on d.madathang = cd.madathang join thucung t on cd.mathucung = t.mathucung join danhmuc dm on t.madanhmuc = dm.madanhmuc join nguoimua n on d.manguoimua = n.manguoimua where d.trangthaidathang = 2 && dm.tendanhmuc != 'Chó' && dm.tendanhmuc != 'Mèo'  && DAY(d.ngaydathang) = ? && MONTH(d.ngaydathang) = ? && YEAR(d.ngaydathang) = ?;";
        con.query(sql, [req.body.ngay, req.body.thang, req.body.nam], (err, result) => {
            if (err) {
                console.log("Có lỗi khi lấy Thống kê doanh thu thú khác: ", err);
            } else {
                res.status(200).json(result);
                console.log("Lấy Thống kê doanh thu thú khác thành công");
            }
        })
    } else {
        const sql = "select dm.tendanhmuc, sum(cd.tongtienchitietdathang) as tongtiengiaodich from dathang d join chitietdathang cd on d.madathang = cd.madathang join thucung t on cd.mathucung = t.mathucung join danhmuc dm on t.madanhmuc = dm.madanhmuc join nguoimua n on d.manguoimua = n.manguoimua where d.trangthaidathang = 2 && dm.tendanhmuc != 'Chó' && dm.tendanhmuc != 'Mèo' && YEAR(d.ngaydathang) = '2022';";
        con.query(sql, [req.body.ngay, req.body.thang, req.body.nam], (err, result) => {
            if (err) {
                console.log("Có lỗi khi lấy Thống kê doanh thu thú khác: ", err);
            } else {
                res.status(200).json(result);
                console.log("Lấy Thống kê doanh thu thú khác thành công");
            }
        })
    }
})

// Lấy thống kê tổng doanh thu
router.post("/getTongDoanhThu", async (req, res) => {
    if(req.body.ngay != "" && req.body.thang != "" && req.body.nam != "") {
        const sql = "select sum(cd.tongtienchitietdathang) as tongtiengiaodich from dathang d join chitietdathang cd on d.madathang = cd.madathang join thucung t on cd.mathucung = t.mathucung join danhmuc dm on t.madanhmuc = dm.madanhmuc join nguoimua n on d.manguoimua = n.manguoimua where d.trangthaidathang = 2  && DAY(d.ngaydathang) = ? && MONTH(d.ngaydathang) = ? && YEAR(d.ngaydathang) = ?;";
        con.query(sql, [req.body.ngay, req.body.thang, req.body.nam], (err, result) => {
            if (err) {
                console.log("Có lỗi khi lấy Thống kê tổng doanh thu: ", err);
            } else {
                res.status(200).json(result);
                console.log("Lấy Thống kê tổng doanh thu thành công");
            }
        })
    } else {
        const sql = "select sum(cd.tongtienchitietdathang) as tongtiengiaodich from dathang d join chitietdathang cd on d.madathang = cd.madathang join thucung t on cd.mathucung = t.mathucung join danhmuc dm on t.madanhmuc = dm.madanhmuc join nguoimua n on d.manguoimua = n.manguoimua where d.trangthaidathang = 2 && YEAR(d.ngaydathang) = '2022';";
        con.query(sql, [req.body.ngay, req.body.thang, req.body.nam], (err, result) => {
            if (err) {
                console.log("Có lỗi khi lấy Thống kê tổng doanh thu: ", err);
            } else {
                res.status(200).json(result);
                console.log("Lấy Thống kê tổng doanh thu thành công");
            }
        })
    }
})

// THỐNG KÊ SỐ ĐƠN HÀNG HÔM NAY
router.post("/getSoDonHangHomNay", (req, res) => {
    const sql = "select count(madathang) as soluongdathang from dathang where day(ngaydathang) = day(now()) and month(ngaydathang) = month(now()) and year(ngaydathang) = year(now());";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Có lỗi khi lấy số lượng đơn hôm nay");
        } else {
            res.status(200).json(result);
            console.log("Lấy số lượng đơn hôm nay thành công");
        }
    })
})
// THỐNG KÊ DOANH THU HÔM NAY
router.post("/getDoanhThuHomNay", (req, res) => {
    const sql = "select sum(tongtiendathang) as tongtien from dathang where day(ngaydathang) = day(now()) and month(ngaydathang) = month(now()) and year(ngaydathang) = year(now()) and trangthaidathang = 2;";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Có lỗi khi lấy doanh thu hôm nay");
        } else {
            res.status(200).json(result);
            console.log("Lấy doanh thu hôm nay thành công");
        }
    })
})
// THỐNG KÊ ĐƠN CẦN DUYỆT HÔM NAY
router.post("/getDonCanDuyetuHomNay", (req, res) => {
    const sql = "select count(madathang) as sodonchoduyet from dathang where day(ngaydathang) = day(now()) and month(ngaydathang) = month(now()) and year(ngaydathang) = year(now()) and trangthaidathang = 1";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Có lỗi khi lấy đơn cần duyệt hôm nay");
        } else {
            res.status(200).json(result);
            console.log("Lấy đơn cần duyệt thành công");
        }
    })
})

// THỐNG KÊ DOANH THU THEO THÁNG CỦA TỪNG DANH MỤC
router.post("/getDoanhThuTheoThang", (req, res) => {
    const sql = "select dm.tendanhmuc, sum(case month(d.ngaydathang) when 1 then ct.tongtienchitietdathang else 0 END) as thang1, sum(case month(d.ngaydathang) when 2 then ct.tongtienchitietdathang else 0 END) as thang2, sum(case month(d.ngaydathang) when 3 then ct.tongtienchitietdathang else 0 END) as thang3, sum(case month(d.ngaydathang) when 4 then ct.tongtienchitietdathang else 0 END) as thang4, sum(case month(d.ngaydathang) when 5 then ct.tongtienchitietdathang else 0 END) as thang5, sum(case month(d.ngaydathang) when 6 then ct.tongtienchitietdathang else 0 END) as thang6, sum(case month(d.ngaydathang) when 7 then ct.tongtienchitietdathang else 0 END) as thang7, sum(case month(d.ngaydathang) when 8 then ct.tongtienchitietdathang else 0 END) as thang8, sum(case month(d.ngaydathang) when 9 then ct.tongtienchitietdathang else 0 END) as thang9, sum(case month(d.ngaydathang) when 10 then ct.tongtienchitietdathang else 0 END) as thang10, sum(case month(d.ngaydathang) when 11 then ct.tongtienchitietdathang else 0 END) as thang11, sum(case month(d.ngaydathang) when 12 then ct.tongtienchitietdathang else 0 END) as thang12, sum(ct.tongtienchitietdathang) as canam from dathang d join chitietdathang ct on d.madathang = ct.madathang join thucung t on ct.mathucung = t.mathucung join danhmuc dm on t.madanhmuc = dm.madanhmuc WHERE year(d.ngaydathang) = 2022 and d.trangthaidathang = 2 GROUP BY dm.madanhmuc;";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Có lỗi khi lấy doanh thu theo tháng của từng danh mục");
        } else {
            res.status(200).json(result);
            console.log("Lấy doanh thu theo tháng của từng danh mục thành công");
        }
    })
})

// 

// ==============================================================================
//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc join hinhanh h on t.mathucung = h.mathucung group by t.mathucung";
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
    })
})
module.exports = router;