"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import EmptyPage from "./empty-page";

export default function ProblemsProvider() {
    const submissions = useSelector((state: RootState) => state.submissions.submissions);
    const selectedFiltersByTag = useSelector((state: RootState) => state.submissions.filters.tags);

    if (submissions.length === 0) {
      // Render an empty state if no submissions are available
      return (
        <EmptyPage text="Try selecting a different date or searching for a specific problem."/>
      );
    }
    
    const filteredSubmissions = selectedFiltersByTag.length > 0
        ? submissions.filter((submission) => 
        submission.tags.some((tag) => selectedFiltersByTag.includes(tag)))
        : submissions;
    // deduplicate submissions based on 'slug' field
    // remove duplicates
    const uniqueSubmissions = Array.from( // map is used to store unique values
      new Map(filteredSubmissions.map((submission) => [submission.question_slug, submission])).values()
    )
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {uniqueSubmissions.map((submission) => (
        <Card
          key={submission.submission_id}
          className="shadow-sm bg-muted/40 hover:bg-muted/50 transition-colors duration-200 overflow-hidden rounded-xl border border-muted-foreground/10"
        >
          <CardHeader className="px-0 sm:px-0">
            <div className="aspect-video bg-muted rounded-t-xl" />
          </CardHeader>
    
          <CardContent className="p-4 flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {submission.tags && submission.tags.flat().map(tag => (
                  <Badge key={tag} className="bg-primary/10 text-primary">{tag}</Badge>
              ))}
            </div>
    
            <h3 className="text-xl font-semibold tracking-tight mb-2">
              <Link href={`/submissions/${submission.question_slug}`}>
                {submission.title}
              </Link>
            </h3>
    
            <div
              className="text-sm text-muted-foreground line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: submission.description?.slice(0, 300) || "",
              }}
            />
    
            <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {submission.submitted_at.split("T")[0]}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    
    )
}