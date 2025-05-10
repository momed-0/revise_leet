import { UseServiceAPI } from "./go";


export async function upsertTags(slug: string, tags: string[]) {
    try {
        const {data, error } = await UseServiceAPI("/api/content/tags/editor/upsert", "POST", {Slug: slug, Tags: tags});
        return {data, error};
    
    } catch (error) {
        console.error("API failed:", error);
    }

    return {data: {}, error: null}
}

export async function deleteTags(slug: string) {
    try {
        const {data, error } = await UseServiceAPI(`/api/content/tags/editor?slug=${slug}`, "DELETE");
        return {data, error};
    
    } catch (error) {
        console.error("API failed:", error);
    }
    return {data: {}, error: null}
}

export async function fetchTagsBySlug(slug: string) {
    try {
        const {data, error } = await UseServiceAPI(`/api/content/tags?slug=${slug}`, "GET");
        return {data, error};
    
    } catch (error) {
        console.error("API failed:", error);
    }
    return {data: {}, error: null}
}

export async function fetchQuestionsCount() {
    try {
        const {data, error } = await UseServiceAPI(`/api/content/questions/count`, "GET");
        const count = data?.count || 0;
        return {data, error, count};
    } catch (error) {
        console.error("API failed:", error);
    }
    return {data: {}, error: null,count : 0}
}

export async function fetchSubmissionsRange(from: number, to:number) {
    try {
        const {data, error } = await UseServiceAPI(`/api/content/pages?from=${from}&to=${to}`, "GET");
        return {data, error};
    } catch (error) {
        console.error("API failed:", error);
    }
    return {data: {}, error: null}
}

export async function fetchSubmissionsForDay(date: string) {
    const startOfDay = `${date}T00:00:00`;
    const endOfDay = `${date}T23:59:59`;
    try {
        const {data, error } = await UseServiceAPI(`/api/content/submissions?date=${date}`, "GET");
        return {data, error, count: data?.count || 0};
    } catch (error) {
        console.error("API failed:", error);
    }
    return {data: {}, error: null, count: 0}
}

export async function fetchSubmissionsBySlug(slug: string) {
    try {
        const { data, error } = await UseServiceAPI(`/api/content/submissions/${slug}`, "GET");
        return { data, error };

    } catch (error) {
        console.error("API failed:", error);
    }
    return {data: {}, error: null}
}

export async function fetchQuestionsAll() {
    try {
        const { data, error } = await UseServiceAPI(`/api/content/questions/all`, "GET");
        return { data, error };

    } catch (error) {
        console.error("API failed:", error);
    }

    return { data: {}, error: null }
}