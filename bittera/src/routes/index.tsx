import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Store } from "../pages/store";
import { Manager } from "../pages/manager";
import { System } from "../pages/system";
import { NotFound } from "../pages/notFound";

export const RoutesMain = () => {
	return (

	<Routes>
		<Route path="/" element={<Login/>} />
		<Route path="/dashboard" element={<Dashboard/>} />
		<Route path="/lojas" element={<Store/>} />
		<Route path="/gerentes" element={<Manager/>} />
		<Route path="/register" element={<Register/>} />
		<Route path="/sistemas" element={<System/>} />
		<Route path="*" element={<NotFound />} />
	</Routes>
)}