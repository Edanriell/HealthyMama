export class ScrollToTopModel {
	private element: HTMLElement = document.documentElement;
	private body: HTMLElement = document.body;

	public scrollToTop(event: unknown): void {
		let scrollTop = Math.round(this.body.scrollTop || this.element.scrollTop);
		const hash = (document.querySelector(".scroll-to-top") as HTMLAnchorElement).hash;
		if (hash !== "") {
			(event as Event).preventDefault();
			let hashElement = (document.querySelector(hash)! as HTMLElement);
			let hashElementTop = 0;

			while (hashElement.offsetParent) {
				hashElementTop += hashElement.offsetTop;
				(hashElement as Element) = hashElement.offsetParent;
			}

			hashElementTop = Math.round(hashElementTop);
			this.smoothScroll(scrollTop, hashElementTop, hash);
		}
	}

	private smoothScroll(from: number, to: number, hash: string): void {
		let timeInterval = 1;
		let prevScrollTop: number;
		let speed: number;

		if (to > from) {
			speed = 35;
		} else {
			speed = -35;
		}

		this.body.scrollTop += 100;
		this.element.scrollTop += 100;

		let move = setInterval(() => {
			let scrollTop = Math.round(this.body.scrollTop || this.element.scrollTop);
			if (
				prevScrollTop === scrollTop ||
				(to > from && scrollTop >= to) ||
				(to < from && scrollTop <= to)
			) {
				console.log(true);
				clearInterval(move);
				history.replaceState(
					history.state,
					document.title,
					location.href.replace(/#.*$/g, "") + hash
				);
			} else {
				this.body.scrollTop += speed;
				this.element.scrollTop += speed;
				prevScrollTop = scrollTop;
			}
		}, timeInterval);
	}
}
