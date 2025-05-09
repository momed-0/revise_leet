import { createClient } from "@/utils/supabase/client";
import { UseServiceAPI } from "./go";
import { isGoServiceHealthy } from "./health";

const supabase = createClient()

export async function login(username: string, password: string) {
    if(isGoServiceHealthy) {
        try {
            const {data, error} = await UseServiceAPI("/auth/login", "POST", {Username: username, Password: password});
            return {data, error};

        } catch (error) {
            console.error("API failed:", error);
        }
    }
}