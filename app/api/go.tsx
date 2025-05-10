export async function UseServiceAPI(
    endpoint: string,
    method: string = "GET",
    body?: any
): Promise<{ data: any; error: string | null }> {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${endpoint}`;
    const options: RequestInit = {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            return { data: null, error: `Go service request failed: ${errorText}` };
        }
        const data = await response.json();
        return { data, error: null };
    } catch (err: any) {
        return { data: null, error: err.message || "An unexpected error occurred" };
    }
}
