import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		console.log(localStorage.token, "token");
		if (localStorage.token && localStorage.token !== "") {
			setIsLogin(true);
		} else {
			console.log("phuc");
			setIsLogin(false);
		}
	}, [localStorage.token]);

	return (
		<AuthContext.Provider value={{ auth, setAuth, setIsLogin, isLogin }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
