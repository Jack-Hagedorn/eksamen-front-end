import { SignIn, SignUp } from "../pages/Authentication";
import { Welcome } from "../pages/Welcome";

export const routes = [
	{
		path: "/",
		exact: true,
		component: Welcome,
	},
	{
		path: "/sign-in",
		component: SignIn,
	},
	{
		path: "/sign-up",
		component: SignUp,
	},
];
