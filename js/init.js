var assets ={
    'skierCrash' : 'img/skier_crash.png',
    'skierLeft' : 'img/skier_left.png',
    'skierLeftDown' : 'img/skier_left_down.png',
    'skierDown' : 'img/skier_down.png',
    'skierRightDown' : 'img/skier_right_down.png',
    'skierRight' : 'img/skier_right.png',
    'tree' : 'img/tree_1.png',
    'treeCluster' : 'img/tree_cluster.png',
    'rock1' : 'img/rock_1.png',
    'rock2' : 'img/rock_2.png',
    'bg' : 'img/bg.png',
    'skierJump':'img/skier_jump_3.png'
};
var obstacleTypes = [
    'tree',
    'treeCluster',
    'rock1',
    'rock2'
];
var control = {
    'UP':38,
    'RIGHT':39,
    'DOWN':40,
    'LEFT':37
};
var direction = {
    'CRUSH':0,
    'UP':6,
    'RIGHT':5,
    'BOTTOM_RIGHT':4,
    'BOTTOM':3,
    'BOTTOM_LEFT':2,
    'LEFT':1

};
var loadedAssets = {};
var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;
var ctx;
var getContext = function(gameWidth,gameHeight){
    if(ctx){
        return ctx;
    }
    var canvas = $('<canvas></canvas>')
    .attr('width', gameWidth * window.devicePixelRatio)
    .attr('height', gameHeight * window.devicePixelRatio)
    .css({
        width: gameWidth + 'px',
        height: gameHeight + 'px',
    });
$('.game_space').append(canvas);
ctx = canvas[0].getContext('2d');
return ctx;
};
//obstacles with type and x,y positions on the canvas
var obstacles = [];
   //runs once at beginning of game
   var loadAssets = function() {
    var assetPromises = [];
    _.each(assets, function(asset, assetName) {
        var assetImage = new Image();
        var assetDeferred = new $.Deferred();

        assetImage.onload = function() {
            assetImage.width /= 2;
            assetImage.height /= 2;

            loadedAssets[assetName] = assetImage;
            assetDeferred.resolve();
        };
        assetImage.src = asset;

        assetPromises.push(assetDeferred.promise());
    });

    return $.when.apply($, assetPromises);
};
var intersectRect = function(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
};