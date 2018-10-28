$(document).ready(function () {

    var $panel;
    var $myShip;
    var currentX;
    var currentY;
    var leftBorder;
    var rightBorder;
    var enemyShipLimit;
    var enemyShipCounter;
    var totalScore;
    var enemyType;
    var enemyShipShowed;
    var enemyShipHits;
    var enemyShipPoints;

    function init() {
        resetGame();

        $panel = $("<div>");
        $myShip = $("<img>");
        $panel.attr("class", "w3-transparent myContainer");
        $myShip.attr("class", "shipSizeStyle myShipStyle");
        $("body").on("keydown", keyDownEventListener);

        ($panel).append($myShip);
        $("body").prepend($panel);
        dropEnemy();
    }

    function resetGame() {
        currentX = 800;
        leftBorder = 0;
        rightBorder = 1620;
        enemyShipShowed = [0, 0, 0];
        enemyShipHits = [0, 0, 0];
        enemyShipPoints = [0, 0, 0];
        enemyShipLimit = 100;
        enemyShipCounter = 0;
        totalScore = 0;
        enemyShipPoint = [10, 25, 50];
        enemyType = { enemyShip: 0, enemyCommanderShip: 1, enemyMotherFuckerShip: 2 };
    }

    function dropEnemy() {
        if (enemyShipCounter == enemyShipLimit) {
            gameOver();
            return;
        }
        var timeBetweenDrop = Math.random() * 4;
        var ememyType = Math.random();
        setTimeout(dropEnemy, timeBetweenDrop * 1000);

        if (ememyType <= 0.7) {
            var $myEmemy = $("<img>").attr("class", "enemyStyle enemyShipStyle").attr("id", "enemyShip");
            enemyShipShowed[enemyType.enemyShip]++;
            updateTable();
            drop($myEmemy);
        }
        else if (ememyType <= 0.9) {
            var $myEmemy = $("<img>").attr("class", "enemyStyle enemyCommanderShipStyle").attr("id", "enemyCommanderShip");
            enemyShipShowed[enemyType.enemyCommanderShip]++;
            updateTable();
            drop($myEmemy);
        }
        else {
            var $myEmemy = $("<img>").attr("class", "enemyStyle enemyMotherFuckerShipStyle").attr("id", "enemyMotherFuckerShip");
            enemyShipShowed[enemyType.enemyMotherFuckerShip]++;
            updateTable();
            drop($myEmemy);
        }
        enemyShipCounter++;
    }

    function drop($myEmemy) {
        var enemyPos = Math.random() * 1450;
        $myEmemy.css("left", enemyPos).css("top", 0);
        $panel.append($myEmemy);
        $myEmemy.animate({
            top: "90%"
        }, {
                duration: 5000,
                complete: function () {
                    $myEmemy.remove();
                },
                progress: function (o, p, t) {
                    let $enemy = $(this);

                    $(".rocketStyle").each(function () {
                        checkIfHit($(this), $enemy);
                    })
                }
            })
    }

    function shot() {
        var $myRocket = $("<img>").attr("class", "rocketStyle");
        $myRocket.css("left", currentX).css("top", 750);
        $panel.append($myRocket);
        $myRocket.animate({
            top: "0%"
        },
            {
                duration: 4000,
                complete: function () {
                    $myRocket.remove();
                },
                progress: function (o, p, t) {
                    let $rocket = $(this);

                    $(".enemyStyle").each(function () {
                        checkIfHit($rocket, $(this));
                    })
                }
            });
    }

    function checkIfHit(rocket, enemy) {
        if (rocket.offset().top <= enemy.offset().top + 50 && rocket.offset().top >= enemy.offset().top
            && rocket.offset().left >= enemy.offset().left && rocket.offset().left <= enemy.offset().left + 200) {
            rocket.remove();
            enemy.remove();
            if (enemy.attr("id") == "enemyShip") {
                enemyShipHits[enemyType.enemyShip]++;
                enemyShipPoints[enemyType.enemyShip] += enemyShipPoint[enemyType.enemyShip];
            }
            else if (enemy.attr("id") == "enemyCommanderShip") {
                enemyShipHits[enemyType.enemyCommanderShip]++;
                enemyShipPoints[enemyType.enemyCommanderShip] += enemyShipPoint[enemyType.enemyCommanderShip];
            }
            else {
                enemyShipHits[enemyType.enemyMotherFuckerShip]++;
                enemyShipPoints[enemyType.enemyMotherFuckerShip] += enemyShipPoint[enemyType.enemyMotherFuckerShip];
            }
            updateTable();
        }
    }

    function keyDownEventListener() {
        if (window.event.keyCode == 37) moveLeft();
        if (window.event.keyCode == 38) shot();
        if (window.event.keyCode == 39) moveRight();
    }

    function moveRight() {
        if (currentX + 20 <= rightBorder) {
            $myShip.css("left", currentX + 20 + "px");
            currentX += 20;
        }
    }

    function moveLeft() {
        if (currentX - 20 >= leftBorder) {
            $myShip.css("left", currentX - 20 + "px");
            currentX -= 20;
        }
    }

    function updateTable() {
        $("#enemyShipHits").html(enemyShipHits[enemyType.enemyShip] + "/" + enemyShipShowed[enemyType.enemyShip]);
        $("#enemyCommanderShipHits").html(enemyShipHits[enemyType.enemyCommanderShip] + "/" + enemyShipShowed[enemyType.enemyCommanderShip]);
        $("#enemyMotherFuckerShipHits").html(enemyShipHits[enemyType.enemyMotherFuckerShip] + "/" + enemyShipShowed[enemyType.enemyMotherFuckerShip]);
        $("#enemyTotalShipHits").html(
            (enemyShipHits[enemyType.enemyShip] + enemyShipHits[enemyType.enemyCommanderShip] + enemyShipHits[enemyType.enemyMotherFuckerShip])
            + "/" +
            (enemyShipShowed[enemyType.enemyShip] + enemyShipShowed[enemyType.enemyCommanderShip] + enemyShipShowed[enemyType.enemyMotherFuckerShip]));

        $("#enemyShipPoints").html(enemyShipPoints[enemyType.enemyShip]);
        $("#enemyCommanderShipPoints").html(enemyShipPoints[enemyType.enemyCommanderShip]);
        $("#enemyMotherFuckerShipPoints").html(enemyShipPoints[enemyType.enemyMotherFuckerShip]);
        totalScore = enemyShipPoints[enemyType.enemyShip] + enemyShipPoints[enemyType.enemyCommanderShip] + enemyShipPoints[enemyType.enemyMotherFuckerShip];
        $("#enemyTotalShipPoints").html(totalScore);
    }

    function gameOver() {
        alert("Game-Over! Your Score: " + totalScore + " Points." + " Press OK to start over.");
        $myShip.remove();
        $panel.remove();
        $("body").off("keydown", keyDownEventListener);
        init();
    }

    init();

})