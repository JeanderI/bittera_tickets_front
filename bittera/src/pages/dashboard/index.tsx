import { useEffect, useState } from "react"
import { AuthService } from "../../context/UserContext";
import { api } from "../../services/api";


export const Dashboard = () => {
    const [tickets, setTickets] = useState([])


    useEffect(() => {
		(async () => {
			const user = await AuthService.getUserInfo();

			if (user) {
				const userId = user.id;

				const response = await api.get(`listening/user/${userId}`);
				setTickets(response.data);
			}
		})();
	}, []);
    
    return(
        <h1>ola isaquinho</h1>
        
    )
}

