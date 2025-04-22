import { cn } from "@/lib/utils";
import { Code } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { addFilterTag, removeFilterTag } from "@/store/submissionsSlice";

export default function TagsProvider() {
    const dispatch = useDispatch();
    const selectedFiltersByTag = useSelector((state: RootState) => state.submissions.filters.tags);
    const currTags = useSelector((state: RootState) => state.submissions.currentTags);
    const handleTagClick = (tag: string) => {
        if (selectedFiltersByTag.includes(tag)) {
            // If the tag is already selected, remove it
            dispatch(removeFilterTag(tag));
        } else {
            // If the tag is not selected, add it
            dispatch(addFilterTag(tag));
        }
    };
    return (
        <aside className="sticky top-8 shrink-0 lg:max-w-sm w-full shadow-md rounded-lg p-4 border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
          <h3 className="text-xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100">Tags</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
            {currTags.map((item) => (
                <button
                    key={item.tag}
                    onClick={() => handleTagClick(item.tag)}
                    className={cn(
                        "flex items-center justify-between gap-2 p-3 rounded-md transition-colors duration-200",
                        selectedFiltersByTag.includes(item.tag)
                            ? "bg-primary/10 text-primary border border-primary dark:bg-primary/20 dark:text-primary"
                            : "bg-muted text-muted-foreground hover:bg-primary/10 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Code className="h-5 w-5" />
                        <span className="font-medium">{item.tag}</span>
                    </div>
                    <Badge
                        className={cn(
                            "px-1.5 rounded-full",
                            selectedFiltersByTag.includes(item.tag) 
                            ? "bg-primary text-white dark:bg-primary/80 dark:text-black" 
                            : "bg-muted text-muted-foreground dark:bg-gray-700 dark:text-gray-300"
                        )}
                    >
                        {item.count}
                    </Badge>
                </button>
            ))}
          </div>
        </aside>
    );
}