import { Badge } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from "../responsive";
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';
import MiniCart from './MiniCart';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/callsAPI';
import MiniCartImage from './MiniCartImage';
import axios from 'axios';

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`

// Left
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Lannguage = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
    position: relative;
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })};
`

const SearchProduct = styled.div`
position: absolute;
top: calc(100% + 3px);
left: 0;
width: calc(100% + 285px);
background-color: var(--color-white);
border-radius: 2px;
box-shadow: 0 1px 5px rgb(189, 189, 189);
display: block;
overflow: hidden;
z-index: 199;
&::after {
    content: "";
    display: block;
    width: 100%;
    height: 10px;
    position: absolute;
    top: -10px;
    left: 0;
}
`
const SearchProductHeading = styled.h3`
margin: 6px 12px;
font-size: 1.2rem;
color: #999;
font-weight: 400;
`
const SearchProductList = styled.ul`
padding-left: 0;
list-style: none;
max-height: 56vh;
overflow-y: auto;
`
const SearchProductItem = styled.li`
height: auto;
padding: 0 12px;
display: flex;
justify-content: center;
align-items: center;
position: relative;
&:hover{
    background-color: #fafafa;
    margin-left: 10px;
    transition: all 0.5s ease;
    &::after{
        display: block;
    }
}
&::after {
    content: "";
    display: none;
    position: absolute;
    top: 0px;
    left: -10px;
    width: 10px;
    height: 79px;
    background-color: #fe6433;
}
`

// Center
const Center = styled.div`
    flex: 1;  
    text-align: center;  
`

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}
`

// Right
const Right = styled.div`
    flex: 1;    
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: "2", justifyContent: "center" })}
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`


const NavbarUserImage = styled.img`
    margin-right: 2px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
`
const NavbarUserName = styled.span`
    margin-left: 4px;
    font-size: 1.2rem;
    font-weight: 500;
`
const NavbarUserMenu = styled.ul`
    position: absolute;
    z-index: 1;
    padding-left: 0;
    top: calc(100% + 6px);
    right: 0;
    width: 180px;
    border-radius: 2px;
    background-color: white;
    list-style: none;
    // box-shadow: 0 1px 2px #e0e0e0;
    display: none;
    box-shadow: 0 1px 3rem 0 rgba(0, 0, 0, 0.2);
    animation: fadeIn ease-in 0.2s;
    &::before {
        content: "";
        border-width: 8px 14px;
        border-style: solid;
        border-color: transparent transparent white transparent;
        position: absolute;
        right: 20px;
        top: -16px;
    }
    &::after {
        content: "";
        display: block;
        position: absolute;
        top: -6px;
        right: 0;
        width: 100%;
        height: 8px;
    }
`
// USER
const NavbarUser = styled.div`
    display: flex;
    justify-items: center;
    position: relative;
    &:hover ${NavbarUserMenu} {
        display: block;
    }
`

const NavbarUserItem = styled.li`
    text-decoration: none;
    color: #333;
    font-size: 1.1rem;
    padding: 6px 0px;
    display: block;
`
const NavbarUserItemLi = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    margin: 0 10px 10px 0;
    color: black;
    background-color: #e9ecef;
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    font-weight: 500;
    position: relative;
    &:hover {
        color: white;
        background-color: black;
        text-decoration: none;
        transition: color 0.5s, background-color 0.56s;
        &::after{
            display: block;
        }
    }
    &::after {
        content: "";
        display: none;
        position: absolute;
        top: -1px;
        left: -4px;
        width: 3%;
        height: 29px;
        background-color: #fe6433;
    }
`

const ItemInfo = styled.div`
    width: 100%;
    margin-right: 12px;
`;
const ItemHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const ItemName = styled.h5`
    font-size: 1.1rem;
    line-height: 1.2rem;
    max-height: 2.4rem;
    overflow: hidden;
    font-weight: 500;
    color: black;
    margin: 0;
    flex: 1;
    padding-right: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: left;
`;

const ItemBody = styled.div`
    display: flex;
    justify-content: space-between;
`;
const ItemDescription = styled.span`
    color: #757575;
    font-size: 1.1rem;
    font-weight: 300;
`;

