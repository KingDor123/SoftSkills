export class UserController {
	constructor(userService) {
		this.userService = userService;
	}

	getAll = async (_, res) => {
		const data = await this.userService.getAll();
		res.json(data);
	};
}