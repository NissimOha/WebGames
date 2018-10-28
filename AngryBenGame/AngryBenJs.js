var tablePlace = document.getElementById("tablePlace");
var levels = ["קל", "בינוני", "קשה"];
var currentLevel = 0;
var tableLevels = [3, 5, 10];
var hasTable = false;
var benShow = document.createElement("img");
var benHit = document.createElement("img");
var numberOfhits = 0;
var numberOfshowed = -1;
var steps = [
    { time: ((Math.random() * 0.5) + 1), cssClass: "benShowStyle" },
    { time: ((Math.random() * 0.75) + 0.25), cssClass: "benHide" }];
var currentStep = 0;

function levleChange() {
    var level = document.getElementsByTagName("select")[0].value;
    if (level == levels[0]) currentLevel = 0;
    if (level == levels[1]) currentLevel = 1;
    if (level == levels[2]) currentLevel = 2;
}

function reselAll() {
    if (hasTable) {
        tablePlace.removeChild(document.getElementById("table"));
    }
    setVisible("visible", "scoreVisible", "scoreHidden");
    numberOfshowed = -1;
    numberOfhits = 0;
}

function setVisible(isVisible, fromClass, toClass) {
    document.getElementById("btn").style.visibility = isVisible;
    document.getElementById("spanLevel").style.visibility = isVisible;
    document.getElementById("select").style.visibility = isVisible;
    var score = document.getElementsByClassName(fromClass);
    var length = score.length;
    for (var i = 0; i < length; i++) {
        score[0].className = toClass;
    }
}

function setScore() {
    benShow.removeEventListener("click", setScore);
    benShow.className = "benHitStyle";
    document.getElementById("numOfHits").innerHTML = ++numberOfhits;
}

function endGame() {
    alert("Game-Over!!!     Score: " + document.getElementById("numOfHits").innerHTML);
    reselAll();
}

function Game() {
    if (currentStep == 0)
        document.getElementById("numOfFails").innerHTML = ++numberOfshowed - numberOfhits;
    if (numberOfshowed - numberOfhits == 3) {
        endGame();
        return;
    }

    var row = Math.floor(Math.random() * tableLevels[currentLevel]);
    var col = Math.floor(Math.random() * tableLevels[currentLevel]);
    var cell = document.getElementById(String(row) + String(col));

    benShow.className = steps[currentStep].cssClass;
    benShow.addEventListener("click", setScore);
    cell.appendChild(benShow);

    setTimeout(Game, steps[currentStep].time * 1000);
    currentStep = currentStep < steps.length - 1 ? currentStep + 1 : 0;
}

function buildGame() {
    setVisible("hidden", "scoreHidden", "scoreVisible");
    document.getElementById("numOfHits").innerHTML = numberOfhits;
    document.getElementById("numOfFails").innerHTML = numberOfshowed - numberOfhits;

    var table = document.createElement("table");
    table.id = "table";

    for (var i = 0; i < tableLevels[currentLevel]; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < tableLevels[currentLevel]; j++) {
            var td = document.createElement("td");
            var div = document.createElement("div");
            div.id = String(i) + String(j);
            div.className = "hole";
            td.appendChild(div);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    hasTable = true;
    tablePlace.appendChild(table);
    Game();
}