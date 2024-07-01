import { GiExitDoor } from "react-icons/gi";
import { HeaderContainer } from "./styles";
import logo from "../../assets/LogoBittera.jpg";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("tickets:token");
    navigate("/");
  };

  return (
    <HeaderContainer>
      <img src={logo} alt="Logo" />
      <ul>
        <li>
          <Link to="/sistemas">Sistemas</Link>
        </li>
        <li>
          <Link to="/lojas">Lojas</Link>
        </li>
        <li>
          <Link to="/gerentes">Gerentes</Link>
        </li>

        <li>
          <Link to="/dashboard">Tickets</Link>
        </li>
      </ul>
      <button onClick={handleLogout}>
        <GiExitDoor />
      </button>
    </HeaderContainer>
  );
};
