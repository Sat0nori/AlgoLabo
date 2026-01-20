interface Sample {
	id: string
	type: string
	priority: "STAT" | "URGENT" | "ROUTINE"
	analysisTime: number
	arrivalTime: string
	patientId: string
}

export interface Technician {
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
	samples: Sample[]
	technicians: Technician[]
	equipment: Equipement[]
}

export interface Schedule {
	sampleId: string
	technicianId: string
	equipmentId: string
	startTime: string
	endTime: string
	priority: "STAT" | "URGENT" | "ROUTINE"
}

export interface Metrics {
	totalTime: number
	efficiency: number
	conflicts: number
}
