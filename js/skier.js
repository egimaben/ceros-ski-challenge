function Skier(){
    var skierDirection = direction.RIGHT;
    var skierMapX = 0;
    var skierMapY = 0;
    var skierSpeed = 6;
    var jumping = false;
    var currentScore = 0;
    var crashCount = 0;
    var crashed = false;
    var level = 1;
    function jump() {              
        if (!jumping) {
          jumping = true;
          setTimeout(land, 500);
        }
      }
      function land(){
          jumping=false;
      }
      var setLevel = function(l){
        level = parseInt(l);
      }
      var getLevel = function(){
          return level;
      }
      var upLevel = function(){
          level++;
          skierSpeed+=2;
      }
    var reset = function(){
        currentScore = 0;
        crashCount = 0;
        crashed = false;
        skierSpeed = 6;
    }
    var getSpeed = function(){
        return skierSpeed;
    }
    var setSpeed = function(speed){
        skierSpeed = parseInt(speed);
    }
    var getCrashCount = function(){
        return crashCount;
    }
    var getScore = function(){
        return currentScore;
    }
    var setScore = function(score){
        
        currentScore = parseInt(score);
    }
    var score = function (){
        currentScore += 1;
    }
    var getDirection = function(){
        return skierDirection;
    }

    var setDirection = function(direction){
        skierDirection = direction;
    }
    var getX = function(){
        return skierMapX;
    }
    var getY = function(){
        return skierMapY;
    }
    var moveLeft = function(){
        skierMapX -= skierSpeed;
    }
    var moveRight = function(){
        skierMapX += skierSpeed;
    }
    var turnLeftWards = function(){
        skierDirection--;
    }
    var turnRightWards = function(){
        skierDirection++;
    }
//runs in continuous loop returning asset/skier image corresponding to the current state depending on the button last pressed

    var asset = function(){
        var skierAssetName;
        switch(skierDirection) {
            case direction.CRUSH:
                
                skierAssetName = 'skierCrash';
                break;
            case direction.LEFT:
                skierAssetName = 'skierLeft';
                break;
            case direction.BOTTOM_LEFT:
                skierAssetName = jumping?'skierJump':'skierLeftDown';
                break;
            case direction.BOTTOM:
                skierAssetName = jumping?'skierJump':'skierDown';
                
                break;
            case direction.BOTTOM_RIGHT:
                skierAssetName = jumping?'skierJump':'skierRightDown';
                break;
            case direction.RIGHT:
                skierAssetName = 'skierRight';
                break;
        }
        return skierAssetName;
    }
    //continuous loop
    var draw = function() {
        var skierAssetName = asset();
        var skierImage = loadedAssets[skierAssetName];
        var x = (gameWidth - skierImage.width) / 2;
        var y = (gameHeight - skierImage.height) / 2;
        ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
    };
    var didHitObstacle = function(){
        var skierAssetName = asset();
        var skierImage = loadedAssets[skierAssetName];
        var skierRect = {
            left: skierMapX + gameWidth / 2,
            right: skierMapX + skierImage.width + gameWidth / 2,
            top: skierMapY + skierImage.height - 5 + gameHeight / 2,
            bottom: skierMapY + skierImage.height + gameHeight / 2
        };

        var collision = _.find(obstacles, function(obstacle) {
            var obstacleImage = loadedAssets[obstacle.type];
            var obstacleRect = {
                left: obstacle.x,
                right: obstacle.x + obstacleImage.width,
                top: obstacle.y + obstacleImage.height - 5,
                bottom: obstacle.y + obstacleImage.height
            };

            return intersectRect(skierRect, obstacleRect);
        });

        if(collision && !jumping) {
            skierDirection = direction.CRUSH;  
            if(!crashed){
                    crashed=true;
                    crashCount++;
            }
        }else{
            crashed = false;
        }
    }
    
         var move = function() {
            switch(skierDirection) {
                //move left-down
                case direction.BOTTOM_LEFT:
                    skierMapX -= Math.round(skierSpeed / 1.4142);
                    skierMapY += Math.round(skierSpeed / 1.4142);
                    score();
                    break;
                case direction.BOTTOM:
    
                //move down
                    skierMapY += skierSpeed;   
                    score(); 
                    break;
                case direction.BOTTOM_RIGHT:
                //move right down
                    skierMapX += skierSpeed / 1.4142;
                    skierMapY += skierSpeed / 1.4142;
                    score();
                    break;
            }
        };
    return{
        getDirection:getDirection,
        setDirection:setDirection,
        didHitObstacle:didHitObstacle,
        move:move,
        draw:draw,
        getX:getX,
        getY:getY,
        moveLeft:moveLeft,
        moveRight:moveRight,
        turnLeftWards:turnLeftWards,
        turnRightWards:turnRightWards,
        jump:jump,
        score:score,
        getScore:getScore,
        setScore:setScore,
        getCrashCount:getCrashCount,
        reset:reset,
        getSpeed:getSpeed,
        setSpeed:setSpeed,
        upLevel:upLevel,
        setLevel:setLevel,
        getLevel:getLevel
    }

    
}