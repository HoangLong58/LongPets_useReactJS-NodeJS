import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";


const Container = styled.div`
    background-color: #ebe2aa;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: "0px", flexDirection: "column" })}
`

const Categories = () => {
    useEffect(() => {
        const getDanhMuc = async () => {
            try {
                const res = await axios.post("http://localhost:3001/api/products/getDanhMuc",{});
                setDanhMuc(res.data);
            } catch (err) {
                console.log("Loi gi roi");
            };
        };
        getDanhMuc();
    },[]);
    
    const [danhmuc, setDanhMuc] = useState([]);
    return (
        <Container>
            {danhmuc.map(item => (
                <CategoryItem item={item} key={item.madanhmuc} />
            ))}
        </Container>
    )
}

export default Categories