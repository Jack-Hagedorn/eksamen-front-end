import axios from "axios";

export const API_MAIN = axios.create({
	baseURL: "https://3sem.dyrhoi.com/startcode-v2",
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
});
