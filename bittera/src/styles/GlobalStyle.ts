import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,800&family=Tilt+Neon&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
  :root {
    --silver: #D3D3D3;
    --silver-2: #A9A9A9;
    --silver-3: #696969;
    --color-blue-3: #2E3D57;
    --dark-blue: #191970;
    --dark-blue-2: #0e273c;
    
    font-size: 60%;
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, html {
    width: 100vw;
    height: 100vh;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background: var(--silver);
  }

  h1, h2, h3, h4, h5, h6, strong {
    color: black;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }
`;