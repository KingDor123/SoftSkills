export class UserService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async getAll() {
		return await this.userRepository.getAll();
	}
}