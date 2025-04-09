"use client";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "@/store/store";
import CodeDisplay from "@/components/codeDisplay";
import EmptyPage from "@/components/empty-page";
import TagEditor from "@/components/TagEditor";
import SlugDropdown from "@/components/slugDropDown";
const SubmissionDetails = () => {
    const { slug } = useParams(); // Get the dynamic route parameter
    const submissions = useSelector((state: RootState) => state.submissions.submissions);

    const solutions = submissions.filter((sub) => sub.question_slug === slug);

    if (!solutions) {
        return (
            <div className="w-screen-md mx-auto py-10 px-6">
                <div className="mb-6 flex justify-start">
                    <div className="border border-gray-300 bg-white text-sm rounded shadow-sm hover:border-gray-400 transition">
                        <SlugDropdown />
                    </div>
                </div>
                <EmptyPage text="No submission found for this question." />;
             </div>
        )
    }

    return (
        <div className="w-screen-md mx-auto py-10 px-6">
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur px-6 py-4 border-b mb-6">
            <div className="flex justify-start">
              <div className="border border-gray-300 bg-white text-sm rounded shadow-sm hover:border-gray-400 transition">
                <SlugDropdown />
              </div>
            </div>
          </div>
      
         
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{solutions[0].title}</h1>
            <TagEditor slug={solutions[0].question_slug} initialTags={solutions[0].tags} />
            <div
              className="mt-4 text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: solutions[0].description || "" }}
            />
          </div>
      
         
          <div>
            <h2 className="text-2xl font-semibold mb-4">Solutions</h2>
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div
                  key={solution.submission_id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                >
                  <h3 className="text-lg font-medium mb-2">Solution {index + 1}</h3>
                  <CodeDisplay code={solution.code} language="cpp" />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

export default SubmissionDetails;