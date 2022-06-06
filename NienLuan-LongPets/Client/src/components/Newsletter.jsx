import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`

const Desc = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({ textAlign: "center" })}
`

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobile({ width: "80%" })}
`

const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: var(--color-primary);
    color: white;
`

const Newsletter = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Bạn sẽ nhận được thông báo sớm nhất về những thú cưng mới!!!</Desc>
            <InputContainer>
                <Input placeholder="Email của bạn ..." />
                <Button onClick={() => {navigate("/")}}>
                    <Send />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter