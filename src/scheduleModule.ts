import { LaboData, Schedule } from "./interfaceJson"
import { minutesToTime, timeToMinutes } from "./timeFunction"

export default function scheduleModule(data: LaboData) {
	const { samples, technicians, equipment } = data
	const schedule: Schedule[] = []
	const priorityOrder = ["STAT", "URGENT", "ROUTINE"]

	//tri des samples par priorité
	const orderedSample = [...data.samples].sort((a, b) => {
		const order = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
		if (order !== 0) return order
		//si meme priorité on tri par heure d'arrivée
		return timeToMinutes(a.arrivalTime) - timeToMinutes(b.arrivalTime)
	})

	//on dit que le tech et l'equipêment sont dispo
	let techFree = timeToMinutes(technicians[0].startTime)
	let equipFree = 0

	//on regarde les samples a la main
	orderedSample.forEach((element) => {
		//on regarde si tt est ok et dispo (sample, tech et equip)
		const start = Math.max(timeToMinutes(element.arrivalTime), techFree, equipFree)
		const end = start + element.analysisTime

		//on ajoute au planning
		schedule.push({
			sampleId: element.id,
			technicianId: technicians[0].id,
			equipmentId: equipment[0].id,
			startTime: minutesToTime(start),
			endTime: minutesToTime(end),
			priority: element.priority,
		})

		//on dit que le tech et equip sont occuper jusqu'a end
		techFree = end
		equipFree = end
	})
	return schedule
}
