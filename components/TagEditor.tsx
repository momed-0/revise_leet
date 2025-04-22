"use client";

import { useState} from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client"



export default function TagEditor({ slug, initialTags = [] }: { slug: string, initialTags: string[] }) {
    const supabase = createClient()
    const [tags, setTags] = useState<string[]>(Array.isArray(initialTags) ? initialTags.flat() : []);
    const [newTag, setNewTag] = useState("");
    const [showInput, setShowInput] = useState(false);

    const addTag = async () => {
        const tag = newTag.trim();
        if(tag && !tags.includes(tag)) {
            const updatedTags = [...tags, tag];
            setTags(updatedTags)
            // Update if exists or else insert
            const { error } = await supabase
                .from('question_tags')
                .upsert({'slug': slug, 'tags': updatedTags})
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
            const {error} = await supabase
            .from('question_tags')
            .delete()
            .eq('slug', slug)
            if (error) {
                console.error("Error trying to delete tags: ", error)
            }
        } else {
            // If therea re still tags update the db
            const { error } = await supabase
            .from('question_tags')
            .update({'tags': updatedTags})
            .eq('slug', slug)
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
                    onBlur={addTag}
                    placeholder="Add tag"
                    className="w-28 h-8 text-sm"
                />
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
    )
}