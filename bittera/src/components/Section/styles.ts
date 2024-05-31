import styled from "styled-components";

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
export const ListTags = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 0px 20px 10px;

    p{  
        width: 100px;
        max-width: 15%;
        font-family: "Oswald", sans-serif;
        font-weight: bold;
    }
`

export const Item = styled.li`
    background-color: white;
    display: flex;
    justify-content: space-between;
    color: black;
    padding: 20px 0px 20px 10px;
    border-radius: 10px;

    p{  
        width: 100px;
        max-width: 15%;
    }
`

export const ContainerMenu = styled.div`
    display: flex;
    align-items: center;
    height: 100px;

    h1{
        font-family: "Oswald", sans-serif;
    }
    
`
export const ContainerButton = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 20px;
    justify-content: flex-end;
`
export const ContainerSearch = styled.div`
    background-color: white;
    align-items: center;
    display: flex;
    border-radius: 8px;
    padding: 4px;
    

    input{
        border: none;
        height: 30px;
        padding: 5px;
    }
`

export const ButtonAdd = styled.button`
    padding: 10px;
    border: none;
    border-radius: 8px;

`

export const Section = styled.section`
    display: flex;
    justify-content: center;
`

export const ContainerSection = styled.div`
    width: 96%;
`