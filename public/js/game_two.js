var WORLD_WIDTH = 1024;
var WORLD_HEIGHT = 576;
var style;
var socket = io();

platforms = [
    {
        w: 572,
        h: 54,
        name: 'large_platform'
    },
    {
        w: 232,
        h: 40,
        name: 'medium_platform'
    },
    {
        w: 121,
        h: 40,
        name: 'small_platform'
    },
]

var game = new Phaser.Game(WORLD_WIDTH, WORLD_HEIGHT, Phaser.AUTO );

//Main State
var gameState0 = function(){
    console.log("menu working");
}

gameState0.prototype={
    preload:preload0,
    create:create0,
    update:update0,
}

function preload0(){
    game.load.image('start', 'assets/img/start.png');
    game.load.image('score', 'assets/img/score.png');
    game.load.image('help', 'assets/img/help.png');

    game.load.image('sky', 'assets/img/sky.png');
    game.load.image('mountain', 'assets/img/background.png');

    game.load.image('mountain', 'assets/img/background.png');

}

var startButton;
var helpButton;
var scoreButton;

var startGame = function(){
game.state.start('gameState1');
}

var startLeaderBoard = function(){
game.state.start('gameState2');
}

var showHelp = function(){
game.state.start('gameState3');
}

function create0(){

        var mountain = game.add.sprite(0, 0, 'mountain');
        
        mountain.scale.setTo(1.5,1.5);
        startButton = game.add.button(game.world.centerX - 95, 200, 'start', startGame, this);

        helpButton = game.add.button(game.world.centerX - 95, 300, 'help', showHelp, this);
        
        scoreButton = game.add.button(game.world.centerX - 95, 400, 'score', startLeaderBoard, this);


}
function update0(){

}

//leaderboard


var gameState2 = function(){
}

gameState2.prototype = {
    preload:preload2,
    create:create2,
    update:update2
};


function preload2()
{
    //game.load.image('playAgain','assets/img/playAgain.png');
    game.load.image('back','assets/img/background.png');
    game.load.image('mainButton','assets/img/')
}
function create2()


{
    leaderText = game.add.text(game.world.width/2,game.world.height/6, 'leaderboard', { fontSize: '45px', fill: '#FFF' });
    var temp = Math.floor((score/10)*(meters/10)/10); 
    game.add.text(40, 30, temp, style);
    socket.emit("sendScore",temp);
    socket.emit('getHighScore');
    socket.on('sendHighScore', function (data) {
        console.log(data);
        var i = 0;
        game.add.text(200,100,"RANK",{fontSize: '18px',fill:'#fff'});
        game.add.text(500,100,"NAME",{fontSize: '18px',fill:'#fff'});
        game.add.text(800,100,"SCORE",{fontSize: '18px',fill:'#fff'});

for(var i=0;i< data.length;i++)
        {
            var obj = data[i];
            game.add.text(200,50*i+150,i+1,{fontSize: '18px',fill:'#fff'});
            game.add.text(500,50*i+150,obj.name,{fontSize: '18px',fill:'#fff'});
            game.add.text(800,50*i+150,obj.score,{fontSize: '18px',fill:'#fff'});
        }

    })
}

function update2()
{

}

//Main Game

var gameState1 = function(){
}

gameState1.prototype = {
    preload:preload,
    create:create,
    update:update
};

//Instruction

var gameState3 = function(){
}

gameState3.prototype = {
    preload:preload3,
    create:create3,
    update:update3
};

function preload3(){
     game.load.image('mountain', 'assets/img/background.png');

}
function create3(){
    var mountain = game.add.sprite(0, 0, 'mountain');
    //mountain.scale.setTo(0.5,0.5);
    
    helpText = game.add.text(game.world.width/2,game.world.height/4, 'Instruction', { fontSize: '45px', fill: '#FFF' });
    helpText.anchor.setTo(0.5,0.5);

    line2Text = game.add.text(game.world.centerX-200,game.world.height/2, 'Use Space key or upward arrow(🡑) to be in the game', { fontSize: '32px', fill: '#FFF' });
    line2Text = game.add.text(game.world.centerX-200,game.world.height/1.5, 'collect coins to score.', { fontSize: '32px', fill: '#FFF' });
   
}
function update3(){

}


