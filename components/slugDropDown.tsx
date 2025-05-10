import { useState } from "react"
import { useDispatch } from "react-redux";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { setSubmissions } from "@/store/submissionsSlice";
import { useRouter } from "next/navigation";
import { fetchTagsBySlug,fetchQuestionsAll ,fetchSubmissionsBySlug} from "@/app/api/content";

type Question = {
    Slug: string
    Title: string
    Description: string
  }

export default function SlugDropdown() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false)

    const fetchTags = async (slug: string) => {
      const {data, error} = await fetchTagsBySlug(slug)
        if( error) {
          console.error('Error trying to fetch tags:',error)
        }
        return data
    }
    const fetchItems = async () => {
      if (fetched || loading) return
      setLoading(true)
      const { data, error } = await fetchQuestionsAll()
  
      if (error) {
        console.error("Error fetching:", error)
      } else {
        // sort the questions in ascending order
        const sortedQuestions = (data.questions as Question[]).sort((a, b) => a.Title.localeCompare(b.Title));
        setQuestions(sortedQuestions)
        setFetched(true)
      }
  
      setLoading(false)
    }
    const handleSelect = async (value: string) => {
        const { data, error } = await fetchSubmissionsBySlug(value)
        if (error) {
            console.error("Error trying to fetch solution:", error)
        } else {
            let flattenedData = await Promise.all(
              (data.submissions ?? []).map(async (item: any) => {
                const tagsData = await fetchTags(item.Submission?.Question_Slug);
                return {
                  submission_id: item.Submission?.Submission_ID,
                  code: item.Submission?.Code,
                  question_slug: item.Submission?.Question_Slug,
                  tags: tagsData.tags,
                  submitted_at: item.Submission?.Submitted_At,
                  title: item.Question?.Title,
                  description: item.Question?.Description,
                };
              })
            );
            dispatch(setSubmissions(flattenedData)); // changed the context to this elected data
            router.push(`/submissions/${flattenedData[0]?.question_slug}`); // Redirect to submission details
        }
    }
    return (
      <Select onOpenChange={(open) => open && fetchItems()} onValueChange={handleSelect}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder={loading ? "Loading..." : "Select a question"} />
        </SelectTrigger>
        <SelectContent>
          {questions.map((item) => (
            <SelectItem key={item.Slug} value={item.Slug}>
              {item.Title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }