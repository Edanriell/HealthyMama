import "../scss/style.scss";
import "../js/vendors/modernizr.js";

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
