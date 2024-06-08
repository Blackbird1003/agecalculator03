// Naming the variables for inputs, labels, and button
let inputDay = document.querySelector("#day");
let inputMonth = document.querySelector("#month");
let inputYear = document.querySelector("#year");
let labelDay = document.querySelector("#label_day");
let labelMonth = document.querySelector("#label_month");
let labelYear = document.querySelector("#label_year");
const sbtBtn = document.querySelector("#sbt_btn");

// For the errors
let smallDay = document.querySelector("#smallDay");
let smallMonth = document.querySelector("#smallMonth");
let smallYear = document.querySelector("#smallYear");

// Actual age display
let dayA = document.querySelector("#days");
let monthA = document.querySelector("#months");
let yearA = document.querySelector("#years");

// Actual date
const date = new Date();
const actualYear = date.getFullYear();
console.log(actualYear);

inputDay.addEventListener("input", () => {
    let day = inputDay.value;
    if (day.length == 0) {
        labelDay.classList.remove("error-text");
        inputDay.classList.remove("error");
        smallDay.textContent = "";
    } else {
        if (+day > 31) {
            labelDay.classList.add("error-text");
            inputDay.classList.add("error");
            smallDay.textContent = "Must be a valid day";
        } else {
            if (+day === 0) {
                labelDay.classList.add("error-text");
                inputDay.classList.add("error");
                smallDay.textContent = "This field is required";
            } else {
                labelDay.classList.remove("error-text");
                inputDay.classList.remove("error");
                smallDay.textContent = "";
                if (day.length === 2) {
                    inputMonth.focus();
                }
            }
        }
    }
});

inputMonth.addEventListener("input", () => {
    let month = inputMonth.value;
    if (month.length == 0) {
        labelMonth.classList.remove("error-text");
        inputMonth.classList.remove("error");
        smallMonth.textContent = "";
    } else {
        if (+month > 12) {
            labelMonth.classList.add("error-text");
            inputMonth.classList.add("error");
            smallMonth.textContent = "Must be a valid month";
        } else {
            if (+month === 0) {
                labelMonth.classList.add("error-text");
                inputMonth.classList.add("error");
                smallMonth.textContent = "This field is required";
            } else {
                labelMonth.classList.remove("error-text");
                inputMonth.classList.remove("error");
                smallMonth.textContent = "";
                if (month.length === 2) {
                    inputYear.focus();
                }
            }
        }
    }
});

inputYear.addEventListener("input", () => {
    let year = inputYear.value;
    if (year.length == 0) {
        labelYear.classList.remove("error-text");
        inputYear.classList.remove("error");
        smallYear.textContent = "";
    } else {
        if (+year > date.getFullYear() || +year < 1900) {
            labelYear.classList.add("error-text");
            inputYear.classList.add("error");
            smallYear.textContent = "Must be an actual year or a year in the past";
        } else {
            if (+year === 0) {
                labelYear.classList.add("error-text");
                inputYear.classList.add("error");
                smallYear.textContent = "This field is required";
            } else {
                labelYear.classList.remove("error-text");
                inputYear.classList.remove("error");
                smallYear.textContent = "";
            }
        }
    }
});

function calculate(day, month, year) {
    let today = new Date();
    let enterDate = new Date(year, month - 1, day);

    let actualMonth = today.getMonth();
    let actualDate = today.getDate();
    let actualYear = today.getFullYear();

    if (inputDay.value.length == 0 &&
        inputMonth.value.length == 0 &&
        inputYear.value.length == 0
    ) {
        inputDay.classList.toggle("error");
        inputMonth.classList.toggle("error");
        inputYear.classList.toggle("error");
        labelDay.classList.toggle("error-text");
        labelMonth.classList.toggle("error-text");
        labelYear.classList.toggle("error-text");

        smallDay.textContent = "This field needs to be filled";
        smallMonth.textContent = "This field needs to be filled";
        smallYear.textContent = "This field needs to be filled";
    } else {
        if (enterDate > today) {
            inputDay.classList.toggle("error");
            inputMonth.classList.toggle("error");
            inputYear.classList.toggle("error");
            labelDay.classList.toggle("error-text");
            labelMonth.classList.toggle("error-text");
            labelYear.classList.toggle("error-text");

            smallDay.textContent = "Insert a past date or an actual date";
            smallMonth.textContent = "Insert a past date or an actual date";
            smallYear.textContent = "Insert a past date or an actual date";
            inputDay.value = "";
            inputMonth.value = "";
            inputYear.value = "";
        } else {
            let years = actualYear - year;
            let months = actualMonth - (month - 1);
            let days = actualDate - day;

            if (days < 0) {
                months--;
                days += new Date(actualYear, actualMonth, 0).getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            dayA.textContent = days;
            monthA.textContent = months;
            yearA.textContent = years;
        }
    }
}

sbtBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let day = +inputDay.value;
    let month = +inputMonth.value;
    let year = +inputYear.value;

    if (day > 31 || month > 12 || year > actualYear) {
        alert("Enter a valid date");
    } else {
        calculate(day, month, year);
    }
});

