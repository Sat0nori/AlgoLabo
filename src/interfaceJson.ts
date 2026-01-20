interface Sample {
	id: string
	type: string
	priority: "STAT" | "URGENT" | "ROUTINE"
	analysisTime: number
	arrivalTime: string
	patientId: string
}

interface Technician {
	id: string
	name: string
	speciality: "BLOOD" | "URINE" | "TISSUE" | "GENERAL"
	startTime: string
	endTime: string
}

interface Equipement {
	id: string
	name: string
	type: "BLOOD" | "URINE" | "TISSUE"
	available: boolean
}

export interface LaboData {
	sample: Sample[]
	technicians: Technician[]
	equipement: Equipement[]
}
