import extractJson from "./extractJson"
import { LaboData } from "./interfaceJson"

async function main() {
	const data: LaboData = await extractJson()
	console.log(data)
}

main()
