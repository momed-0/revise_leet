import { useState } from "react"
import { useDispatch } from "react-redux";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { setSubmissions } from "@/store/submissionsSlice";
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation";

type Question = {
    slug: string
    title: string
    description: string
  }

export default function SlugDropdown() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false)

    const supabase = createClient()

    const fetchItems = async () => {
      if (fetched || loading) return
      setLoading(true)
      const { data, error } = await supabase
        .from("leetcode_questions")
        .select("slug, title, description")
  
      if (error) {
        console.error("Error fetching:", error)
      } else {
        setQuestions(data as Question[])
        setFetched(true)
      }
  
      setLoading(false)
    }
    const handleSelect = async (value: string) => {
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
        .eq('question_slug', value)
        if (error) {
            console.error("Error trying to fetch solution:", error)
        } else {
            let flattenedData = (data ?? []).map((item: any) => ({
                submission_id: item.submission_id,
                code: item.code,
                question_slug: item.leetcode_questions?.slug,
                submitted_at: item.submitted_at,
                title: item.leetcode_questions?.title,
                description: item.leetcode_questions?.description,
              }));
            dispatch(setSubmissions(flattenedData)); // changed the context to this elected data
            router.push(`/submissions/${flattenedData[0]?.question_slug}`); // Redirect to submission details
        }
    }
    return (
      <Select onOpenChange={(open) => open && fetchItems()} onValueChange={handleSelect}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder={loading ? "Loading..." : "Select a title"} />
        </SelectTrigger>
        <SelectContent>
          {questions.map((item) => (
            <SelectItem key={item.slug} value={item.slug}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }