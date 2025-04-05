import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/utils/supabase/client"

type Question = {
    slug: string
    title: string
    description: string
  }

export default function SlugDropdown() {
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
  
    return (
      <Select onOpenChange={(open) => open && fetchItems()}>
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