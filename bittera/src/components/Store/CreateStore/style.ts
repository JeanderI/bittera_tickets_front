import styled from "styled-components";

export const FormGroup = styled.div`
	margin-bottom: 20px;
`;

export const Label = styled.label`
	margin-bottom: 5px;
	font-weight: 800;
    font-family: "Oswald", sans-serif;
`;

export const Input = styled.input`
	width: 100%;
	padding: 5px;
	font-size: 1.7rem;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

export const Select = styled.select`
	width: 100%;
	padding: 5px;
	font-size: 1.7rem;
	border: 1px solid #ccc;
	border-radius: 4px;
`


export const ContainerButton = styled.div`
	display: flex;
	justify-content: center;
`;
export const SubmitButton = styled.button`
	background-color: var(--silver-3);
	color: #fff;
	padding: 10px 20px;
	font-size: 16px;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background-color: #fff;
		color: var(--silver-2);
	}
`;
