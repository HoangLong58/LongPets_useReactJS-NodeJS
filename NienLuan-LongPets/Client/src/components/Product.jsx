import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined, CheckRounded } from "@material-ui/icons";
import styled from "styled-components";
import format_money from "../utils";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


// const Info = styled.div`
//     opacity: 0;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     background-color: rgba(0,0,0,0.2);
//     z-index: 3;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     transition: all 0.5s ease;
//     cursor: pointer;
// `

// const Container = styled.div`
//     flex: 1;
//     margin: 5px;
//     width: 280px;
//     height: 350px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: #f5fbfd;
//     position: relative;

//     &:hover ${Info} {
//         opacity: 1;
//     }
// `
// const Circle = styled.div`
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     background-color: white;
//     position: absolute;
// `

// const Image = styled.img`
//     width: 100%;
//     height: 75%;
//     object-fit: cover;
//     z-index: 2;
// `

// const Icon = styled.div`
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     background-color: white;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin: 10px;
//     transition: all 0.5s ease;

//     &:hover {
//         background-color: #e9f5f5;
//         transform: scale(1.1);
//     }
// `

const DetailPrice = styled.span`
    font-size: 14px;
    display: block;
    position: absolute;
    top: -20px;
    left: 6px;
    background-color: white;
    color: black;
    z-index: 2;
    padding: 0 3px;
`

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`

const Container = styled.div`
    flex: 1;
    margin: 5px;
    width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    
    &:hover ${Info} {
        opacity: 1;
    };
    &:hover ${DetailPrice} {
        top: -25px;
        transition: top 0.18s;
    }
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`

const Image = styled.img`
    width: 100%;
    height: 75%;
    object-fit: cover;
    z-index: 2;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`

const Detail = styled.div`
    position: absolute;
    width: 100%;
    background-color: white;
    top: 305px;
`
const DetailTitle = styled.span`
line-height: 1.8rem;
height: 1.4rem;
margin: 0px 6px;
overflow: hidden;
display: block;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
    text-decoration: none;
    color: #1c1c1c;
`
const DetailType = styled.span`
    display: block;
text-decoration: none;
margin: 0px 6px;
color: #c5c5c5;
`
const DetailLike = styled.span`
position: absolute;
top: -295px;
left: -4px;
color: #fe6433;
z-index: 2;
background-color: currentColor;
font-size: 1.2rem;
font-weight: 500;
line-height: 1.6rem;
padding-right: 4px;
border-top-right-radius: 3px;
border-bottom-right-radius: 3px;
&::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    border-top: 3px solid currentColor;
    border-left: 3px solid transparent;
    filter: brightness(60%);
}
`

const DetailSale = styled.div`
position: absolute;
top: -305px;
right: 0;
width: 46px;
height: 46px;
background-color: rgba(255, 216, 64, 0.94);
text-align: center;
border-top-right-radius: 2px;
z-index: 2;
&::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    border-width: 0 23px 4px;
    border-style: solid;
    border-color: transparent rgba(255, 216, 64, 0.94) transparent rgba(255, 216, 64, 0.94);
}
`
const Percent = styled.span`
color: #EE4D2D;
font-weight: 600;
font-size: 1.2rem;
line-height: 1.2rem;
position: relative;
top: 2px;
right: -7px;
`
const Label = styled.span`
color: white;
font-size: 0.9rem;
line-height: 0.9rem;
position: relative;
top: 20px;
right: 27px;
font-weight: 600;
`




const Product = ({ item }) => {
    console.log(item);
    return (
        // <Container>
        //     <Circle/>
        //     <Image src={item.hinhanh}/>
        //     <Info>
        //         <Icon>
        //             <ShoppingCartOutlined/>
        //         </Icon>
        //         <Icon>
        //             <SearchOutlined/>
        //         </Icon>
        //         <Icon>
        //             <FavoriteBorderOutlined/>
        //         </Icon>
        //     </Info>
        // </Container>

        <Container styled={{ display: "flex" }}>
            <Circle />
            <Image src={item.hinhanh} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <SearchOutlined />
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined />
                </Icon>
            </Info>
            <Detail>
                <DetailPrice>
                    <strike style={{color: "#878788"}}><span style={{color: "#767677"}}>{format_money(item.giaban.toString())}<u>đ</u></span></strike>
                    <span style={{color: "#fe6433", marginLeft: "6px"}}>{format_money(item.giamgia.toString())}<u>đ</u></span> </DetailPrice>
                <DetailTitle>{item.tieude}</DetailTitle>
                <DetailType>{item.tenthucung}</DetailType>
                <DetailLike>
                    <span>V</span>
                    <span style={{ color: "white", }}><FontAwesomeIcon icon={faCheck} fontSize={"16px"}/>   Yêu thích</span>
                </DetailLike>
                <DetailSale>
                    <Percent>10%</Percent>
                    <Label>GIẢM</Label>
                </DetailSale>
            </Detail>
        </Container>

    )
}

export default Product
