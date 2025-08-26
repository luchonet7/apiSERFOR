const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

export async function apiFetch<T> (
    path: string,
    init?: RequestInit & { parseAsText?: boolean }
): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
        ...init,
    })
    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `HTTP ${res.status}`)
    }
    if (init?.parseAsText) return (await res.text()) as unknown as T
    return (await res.json()) as T
}
