import { createClient } from "@/utils/supabase/client";


const supabase = createClient()

export async function upsertTags(slug: string, tags: string[]) {
    const { error } = await supabase
        .from('question_tags')
        .upsert({'slug': slug, 'tags': tags})
    return {error}
}

export async function deleteTags(slug: string) {
    const { error } = await supabase
        .from('question_tags')
        .delete()
        .eq('slug', slug)
    return {error}
}

export async function fetchTagsBySlug(slug: string) {
    const { data, error } = await supabase
        .from('question_tags')
        .select('tags')
        .eq('slug', slug)
    return {data, error}
}

export async function fetchQuestionsCount() {
    const {data, error,count} = await supabase
        .from('leetcode_questions')
        .select('*', { count: 'exact', head: true })
    return {data, error, count}
}

export async function fetchSubmissionsRange(from: number, to:number) {
    const {data, error} = await supabase
        .from('leetcode_submissions')
        .select(`
            submission_id,
            code,
            submitted_at,
            leetcode_questions (
                slug,
                title,
                description
            )
        `)
        .range(from, to)
        .order('submitted_at', { ascending: false });
    return {data, error}
}

export async function fetchSubmissionsForDay(startOfDay: string, endOfDay: string) {
    const {data, error,count} = await supabase
        .from('leetcode_submissions')
        .select(`
            submission_id,
            code,
            submitted_at,
            leetcode_questions (
                slug,
                title,
                description
            )
        `, { count: 'exact' })
        .gte('submitted_at', startOfDay)
        .lte('submitted_at', endOfDay)
        .order('submitted_at', { ascending: false });
    return {data, error, count}
}

export async function fetchSubmissionsBySlug(slug: string) {
    const {data, error} = await supabase
        .from('leetcode_submissions')
        .select(`
            submission_id,
            code,
            submitted_at,
            leetcode_questions (
                slug,
                title,
                description
            )
        `)
        .eq('question_slug', slug)
    return {data, error}
}

export async function fetchQuestionsAll() {
    const { data, error } = await supabase
        .from("leetcode_questions")
        .select("slug, title, description")
    return {data, error}
}