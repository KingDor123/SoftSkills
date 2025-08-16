export class TestController {
	constructor(testService) {
		this.testService = testService;
	}

	getOne = async (_, res) => {
		const data = await this.testService.getOne();
		res.json(data);
	};
}