//over
/*
var gameState4 = function(){

}
gameState4.prototype={
    preload:preload4,
    create:create4,
    update:update4
};


function preload4(){

    game.laod.image('Main','assets/img/');//gamestate1
    game.load.image('lead','assets/img/');//gamestate2
    game.load.image('background','assets/img/background.png');

}

function create4(){
    var background = game.add.sprite(0,0,'background');
    


}
function update4(){

}*/



game.state.add('gameState0',gameState0); //menu state
game.state.add('gameState1',gameState1); // main game
game.state.add('gameState2',gameState2); // leaderboard
game.state.add('gameState3',gameState3); //help 
//game.state.add('gameState4',gamestate4); //game over
game.state.start('gameState0');


// background
var mountainOne;
var mountainTwo;

//snow

// sprite groups
var grounds;
var snow;
var snowflakes;
var player;

// collision groups
var playerCollisionGroup;
var groundsCollisionGroup;
var snowflakesCollisionGroup;

var lastKeyCode = null;

// ground building info
var currentY = 0;
var currentYPosition = 2;
var currentX = 250;

// score info
var mulitipler = 1;
var scoreText = null;
var score = 10;
var meters = 0;
var metersText = null;

// player info
var currentPlayerSpeed = 500;
var playerLastX = 0;
var lastCameraX = 0;

var MIN_WIDTH = game.width/4;
var MAX_WIDTH = game.width/2;
var MAX_Y = game.height - 150;
var MIN_Y = 150;
var MIN_X = 40;
var MAX_X = 150;

var WORLD_BOUNDS = 2000;
var SPEED_INCREMENT = 25;
var BG_COLOUR = "#a55482";
var TEXT_COLOUR = "#033c4f";
var currentWorldBounds = WORLD_BOUNDS;

var GENERATE_BLACK_SNOWFAKE = 10;

WebFontConfig = {

    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
google: {
      families: ['Londrina Solid']
    }

};


game.over = false;

function preload() 
{
    //game.load.image('ground', 'assets/img/ground_snow_two.png', 0, 0);
    game.load.image('medium_icicle_platform', 'assets/img/medium_icicle_platform.png', 0, 0);
    game.load.image('medium_platform', 'assets/img/medium_platform.png', 0, 0);
    game.load.image('small_platform', 'assets/img/small_platform.png', 0, 0);
    game.load.image('large_platform', 'assets/img/large_platform.png', 0, 0);


    game.load.image('player', 'assets/img/ball.png');
    game.load.image('snowflk','assets/img/snowflk.png')

    game.load.image('player', 'assets/img/ball.png');

    

    game.load.image('mountain', 'assets/img/snow-bg.png');
    game.load.image('mountain_two', 'assets/img/mountain_two.png');

    game.load.image('snowflake', 'assets/img/Star_Coin1.png');
    game.load.image('snowflake_black', 'assets/img/obt1.png');
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


    //audio files
    game.load.audio('main','assets/audio/theme.mp3');

    //obstacles
    game.load.image('obst','assets/img/obt.png');
}

 
 var emitter;


var music;
 /*var count = 0;
 var obstacles;
*/

