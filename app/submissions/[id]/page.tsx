"use client";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "@/store/store";
import CodeDisplay from "@/components/codeDisplay";

const SubmissionDetails = () => {
    const { id } = useParams(); // Get the dynamic route parameter
    const submissions = useSelector((state: RootState) => state.submissions.submissions);

    const submission = submissions.find((sub) => sub.submission_id === Number(id));

    if (!submission) {
        return <div>Submission not found</div>;
    }

    return (
        <div className="w-screen-md mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold">{submission.title}</h1>
            <div
                className="mt-2 text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: submission.description || "" }}
            />
            <CodeDisplay code={submission.code} language="cpp" />
        </div>
    );
};

export default SubmissionDetails;