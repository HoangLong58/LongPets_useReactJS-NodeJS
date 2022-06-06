import { Add, Remove, Close } from '@material-ui/icons';
import styled from 'styled-components';
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import format_money from "../utils"
import axios from 'axios';
import { useEffect, useState } from 'react';
import MiniImage from "../components/MiniImage";
import { themSanPham, capNhatSanPham } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`

// TOP
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === "filled" && "none"};
  background-color: ${props =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${props => props.type === "filled" && "white"};
`

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`

// BOTTOM
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`
// Thông tin
const Info = styled.div`
    flex: 3;
`

// Thông tin - Thông tin sản phẩm
const Product = styled.div`
    width: 100%;
    display: flex;
    border: 1px solid white;
    justify-content: space-between;
    position: relative;
    ${mobile({ flexDirection: "column" })}
    &:hover {
      border: 1px solid #333;
    }
`

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`

const Image = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`
// Thông tin - Thông tin giá
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`

const Hr = styled.hr`
    background-color: #adb5bd;
    border: none;
    height: 1px;
`

// Tóm tắt
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`

const RemoveProduct = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 12px;
    &:hover .remove-product{
      color: #878788;
      cursor: pointer;
    }
`

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const [hinhanh, setHinhAnh] = useState([]);

  const dispatch = useDispatch();

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag ({cart.soluonggiohang})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <Link to="/datmua">
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Link>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product => {
              const handleRemove = (soluongcapnhat) => {
                dispatch(capNhatSanPham({ ...product, soluongcapnhat }));
              }
              return (
                <>
                  <Product>
                    <ProductDetail>
                      <MiniImage item={product.data[0].mathucung}></MiniImage>
                      <Details>
                        <ProductName><b style={{ marginRight: "10px" }}>Tiêu đề:</b>{product.data[0].tieude}</ProductName>
                        <ProductId><b style={{ marginRight: "5px" }}>Phân loại:</b> {product.data[0].tendanhmuc}</ProductId>
                        <ProductId><b style={{ marginRight: "5px" }}>Tên thú cưng:</b> {product.data[0].tenthucung}</ProductId>
                        <ProductId><b style={{ marginRight: "5px" }}>ID:</b> {product.data[0].mathucung}</ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <div onClick={() => product.soluongmua < product.data[0].soluong && handleRemove(1)}>
                          <Add />
                        </div>
                        <ProductAmount>{product.soluongmua}</ProductAmount>
                        <div onClick={() => handleRemove(-1)}>
                          <Remove />
                        </div>
                      </ProductAmountContainer>
                      <ProductPrice>{format_money((product.soluongmua * product.data[0].giamgia).toString())} <b><u>đ</u></b></ProductPrice>
                    </PriceDetail>
                    <RemoveProduct onClick={() => handleRemove(0)}><Close className="remove-product" /></RemoveProduct>
                  </Product>
                  <Hr />
                </>
              )
            })
            }
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{format_money((cart.tongtiengiohang).toString())} <b><u>đ</u></b></SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>50.000 <b><u>đ</u></b></SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-50.000 <b><u>đ</u></b></SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{format_money((cart.tongtiengiohang).toString())} <b><u>đ</u></b></SummaryItemPrice>
            </SummaryItem>
            <Link to="/datmua">
              <Button>CHECKOUT NOW</Button>
            </Link>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart