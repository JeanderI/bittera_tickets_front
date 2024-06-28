import styled from "styled-components";

export const HeaderContainer = styled.header`
    background-color: white;
    height: 50px;
    display: flex;
    justify-content: space-between;

    img{
        width: 100px;
        height: 50px;
    }

    button{
        background-color: transparent;
        border: transparent;

        svg{
            width: 50px;
            height: 30px;
        }
    }

    ul{
        list-style: none;
        display: flex;
        align-items: center;
        width: 70%;
        justify-content: space-around;

        a{
            text-decoration: none;
            color: black;
            font-weight: bold;
        }
    }

    
`
