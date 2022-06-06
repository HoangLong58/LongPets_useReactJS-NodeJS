import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MiniCartImage from "./MiniCartImage";
import format_money from "../utils"
import { themSanPham, capNhatSanPham } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
    width: 150px;
    text-align: center;
`;
const Wrapper = styled.div`
    position: relative;
    display: inline-block;
    padding: 0 12px;
    cursor: pointer;
`;

const MiniCartList = styled.div`
    position: absolute;
    top: calc(100% + 7px);
    right: 1px;
    background-color: white;
    width: 400px;
    border-radius: 2px;
    box-shadow: 0 1px 3.125rem 0 rgba(0, 0, 0, 0.2);
    animation: fadeIn ease-in 0.2s;
    cursor: default;
    display: none;
    z-index: 10;
    ${Wrapper}:hover &{
        display: block;
    }
    &::after {
        content: "";
        position: absolute;
        cursor: pointer;
        right: 3px;
        top: -26px;
        border-width: 16px 20px;
        border-style: solid;
        border-color: transparent transparent white transparent;
    }
`;
const NoCartImg = styled.img`
    width: 54%;
    display: none;
`;
const NoCartMsg = styled.span`
    display: none;
    font-size: 1.4rem;
    margin-bottom: 14px;
    color: black;
`;
const Heading = styled.h4`
    text-align: left;
    margin: 8px 0 8px 12px;
    font-size: 1.1rem;
    color: #999;
    font-weight: 400;
`;
const UlItem = styled.ul`
    padding-left: 0;
    list-style: none;
    max-height: 56vh;
    overflow-y: auto;
`;
const LiItem = styled.li`
    display: flex;
    align-items: center;
    position: relative;
    &:hover {
        background-color: #f5f5f5;
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
`;
const ImgItem = styled.img`
    min-width: 50px;
    width: 50px;
    height: 50px;
    margin: 12px;
    border: 1px solid #E8E8E8;
`;
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
const ItemPriceWrap = styled.div`
    display: flex;
`;
const ItemPrice = styled.span`
    font-size: 1.1rem;
    font-weight: 400;
    color: #fe6433;
`;
const ItemMultiply = styled.span`
    font-size: 0.9rem;
    margin: 0 4px;
    color: #757575;
`;
const ItemQnt = styled.span`
    font-size: 1.1rem;
    color: #757575;
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
const Remove = styled.div`
    color: #333;
    font-size: 1.1rem;
    border: none;
    &:hover {
        font-weight: 500;
        color: #fe6433;
        cursor: pointer;
    }
`;

// const SeeCart = styled.a`
//     float: right;
//     margin: 0 12px 12px 0;
// `;

const ButtonContainer = styled.div`
    position: relative;
    float: right;
    margin: 0 22px 22px 0;
    &::after {
        content: "";
        border: 2px solid black;
        position: absolute;
        top: 5px;
        left: 5px;
        right: 20px;
        background-color: transperent;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
`

const Button = styled.button`
    padding: 10px;
    border: 2px solid black;
    background-color: black;
    color: white;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: #fe6430;
    }
    &:active {
        background-color: #333;
        transform: translate(5px, 5px);
        transition: transform 0.25s;
    }
`

const MiniCart = ({ item }) => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    return (
        <Container>
            <Wrapper>
                <Badge badgeContent={cart.soluonggiohang} color="primary">
                    <ShoppingCartOutlined style={{ color: "#fe6433" }} />
                </Badge>
                <MiniCartList>
                    <NoCartImg></NoCartImg>
                    <NoCartMsg>
                        Chưa có sản phẩm
                    </NoCartMsg>
                    <Heading>Sản phẩm đã thêm</Heading>
                    <UlItem>
                        {cart.products.map(product => {
                            const handleRemove = (soluongcapnhat) => {
                                dispatch(capNhatSanPham({ ...product, soluongcapnhat }));
                            }
                            return (
                                <>
                                    <LiItem>
                                        <MiniCartImage item={product.data[0].mathucung}></MiniCartImage>
                                        <ItemInfo>
                                            <ItemHead>
                                                <ItemName>{product.data[0].tieude}</ItemName>
                                                <ItemPriceWrap>
                                                    <ItemPrice>{format_money(product.data[0].giamgia.toString())}</ItemPrice>
                                                    <ItemMultiply>x</ItemMultiply>
                                                    <ItemQnt>{product.soluongmua}</ItemQnt>
                                                </ItemPriceWrap>
                                            </ItemHead>
                                            <ItemBody>
                                                <ItemDescription>
                                                    Phân loại: {product.data[0].tendanhmuc}
                                                </ItemDescription>
                                                <div onClick={() => handleRemove(0)}>
                                                    <Remove>Xóa</Remove>
                                                </div>
                                            </ItemBody>
                                        </ItemInfo>
                                    </LiItem>
                                </>
                            )
                        })
                        }
                    </UlItem>
                    <Link to='/cart'>
                        <ButtonContainer>
                            <Button>Xem giỏ hàng</Button>
                        </ButtonContainer>
                        {/* <SeeCart>Xem giỏ hàng</SeeCart> */}
                    </Link>
                </MiniCartList>
            </Wrapper>
        </Container>
    )
}

export default MiniCart
