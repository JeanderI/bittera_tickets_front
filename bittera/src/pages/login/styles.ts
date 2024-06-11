import styled from "styled-components";

export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const ContainerLogin = styled.div`
	background-color: var(--silver-2);
	width: 90%;
	height: 80%;
	display: flex;
	border-radius: 10px;
	
`

export const Right = styled.div`
	background-color: #101340;
	width: 50%;
	height: 97.5%;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1%;

	img{
		max-width: 100%;

	}
`

export const Left = styled.div`
	width: 50%;
	height: 100%;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const Form = styled.form`
	
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
	width: 100%;
	height: 70%;
	justify-content: center;

	h2 {
		margin-bottom: 30px;
	}

`

export const InputLogin = styled.input`
	border: none;
	padding: 10px;
	border-radius: 3px;
`

export const ButtonLogin = styled.button`
	padding: 10px;
	margin-top: 20px;
	border-radius: 3px;
	border: none;
	width: 30%;
`
