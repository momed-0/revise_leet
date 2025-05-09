import { updateCurrentTags, updateCount, setSubmissions} from "@/store/submissionsSlice";
import { fetchTagsBySlug, fetchQuestionsCount, fetchSubmissionsForDay, fetchSubmissionsRange } from '@/app/api/content';


const fetchTags = async (slug: string) => {
  const {data, error} = await fetchTagsBySlug(slug);
    if( error) {
      console.error('Error trying to fetch tags:',error)
      return [];
    }

    return data?.tags || [];
}
const flattenData = async (data: any) => {
  // flatten data structure
  const currentTags = new Map<string, number>();
  let flattenedData = await Promise.all(
    (data ?? []).map(async (item: any) => {
      const tags = await fetchTags(item.Submission?.Question_Slug);
      tags.forEach((tag: string) => {
        currentTags.set(tag, (currentTags.get(tag) ?? 0) + 1)
      });

      return {
        submission_id: item.Submission?.Submission_ID,
        code: item.Submission?.Code,
        question_slug: item.Submission?.Question_Slug,
        tags: tags,
        submitted_at: item.Submission?.Submitted_At,
        title: item.Question?.Title,
        description: item.Question?.Description,
      };
    })
  );
  return { currentTags, flattenedData };
}

export async function FetchQuestionsCount(dispatch: any) {
  const {data, error,count} = await fetchQuestionsCount();
  if (error) {
    console.error('API error:', error);
  }
  dispatch(updateCount(count ? count : 0));
}

export async function FetchSubmissionsRange(from: number, to:number, dispatch: any) {
  const {data, error} = await fetchSubmissionsRange(from, to);
  if (error) {
    console.error('API error:', error);
  }
  // flatten data structure
  const { currentTags, flattenedData } = await flattenData(data.submissions);
  // dispatch the current tags to the redux store
  dispatch(updateCurrentTags(Array.from(currentTags, ([tag, count]) => ({ tag, count }) )));
  dispatch(setSubmissions(flattenedData));
} 

export async function FetchSubmissionsForDay(targetDate: string, dispatch: any) {

  const { data, error , count} = await fetchSubmissionsForDay(targetDate);

  if (error) {
    console.error('API error:', error);
    return [];
  }
  // flatten data structure
  const { currentTags, flattenedData } = await flattenData(data.submissions);
  // dispatch the current tags to the redux store
  dispatch(updateCurrentTags(Array.from(currentTags, ([tag, count]) => ({ tag, count }) )));
  dispatch(updateCount(count ? count : 0));
  dispatch(setSubmissions(flattenedData));
}