function create() 
{
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0;
    game.physics.p2.gravity.y = 300;
    //game.physics.p2.updateBoundsCollisionGroup();

    game.stage.backgroundColor = BG_COLOUR;
    mountainOne = game.add.tileSprite(0, 0, WORLD_BOUNDS, WORLD_HEIGHT, 'mountain');
    mountainTwo = game.add.tileSprite(0, 0, WORLD_BOUNDS, WORLD_HEIGHT, 'mountain_two');

    setWorldBounds();

    //emitter
     emitter = game.add.emitter(game.world.centerX, 0, 200);

    emitter.width = game.world.width;

    emitter.makeParticles('snowflk');
    
    emitter.minParticleScale = 0.02;
    emitter.maxParticleScale = 0.08;

    emitter.setYSpeed(50, 200);
    emitter.setXSpeed(-30, 30);

    emitter.start(false, 3500, 30);



    playerCollisionGroup = game.physics.p2.createCollisionGroup();
    groundsCollisionGroup = game.physics.p2.createCollisionGroup();
    snowflakesCollisionGroup = game.physics.p2.createCollisionGroup();

    grounds = game.add.group();
    grounds.enableBody = true; 
    grounds.physicsBodyType = Phaser.Physics.P2JS;

    snowflakes = game.add.group();
    snowflakes.enableBody = true; 
    snowflakes.physicsBodyType = Phaser.Physics.P2JS;


    //music
    music = game.add.audio('main');
    music.play();
    game.input.onDown.add(changeVolume, this);

    
    //obstacle
    //obstacles = game.add.group(); 
    //obstacles.enableBody = true;
    /*for (var i = 0; i < 5; i++) {

    var xpos = game.rnd.integerInRange(10, game.world.width-150);
    var obstacle = obstacles.create(xpos,10, 'obst');
    game.physics.arcade.enable(obstacle);
    obstacle.enableBody = true;
    obstacle.body.velocity.y = 600;*/





    // add start button
    // click event and run init
    init();
    
    game.input.keyboard.onUpCallback = function()
    {
        lastKeyCode = null;
    };

    game.input.keyboard.onDownCallback = function()
    {
        checkCursors()
    };

}

/*//obstacle


function checkOffScreen(obstacle) { 
    if (obstacle.y > game.world.height) { 
        var xpos = game.rnd.integerInRange(10, game.world.width-150);       
          obstacle.x = xpos; 
          obstacle.y = 10;
          //obstacle.velocity.x = 0;
          obstacle.body.velocity.y = 600;       
        }
    }
*/

//voume change
function changeVolume(pointer) {

    if (pointer.y < 100)
    {
        music.mute = false;
    }
    else if (pointer.y < 300)
    {
        music.volume += 0.1;
    }
    else
    {
        music.volume -= 0.1;
    }

}


/**
    Creates the games main player
**/

function addPlayer()
{
    player = game.add.sprite(30, 30, 'player');
    player.scale.setTo(0.7,0.7);
    game.physics.p2.enable(player, false);

    player.body.setRectangleFromSprite();
    player.body.fixedRotation = true;
    player.body.setCollisionGroup(playerCollisionGroup);
    
    player.body.data.gravityScale = 1;
    player.body.collideWorldBounds = true;
    player.body.collides([groundsCollisionGroup], null, this);
    player.body.collides([snowflakesCollisionGroup], null, this);

    player.movement = {};
    player.movement.jumpAmount = 0;

    return player;
}

function init()
{
    generateGround(150, 150, groundsCollisionGroup, playerCollisionGroup, 0, true);
    generateRandomGround();
    player = addPlayer();
    game.camera.follow(player);   
}

function createText()
{
    createScoreText()
    createMetersText()
}

function createScoreText()
{
    style = { font: "35px Londrina Solid", fill: TEXT_COLOUR }; 
    scoreText = game.add.text(40, 30, score.toString(), style);
    scoreText.fixedToCamera = true
}

function createMetersText()
{
    /*
    var style = { font: "35px Londrina Solid", fill: TEXT_COLOUR }; 
    metersText = game.add.text(10, 50, score.toString(), style);
    metersText.fixedToCamera = true*/
}

function setWorldBounds()
{
    xBound = 0

    if ( player != undefined)
    {
        //xBound = ((player.x - player.width) - (game.width/2))
        player.body.collideWorldBounds = true;
    }

    game.world.setBounds(xBound, 0, currentWorldBounds, WORLD_HEIGHT);;
    currentWorldBounds+=WORLD_BOUNDS;
    mountainOne.width = currentWorldBounds
    mountainTwo.width = currentWorldBounds
   

}


 
function update() 

{


        //game.physic.arcade.collide(player,obstacle);

    //
     //obstacles.forEach(checkOffScreen, false);



        meters += (Math.round(player.x - playerLastX))
        if (game.camera.x > lastCameraX)
        {
            mountainOne.tilePosition.x -= 0.2; 
            mountainTwo.tilePosition.x -= 0.8;
               
        }
        
        lastCameraX = game.camera.x

        if (player.x > playerLastX)
            player.angle+=4;

        playerLastX = player.x

        render()
        checkBounds()

        // if the play hits the top then set its down to 200
        if (player.y < 20)
        {
            player.body.moveDown(10);
        }

        if ( ! isGameOver() )
        {
            player.body.moveRight(currentPlayerSpeed)

            if (scoreText != null)
            {
                scoreText.text = score/10+" x "+Math.floor(meters/10)+" m";   
            }

            if (metersText != null)
            {

                //metersText.text = Math.floor(meters/10)+" m";   
            }
        }
        else 
        {
            gameOver()
        }
        
}

