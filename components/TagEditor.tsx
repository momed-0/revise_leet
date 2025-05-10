"use client";

import { useState} from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector} from "react-redux";
import { RootState } from "@/store/store";
import { upsertTags,deleteTags } from "@/app/api/content";


export default function TagEditor({ slug, initialTags = [] }: { slug: string, initialTags: string[] }) {
    const currTags = useSelector((state: RootState) => state.submissions.currentTags);
    const [tags, setTags] = useState<string[]>(Array.isArray(initialTags) ? initialTags.flat() : []);
    const [newTag, setNewTag] = useState("");
    const [showInput, setShowInput] = useState(false);
    
    // filter suggestions based on input
    const filterSuggestions = currTags
        .filter((item) => item.tag.toLowerCase().includes(newTag.toLowerCase()) && !tags.includes(item.tag))
        

    const addTag = async (tagFromSuggestion?: string) => {
        const tag = (tagFromSuggestion ?? newTag).trim();
        if(tag && !tags.includes(tag)) {
            const updatedTags = [...tags, tag];
            setTags(updatedTags)
            // Update if exists or else insert
            const { error } = await upsertTags(slug, updatedTags)
            if (error) {
                console.error("Error trying to update tags: ", error)
            }
        }
        setNewTag("") // clear the input
        setShowInput(false);
    }
    const removeTag = async (tagToRemove: string) => {
        // remove that tag from state
        const updatedTags = tags.filter(tag => tag !== tagToRemove);
        setTags(updatedTags)
        if (updatedTags.length === 0) { 
            // if no tags ,remove the entry from db
            const {error} = await deleteTags(slug)
            if (error) {
                console.error("Error trying to delete tags: ", error)
            }
        } else {
            // If therea re still tags update the db
            const { error } = await upsertTags(slug, updatedTags)
            if (error) {
                console.error("Error trying to update tags: ", error)
            }
        }
    }
    return (
        <div className="flex flex-wrap items-center gap-2 mb-4">
            {tags.map(tag => (
                <Badge 
                    key={tag} 
                    className="pr-1 pl-2 text-sm bg-muted text-muted-foreground flex items-center gap-1"
                >
                    {tag} 
                    <span 
                        onClick={() => removeTag(tag)}
                        className="ml-1 cursor-pointer hover:text-destructive"
                    >✕</span>
              </Badge>
            ))}
            {showInput ? (
                <div className="relative">
                <Input
                    value={newTag}
                    autoFocus
                    onChange={e => setNewTag(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") addTag();
                        if (e.key === "Escape") {
                            setShowInput(false);
                            setNewTag("");
                        }
                    }}
                    onBlur={() => setShowInput(false)}
                    placeholder="Add tag"
                    className="w-28 h-8 text-sm"
                />
                {filterSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md z-10">
                        {filterSuggestions.map((suggestion) => (
                            <div
                                key={suggestion.tag}
                                onMouseDown={() => addTag(suggestion.tag)}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-gray-300"
                            >
                                {suggestion.tag}
                            </div>
                        ))}
                    </div>
                )}
                </div>
            ) : (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowInput(true)}
                    className="text-muted-foreground h-8 px-2"
                >
                    + Add tag
                </Button>
            )}
        </div>
    );
}