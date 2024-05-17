import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./providers/AuthProvider"; 
import { RoutesMain } from "./routes";
import GlobalStyle from "./styles/GlobalStyle";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
	return (
		<>
			<GlobalStyle />
			{/* <AxiosInterceptor>  */}
				<AuthProvider> 
					<RoutesMain />
				</AuthProvider> 
				<ToastContainer />
			{/* </AxiosInterceptor>  */}
		</>
	);
};