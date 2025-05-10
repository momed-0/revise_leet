import { UseServiceAPI } from "./go";

export async function login(username: string, password: string) {

    try {
        const { data, error } = await UseServiceAPI("/auth/login", "POST", { Username: username, Password: password });
        return { data, error };
    } catch (error) {
        console.error("API failed:", error);
    }

    return { data: {}, error: null }
}