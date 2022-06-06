const router = require("express").Router();
const con = require("../config/database.config");
// ============================================ USER ====================================================
// NODE Mailer
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'truonghoanglong588@gmail.com',
      pass: 'grkaaxhoeradbtop'
    }
});

function format_money(str) {
return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + '.')) + prev
})
}
//ĐẶT MUA
router.post("/datMua", async (req, res) => {
    // Lấy ngày hiện tại FORMAT: '2022-05-05 13:48:12' giống CSDL
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var ngaydathang = date+' '+time;

    const sql = "insert into dathang (manguoimua, maxa, manhanvien, hotendathang, emaildathang, sodienthoaidathang, diachidathang, ghichudathang, ngaydathang, trangthaidathang, tongtiendathang) values (?, ?, 0, ?, ?, ?, ?, ?, ?, 1, ?);";
    con.query(sql, [ req.body.manguoimua, req.body.maxa, req.body.hotendathang, req.body.emaildathang, req.body.sdtdathang, req.body.diachidathang, req.body.ghichudathang, ngaydathang, req.body.tongtiendathang ], (err, result) => {
        if (err) {
            console.log("Có lỗi khi đặt mua: ", err);
        } else {
            const sql1 = "select * from dathang d join xaphuongthitran x on d.maxa = x.maxa join quanhuyen q on q.maquanhuyen = x.maquanhuyen join tinhthanhpho t on q.mathanhpho = t.mathanhpho where d.ngaydathang = ?;";
            con.query(sql1, [ngaydathang], (err, result1) => {
                if (err) {
                    console.log("Lỗi khi lấy mã đặt hàng từ ngày đặt hàng: ", err);
                } else {
                    req.body.giohang.map((thucung, key) => {
                        const sql2 = "insert into chitietdathang (mathucung, madathang, giachitietdathang, soluongchitietdathang, tongtienchitietdathang) values ( ?, ?, ?, ?, ?)";
                        con.query(sql2, [thucung.data[0].mathucung, result1[0].madathang, thucung.data[0].giamgia, thucung.soluongmua, thucung.data[0].giamgia * thucung.soluongmua ], (err, result2) => {
                            if (err) {
                                console.log("Lỗi khi thêm chi tiết đơn hàng: ", err);
                            } else {
                                const sql3 = "update thucung set soluong = soluong - ? where mathucung = ?;";
                                con.query(sql3, [thucung.soluongmua, thucung.data[0].mathucung], (err, result3) => {
                                    if (err) {
                                        console.log("Lỗi khi update số lượng: ", err);
                                    } else {
                                        console.log("Update lại số lượng thú cưng trong csdl thành công");
                                    }
                                })
                            }
                        })
                        // console.log("Thu cung: ",thucung.data[0].mathucung);
                    })
                    res.status(200).json({message: "Đặt mua thành công"});
                    console.log("Đặt mua thành công");

                    // MAILER
                    var noidung = '';
                    noidung += '<div><p>Cảm ơn bạn đã tin tưởng và đặt mua thú cưng tại <font color="#fd5d32"><b>Long Pets</b></font> với mã đơn: ' + result1[0].madathang + '</p></div>';
                    noidung += '<p><b>Khách hàng:</b> ' + req.body.hotendathang + '<br /><b>Email:</b> ' + req.body.emaildathang + '<br /><b>Điện thoại:</b> ' + req.body.sdtdathang + '<br /><b>Địa chỉ:</b> ' + req.body.diachidathang + ', ' +  result1[0].tenxa + ', ' +  result1[0].tenquanhuyen + ', ' +  result1[0].tenthanhpho + '</p>';

                    // Danh sách Sản phẩm đã mua
                    noidung += ' <table border="1px" cellpadding="10px" cellspacing="1px"width="100%"><tr><td align="center" bgcolor="#fd5d32" colspan="4"><fontcolor="white"><b>ĐƠN ĐẶT MUA CỦA BẠN</b></fontcolor=></td></tr><tr id="invoice-bar"><td width="45%"><b>Tiêu đề</b></td><td width="20%"><b>Giá</b></td><td width="15%"><b>Số lượng</b></td><td width="20%"><b>Thành tiền</b></td></tr>';
                    req.body.giohang.map((thucung, key) => {
                        noidung += '<tr><td class="prd-name">' + thucung.data[0].tieude + '</td><td class="prd-price"><font color="#C40000">' + thucung.data[0].giamgia + 'VNĐ</font></td><td class="prd-number">' + thucung.soluongmua + '</td><td class="prd-total"><font color="#C40000">' + format_money((thucung.data[0].giamgia * thucung.soluongmua).toString()) + 'VNĐ</font></td></tr>';
                    }) 
                    noidung += '<tr><td class="prd-name">Tổng giá trị đơn hàng là:</td><td colspan="2"></td><td class="prd-total"><b><font color="#C40000">' + format_money((req.body.tongtiendathang).toString()) + 'VNĐ</font></b></td></tr></table>';
                    noidung += '<p align="justify"><b>Quý khách đã đặt thú cưng thành công!</b><br />• Thú cưng của Quý khách sẽ được chuyển đến Địa chỉ có trong phần Thông tin Khách hàng của chúng Tôi sau thời gian 2 đến 3 ngày, tính từ thời điểm này.<br/>• Nhân viên giao hàng sẽ liên hệ với Quý khách qua Số Điện thoại trước khi giao hàng 24 tiếng.<br /><b><br />Cám ơn Quý khách đã lựa chọn thú cưng ở cửa hàng chúng tôi!</b></p>';  
                    // ----- Mailer Option -----
                    var mailOptions = {
                        from: 'Long Pets',
                        to: req.body.emaildathang,
                        subject: 'Đặt hàng tại Long Pets thành công!',
                        html: noidung,
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    });
                    // console.log("Result1: ", result1[0].madathang , ngaydathang);
                }
            })
        }
    })
})

