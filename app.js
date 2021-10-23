"use strict";

const buttonDaily = document.getElementById("daily");
const buttonWeekly = document.getElementById("weekly");
const buttonMonthly = document.getElementById("monthly");

const buttonsArray = [buttonDaily, buttonWeekly, buttonMonthly];

const descriptions = document.querySelectorAll(".description .second-line");

const hourInformationArray = [];

(async function () {
	const response = await fetch("data.json");
	const data = await response.json();

	data.forEach((dataObject) => {
		hourInformationArray.push(dataObject.timeframes);
	});
})();

// normal button color: $pal-blue = hsl(236, 100%, 87%)
// active button color: $white = rgb(240,240,240)

buttonsArray.forEach((button) => button.addEventListener("click", changeDataDisplay));

function changeDataDisplay(event) {
	// change button text color based on the event target, i.e. the button that was clicked
	buttonsArray.forEach((button) => {
		button.id === event.target.id
			? (event.target.style.color = "rgb(240,240,240)")
			: (button.style.color = "hsl(236, 100%, 87%)");
	});

    // based on the button that was clicked, change
	// description time data and time frame
	let index = 0;
	let timeFrame = changeTimeFrame(event.target.id);

	descriptions.forEach((item) => {
		item.querySelector(".current").textContent = hourInformationArray[index][event.target.id].current;
		item.querySelector(".previous").textContent = hourInformationArray[index][event.target.id].previous;
		item.querySelector(".time-frame").textContent = timeFrame;
		++index;
	});
}

function changeTimeFrame(time) {
	if (time === "daily") {
		return "Day";
	} else if (time === "weekly") {
		return "Week";
	} else return "Month";
}
