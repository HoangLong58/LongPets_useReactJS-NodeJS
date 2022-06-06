import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Image = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
`
const MiniImage = ({ item }) => {
    const [hinhanh, setHinhAnh] = useState([]);
    useEffect(() => {
        const getHinhAnh = async () => {
            try {
                const hinhanhthucung = await axios.post("http://localhost:3001/api/products/findImage/", {mathucung: item});
                setHinhAnh(hinhanhthucung.data[0].hinhanh);
                console.log(hinhanhthucung.data[0].hinhanh);
            } catch(err) {
                console.log("Lay miniimage that bai");
            }
        };
        getHinhAnh();
    }, []);
    // console.log(hinhanh.data[0])
    return (
        <Image src={hinhanh}></Image>
    )
}

export default MiniImage