import { IScrollToTopModel } from "./ScrollToTopTypes";

export class ScrollToTopModel implements IScrollToTopModel {
	private documentElement: HTMLElement = document.documentElement;
	private documentBody: HTMLElement = document.body;
	private smoothScrollSpeed: number;

	#buttonSelector: string = ".scroll-to-top";
	#timeInterval: number = 1;

	constructor({ smoothScrollSpeed }: { smoothScrollSpeed: number }) {
		this.smoothScrollSpeed = smoothScrollSpeed;
	}

	public calculateScroll(event: unknown): void {
		(event as Event).preventDefault();

		const scrollTop: number = Math.round(
			this.documentElement.scrollTop || this.documentBody.scrollTop
		);
		const hash: string = (document.querySelector(this.#buttonSelector) as HTMLAnchorElement)
			.hash;

		if (hash !== "") {
			let hashElement: HTMLAnchorElement = document.querySelector(hash)! as HTMLAnchorElement;
			let hashElementTop: number = 0;

			while (hashElement.offsetParent) {
				hashElementTop += hashElement.offsetTop;
				(hashElement as Element) = hashElement.offsetParent;
			}

			hashElementTop = Math.round(hashElementTop);
			this.smoothScroll({ from: scrollTop, to: hashElementTop, hash: hash });
		}
	}

	private smoothScroll({ from, to, hash }: { from: number; to: number; hash: string }): void {
		let prevScrollTop: number;
		let speed: number;

		if (to > from) {
			speed = this.smoothScrollSpeed;
		} else {
			speed = -this.smoothScrollSpeed;
		}

		this.documentBody.scrollTop += 100;
		this.documentElement.scrollTop += 100;

		const move: NodeJS.Timer = setInterval(() => {
			const scrollTop: number = Math.round(
				this.documentBody.scrollTop || this.documentElement.scrollTop
			);

			if (
				prevScrollTop === scrollTop ||
				(to > from && scrollTop >= to) ||
				(to < from && scrollTop <= to)
			) {
				clearInterval(move);
				history.replaceState(
					history.state,
					document.title,
					location.href.replace(/#.*$/g, "") + hash
				);
			} else {
				this.documentBody.scrollTop += speed;
				this.documentElement.scrollTop += speed;
				prevScrollTop = scrollTop;
			}
		}, this.#timeInterval);
	}
}
