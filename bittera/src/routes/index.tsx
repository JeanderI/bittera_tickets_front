import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";

export const RoutesMain = () => {
	return (<Routes>
		<Route path="/" element={<Dashboard/>} />

	</Routes>)}