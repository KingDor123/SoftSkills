export class TestService {
	constructor(testRepository) {
		this.testRepository = testRepository;
	}

	async getOne() {
		return await this.testRepository.getOne();
	}
}