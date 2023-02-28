export class ScrollToTopModel {
	private element: HTMLElement = document.documentElement;
	private body: HTMLElement = document.body;

	public scrollToTop(): void {
		let scrollTop = Math.round(this.body.scrollTop || this.element.scrollTop);

		if (this.hash !== "") {
			event.preventDefault();
			let hashElement = document.querySelector(this.hash),
				hashElementTop = 0;

			while (hashElement.offsetParent) {
				hashElementTop += hashElement.offsetTop;
				hashElement = hashElement.offsetParent;
			}

			hashElementTop = Math.round(hashElementTop);
			smoothScroll(scrollTop, hashElementTop, this.hash);
		}
	}

	private smoothScroll(): void {
		let timeInterval = 1,
			prevScrollTop,
			speed;

		if (to > from) {
			speed = 30;
		} else {
			speed = -30;
		}

		let move = setInterval(() => {
			let scrollTop = Math.round(this.body.scrollTop || this.element.scrollTop);

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
				this.body.scrollTop += speed;
				this.element.scrollTop += speed;
				prevScrollTop = scrollTop;
			}
		}, timeInterval);
	}
}
