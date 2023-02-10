import { IModalController } from "./ModalTypes";
import { ModalModel } from "./ModalModel";

export class ModalController implements IModalController {
	model: ModalModel;

	constructor(model: ModalModel) {
		this.model = model;
	}

	public handleCloseModal(): void {
		this.model.closeModal();
	}

	public handleOpenModal(): void {
		this.model.openModal();
	}
}
