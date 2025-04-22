"use client";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "@/store/store";
import CodeDisplay from "@/components/codeDisplay";
import EmptyPage from "@/components/empty-page";
import TagEditor from "@/components/TagEditor";
const SubmissionDetails = () => {
    const { slug } = useParams(); // Get the dynamic route parameter
    const submissions = useSelector((state: RootState) => state.submissions.submissions);

    const solutions = submissions.filter((sub) => sub.question_slug === slug);

    if (!solutions || solutions.length === 0) {
        return (
            <div className="w-screen-md mx-auto py-10 px-6">
                <EmptyPage text="No submission found for this question." />
             </div>
        )
    }

    return (
        <div className="max-w-screen-xl mx-auto py-10 lg:py-16 px-6 xl:px-0 flex flex-col lg:flex-col gap-12">         
          <div className="mb-8 flex-1">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{solutions[0].title}</h1>
            <TagEditor slug={solutions[0].question_slug} initialTags={solutions[0].tags} />
            <div
              className="mt-4 text-muted-foreground dark:text-gray-300 whitespace-normal"
              dangerouslySetInnerHTML={{ __html: solutions[0].description || "" }}
            />
          </div>
      
         
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Solutions</h2>
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div
                  key={solution.submission_id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm "
                >
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Solution {index + 1}</h3>
                  <div className ="overflow-x-auto max-w-full bg-gray-100 dark:bg-gray-900 rounded-md p-4">
                    <CodeDisplay code={solution.code} language="cpp" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

export default SubmissionDetails;