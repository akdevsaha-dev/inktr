export function getFormattedDate(dateStr: string) {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)

    if (diffHours < 24) {
        return date.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        })
    } else {
        return date.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }
}