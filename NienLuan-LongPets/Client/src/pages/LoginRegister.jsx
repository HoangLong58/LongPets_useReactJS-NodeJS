import "../css/main.css";
import { CloseOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/callsAPI";

const SignIn = styled.div`
    width: 95%;
    height: 95%;
    box-shadow: 6px 6px 30px #d1d9e6;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #f8f8f8;
    box-sizing: border-box;
    overflow: hidden;
    z-index: 1;
`

const MainPage = styled.div`
    width: 100%;
    height: 100%;
    // background: linear-gradient(
    //     rgba(255,255,255,0.5), 
    //     rgba(255,255,255,0.5)
    //     ), 
    //     url("https://i.pinimg.com/originals/6c/63/82/6c638291a66ddc93b86bf4f43c337701.jpg") 
    //     center;
    background-image: url("https://i.pinimg.com/originals/6c/63/82/6c638291a66ddc93b86bf4f43c337701.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat; 
    position: relative;

    height: 100%;
    border-radius: 0px;
    /* height: 55%;
    border-radius: 0% 0% 50% 50%/ 0% 0% 30% 30%; */
    box-shadow: 2px 6px 12px #d1d9e6;

    ${SignIn}.active-sign-in & {
        height: 55%;
        border-radius: 0% 0% 50% 50%/0% 0% 20% 20%;
        animation: main 0.3s linear;
        }
    }
    ${SignIn}.active-sign-up & {
        height: 55%;
        border-radius: 0% 0% 50% 50%/0% 0% 20% 20%;
        animation: main 0.3s linear;
        }
    }
`

const TopBar = styled.div`
    width: 220px;
    height: 20px;
    background-color: #ffffff;
    position: absolute;
    left: 50%;
    top: 0px;
    transform: translateX(-50%);
    border-radius: 0px 0px 20px 20px;
`

const Title = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`

const H1 = styled.h1`
    font-weight: 600;
    font-size: 3rem;
    color: var(--color-white);
    margin: 0px;
    letter-spacing: 2px;
`

const P = styled.p`
    color: var(--color-white);
    font-size: 1.2rem;
`

const FormChucNang = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    bottom: 60px;
    transform: translateX(-50%);
    text-align: center;
    ${SignIn}.active-sign-in & {
        display: none;
        }
    }
    ${SignIn}.active-sign-up & {
        display: none;
        }
    }
`

const SignInBtn = styled.button`
    width: 230px;
    height: 42px;
    margin: 5px 0px;
    border: none;
    outline: none;
    border-radius: 20px;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 1px;
    font-weight: 700;
    box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    color: #171717;
    background-color: #ffffff;

    &:active {
        transform: scale(1.05);
    }
`

const SignInFacebookBtn = styled.button`
    width: 230px;
    height: 42px;
    margin: 5px 0px;
    border: none;
    outline: none;
    border-radius: 20px;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 1px;
    font-weight: 700;
    box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    color: #ffffff;
    background-color: #1863e7;
    margin-bottom: 20px;
    &:active {
        transform: scale(1.05);
    }
`

const SignUpBtn = styled.button`
    width: 230px;
    height: 42px;
    margin: 5px 0px;
    border: none;
    outline: none;
    border-radius: 20px;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 1px;
    font-weight: 700;
    box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    color: #171717;
    background-color: #ffffff;

    &:active {
        transform: scale(1.05);
    }   
`

const Cancel = styled.div`
    position: absolute;
    left: 50%;
    bottom: -25px;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #f8f8f8;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    box-shadow: 2px 6px 20px rgba(0, 0, 0, 0.12);
    display: none;
    ${SignIn}.active-sign-in & {
        display: flex;
    }
    ${SignIn}.active-sign-up & {
        display: flex;
    }
`

const Icon = styled.a`
    color: #111111;
    animation: cancel 0.5s;
`

const SignInPage = styled.div`
    display: none;
    width: 100%;
    height: 45%;
    ${SignIn}.active-sign-in & {
        display: flex;
}
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const Input = styled.input`
    width: 220px;
    height: 40px;
    margin: 5px 0px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    &::placeholder {
        letter-spacing: 2px;

        font-size: 15px;
    }
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    }
`

const Button = styled.button`
    width: 220px;
    height: 40px;
    margin: 10px 0px;
    border: none;
    outline: none;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 12px 12px 30px rgba(0, 0, 0, 0.1);
    &:active {
        transform: scale(1.05);
    }
    &:hover {
        background-color: #fe6433;
        color: #ffffff;
        transition: all ease 0.3s;
    }
`

const SignUpPage = styled.div`
    display: none;
    width: 100%;
    height: 45%;
    ${SignIn}.active-sign-up & {
        display: flex;
    }
    `

const BgCurcule = styled.div`
    width: 500px;
    height: 500px;
    position: absolute;
    top: -40%;
    height: 60%;
    transform: translateX(-60%);
    background-color: #ecf0f3;
    border-radius: 50%;
`

const Error = styled.span`
    color: red;
`

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`


