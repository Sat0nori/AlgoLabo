import { LaboData, Metrics, Schedule, Technician } from "./interfaceJson"
import { timeToMinutes } from "./timeFunction"

export default function metricsCalcul(schedule: Schedule[], data: LaboData) {
	const conflicts = 0

	const totalTime = schedule.reduce((total, element) => {
		return total + timeToMinutes(element.endTime) - timeToMinutes(element.startTime)
	}, 0)

	const totalPlanning = data.technicians.reduce((total, element) => {
		return total + timeToMinutes(element.endTime) - timeToMinutes(element.startTime)
	}, 0)

	const efficiency = Number(((totalTime / totalPlanning) * 100).toFixed(2))

	const metrics: Metrics = {
		totalTime,
		efficiency, // % = (somme durées analyses) / (temps total planning) * 100
		conflicts,
	}

	return metrics
}
