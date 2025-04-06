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

    const submission = submissions.find((sub) => sub.question_slug === slug);

    if (!submission) {
        return <EmptyPage text="No submission found for this question." />;
    }

    return (
        <div className="w-screen-md mx-auto py-10 px-6">
            <div className="mb-6 flex justify-start">
                <div className="border border-gray-300 bg-white text-sm rounded shadow-sm hover:border-gray-400 transition">
                    <SlugDropdown />
                </div>
             </div>
            <h1 className="text-3xl font-bold">{submission.title}</h1>
            <TagEditor slug={submission.question_slug} initialTags={submission.tags} />
            <div
                className="mt-2 text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: submission.description || "" }}
            />
            <CodeDisplay code={submission.code} language="cpp" />
        </div>
    );
};

export default SubmissionDetails;