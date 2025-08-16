export class UserRepository {
	constructor(db) {
		this.db = db;
	}

	async getAll() {
		const query = `SELECT * FROM Users `;
        const data = await this.db.execute(query,[]);
		return data;
	}
}