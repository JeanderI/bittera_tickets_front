import { ToastContainer } from "react-toastify";
/* import { AxiosInterceptor } from "./components/AxiosInterceptor"; */
/* import { AuthProvider } from "./providers/AuthProvider"; */
import { RoutesMain } from "./routes";
import GlobalStyle from "./styles/GlobalStyle";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
	return (
		<>
			<GlobalStyle />
		{/* 	<AxiosInterceptor> */}
	{/* 			<AuthProvider> */}
					<RoutesMain />
			{/* 	</AuthProvider> */}
				<ToastContainer />
		{/* 	</AxiosInterceptor> */}
		</>
	);
};