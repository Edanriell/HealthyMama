import "../scss/style.scss";
import "./vendors/modernizr";

window.addEventListener("DOMContentLoaded", () => {
	console.log("works")

	Modernizr.on("webp", result => {
		if (result) {
			console.log(result);
		} else {
			console.log(result);
		}
	});
});
