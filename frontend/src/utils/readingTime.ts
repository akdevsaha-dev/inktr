export function getReadingTime(content: string) {
    if (!content) return "0 min read"
    const words = content.trim().split(/\s+/).length;
    const WORDS_PER_MIN = 160;
    const mintues = Math.ceil(words / WORDS_PER_MIN);
    return `${mintues} min read`
}