// Lịch sử đặt mua - Lấy đơn hàng của người mua bằng manguoimua từ Redux
router.post("/getDonHangUser", async (req, res) => {
    const sql = "select * from dathang d join xaphuongthitran x on d.maxa = x.maxa join quanhuyen q on x.maquanhuyen = q.maquanhuyen join tinhthanhpho t on q.mathanhpho = t.mathanhpho join trangthaidonhang tt on d.trangthaidathang = tt.trangthaidathang where d.manguoimua = ? order by d.ngaydathang desc;";
    con.query(sql, [req.body.manguoimua], (err, result) => {
        if (err) {
            console.log("Lấy các đơn hàng của người mua thất bại: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy các đơn hàng của người mua thành công");
        }
    })
})

// Hủy đơn - USER
router.post("/huyDonUser", async (req, res) => {
    const sql = "update dathang set manhanvien = 0, trangthaidathang = 4 where madathang = ?;";
    con.query(sql, [req.body.madathang], (err, result) => {
        if (err) {
            console.log("Có lỗi khi update hủy đơn: ", err);
        } else {
            const sql1 = "select * from chitietdathang where madathang = ?";
            con.query(sql1, [req.body.madathang], (err, result1) => {
                if (err) {
                    console.log("Có lỗi khi lấy chi tiết thú cưng hủy đơn: ", err);
                } else {
                    result1.map((thucung, key) => {
                        const sql2 = "update thucung set soluong = soluong + ? where mathucung = ?;";
                        con.query(sql2, [thucung.soluongchitietdathang, thucung.mathucung], (err, result2) => {
                            if (err) {
                                console.log("Lỗi khi update chi tiết thú cưng từ đơn từ chối");
                            } else {
                                console.log("Cập nhật số lượng từ đơn từ chối thành công");
                            }
                        })
                    })
                    res.status(200).json({message: "Hủy đơn thành công"});
                    console.log("Hủy đơn đặt - USER mua thành công");
                }
            })
        }
    })
})

// ==================================== ADMIN Quản lý đơn hàng ==========================================
// Lấy ra đơn đặt mua
router.post("/getDonHang", async (req, res) => {
    const sql = "select * from dathang d join xaphuongthitran x on d.maxa = x.maxa join quanhuyen q on x.maquanhuyen = q.maquanhuyen join tinhthanhpho t on q.mathanhpho = t.mathanhpho join trangthaidonhang tt on d.trangthaidathang = tt.trangthaidathang order by d.madathang desc;";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Có lỗi khi lấy danh sách đơn đặt mua: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy danh sách đơn đặt mua thành công");
        }
    })
})

// Lấy ra Chi tiết đơn đặt mua
router.post("/getChiTietDonHang", async (req, res) => {
    const sql = "select * from dathang d join trangthaidonhang tt on d.trangthaidathang = tt.trangthaidathang join nhanvien n on d.manhanvien = n.manhanvien join xaphuongthitran x on d.maxa = x.maxa join quanhuyen q on x.maquanhuyen = q.maquanhuyen join tinhthanhpho t on q.mathanhpho = t.mathanhpho where d.madathang = ?;";
    con.query(sql, [req.body.madathang], (err, result) => {
        if (err) {
            console.log("Có lỗi khi lấy chi tiết đơn đặt mua: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy chi tiết đơn đặt mua thành công");
        }
    })
})

