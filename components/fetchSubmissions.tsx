import { createClient } from '@/utils/supabase/client';
import { updateCurrentTags, updateCount, setSubmissions} from "@/store/submissionsSlice";

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
const flattenData = async (data: any) => {
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
  return { currentTags, flattenedData };
}

export async function fetchSubmissionsCount(dispatch: any) {
  const {data, error,count} = await supabase
    .from('leetcode_questions')
    .select('*', { count: 'exact', head: true })
  if (error) {
    console.error('Supabase error:', error.message);
  }
  dispatch(updateCount(count ? count : 0));
}

export async function fetchSubmissionsRange(from: number, to:number, dispatch: any) {
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
  if (error) {
    console.error('Supabase error:', error.message);
  }
  // flatten data structure
  const { currentTags, flattenedData } = await flattenData(data);
  // dispatch the current tags to the redux store
  dispatch(updateCurrentTags(Array.from(currentTags, ([tag, count]) => ({ tag, count }) )));
  dispatch(setSubmissions(flattenedData));
} 

export async function fetchSubmissionsForDay(targetDate: string, dispatch: any) {
  const startOfDay = `${targetDate}T00:00:00`;
  const endOfDay = `${targetDate}T23:59:59`;

  const { data, error , count} = await supabase
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

  if (error) {
    console.error('Supabase error:', error.message);
    return [];
  }
  // flatten data structure
  const { currentTags, flattenedData } = await flattenData(data);
  // dispatch the current tags to the redux store
  dispatch(updateCurrentTags(Array.from(currentTags, ([tag, count]) => ({ tag, count }) )));
  dispatch(updateCount(count ? count : 0));
  dispatch(setSubmissions(flattenedData));
}
