"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";

export default function ProblemsProvider() {
    const submissions = useSelector((state: RootState) => state.submissions.submissions);
    
    return (
        <div className="mt-4 space-y-12">
            
        {submissions.map((submission) => (
          <Card
            key={submission.submission_id}
            className="flex flex-col sm:flex-row sm:items-center shadow-none overflow-hidden rounded-md border-none"
          >
            <CardHeader className="px-0 sm:p-0">
              <div className="aspect-video sm:w-56 sm:aspect-square bg-muted rounded-lg" />
            </CardHeader>
            <CardContent className="px-0 sm:px-6 py-0 flex flex-col">
              <div className="flex items-center gap-6">
                <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
                  Technology
                </Badge>
              </div>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                <Link href={`/submissions/${submission.question_slug}`}>
                    {submission.title}
                </Link>
              </h3>
              <div
                className="mt-2 text-muted-foreground line-clamp-3 text-ellipsis"
                dangerouslySetInnerHTML={{ __html: submission.description?.slice(0, 300) || "" }}
                />
              <div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {submission.submitted_at.split("T")[0]}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
}