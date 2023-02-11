import { IModalModel } from "./ModalTypes";
import { gsap } from "gsap";

enum ModalState {
	Hidden = "hidden",
	Shown = "shown"
}
export class ModalModel implements IModalModel {
	private timeline: gsap.core.Timeline;
	private isModalOpenedOnce: boolean;
	private modalState: ModalState;
	private isModalLocked: boolean;

	constructor() {
		this.timeline = gsap.timeline({ deleay: 0.4, ease: "power2.out" });
		this.modalState = ModalState.Hidden;
		this.isModalOpenedOnce = false;
		this.isModalLocked = false;
	}

	public openModal(): void {
		if (this.isModalLocked) return;

		const modal = document.querySelector("[data-modal]");
		const modalUnderlay = document.querySelector("[data-modal-underlay]");

		this.modalState = ModalState.Shown;
		this.toggleBodyOverflow({ modalState: this.modalState });
		gsap.set(modalUnderlay, { display: "block" });
		this.timeline.fromTo(
			modalUnderlay,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.3, ease: "power2.out" }
		);
		this.timeline.fromTo(
			modal,
			{ opacity: 0, scale: 0.8 },
			{
				opacity: 1,
				scale: 1,
				duration: 0.5,
				ease: "power2.out"
			}
		);

		this.isModalLocked = true;
	}

	public closeModal(): void {
		if (!this.isModalLocked) return;

		this.isModalLocked = false;

		const modal = document.querySelector("[data-modal]");
		const modalUnderlay = document.querySelector("[data-modal-underlay]");

		this.modalState = ModalState.Hidden;
		this.timeline.fromTo(
			modal,
			{ opacity: 1, scale: 1 },
			{ opacity: 0, scale: 0.8, duration: 0.2, ease: "power2.out" }
		);
		this.timeline.fromTo(
			modalUnderlay,
			{ opacity: 1 },
			{
				opacity: 0,
				duration: 0.3,
				ease: "power2.out"
			}
		);
		this.timeline.set(modalUnderlay, {
			display: "none",
			onComplete: () => {
				this.toggleBodyOverflow({ modalState: this.modalState });
			}
		});
	}

	public openModalOnce(): void {
		if (this.isModalOpenedOnce) return;
		this.isModalOpenedOnce = true;
		this.openModal();
	}

	private toggleBodyOverflow({ modalState }: { modalState: ModalState }): void {
		const body = document.querySelector("body");
		const scrollbarWidth = this.calculateScrollBarWidth();

		switch (modalState) {
			case "hidden":
				(body as HTMLElement).style.cssText = `
					overflow-x: hidden;
					padding-right: 0px;
				`;
				break;
			case "shown":
				(body as HTMLElement).style.cssText = `
					overflow: hidden;
					padding-right: ${scrollbarWidth}px;
				`;
				break;
			default:
				break;
		}
	}

	private calculateScrollBarWidth(): number {
		const outerDiv = document.createElement("div");
		outerDiv.style.visibility = "hidden";
		outerDiv.style.overflow = "scroll";
		document.body.appendChild(outerDiv);

		const innerDiv = document.createElement("div");
		outerDiv.appendChild(innerDiv);

		const scrollbarWidth = outerDiv.offsetWidth - innerDiv.offsetWidth;

		outerDiv.parentNode?.removeChild(outerDiv);

		return scrollbarWidth;
	}
}