// Lấy ra Chi tiết đơn đặt mua
router.post("/getChiTietThuCung", async (req, res) => {
    const sql = "select * from chitietdathang c join thucung t on c.mathucung = t.mathucung WHERE c.madathang = ?;";
    con.query(sql, [req.body.madathang], (err, result) => {
        if (err) {
            console.log("Có lỗi khi lấy chi tiết thú cưng đơn đặt mua: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy chi tiết thú cưng đơn đặt mua thành công");
        }
    })
})

// Tìm đơn đặt mua bằng mã đơn hàng
router.post("/findDonHang", async (req, res) => {
    const sql = "select * from dathang d join xaphuongthitran x on d.maxa = x.maxa join quanhuyen q on x.maquanhuyen = q.maquanhuyen join tinhthanhpho t on q.mathanhpho = t.mathanhpho join trangthaidonhang tt on d.trangthaidathang = tt.trangthaidathang where d.madathang like concat('%', ?, '%') order by d.madathang desc;"
    con.query(sql, [req.body.madathang], (err, result) => {
        if (err) {
            console.log("Có lỗi khi tìm kiếm đơn đặt mua: ", err);
        } else {
            res.status(200).json(result);
            console.log("Tìm đơn đặt mua thành công");
        }
    })
})

// Lấy số lượng đơn hàng
router.post("/getSoLuongDonHang", async (req, res) => {
    const sql = "select count(madathang) as soluongdonhang from dathang;"
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Có lỗi khi lấy số lượng đơn đặt mua: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy số lượng đơn đặt mua thành công");
        }
    })
})

// DUYỆT ĐƠN
router.post("/duyetDon", async (req, res) => {
    const sql = "update dathang set trangthaidathang = 2, manhanvien = ? where madathang = ?;"
    con.query(sql, [req.body.manhanvien, req.body.madathang], (err, result) => {
        if (err) {
            console.log("Có lỗi khi duyệt đơn đặt mua: ", err);
        } else {
            const sql1 = "insert into adminlog (noidunglog, hinhdaidien) values ('" + req.body.hotennhanvien + " đã duyệt đơn đặt mua có mã " + req.body.madathang + "', ?);";
            con.query(sql1, [req.body.hinhdaidiennhanvien], (err, result) => {
                if (err) {
                    console.log("Có lỗi khi thêm vào adminlog: ", err);
                }
            })
            res.status(200).json({message: "Duyệt đơn thành công"});
            console.log("Lấy số lượng đơn đặt mua thành công");
        }
    })
})

// TỪ CHỐI ĐƠN
router.post("/tuChoiDon", async (req, res) => {
    const sql = "update dathang set trangthaidathang = 4, manhanvien = ? where madathang = ?;";
    con.query(sql, [req.body.manhanvien, req.body.madathang], (err, result) => {
        if (err) {
            console.log("Có lỗi khi từ chối đơn đặt mua: ", err);
        } else {
            const sql1 = "select * from chitietdathang where madathang = ?;";
            con.query(sql1, [req.body.madathang], (err, result1) => {
                if (err) {
                    console.log("Lỗi khi lấy chi tiết thú cưng trong đơn hủy: ", err);
                } else {
                    result1.map((thucung, key) => {
                        const sql2 = "update thucung set soluong = soluong + ? where mathucung = ?;";
                        con.query(sql2, [thucung.soluongchitietdathang, thucung.mathucung], (err, result2) => {
                            if (err) {
                                console.log("Lỗi khi lấy chi tiết thú cưng từ đơn từ chối");
                            } else {
                                console.log("Cập nhật số lượng từ đơn từ chối thành công");
                            }
                        })
                    })
                    // Thêm vào adminlog
                    const sql3 = "insert into adminlog (noidunglog, hinhdaidien) values ('" + req.body.hotennhanvien + " đã từ chối đơn đặt mua có mã " + req.body.madathang + "', ?);";
                    con.query(sql3, [req.body.hinhdaidiennhanvien], (err, result) => {
                        if (err) {
                            console.log("Có lỗi khi thêm vào adminlog: ", err);
                        }
                    })
                    res.status(200).json({message: "Từ chối đơn thành công"});
                    console.log("Từ chối đơn đặt mua thành công");
                }
            })
        }
    })
})

module.exports = router;