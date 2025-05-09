import { createClient } from "@/utils/supabase/client";


const supabase = createClient()

export async function login(username: string, password: string) {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();
    
    return { data ,error};
}