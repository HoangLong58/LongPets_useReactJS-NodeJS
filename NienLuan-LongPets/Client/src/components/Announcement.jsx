import styled from "styled-components";
import React from 'react';

const Container = styled.div`
    width: 100%;
    height: 30px;
    background-color: #fe6433;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
`

const {useState, useEffect} = React;
const width = window.innerWidth;

const Maquree = ({title, text}) => {
    const [pos,setPos] = useState(0);   
    const [run, setRun] = useState(true);
    const scrollEff = () => {
        if(run) setPos(p=>p<width? p+1: -width);        
    }
    
    useEffect(() => {
        const tm = setTimeout(scrollEff, 10);
        return () => clearTimeout(tm);
    },[pos]);
    
    const onMouseEnter = (e) => {
        // console.log("mouse enter");
        setRun(false);
    }
    
    const onMouseLeave = (e) => {
        // console.log("mouse leave");
        setRun(true);
        setPos(pos+1); // to trigger useEffect 
    }
    
    const styles = {
        position: "relative", 
        fontSize: "1em",
        right: pos + "px"
    };
    
    return (
        <h1 style={styles} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave} 
        ><mark>{title}</mark> {text}</h1>
    )
}

const Announcement = () => {
    return (
        <Container>
            <Maquree title="LONGPETS" text="Siêu sale sập sàn 8/3 !!!"/>
        </Container>
    );
};

export default Announcement;
