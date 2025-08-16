export class TestRepository {
	constructor(db) {
		this.db = db;
	}

	async getOne() {
		return { message: 'Hello from backend!' };
	}
}