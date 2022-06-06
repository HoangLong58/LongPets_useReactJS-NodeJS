import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons"
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
`

// Cột trái
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1`
`

const Desc = styled.p`
    margin: 20px 0px;
`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

// Cột giữa
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}

`

const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    &:hover{
        color: var(--color-primary);
        transition: all 0.5s ease;
    }
`

// Cột phải
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#fff8f8" })}
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
    const navigate = useNavigate();
    
    return (
        <Container>
            <Left>
                <Logo>LONG PETS.</Logo>
                <Desc>
                    Long Pets tâm niệm rằng thú cưng chính là những người bạn đáng quý với con người. Vì vậy, chúng tôi luôn mong muốn đem lại cho thú cưng những dịch vụ, tiện ích tốt nhất kết hợp cùng với công nghệ hiện đại để mang tới những trải nghiệm tốt nhất dành cho khách hàng.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999" >
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F" >
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE" >
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="E60023" >
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Usefull Links</Title>
                <List>
                    <ListItem onClick={() => {navigate("/")}}>Trang chủ</ListItem>
                    <ListItem onClick={() => {navigate("/cart")}}>Giỏ hàng</ListItem>
                    <ListItem onClick={() => {navigate("/products/1")}}>Chó</ListItem>
                    <ListItem onClick={() => {navigate("/products/2")}}>Mèo</ListItem>
                    <ListItem>Chim cảnh</ListItem>
                    <ListItem>Cá cảnh</ListItem>
                    <ListItem>Hamster</ListItem>
                    <ListItem>Thú cưng khác</ListItem>
                    <ListItem>Tài khoản</ListItem>
                    <ListItem>Đặt mua</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Liên hệ</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} />
                    61Đ Đinh Tiên Hoàng, Phường 8, Vĩnh Long
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} />
                    +84 929441158
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }} />
                    longb1809368@student.ctu.edu.vn
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    )
}

export default Footer