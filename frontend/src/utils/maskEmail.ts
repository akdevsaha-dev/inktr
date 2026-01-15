export function maskEmail(email: string) {
    const [userName, domain] = email.split("@")

    if (!userName || !domain) return email;

    const visiblePart = userName.slice(0, 2)
    const maskedPart = ".".repeat(userName.length - 2)

    return `${visiblePart}${maskedPart}@${domain}`
}