/**
    Check if camera is near edge of screen, if it is make game longer
    and add new grounds
**/

function checkBounds()
{
    
    //console.log(game.camera.x + game.camera.view.width)
    //console.log(game.camera.bounds.width)
    if (cameraHasHitWorldBounds())
    {
        game.physics.p2.setBoundsToWorld(true, true, true, true, false);
        currentPlayerSpeed+=SPEED_INCREMENT;
        player.body.data.gravityScale +=0.2;
        setWorldBounds();
        generateRandomGround();
    }
}

/**
    Check if camera has hit the world bounds
    @return bool
**/

function cameraHasHitWorldBounds()
{
    return (game.camera.x + game.camera.view.width) == game.camera.bounds.width
}

function checkCursors()
{
    /* 38 up, 40 down, 37 left, 39 right */

    if (game.input.keyboard.isDown(38) && lastKeyCode != 38 && player.movement.jumpAmount < 2)
    {
        player.movement.jumpAmount++;
        player.body.moveUp(300);
    }

    if (game.input.keyboard.isDown(32) && lastKeyCode != 32 && player.movement.jumpAmount < 2)
    {
        player.movement.jumpAmount++;
        player.body.moveUp(200);
    }


    if (game.input.keyboard.lastKey)
            lastKeyCode = game.input.keyboard.lastKey.keyCode;
}

function generateGround(x, y, collisionGroupToSet, collisionGroupsToHit, index, snowflakeGood)
{
    //height = (height == undefined) ? 300 : height);

    if (index === undefined)
    {
        index = generateRandomNumberBetweenMinAndMax(0, platforms.length - 1)
    }
    
    platform = platforms[index]
    //console.log(platform)

    ground = grounds.create(x, y, platform.name);
    game.physics.p2.enable(ground, false);
    ground.width = platform.w;
    ground.height = platform.h;
    ground.body.setRectangleFromSprite();
    ground.body.setCollisionGroup(collisionGroupToSet);
    ground.body.static = true;
    // ground.body.rotation = generateAngle( (x1) , y1, (x2), y2);
    ground.body.collides(collisionGroupsToHit, hitGrounds, this);

    ground.events.onOutOfBounds.add( removeGround, this );

    // do this dynamically on the size
    // should we generate a black flake
    // should we generate a red flake
    if (ground.width > 150)
    {
        // add snowflakes
        generateSnowflake(x - 75, y - 50, snowflakeGood)
        generateSnowflake(x + 75, y - 50, snowflakeGood)
    }
    else
    {
        generateSnowflake(x, y - 50, snowflakeGood)
    }


    return platform.w

}

function generateSnowflake(x, y, snowflakeGood)
{
    flake = null;

    if (snowflakeGood === undefined)
    {
        if (generateRandomNumberBetweenMinAndMax(1, GENERATE_BLACK_SNOWFAKE) === GENERATE_BLACK_SNOWFAKE)
        {
            flake = snowflakes.create(x, y , 'snowflake_black');
            flake.bad = true;
        }
        else
        {
            flake = snowflakes.create(x, y , 'snowflake');
        }
    }
    else 
    {
        flake = snowflakes.create(x, y , 'snowflake');
    }
    
    flake.height = 30
    flake.width = 35
    flake.body.setRectangleFromSprite();
    flake.body.setCollisionGroup(snowflakesCollisionGroup);
    flake.body.static = true;
    flake.body.collides(playerCollisionGroup, hitFlake, flake);
    snowflakeTween(flake);

    return flake;
}

function snowflakeTween(snowflake)
{
    var bounce = game.add.tween(snowflake);

    bounce.to({ y: snowflake.y - 10 }, 200, Phaser.Easing.Bounce.In)
        .to({ y: snowflake.y + 10 }, 200, Phaser.Easing.Bounce.In);

    bounce.onComplete.add(function(snowflake){snowflakeTween(snowflake)});

    bounce.start();
}

