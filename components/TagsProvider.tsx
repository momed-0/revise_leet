import { cn } from "@/lib/utils";
import { Code } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


export default function TagsProvider() {
    const currTags = useSelector((state: RootState) => state.submissions.currentTags);
    return (
        <aside className="sticky top-8 shrink-0 lg:max-w-sm w-full bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h3 className="text-xl font-bold tracking-tight mb-4">Tags</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
            {currTags.map((item) => (
              <div
                key={item.tag}
                className={cn(
                  "flex items-center justify-between gap-2 bg-muted p-3 rounded-md bg-opacity-15 dark:bg-opacity-25"
                )}
              >
                <div className="flex items-center gap-3">
                  <Code className={cn("h-5 w-5")} />
                  <span className="font-medium">{item.tag}</span>
                </div>
                <Badge className="px-1.5 rounded-full">
                  {item.count}
                </Badge>
              </div>
            ))}
          </div>
        </aside>
    );
}