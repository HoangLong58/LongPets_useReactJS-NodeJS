import React, { useState } from 'react';
import styled from 'styled-components';
import Aside from "../components/Dashboard/Aside";
import DanhMucMain from '../components/QuanLyDanhMuc/DanhMucMain';
import DanhMucRight from '../components/QuanLyDanhMuc/DanhMucRight';

const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 14rem auto 23rem;
`

const QuanLyDanhMuc = () => {
    const [reRenderData, setReRenderData] = useState(true);   // State để Compo DanhMucRight và DanhMucMain thay đổi Effect
    return (
        <Container>
            <Aside active="quanlydanhmuc" />
            <DanhMucMain reRenderData={reRenderData} setReRenderData={setReRenderData} />
            <DanhMucRight reRenderData={reRenderData} setReRenderData={setReRenderData} />
        </Container>
    )
}

export default QuanLyDanhMuc;