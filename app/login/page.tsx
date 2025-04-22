// import { LoginForm } from "@/components/login-form"

// export default function Page() {
//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <div className="w-full max-w-sm">
//         <LoginForm />
//       </div>
//     </div>
//   )
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    setError(null);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error || !data) {
      setError("Invalid username or password");
      return;
    }

    // Save authentication state in cookies
    document.cookie = `auth=true; path=/;`;  
    router.push("/home"); // Redirect to the home page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Log In</h1>
        {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
          <Button onClick={handleLogin} className="w-full bg-primary hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/80 text-white dark:text-black">
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;