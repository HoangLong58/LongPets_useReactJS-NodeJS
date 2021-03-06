import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import DatMuaImage from '../components/DatMuaImage';
import Navbar from '../components/Navbar';
import "../css/main.css";
import format_money from "../utils"
import { logoutCart } from "../redux/cartRedux";
import Toast from "../components/Toast";

const Container = styled.div`

`

const Wrapper = styled.div`
max-width: 1200px;
margin: 20px auto;
overflow: hidden;
background-color: #f8f9fa;
box-shadow: 0 2px 3px #e0e0e0;
display: flex;
`

const Box1 = styled.div`
max-width: 600px;
padding: 10px 40px;
user-select: none;
`

const Box2 = styled.div`
width: 100%;
padding: 10px 40px;
`

const Title1 = styled.div`
display: flex;
justify-content: space-between;
`

const CartItem = styled.div`
display: flex;
width: 100%;
font-size: 1.1rem;
background: #ddd;
margin-top: 10px;
padding: 10px 12px;
border-radius: 5px;
cursor: pointer;
border: 1px solid transparent;
`

const Circle = styled.span`
height: 12px;
width: 12px;
background: #ccc;
border-radius: 50%;
margin-right: 15px;
border: 4px solid transparent;
display: inline-block
`

const Course = styled.div`
width: 100%
`

const Content = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const InfomationTitle = styled.div`
    font-size: 1.2rem;
`

const InfomationForm = styled.div`

`

const ModalChiTietItem = styled.div`
margin: 2px 0px;
display: flex;
flex-direction: column;
`

const FormSpan = styled.span`
font-size: 1.1rem;
font-weight: 700;
color: var(--color-dark-light);
margin-bottom: 3px;
`
const FormInput = styled.input`
background-color: var(--color-white);
color: var(--color-dark);
width: auto;
padding: 8px 20px;
margin: 5px 0;
display: inline-block;
outline: 0;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
&:focus {
    border: 1px solid var(--color-success);
    box-shadow: var(--color-success) 0px 1px 4px, var(--color-success) 0px 0px 0px 3px;
}
`

const FormSelect = styled.select`
    background-color: var(--color-white);
    color: var(--color-dark);
    width: auto;
    padding: 8px 20px;
    margin: 5px 0;
    outline: 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    &:focus {
        border: 1px solid var(--color-success);
        box-shadow: var(--color-success) 0px 1px 4px, var(--color-success) 0px 0px 0px 3px;
    }
`

const FormOption = styled.option`
    margin: auto;
`

const FormTextArea = styled.textarea`
background-color: var(--color-white);
color: var(--color-dark);
width: auto;
padding: 8px 20px;
margin: 5px 0;
display: inline-block;
outline: 0;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
&:focus {
    border: 1px solid var(--color-success);
    box-shadow: var(--color-success) 0px 1px 4px, var(--color-success) 0px 0px 0px 3px;
}
`
const Total = styled.div`
display: flex;
flex-direction: column;
`

const TotalItem = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const ButtonContainer = styled.div`
    justify-content: center;
    position: relative;
    float: right;
    margin: 10px 22px 22px 0;
    display: flex;
    &::after {
        content: "";
        border: 2px solid black;
        position: absolute;
        top: 5px;
        right: -5px;
        background-color: transperent;
        width: 150px;
        height: 100%;
        z-index: 5;
    }
`

const Button = styled.button`
    padding: 10px;
    width: 150px;
    border: 2px solid black;
    background-color: black;
    color: white;
    cursor: pointer;
    font-weight: 500;
    z-index: 10;
    &:hover {
        background-color: #fe6430;
    }
    &:active {
        background-color: #333;
        transform: translate(5px, 5px);
        transition: transform 0.25s;
    }
`


