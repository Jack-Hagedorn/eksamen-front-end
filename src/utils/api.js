import axios from "axios";

export const API_MAIN = axios.create({
	baseURL: "https://hagedorn.live/Eksamen/api/",
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
});