function generateRandomGround()
{
    // if current y is less than the bounds keep generating

    // create mid
    // create top
    // create bottom

    while (currentX <= currentWorldBounds)
    {
        // currentX, minX, maxX
        // x is add last width plus a small variance

        // shoould always be at least 
        x = currentX
        //x = generateRandomNumberBetweenMinAndMax(currentX + MIN_X, currentX + MAX_X);
        // make sure last y is different by at least 50
        y = generateY(currentYPosition); 
        //console.log(y) 

        width = generateGround(x, y, groundsCollisionGroup, playerCollisionGroup)

        //console.log(width)

        currentX+= width;
        currentY = y;
    }
}


/**
    Generates Y coords.
    If pos is 1 genreate in top range, if post is 2 generate in mid range,
    if pos 3 generate in lower range.
**/
function generateY(pos)
{
    min = 0
    max = 0

    if (pos === 1)
    {
        min = MIN_Y
        max = MAX_Y * 0.3
        currentYPosition = 2
    }
    else if (pos === 2)
    {
        min = MAX_Y * 0.3
        max = MAX_Y * 0.6
        currentYPosition = 3
    }
    else if (pos == 3)
    {
        min = MAX_Y * 0.6
        max = MAX_Y
        currentYPosition = 1
    }

    return generateRandomNumberBetweenMinAndMax(min, max);
}

function generateAngle(x1, y1, x2, y2)
{
    pointOne = new Phaser.Point(x1, y1);
    pointTwo = new Phaser.Point(x2, y2);

    return game.physics.arcade.angleBetween(pointOne, pointTwo)
    //return (game.physics.arcade.angleBetween(pointOne, pointTwo) * (180/Math.PI));
}

function generateRandomNumberBetweenMinAndMax(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
    //return Math.floor((Math.random() * max) + min);
}

function hitGrounds(ground)
{
    // if player y is less than ground y then we've hit from the top from the top
    //console.log(player.y > ground.sprite.y)
    //game.paused = true
    // if last button press wasnt up
    // reset 
    /*
    if (player.y < ground.sprite.y)
    {   
        console.log('on top')
    }
    else 
    {
        console.log('below reset')
    }*/

    if (lastKeyCode != 38 || ( ! player.y < ground.sprite.y))
    {
        resetPlayerJump()
    }
    //player.body.static = true;
}

function hitFlake(flake)
{
    isBad = flake.sprite.bad
    
    flake.sprite.kill()
    flake.sprite.destroy()
    
    if (isBad)
    {
        gameOver();
        return;
    }

    resetPlayerJump()
    score+=1
}

function resetPlayerJump()
{
    player.movement.jumpAmount = 0;
}

function removeGround(ground)
{
    console.log('remove')
}

function render() {
    //game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.spriteCoords(player, 32, 500);
    //game.debug.soundInfo(music, 20, 32);

}

/**
    Checks if the game is over
*/

function isGameOver()
{
    //console.log(player.y >= (canvas.height - player.height))
    return player.y >= (WORLD_HEIGHT - player.height)
}

function gameOver()
{
    player.static = true;
    player.body.moveRight(0)
    //game.started = false;
    game.state.start('gameState2');
    
    /*
    text = "GAME OVER";
    fontSize = 60;
    style = { font: fontSize+"px Londrina Solid", fill: TEXT_COLOUR, align: "center" };
    textOne = game.add.text( (game.camera.x + (game.width/3) + 50 ), (game.world.centerY - 30), text, style);
    textOne.inputEnabled = true;

    text = "You scored "+Math.floor((score/10)*(Math.floor(meters/10)))+"\n\nPlay again?";
    fontSize = 30;
    style = { font: fontSize+"px Londrina Solid", fill: TEXT_COLOUR, align: "center" };
    textTwo = game.add.text( (game.camera.x + (game.width/3) + 110 ), (game.world.centerY + 35), text, style);
    textTwo.inputEnabled = true;*/

    // add rectagnle click area
    //game.state.pause()

    // hide canvas
}

function restart()
{
    window.location.reload()
}

