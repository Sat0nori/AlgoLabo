import { LaboData } from "./interfaceJson"
import { readFile } from "fs/promises"

export default async function extractJson(): Promise<LaboData> {
	const filePath: string = "input.json"

	const jsonString = await readFile(filePath, "utf-8")
	const data: LaboData = JSON.parse(jsonString)
	return data
}
