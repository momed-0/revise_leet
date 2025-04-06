import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client"



export default function TagEditor({ slug, initialTags = [] }: { slug: string, initialTags: string[] }) {
    const supabase = createClient()
    const [tags, setTags] = useState<string[]>(initialTags);
    const [newTag, setNewTag] = useState("");

    const addTag = async () => {
        if(newTag.trim() && !tags.includes(newTag)) {
            const updatedTags = [...tags, newTag.trim()];
            setTags(updatedTags)
            // Update if exists or else insert
            const { error } = await supabase
                .from('question_tags')
                .upsert({'slug': slug, 'tags': updatedTags})
            if (error) {
                console.error("Error trying to update tags: ", error)
            }
            setNewTag("") // clear the input
        }
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
        <div className="flex flex-wrap gap-1 mb-2">
            {tags.map(tag => (
                <Badge key={tag} onClick={() => removeTag(tag)} className="cursor-pointer">
                {tag} ✕
              </Badge>
            ))}
            <Input
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addTag()}
                placeholder="Add tag"
                className="w-auto"
            />
        </div>
    )
}