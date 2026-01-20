import { LaboData, Schedule } from "./interfaceJson"
import { minutesToTime, timeToMinutes } from "./timeFunction"

export default function scheduleModule(data: LaboData) {
	const { samples, technicians, equipment } = data
	const schedule: Schedule[] = []

	const sampleStat = samples.find((element) => {
		return element.priority === "URGENT"
	})

	const techSpe = technicians.find((element) => {
		return element.speciality === sampleStat?.type
	})

	const equipType = equipment.find((element) => {
		return element.type === sampleStat?.type && element.available === true
	})

	if (!sampleStat || !techSpe || !equipType) {
		return schedule
	}

	const sampleArrival = timeToMinutes(sampleStat.arrivalTime)
	const techStart = timeToMinutes(techSpe.startTime)
	const techEnd = timeToMinutes(techSpe.endTime)
	const startMinutes = Math.max(sampleArrival, techStart)
	const endMinutes = startMinutes + sampleStat.analysisTime

	if (endMinutes > techEnd) return schedule

	schedule.push({
		sampleId: sampleStat.id,
		technicianId: techSpe.id,
		equipmentId: equipType.id,
		startTime: minutesToTime(startMinutes),
		endTime: minutesToTime(endMinutes),
		priority: sampleStat.priority,
	})
	return schedule
}
