$(document).ready(function() {
var skier = new Skier();
var paused = false;
var initStage = true;
var endgame = false;
var gameEnded = false;
$('#game-end').click(function(){
    restart();
});
$('#restart-game').click(function(){
    restart();
});
var calculateOpenPosition = function(minX, maxX, minY, maxY) {
    var x = _.random(minX, maxX);
    var y = _.random(minY, maxY);

    var foundCollision = _.find(obstacles, function(obstacle) {
        return x > (obstacle.x - 50) && x < (obstacle.x + 50) && y > (obstacle.y - 50) && y < (obstacle.y + 50);
    });

    if(foundCollision) {
        return calculateOpenPosition(minX, maxX, minY, maxY);
    }
    else {
        return {
            x: x,
            y: y
        }
    }
};


//called continuosly when direction is down
var placeRandomObstacle = function(minX, maxX, minY, maxY) {
    var obstacleIndex = _.random(0, obstacleTypes.length - 1);

    var position = calculateOpenPosition(minX, maxX, minY, maxY);

    obstacles.push({
        type : obstacleTypes[obstacleIndex],
        x : position.x,
        y : position.y
    })
    if(!initStage){
    skier.score();
}
};
//runs for every displacement of skier
var placeNewObstacle = function(direction) {
    var shouldPlaceObstacle = _.random(1, 8);
    if(shouldPlaceObstacle !== 8) {
        return;
    }

    var leftEdge = skier.getX();
    var rightEdge = skier.getX() + gameWidth;
    var topEdge = skier.getY();
    var bottomEdge = skier.getY() + gameHeight;
    switch(direction) {
        case direction.LEFT: // left
            placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
            break;
        case direction.BOTTOM_LEFT: // left down
            placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
            placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
            break;
        case 3: // down
            placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
            break;
        case direction.BOTTOM_RIGHT: // right down
            placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
            placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
            break;
        case direction.RIGHT: // right
            placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
            break;
        case direction.UP: // up
            placeRandomObstacle(leftEdge, rightEdge, topEdge - 50, topEdge);
            break;
    }
};

var setupKeyhandler = function() {
    $(window).keyup(function(event){
        switch(event.which){
            case control.SPACE:
            paused = !paused;
            document.getElementById('restart').style.display = paused?"block":"none";
            requestAnimationFrame(gameLoop);
            ;break;
        }
    }).keydown(function(event) {
        switch(event.which) {
            case control.LEFT: // left
                //if direction is already left
                if(skier.getDirection() === direction.LEFT) {
                    skier.moveLeft();
                    placeNewObstacle(skier.getDirection());
                }
                else if(skier.getDirection()===direction.CRUSH){
                    skier.setDirection(direction.LEFT);
                }
                else {
                    skier.turnLeftWards();
                }
                event.preventDefault();
                break;
            case control.RIGHT: // right
                if(skier.getDirection() === direction.RIGHT) {
                    skier.moveRight();
                    placeNewObstacle(skier.getDirection());
                }
                else if(skier.getDirection() === direction.CRUSH){
                    skier.setDirection(direction.RIGHT);
                }
                else {
                    skier.turnRightWards();
                }
                event.preventDefault();
                break;
            case control.UP: // up
                if(skier.getDirection()===direction.BOTTOM_LEFT||skier.getDirection()===direction.BOTTOM||skier.getDirection()===direction.BOTTOM_RIGHT){
                    skier.jump();
                }
                event.preventDefault();
                break;
            case control.DOWN: // down
                skier.setDirection(direction.BOTTOM);
                event.preventDefault();
                break;
        }
    });
};

    var placeInitialObstacles = function() {
        var numberObstacles = Math.ceil(_.random(5, 7) * (gameWidth / 800) * (gameHeight / 500));

        var minX = -50;
        var maxX = gameWidth + 50;
        var minY = gameHeight / 2 + 100;
        var maxY = gameHeight + 50;

        for(var i = 0; i < numberObstacles; i++) {
            placeRandomObstacle(minX, maxX, minY, maxY);
        }

        obstacles = _.sortBy(obstacles, function(obstacle) {
            var obstacleImage = loadedAssets[obstacle.type];
            return obstacle.y + obstacleImage.height;
        });
    };

    var ctx = getContext(gameWidth,gameHeight);
    var clearCanvas = function() {
        ctx.clearRect(0, 0, gameWidth, gameHeight);
    };
       
//continuous loop
    var drawObstacles = function() {
        var newObstacles = [];
        _.each(obstacles, function(obstacle) {
            var obstacleImage = loadedAssets[obstacle.type];
            var x = obstacle.x - skier.getX() - obstacleImage.width / 2;
            var y = obstacle.y - skier.getY() - obstacleImage.height / 2;

            if(x < -100 || x > gameWidth + 50 || y < -100 || y > gameHeight + 50) {
                return;
            }

            ctx.drawImage(obstacleImage, x, y, obstacleImage.width, obstacleImage.height);

            newObstacles.push(obstacle);
        });

        obstacles = newObstacles;
    };



   
    var gameLoop = function() {
        if(endgame && !gameEnded){
            // console.log('ending game');
            gameover();
        }
        if(!paused && !gameEnded){
            
            var crashCount = skier.getCrashCount();
        if(crashCount==3){
            endgame = true;
        }
        ctx.save();

        // Retina support
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        clearCanvas();

        // moveSkier();
        skier.move();
        placeNewObstacle(skier.getDirection());

        skier.didHitObstacle();
        ctx.drawImage(loadedAssets['bg'],0,0,gameWidth,gameHeight);
        var score = skier.getScore();
        
        if(score!==0 && score%1000===0){
            skier.upLevel();     
        }
        var level = skier.getLevel();
        localStorage.setItem('score',score);
        localStorage.setItem('level',level);

        document.getElementById('score').innerHTML = score;
        document.getElementById('level').innerHTML = level;

        skier.draw();

        drawObstacles();

        ctx.restore();

        requestAnimationFrame(gameLoop);
    }
    };
    var restart = function(){
        localStorage.removeItem('score');
        localStorage.removeItem('level');
        location.reload();
    }
    var gameover = function(){
        gameEnded= true;
        document.getElementById('game-over').style.display = "block";
    }
    var isNumber = function(n) {
        return !isNaN(parseInt(n)) && isFinite(n);
      }

    var initGame = function() {
        
        setupKeyhandler();
        loadAssets().then(function() {
            placeInitialObstacles();
            if(initStage && isNumber(localStorage.getItem('score'))){
                skier.setScore(localStorage.getItem('score'));
            }
            if(initStage && isNumber(localStorage.getItem('speed'))){
                skier.setSpeed(localStorage.getItem('speed'));
            }
            if(initStage && isNumber(localStorage.getItem('level'))){
                skier.setLevel(localStorage.getItem('level'));
            }
            initStage = false;
            requestAnimationFrame(gameLoop);
        });
    };
    //using configs to replace hard coded directions
    //not necessary to add gameLoop as an argument as 
    //initGame first class function does not take arguments plus gameloop is globally available 
    //initGame(gameLoop);
    initGame();
});