const LoginRegister = () => {
    // --Giao di???n--
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleClose = () => {
        setIsSignIn(false);
        setIsSignUp(false);
    }

    const handleDangNhap = () => {
        setIsSignIn(true);
        setIsSignUp(false);
    }

    const handleDangKy = () => {
        setIsSignIn(false);
        setIsSignUp(true);
    }

    // --X??? l??--
    // ????ng nh???p
    const [emailnguoimua, setEmailNguoiMua] = useState("");
    const [matkhau, setMatKhau] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    // G???i h??m ????ng nh???p - callAPI.js-redux
    const handleClickDangNhap = (e) => {
        e.preventDefault();
        login(dispatch, { emailnguoimua, matkhau });
    }

    // ????ng k??
    const [tennguoimuadangky, setTenNguoiMuaDangKy] = useState();
    const [emailnguoimuadangky, setEmailNguoiMuaDangKy] = useState();
    const [matkhaudangky, setMatKhauDangKy] = useState();
    const [rematkhaudangky, setReMatKhauDangKy] = useState();
    console.log({ tennguoimuadangky, emailnguoimuadangky, matkhaudangky });
    const [trungmatkhau, setTrungMatKhau] = useState(false);
    const [wrong, setWrong] = useState(false);

    // G???i h??m ????ng k?? - callAPI.js-redux
    const handleClickDangKy = (e) => {
        if (matkhaudangky === rematkhaudangky) {
            e.preventDefault();
            console.log("Dang ky dang ky");
            try {
                register(dispatch, { tennguoimuadangky, emailnguoimuadangky, matkhaudangky, setWrong: setWrong });  //G???i qua dispatch ????? thao t??c reducers-redux & ?????i t?????ng ????ng k??
            } catch(err) {
                setWrong(true);
            }    
        } else {
            e.preventDefault();
            setTrungMatKhau(true);
        }
    }
    const handleChangeEmail = (e) => {
        setEmailNguoiMuaDangKy(e.target.value);
        setWrong(false);
    }

    const handleChangePassword = (e) => {
        setMatKhauDangKy(e.target.value);
        setTrungMatKhau(false);
    }
    const handleChangeRePassword = (e) => {
        setReMatKhauDangKy(e.target.value);
        setTrungMatKhau(false);
    }

    return (
        <SignIn className={isSignIn ? "active-sign-in" : isSignUp ? "active-sign-up" : null}>
            <MainPage>
                <TopBar />
                {/* Ti??u ????? */}
                <Title>
                    <H1>Long Pets</H1>
                    <P>Ch??o m???ng b???n ?????n v???i trang web b??n th?? c??ng h??ng ?????u Vi???t Nam</P>
                </Title>
                {/* C??c n??t ch???c n??ng */}
                <FormChucNang>
                    <SignInBtn onClick={handleDangNhap}>????ng nh???p</SignInBtn>
                    <SignInFacebookBtn>????ng nh???p v???i Facebook</SignInFacebookBtn>
                    <SignUpBtn onClick={handleDangKy}>????ng k??</SignUpBtn>
                </FormChucNang>
                {/* N??t ????ng */}
                <Cancel onClick={handleClose}>
                    <Icon><CloseOutlined /></Icon>
                </Cancel>
            </MainPage>
            {/* Trang ????ng nh???p */}
            <SignInPage>
                <Form>
                    {/* Email */}
                    <Input type="email" placeholder="Email c???a b???n"
                        onChange={(e) => setEmailNguoiMua(e.target.value)}
                    />
                    {/* M???t kh???u */}
                    <Input type="password" placeholder="M???t kh???u c???a b???n"
                        onChange={(e) => setMatKhau(e.target.value)}
                    />
                    {/* N??t ????ng nh???p */}
                    <Button onClick={handleClickDangNhap} disabled={isFetching} >????ng nh???p</Button>
                    {error && <Error>Something went wrong...</Error>}
                    <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                </Form>
            </SignInPage>
            {/* Trang ????ng k?? */}
            <SignUpPage>
                <Form>
                    {/* T??n */}
                    <Input type="text" placeholder="T??n c???a b???n"
                        onChange={(e) => setTenNguoiMuaDangKy(e.currentTarget.value)}
                    />
                    {/* Email */}
                    <Input type="email" placeholder="Email c???a b???n"
                        onChange={(e) => handleChangeEmail(e)}
                    />
                    {/* M???t kh???u */}
                    <Input type="password" placeholder="M???t kh???u c???a b???n"
                        onChange={(e) => handleChangePassword(e)}
                    />
                    {/* Re M???t kh???u */}
                    <Input type="password" placeholder="Re-M???t kh???u c???a b???n"
                        onChange={(e) => handleChangeRePassword(e)}
                    />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    {trungmatkhau && <Error>M???t kh???u kh??ng kh???p...</Error>}
                    {wrong && <Error>Email ???? t???n t???i...</Error>}
                    {/* N??t ????ng k?? */}
                    <Button onClick={(e) => handleClickDangKy(e)} >????ng k??</Button>
                </Form>
            </SignUpPage>

            {/* Background */}
            {/* <BgCurcule></BgCurcule> */}
        </SignIn>
    );
};

export default LoginRegister;