const DatMua = () => {
    // Page success sau khi ?????t mua th??nh c??ng
    const navigate = useNavigate();

    // ===== TOAST =====
    const [dataToast, setDataToast] = useState({ message: "alo alo", type: "success" });
    const toastRef = useRef(null);  // useRef c?? th??? g???i c??c h??m b??n trong c???a Toast
    // b???ng c??c dom event, javascript, ...

    const showToastFromOut = (dataShow) => {
        console.log("showToastFromOut da chay", dataShow);
        setDataToast(dataShow);
        toastRef.current.show();
    }


    // User, Cart t??? redux
    const user = useSelector(state => state.user.currentUser);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    // C??c state kh???i t???o
    // ---- C?? user (???? ????ng nh???p)
    const [maXa, setMaXa] = useState("");
    const [maNguoiMua, setMaNguoiMua] = useState("");
    const [emailNguoiMua, setEmailNguoiMua] = useState("");
    const [hoTenNguoiMua, setHoTenNguoiMua] = useState("");
    const [sdtNguoiMua, setSdtNguoiMua] = useState("");
    const [diaChiNguoiMua, setDiaChiNguoiMua] = useState("");
    const [ghiChu, setGhiChu] = useState("");

    const [maQuanHuyen, setMaQuanHuyen] = useState("");
    const [maThanhPho, setMaThanhPho] = useState("");
    const [tenXa, setTenXa] = useState("");
    const [tenQuanHuyen, setTenQuanHuyen] = useState("");
    const [tenThanhPho, setTenThanhPho] = useState("");

    // Useeffect l???y d??? li???u t??? USer
    useEffect(() => {
        setMaNguoiMua(user ? user.manguoimua : "");
        setEmailNguoiMua(user ? user.emailnguoimua : "");
        setHoTenNguoiMua(user ? user.hotennguoimua : "");
        setSdtNguoiMua(user ? user.sdtnguoimua : "");
        setDiaChiNguoiMua(user ? user.diachinguoimua : "");

        setMaXa(user ? user.maxa : "");
        setMaQuanHuyen(user ? user.maquanhuyen : "");
        setMaThanhPho(user ? user.mathanhpho : "");
        setTenXa(user ? user.tenxa : "");
        setTenQuanHuyen(user ? user.tenquanhuyen : "");
        setTenThanhPho(user ? user.tenthanhpho : "");
    }, [])

    // Effect T???nh - Huy???n - X?? (C?? user)
    const [mangTinhThanhPho, setMangTinhThanhPho] = useState([]);
    const [mangQuanHuyen, setMangQuanHuyen] = useState([]);
    const [mangXaPhuongThiTran, setMangXaPhuongThiTran] = useState([]);
    useEffect(() => {
        const getTinhThanhPho = async () => {
            const thanhphores = await axios.post("http://localhost:3001/api/user/getTinhThanhPho", {});
            setMangTinhThanhPho(thanhphores.data);
            console.log("T???nh TP [res]: ", thanhphores.data);
        }
        getTinhThanhPho();
    }, [])

    useEffect(() => {
        const getQuanHuyen = async () => {
            const quanhuyenres = await axios.post("http://localhost:3001/api/user/getQuanHuyen", { mathanhpho: maThanhPho });
            setMangQuanHuyen(quanhuyenres.data);
            console.log("Qu???n huy???n  [res]: ", quanhuyenres.data);
        }
        getQuanHuyen();
    }, [maThanhPho])

    useEffect(() => {
        const getXaPhuongThiTran = async () => {
            const xaphuongthitranres = await axios.post("http://localhost:3001/api/user/getXaPhuongThiTran", { maquanhuyen: maQuanHuyen });
            setMangXaPhuongThiTran(xaphuongthitranres.data);
            console.log("X?? ph?????ng  res: ", xaphuongthitranres.data);
        }
        getXaPhuongThiTran();
    }, [maQuanHuyen])

    // X??? L?? ?????T MUA - C?? USER (c?? m?? ng?????i mua) - Ko USer th?? m?? ng?????i mua = 0;
    const DatMua = async ({
        manguoimua,
        maxa,
        hotendathang,
        emaildathang,
        sdtdathang,
        diachidathang,
        ghichudathang,
        tongtiendathang,
        giohang
    }) => {
        console.log("?????u v??o ?????T MUA: ", {
            manguoimua,
            maxa,
            hotendathang,
            emaildathang,
            sdtdathang,
            diachidathang,
            ghichudathang,
            tongtiendathang,
            giohang
        });
        if (
            manguoimua != ""
            && maxa != ""
            && hotendathang != ""
            && emaildathang != ""
            && sdtdathang != ""
            && diachidathang != ""
            // ghichudathang
        ) {
            try {
                const datmuares = await axios.post("http://localhost:3001/api/order/datMua", { manguoimua, maxa, hotendathang, emaildathang, sdtdathang, diachidathang, ghichudathang, tongtiendathang, giohang });
                console.log("K???t qu??? ?????t mua: ", datmuares.data.message);
                if (datmuares.data.message === "?????t mua th??nh c??ng") {
                    // Chuy???n ?????n trang ?????t mua th??nh c??ng
                    navigate("/success");
                    dispatch(logoutCart()); //Kh???i t???o l???i ng?????i d??ng
                }
            } catch (err) {
                console.log("L???i khi ?????t mua: ", err);
                const dataShow = { message: "L???i khi ?????t mua!", type: "danger" };
                showToastFromOut(dataShow);
            }
        } else {
            const dataShow = { message: "B???n ch??a ??i???n ?????y ????? th??ng tin", type: "danger" };
            showToastFromOut(dataShow);
        }
    }

    // ---- Kh??ng c?? user (Ch??a ????ng nh???p)
    const [maXaNoUser, setMaXaNoUser] = useState("");
    const [emailNguoiMuaNoUser, setEmailNguoiMuaNoUser] = useState("");
    const [hoTenNguoiMuaNoUser, setHoTenNguoiMuaNoUser] = useState("");
    const [sdtNguoiMuaNoUser, setSdtNguoiMuaNoUser] = useState("");
    const [diaChiNguoiMuaNoUser, setDiaChiNguoiMuaNoUser] = useState("");
    const [ghiChuNoUser, setGhiChuNoUser] = useState("");

    const [maQuanHuyenNoUser, setMaQuanHuyenNoUser] = useState("");
    const [maThanhPhoNoUser, setMaThanhPhoNoUser] = useState("");
    const [tenXaNoUser, setTenXaNoUser] = useState("");
    const [tenQuanHuyenNoUser, setTenQuanHuyenNoUser] = useState("");
    const [tenThanhPhoNoUser, setTenThanhPhoNoUser] = useState("");
    // Effect T???nh - Huy???n - X?? (Kh??ng c?? User)
    const [mangTinhThanhPhoNoUser, setMangTinhThanhPhoNoUser] = useState([]);
    const [mangQuanHuyenNoUser, setMangQuanHuyenNoUser] = useState([]);
    const [mangXaPhuongThiTranNoUser, setMangXaPhuongThiTranNoUser] = useState([]);
    useEffect(() => {
        const getTinhThanhPhoNoUser = async () => {
            const thanhphores = await axios.post("http://localhost:3001/api/user/getTinhThanhPho", {});
            setMangTinhThanhPhoNoUser(thanhphores.data);
            console.log("T???nh TP [res]: ", thanhphores.data);
        }
        getTinhThanhPhoNoUser();
    }, [])

    useEffect(() => {
        const getQuanHuyenNoUser = async () => {
            const quanhuyenres = await axios.post("http://localhost:3001/api/user/getQuanHuyen", { mathanhpho: maThanhPhoNoUser });
            setMangQuanHuyenNoUser(quanhuyenres.data);
            console.log("Qu???n huy???n  [res]: ", quanhuyenres.data);
        }
        getQuanHuyenNoUser();
    }, [maThanhPhoNoUser])

    useEffect(() => {
        const getXaPhuongThiTranNoUser = async () => {
            const xaphuongthitranres = await axios.post("http://localhost:3001/api/user/getXaPhuongThiTran", { maquanhuyen: maQuanHuyenNoUser });
            setMangXaPhuongThiTranNoUser(xaphuongthitranres.data);
            console.log("X?? ph?????ng  res: ", xaphuongthitranres.data);
        }
        getXaPhuongThiTranNoUser();
    }, [maQuanHuyenNoUser])


    return (
        <Container>
            <Navbar />
            <Announcement />

                    <Wrapper>
                        <Box1>
                            <Title1>
                                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Nh???ng th?? c??ng m?? b???n mu???n mua</p>
                            </Title1>
                            <Carousel style={{ maxHeight: "300px", overflow: "hidden" }}>
                                {
                                    cart.products.map((thucung, key) => {
                                        return (
                                            <Carousel.Item>
                                                <DatMuaImage item={thucung.data[0].mathucung}></DatMuaImage>
                                            </Carousel.Item>
                                        );
                                    })
                                }
                            </Carousel>
                            <p style={{ fontWeight: "500", marginTop: "10px" }}>Chi ti???t gi??? h??ng</p>
                            {
                                cart.products.map((thucung, key) => {
                                    return (
                                        <CartItem>
                                            <Circle />
                                            <Course>
                                                <Content>
                                                    <span style={{ width: "320px", fontWeight: "bold" }}> {thucung.data[0].tieude} </span>
                                                    <span style={{ fontWeight: "400", color: "var(--color-primary)", width: "145px", textAlign: "right" }}>{format_money((thucung.data[0].giamgia).toString())} VN??</span>
                                                </Content>
                                                <span style={{ fontWeight: "400" }}><span style={{ color: "var(--color-primary)" }}>{thucung.soluongmua}</span> x {thucung.data[0].tenthucung}</span>
                                            </Course>
                                        </CartItem>
                                    );
                                })
                            }
                        </Box1>
                        {
                            user
                                ?
                                <Box2>
                                    <InfomationTitle>
                                        <p style={{ fontWeight: "bold", margin: "10px 0 0 0" }}>Chi ti???t thanh to??n</p>
                                        <p style={{ fontSize: "1rem" }}>Ho??n t???t thanh to??n b???ng vi???c cung c???p nh???ng th??ng tin sau</p>
                                    </InfomationTitle>
                                    <InfomationForm>
                                        <ModalChiTietItem>
                                            <FormSpan>?????a ch??? email:</FormSpan>
                                            <FormInput type="text" value={user.emailnguoimua} disabled />
                                        </ModalChiTietItem>
                                        <ModalChiTietItem>
                                            <FormSpan>H??? t??n:</FormSpan>
                                            <FormInput type="text" onChange={(e) => { setHoTenNguoiMua(e.target.value) }} value={hoTenNguoiMua} />
                                        </ModalChiTietItem>
                                        <ModalChiTietItem>
                                            <FormSpan>S??? ??i???n tho???i:</FormSpan>
                                            <FormInput type="text" onChange={(e) => { setSdtNguoiMua(e.target.value) }} value={sdtNguoiMua} />
                                        </ModalChiTietItem>
                                        <ModalChiTietItem>
                                            <FormSpan>?????a ch???:</FormSpan>
                                            <FormInput type="text" onChange={(e) => { setDiaChiNguoiMua(e.target.value) }} value={diaChiNguoiMua} />
                                        </ModalChiTietItem>
                                        <ModalChiTietItem>
                                            <FormSpan>Thu???c t???nh:</FormSpan>
                                            <FormSelect onChange={(e) => { setMaThanhPho(e.target.value) }}>
                                                <FormOption value="">-- Ch???n th??nh ph??? --</FormOption>
                                                {mangTinhThanhPho.map((tinhthanhpho, key) => {
                                                    if (tinhthanhpho.tenthanhpho === tenThanhPho) {
                                                        return (
                                                            <FormOption value={tinhthanhpho.mathanhpho} selected> {tinhthanhpho.tenthanhpho} </FormOption>
                                                        )
                                                    } else {
                                                        return (
                                                            <FormOption value={tinhthanhpho.mathanhpho}> {tinhthanhpho.tenthanhpho} </FormOption>
                                                        )
                                                    }
                                                })}
                                            </FormSelect>
                                        </ModalChiTietItem>
                                        <ModalChiTietItem>
                                            <FormSpan>Thu???c huy???n:</FormSpan>
                                            <FormSelect onChange={(e) => { setMaQuanHuyen(e.target.value) }}>
                                                {
                                                    mangQuanHuyen.length > 0
                                                        ?
                                                        mangQuanHuyen.map((quanhuyen, key) => {
                                                            if (quanhuyen.tenquanhuyen === tenQuanHuyen) {
                                                                return (
                                                                    <FormOption value={quanhuyen.maquanhuyen} selected> {quanhuyen.tenquanhuyen} </FormOption>
                                                                )
                                                            } else {
                                                                return (
                                                                    <FormOption value={quanhuyen.maquanhuyen}> {quanhuyen.tenquanhuyen} </FormOption>
                                                                )
                                                            }
                                                        })
                                                        :
                                                        <FormOption value="">-- B???n ch??a ch???n Th??nh ph??? -- </FormOption>
                                                }
                                            </FormSelect>
                                        </ModalChiTietItem>
                                        <ModalChiTietItem>
                                            <FormSpan>Thu???c x??:</FormSpan>
                                            <FormSelect onChange={(e) => { setMaXa(e.target.value) }}>
                                                {
                                                    mangXaPhuongThiTran.length > 0
                                                        ?
                                                        mangXaPhuongThiTran.map((xaphuong, key) => {
                                                            if (xaphuong.tenxa === tenXa) {
                                                                return (
                                                                    <FormOption value={xaphuong.maxa} selected> {xaphuong.tenxa} </FormOption>
                                                                )
                                                            } else {
                                                                return (
                                                                    <FormOption value={xaphuong.maxa}> {xaphuong.tenxa} </FormOption>
                                                                )
                                                            }
                                                        })
                                                        :
                                                        <FormOption value="">-- B???n ch??a ch???n Huy???n </FormOption>
                                                }
                                            </FormSelect>
                                        </ModalChiTietItem>
                                        <ModalChiTietItem>
                                            <FormSpan>Ghi ch??:</FormSpan>
                                            <FormTextArea rows="3" onChange={(e) => { setGhiChu(e.target.value) }} value={ghiChu} placeholder="Ghi ch?? v??? ????n ?????t h??ng n??y" />
                                        </ModalChiTietItem>
                                    </InfomationForm>
                                    <Total>
                                        <TotalItem>
                                            <p>T???ng ti???n th?? c??ng</p>
                                            <p>{format_money((cart.tongtiengiohang).toString())} VN??</p>
                                        </TotalItem>
                                        <TotalItem>
                                            <p>Ph?? v???n chuy???n</p>
                                            <p>0.00 VN??</p>
                                        </TotalItem>
                                        <TotalItem>
                                            <p style={{ color: "var(--color-primary)", fontWeight: "bold" }}>T???ng c???ng</p>
                                            <p style={{ color: "var(--color-primary)", fontWeight: "bold" }}>{format_money((cart.tongtiengiohang).toString())} VN??</p>
                                        </TotalItem>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <ButtonContainer>
                                                <Button
                                                    onClick={() => {
                                                        DatMua({
                                                            manguoimua: maNguoiMua,
                                                            maxa: maXa,
                                                            hotendathang: hoTenNguoiMua,
                                                            emaildathang: emailNguoiMua,
                                                            sdtdathang: sdtNguoiMua,
                                                            diachidathang: diaChiNguoiMua,
                                                            ghichudathang: ghiChu,
                                                            tongtiendathang: cart.tongtiengiohang,
                                                            giohang: cart.products
                                                        })
                                                    }}
                                                >?????t mua</Button>
                                            </ButtonContainer>
                                            <Link to="/">
                                                <ButtonContainer>
                                                    <Button>Tr??? l???i</Button>
                                                </ButtonContainer>
                                            </Link>
                                        </div>
                                    </Total>
                                </Box2>
                                :
                                <Box2>
                                    <InfomationTitle>
                                        <p style={{ fontWeight: "bold", margin: "10px 0 0 0" }}>Chi ti???t thanh to??n</p>
                                        <p style={{ fontSize: "1rem" }}>Ho??n t???t thanh to??n b???ng vi???c cung c???p nh???ng th??ng tin sau</p>
                                    </InfomationTitle>
                                    <InfomationForm>
                                        <ModalChiTietItem>
                                            <FormSpan>?????a ch??? email:</FormSpan>
                                            <FormInput type="email" onChange={(e) => { setEmailNguoiMuaNoUser(e.target.value) }} placeholder="Email c???a b???n l??" />
                                        </ModalChiTietItem>
                                        <ModalChiTietItem>
                                            <FormSpan>H??? t??n:</FormSpan>
                                            <FormInput type="text" onChange={(e) => { setHoTenNguoiMuaNoUser(e.target.value) }} placeholder="H??? t??n c???a b???n l??" />
                                        </ModalChiTietItem>
                                        <ModalChiTietItem>
                                            <FormSpan>S??? ??i???n tho???i:</FormSpan>
                                            <FormInput type="text" onChange={(e) => { setSdtNguoiMuaNoUser(e.target.value) }} placeholder="S??? ??i???n tho???i c???a b???n l??" />
                                        </ModalChiTietItem>
                                        <ModalChiTietItem>
                                            <FormSpan>?????a ch???:</FormSpan>
                                            <FormInput type="text" onChange={(e) => { setDiaChiNguoiMuaNoUser(e.target.value) }} placeholder="?????a ch??? c???a b???n l??" />
                                        </ModalChiTietItem>
                                        <ModalChiTietItem >
                                            <FormSpan>Thu???c t???nh:</FormSpan>
                                            <FormSelect onChange={(e) => { setMaThanhPhoNoUser(e.target.value) }}>
                                                <FormOption value="">-- Ch???n th??nh ph??? --</FormOption>
                                                {mangTinhThanhPhoNoUser.map((tinhthanhpho, key) => {
                                                    return (
                                                        <FormOption value={tinhthanhpho.mathanhpho}> {tinhthanhpho.tenthanhpho} </FormOption>
                                                    )
                                                })}
                                            </FormSelect>
                                        </ModalChiTietItem>
                                        <ModalChiTietItem >
                                            <FormSpan>Thu???c huy???n:</FormSpan>
                                            <FormSelect onChange={(e) => { setMaQuanHuyenNoUser(e.target.value) }}>
                                                {
                                                    mangQuanHuyenNoUser.length > 0
                                                        ?
                                                        mangQuanHuyenNoUser.map((quanhuyen, key) => {
                                                            return (
                                                                <FormOption value={quanhuyen.maquanhuyen}> {quanhuyen.tenquanhuyen} </FormOption>
                                                            )
                                                        })
                                                        :
                                                        <FormOption value="">-- B???n ch??a ch???n Th??nh ph??? -- </FormOption>
                                                }
                                            </FormSelect>
                                        </ModalChiTietItem>
                                        <ModalChiTietItem >
                                            <FormSpan>Thu???c x??:</FormSpan>
                                            <FormSelect onChange={(e) => { setMaXaNoUser(e.target.value) }}>
                                                {
                                                    mangXaPhuongThiTranNoUser.length > 0
                                                        ?
                                                        mangXaPhuongThiTranNoUser.map((xaphuong, key) => {
                                                            return (
                                                                <FormOption value={xaphuong.maxa}> {xaphuong.tenxa} </FormOption>
                                                            )
                                                        })
                                                        :
                                                        <FormOption value="">-- B???n ch??a ch???n Huy???n </FormOption>
                                                }
                                            </FormSelect>
                                        </ModalChiTietItem>
                                        <ModalChiTietItem>
                                            <FormSpan>Ghi ch??:</FormSpan>
                                            <FormTextArea rows="3" onChange={(e) => { setGhiChuNoUser(e.target.value) }} placeholder="Ghi ch?? v??? ????n ?????t h??ng n??y" />
                                        </ModalChiTietItem>
                                    </InfomationForm>
                                    <Total>
                                        <TotalItem>
                                            <p>T???ng ti???n th?? c??ng</p>
                                            <p>{format_money((cart.tongtiengiohang).toString())} VN??</p>
                                        </TotalItem>
                                        <TotalItem>
                                            <p>Ph?? v???n chuy???n</p>
                                            <p>0.00 VN??</p>
                                        </TotalItem>
                                        <TotalItem>
                                            <p style={{ color: "var(--color-primary)", fontWeight: "bold" }}>T???ng c???ng</p>
                                            <p style={{ color: "var(--color-primary)", fontWeight: "bold" }}>{format_money((cart.tongtiengiohang).toString())} VN??</p>
                                        </TotalItem>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <ButtonContainer>
                                                <Button
                                                    onClick={() => {
                                                        DatMua({
                                                            manguoimua: "0",
                                                            maxa: maXaNoUser,
                                                            hotendathang: hoTenNguoiMuaNoUser,
                                                            emaildathang: emailNguoiMuaNoUser,
                                                            sdtdathang: sdtNguoiMuaNoUser,
                                                            diachidathang: diaChiNguoiMuaNoUser,
                                                            ghichudathang: ghiChuNoUser,
                                                            tongtiendathang: cart.tongtiengiohang,
                                                            giohang: cart.products
                                                        })
                                                    }}
                                                >?????t mua</Button>
                                            </ButtonContainer>
                                            <Link to="/">
                                                <ButtonContainer>
                                                    <Button>Tr??? l???i</Button>
                                                </ButtonContainer>
                                            </Link>
                                        </div>
                                    </Total>
                                </Box2>
                        }
                    </Wrapper>


            {/* === TOAST === */}
            <Toast
                ref={toastRef}
                dataToast={dataToast}   // Th??ng tin c???n hi???n l??n: ?????i t?????ng { message,type }
            />
            <Footer />
        </Container>
    );
};

export default DatMua;
