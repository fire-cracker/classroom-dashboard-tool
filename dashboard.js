let tableBody = document.getElementById("table_body");

let dataUrl = "data.json";
let xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }
}
xmlhttp.open("GET", dataUrl, true);
xmlhttp.send();

function myFunction(data) {
    data.map((activities, index) => {
        if (activities != null) {
            const highestScore = bestScore(activities)
            const avgScore = averageScore(activities)
            let totalAttempts = projectCreated(activities)
            let activityCell = createElement("td", {}, `Unit ${index + 1}: ${activities.name}`),
                bestScoreCell = createElement("td", { "style": `color:${color(highestScore)};` }, highestScore),
                averageScoreCell = createElement("td", { "style": `color:${color(avgScore)};` }, avgScore),
                projectCreatedCell = createElement("td", {}, [totalAttempts]),
                newRow = createElement("tr", {}, [activityCell, bestScoreCell, averageScoreCell, projectCreatedCell]);

            tableBody.appendChild(newRow);
        }
    })
}

function bestScore({ submissions }) {
    return submissions.length ? submissions.sort((a, b) => b.score - a.score)[0].score : 'N/A'

}

function averageScore({ submissions }) {
    let { length } = submissions
    return length ? submissions.reduce((total, next) => total + next.score, 0) / length : 'N/A'
}

function projectCreated({ submissions }) {
    let { length } = submissions
    if (length) {
        return createElement(
            "a",
            { "href": `http://www.vidcode.com/share/${submissions[0].token}` },
            `${length} ${length > 1 ? 'Attempts' : 'Attempt'}`
        )
    }
    return 'N/A'
}

function color(score) {
    if (score >= 90) return 'green';
    if (score > 75 && score < 90) return 'blue';
    if (score <= 75) return 'orange';
}

function createElement(element, attribute, inner) {
    if (typeof (element) === "undefined") {
        return false;
    }
    if (typeof (inner) === "undefined") {
        inner = "";
    }
    let el = document.createElement(element);
    if (typeof (attribute) === 'object') {
        for (let key in attribute) {
            el.setAttribute(key, attribute[key]);
        }
    }
    if (!Array.isArray(inner)) {
        inner = [inner];
    }
    for (let k = 0; k < inner.length; k++) {
        if (inner[k].tagName) {
            el.appendChild(inner[k]);
        } else {
            el.appendChild(document.createTextNode(inner[k]));
        }
    }
    return el;
}