import { cn } from "@/lib/utils";
import { Cpu } from "lucide-react"
import { Badge } from "@/components/ui/badge";

const categories = [
    {
      name: "Technology",
      totalPosts: 10,
      icon: Cpu,
    }
  ];

export default function TagsProvider() {
    return (
        <aside className="sticky top-8 shrink-0 lg:max-w-sm w-full">
        <h3 className="text-3xl font-bold tracking-tight">Categories</h3>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
          {categories.map((category) => (
            <div
              key={category.name}
              className={cn(
                "flex items-center justify-between gap-2 bg-muted p-3 rounded-md bg-opacity-15 dark:bg-opacity-25"
              )}
            >
              <div className="flex items-center gap-3">
                <category.icon className={cn("h-5 w-5")} />
                <span className="font-medium">{category.name}</span>
              </div>
              <Badge className="px-1.5 rounded-full">
                {category.totalPosts}
              </Badge>
            </div>
          ))}
        </div>
      </aside>
    )
}