import { LaboData, Schedule } from "./interfaceJson"
import { minutesToTime, timeToMinutes } from "./timeFunction"

export default function scheduleModule(data: LaboData) {
	const { samples, technicians, equipment } = data
	const schedule: Schedule[] = []
	const priorityOrder = ["STAT", "URGENT", "ROUTINE"]

	//tri des samples par priorité
	const orderedSample = [...samples].sort((a, b) => {
		const order = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
		if (order !== 0) return order
		//si meme priorité on tri par heure d'arrivée
		return timeToMinutes(a.arrivalTime) - timeToMinutes(b.arrivalTime)
	})

	//on dit que chaque tech est dispo a partir de son arrivé
	const techAvailability = new Map<string, number>()
	technicians.forEach((element) => {
		techAvailability.set(element.id, timeToMinutes(element.startTime))
	})

	//on dit que chaque equipement est dispo
	const equipAvailability = new Map<string, number>()
	equipment.forEach((element) => {
		equipAvailability.set(element.id, 0)
	})

	//on regarde les samples a la main
	orderedSample.forEach((sampleElement) => {
		//on retourne uniquement les techs autre que type general
		const specialTech = technicians.filter((element) => {
			return element.speciality === sampleElement.type
		})

		//on retourne uniquement les techs generaux
		const generalTech = technicians.filter((element) => {
			return element.speciality === "GENERAL"
		})

		//si pas de tech speciaux disponible alors on dit tech general, si pas de generaux on attend
		const techFree = specialTech.length > 0 ? specialTech : generalTech
		if (techFree.length === 0) return

		//on tri les tech par dispo
		const tech = techFree.sort((a, b) => {
			return techAvailability.get(a.id)! - techAvailability.get(b.id)!
		})[0]

		//on retourne les equipements avec bon type et dispo, si aucun on attend
		const equipCandidates = equipment.filter((element) => {
			return element.type === sampleElement.type && element.available
		})
		if (equipCandidates.length === 0) return

		//on les tri par disponibilitité
		const equip = equipCandidates.sort((a, b) => {
			return equipAvailability.get(a.id)! - equipAvailability.get(b.id)!
		})[0]

		//on book le tech, equip et sample avec son heure de debut et heure de fin
		const start = Math.max(timeToMinutes(sampleElement.arrivalTime), techAvailability.get(tech.id)!, equipAvailability.get(equip.id)!)
		const end = start + sampleElement.analysisTime

		techAvailability.set(tech.id, end)
		equipAvailability.set(equip.id, end)

		//on ajoute au planning
		schedule.push({
			sampleId: sampleElement.id,
			technicianId: tech.id,
			equipmentId: equip.id,
			startTime: minutesToTime(start),
			endTime: minutesToTime(end),
			priority: sampleElement.priority,
		})
	})
	return schedule
}
