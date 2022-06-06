import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/callsAPI";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255,255,255,0.5), 
    rgba(255,255,255,0.5)
    ), 
    url("https://i1.wp.com/idoltv-website.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2018/11/18112546/IDOLTV-hinh-nen-may-tinh-anime-one-piece-full-HD-911401.jpg?fit=1920%2C1080&ssl=1") 
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}

`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`

const Register = () => {
  const [tennguoimua, setTenNguoiMua] = useState();
  const [emailnguoimua, setEmailNguoiMua] = useState();
  const [matkhau, setMatKhau] = useState();
  const [rematkhau, setReMatKhau] = useState();
  console.log({tennguoimua, emailnguoimua, matkhau});

  const dispatch = useDispatch();

  // Gọi hàm đăng ký - callAPI.js-redux
  const handleDangKy = (e) => {
    e.preventDefault();
    console.log("Dang ky dang ky");
    register(dispatch, {tennguoimua, emailnguoimua, matkhau});  //Gửi qua dispatch để thao tác reducers-redux & đối tượng đăng ký
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" onChange={(e) => setTenNguoiMua(e.currentTarget.value)} />
          <Input placeholder="email" type="email" onChange={(e) => setEmailNguoiMua(e.currentTarget.value)} />
          <Input placeholder="password" onChange={(e) => setMatKhau(e.currentTarget.value)} />
          <Input placeholder="confirm password" onChange={(e) => setReMatKhau(e.currentTarget.value)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={(e) => handleDangKy(e)}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register