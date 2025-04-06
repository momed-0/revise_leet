import { createClient } from '@/utils/supabase/client'

const supabase = createClient();
const fetchTags = async (slug: string) => {
  const {data, error} = await supabase
    .from('question_tags')
    .select('tags')
    .eq('slug', slug)
    if( error) {
      console.error('Error trying to fetch tags:',error)
    }

    return data
}
export async function fetchSubmissionsForDay(targetDate: string) {
  const startOfDay = `${targetDate}T00:00:00`;
  const endOfDay = `${targetDate}T23:59:59`;

  const { data, error } = await supabase
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
    .gte('submitted_at', startOfDay)
    .lte('submitted_at', endOfDay)
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error.message);
    return [];
  }
  // flatten data structure
  let flattenedData = await Promise.all(
    (data ?? []).map(async (item: any) => {
      const tagsData = await fetchTags(item.leetcode_questions?.slug);
      return {
        submission_id: item.submission_id,
        code: item.code,
        question_slug: item.leetcode_questions?.slug,
        tags: tagsData?.map(tag => tag.tags) || [],
        submitted_at: item.submitted_at,
        title: item.leetcode_questions?.title,
        description: item.leetcode_questions?.description,
      };
    })
  );
  return flattenedData;
}
