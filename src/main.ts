import extractJson from "./extractJson"
import { LaboData, Schedule } from "./interfaceJson"
import metricsCalcul from "./metricsCalcul"
import scheduleModule from "./scheduleModule"

async function main() {
	const data: LaboData = await extractJson()

	const schedule: Schedule[] = scheduleModule(data)

	const metrics = metricsCalcul(schedule, data)

	const result = { schedule: schedule, metrics: metrics }

	console.log(result)
}

main()
