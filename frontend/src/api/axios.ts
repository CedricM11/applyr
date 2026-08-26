import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/api",
	withCredentials: true
});

api.interceptors.response.use(
	(response) => response, 
	
	async (error) => {
		const originalRequest = error.config;

		const isAccessTokenMissing =
			error.response?.status === 401 &&
			error.response?.data?.code === "ACCESS_TOKEN_MISSING";

		if (isAccessTokenMissing && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				await api.post("/auth/refresh");

				return api(originalRequest);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
)

export default api;