const Navbar = () => {
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    // Gọi hàm đăng xuất - callAPI.js-redux
    const handleDangXuat = () => {
        logout(dispatch, user);
    }

    // Tìm kiếm 
    const [timKiem, setTimKiem] = useState("");
    const [thuCungTimKiem, setThuCungTimKiem] = useState([]);
    // Tìm kiếm     // Hàm đóng mở Kết quả tìm kiếm
    const timKiemRef = useRef();
    const closeTimKiem = () => {
        setThuCungTimKiem([]);
        timKiemRef.current.value = "";
        setTimKiem("");
    }

    useEffect(() => {
        const getThuCungTimKiem = async () => {
            try {
                if (timKiem !== "") {
                    const thucungtimkiemres = await axios.post("http://localhost:3001/api/products/getThuCungTimKiem", { tenthucung: timKiem });
                    console.log("Kết quả tìm kiếm: ", thucungtimkiemres, timKiem);
                    setThuCungTimKiem(thucungtimkiemres.data);
                }
            } catch (err) {
                console.log("Có lỗi khi tìm kiếm thú cưng");
            }
        }
        getThuCungTimKiem();
        return () => {
            setThuCungTimKiem([]);
        }
    }, [timKiem])
    console.log("Mảng tìm kiếm thú cưng: ", thuCungTimKiem);
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Lannguage>EN</Lannguage>
                    <SearchContainer>
                        <Input ref={timKiemRef} placeholder="Tìm kiếm tên thú cưng ..." onChange={(e) => { setTimKiem(e.target.value) }} />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                        {
                            timKiem !== ""
                                ?
                                <SearchProduct onMouseLeave={() => {closeTimKiem()}}>
                                    <SearchProductHeading>Kết quả tìm kiếm</SearchProductHeading>
                                    <SearchProductList>
                                        {
                                            thuCungTimKiem
                                                ?
                                                thuCungTimKiem.map((thucung, key) => {
                                                    return (
                                                        <Link to={`/product/${thucung.mathucung}`} style={{ textDecoration: "none" }}>
                                                            <SearchProductItem>
                                                                <MiniCartImage item={thucung.mathucung}></MiniCartImage>
                                                                <ItemInfo>
                                                                    <ItemHead>
                                                                        <ItemName>{thucung.tieude}</ItemName>
                                                                    </ItemHead>
                                                                    <ItemBody>
                                                                        <ItemDescription>
                                                                            Phân loại: {thucung.tendanhmuc}
                                                                        </ItemDescription>
                                                                    </ItemBody>
                                                                </ItemInfo>
                                                            </SearchProductItem>
                                                        </Link>
                                                    );
                                                }) : null
                                        }
                                    </SearchProductList>
                                </SearchProduct>
                                : null
                        }
                    </SearchContainer>
                </Left>
                <Center>
                    <Link
                        style={{ textDecoration: "none", color: "#fe6433" }}
                        to="/">
                        <Logo>LONGPETS</Logo>
                    </Link>
                </Center>
                <Right>
                    {
                        user ?
                            (
                                <MenuItem >
                                    <NavbarUser>
                                        <NavbarUserImage src={user.hinhdaidien ? user.hinhdaidien : "https://avatars.githubusercontent.com/u/96277352?s=400&u=cad895ff2f6ae2bd57b90ad02c6077d89bc9d55d&v=4"}></NavbarUserImage>
                                        <NavbarUserName>{user.hotennguoimua}</NavbarUserName>
                                        <NavbarUserMenu>
                                            <NavbarUserItem>
                                                <Link
                                                    style={{ textDecoration: "none", width: "100%" }}
                                                    to='/capnhatthongtin'>
                                                    <NavbarUserItemLi style={{ marginTop: "10px" }}>
                                                        Cập nhật thông tin
                                                    </NavbarUserItemLi>
                                                </Link>
                                                <Link
                                                    style={{ textDecoration: "none", color: "black" }}
                                                    to='/donmua'>
                                                    <NavbarUserItemLi>
                                                        Đơn mua của bạn
                                                    </NavbarUserItemLi>
                                                </Link>
                                                <NavbarUserItemLi onClick={() => handleDangXuat()}>Đăng xuất</NavbarUserItemLi>
                                            </NavbarUserItem>
                                        </NavbarUserMenu>
                                    </NavbarUser>
                                </MenuItem>
                            )
                            :
                            (
                                <>
                                    <Link
                                        style={{ textDecoration: "none", color: "black" }}
                                        to='/register'>
                                        <MenuItem>ĐĂNG KÝ</MenuItem>
                                    </Link>
                                    <Link
                                        style={{ textDecoration: "none", color: "black" }}
                                        to='/login'>
                                        <MenuItem>ĐĂNG NHẬP</MenuItem>
                                    </Link>
                                </>
                            )
                    }
                </Right>
                {/* <Link 
                        style={{ textDecoration: "none", color: "black" }}
                        to='/register'>
                        <MenuItem>ĐĂNG KÝ</MenuItem>
                    </Link>
                    <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to='/login'>
                        <MenuItem>ĐĂNG NHẬP</MenuItem>
                    </Link>
                    // <MenuItem >
                    //     <NavbarUser>
                    //         <NavbarUserImage src="https://avatars.githubusercontent.com/u/96277352?s=400&u=cad895ff2f6ae2bd57b90ad02c6077d89bc9d55d&v=4"></NavbarUserImage>
                    //         <NavbarUserName>Trương Hoàng Long</NavbarUserName>
                    //         <NavbarUserMenu>
                    //             <NavbarUserItem>
                    //                 <Link
                    //                     style={{ textDecoration: "none", width: "100%" }}
                    //                     to='/capnhatthongtin'>
                    //                     <NavbarUserItemLi style={{marginTop: "10px"}}>
                    //                         Cập nhật thông tin
                    //                     </NavbarUserItemLi>
                    //                 </Link>
                    //                 <Link
                    //                     style={{ textDecoration: "none", color: "black" }}
                    //                     to='/donmua'>
                    //                     <NavbarUserItemLi>
                    //                         Đơn mua của bạn
                    //                     </NavbarUserItemLi>
                    //                 </Link>
                    //                 <NavbarUserItemLi>Đăng xuất</NavbarUserItemLi>
                    //             </NavbarUserItem>
                    //         </NavbarUserMenu>
                    //     </NavbarUser>
                    // </MenuItem>
                    <MenuItem >
                        <MiniCart>
                        </MiniCart>
                    </MenuItem>
                </Right>*/}
                <MenuItem >
                    <MiniCart>
                    </MiniCart>
                </MenuItem>
            </Wrapper>
        </Container >
    );
};

export default Navbar;
