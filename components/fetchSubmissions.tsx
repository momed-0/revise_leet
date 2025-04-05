import { createClient } from '@/utils/supabase/client'

const supabase = createClient();

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

  return (data ?? []).map((item: any) => ({
    submission_id: item.submission_id,
    code: item.code,
    submitted_at: item.submitted_at,
    title: item.leetcode_questions?.title,
    description: item.leetcode_questions?.description,
  }));
}
