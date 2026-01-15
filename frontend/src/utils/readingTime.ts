import { generateText, type JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

const extensions = [StarterKit, Highlight];

export function getReadingTime(content: JSONContent) {
    if (!content) return "0 min read";

    const text = generateText(content, extensions);

    if (!text.trim()) return "0 min read";

    const WORDS_PER_MIN = 160;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / WORDS_PER_MIN);

    return `${minutes} min read`;
}