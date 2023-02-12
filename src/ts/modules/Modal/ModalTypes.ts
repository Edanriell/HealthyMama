import { ModalController } from "./ModalController";
import { ModalModel } from "./ModalModel";

export interface IModalView {
	root: HTMLElement;
	controller: ModalController;

	mount(): void;
}

export interface IModalController {
	model: ModalModel;

	handleCloseModal(): void;
	handleOpenModal(): void;
}

export interface IModalModel {
	openModal(): void;
	closeModal(): void;
	openModalOnce(): void;
}

export type ModalState = "opened" | "closed";
