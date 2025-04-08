import { createClient } from '@/utils/supabase/client';
import { updateCurrentTags} from "@/store/submissionsSlice";

const supabase = createClient();

const fetchTags = async (slug: string) => {
  const {data, error} = await supabase
    .from('question_tags')
    .select('tags')
    .eq('slug', slug)
    if( error) {
      console.error('Error trying to fetch tags:',error)
      return [];
    }

    return data?.[0]?.tags || [];
}
export async function fetchSubmissionsForDay(targetDate: string, dispatch: any) {
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
  const currentTags = new Map<string, number>();
  let flattenedData = await Promise.all(
    (data ?? []).map(async (item: any) => {
      const tags = await fetchTags(item.leetcode_questions?.slug);
      tags.forEach((tag: string) => {
        currentTags.set(tag, (currentTags.get(tag) ?? 0) + 1)
      });

      return {
        submission_id: item.submission_id,
        code: item.code,
        question_slug: item.leetcode_questions?.slug,
        tags: tags,
        submitted_at: item.submitted_at,
        title: item.leetcode_questions?.title,
        description: item.leetcode_questions?.description,
      };
    })
  );
  // dispatch the current tags to the redux store
  dispatch(updateCurrentTags(Array.from(currentTags, ([tag, count]) => ({ tag, count }) )));
  return flattenedData;
}
