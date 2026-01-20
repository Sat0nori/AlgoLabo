export function timeToMinutes(time: string): number {
	const [heure, minute] = time.split(":").map(Number)
	return heure * 60 + minute
}

export function minutesToTime(minutes: number): string {
	const heure = Math.floor(minutes / 60)
	const minute = minutes % 60
	return `${String(heure).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
}
