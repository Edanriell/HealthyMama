import { ModalModel } from "./ModalModel";

export class ModalController {
	model: ModalModel;

	constructor(model: ModalModel) {
		this.model = model;
		// console.log("controller");
	}

	public handleCloseModal() {

	}

	public handleOpenModal() {
		this.model.openModal();
	}
}
