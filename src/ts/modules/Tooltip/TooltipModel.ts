import { gsap } from "gsap";
import { TooltipDirection } from "./TooltipTypes";

export class TooltipModel {
	public showTooltip(tooltip: HTMLSpanElement, direction: TooltipDirection) {
		switch (direction) {
			case TooltipDirection.Top:
				gsap.fromTo(
					tooltip,
					{ opacity: 0, display: "none", translateY: -8, translateX: "-50%" },
					{
						opacity: 1,
						display: "block",
						translateY: 0,
						duration: 0.5,
						translateX: "-50%",
						ease: "power2.out"
					}
				);
				break;
			case TooltipDirection.Left:
				gsap.fromTo(
					tooltip,
					{ opacity: 0, display: "none", translateX: "-60%" },
					{
						opacity: 1,
						display: "block",
						duration: 0.5,
						translateX: "-50%",
						ease: "power2.out"
					}
				);
				break;
			case TooltipDirection.Bottom:
				gsap.fromTo(
					tooltip,
					{ opacity: 0, display: "none", translateY: 8, translateX: "-50%" },
					{
						opacity: 1,
						display: "block",
						translateY: 0,
						duration: 0.5,
						translateX: "-50%",
						ease: "power2.out"
					}
				);
				break;
			case TooltipDirection.Right:
				gsap.fromTo(
					tooltip,
					{ opacity: 0, display: "none", translateX: "-40%" },
					{
						opacity: 1,
						display: "block",
						duration: 0.5,
						translateX: "-50%",
						ease: "power2.out"
					}
				);
				break;
			default:
				break;
		}
	}
	public hideTooltip(tooltip: HTMLSpanElement, direction: TooltipDirection) {
		switch (direction) {
			case TooltipDirection.Top:
				gsap.fromTo(
					tooltip,
					{ opacity: 1, display: "none", translateY: 0, translateX: "-50%" },
					{
						opacity: 0,
						display: "block",
						translateY: -8,
						duration: 0.5,
						translateX: "-50%",
						ease: "power2.out"
					}
				);
				break;
			case TooltipDirection.Left:
				gsap.fromTo(
					tooltip,
					{ opacity: 1, display: "block", translateX: "-50%" },
					{
						opacity: 0,
						duration: 0.5,
						translateX: "-60%",
						display: "none",
						ease: "power2.out"
					}
				);
				break;
			case TooltipDirection.Bottom:
				gsap.fromTo(
					tooltip,
					{ opacity: 1, display: "none", translateY: 0, translateX: "-50%" },
					{
						opacity: 0,
						display: "block",
						translateY: 8,
						duration: 0.5,
						translateX: "-50%",
						ease: "power2.out"
					}
				);
				break;
			case TooltipDirection.Right:
				gsap.fromTo(
					tooltip,
					{ opacity: 1, display: "block", translateX: "-50%" },
					{
						opacity: 0,
						duration: 0.5,
						translateX: "-40%",
						display: "none",
						ease: "power2.out"
					}
				);
				break;
			default:
				break;
		}
	}
}
