import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeDisplayProps = {
    code: string;
    language?: string; 
  };

  const CodeDisplay = ({ code, language = "cpp" }: CodeDisplayProps) => {
    return (
      <div className="mt-6 bg-gray-100 rounded max-h-[700px] overflow-auto w-full dark:bg-gray-900">
        <SyntaxHighlighter language={language} style={oneDark} showLineNumbers>
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };

  export default CodeDisplay;