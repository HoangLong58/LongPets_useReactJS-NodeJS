import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate  } from "react-router-dom";

const KEY = "pk_test_51KcfU1HWOpDhBVdmVE6IQkkjvSAFRNoVhB6h5301Y9UTYWsrXIJietqPsk1QNHewyvdYmFEnSl9rhePsiSkLPT1y00BRJDuyVt";
const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post("http://localhost:3001/api/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: 2000,   
                }
                );
                console.log(res.data);
                navigate("/success");
            }catch(err) {
                console.log(err);
            }
        }
        stripeToken && makeRequest();
    }, [stripeToken, navigate]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {stripeToken ? (<span>Đang xử lý...</span>) : (
                <StripeCheckout 
                    name="Long Pets."
                    image="https://iweb.tatthanh.com.vn/pic/3/blog/images/image(2068).png"
                    billingAddress
                    shippingAddress
                    description="Your total is $20"
                    amount={2000}
                    token={onToken}
                    stripeKey={KEY}
                >
                    <button
                        style={{
                            border: "none",
                            width: 120,
                            borderRadius: 5,
                            padding: "20px",
                            backgroundColor: "black",
                            color: "white",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Thanh toán
                    </button>
                </StripeCheckout>
            )}
        </div>
    );
};

export default Pay;