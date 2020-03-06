$(document).ready(function(){

    var hero = {
        x: 300,
        y: 500
    };
    var enemy1 = [{x: 100, y: 100}, {x: 300, y: 100}, {x: 500, y: 100}, {x: 700, y: 100}];
    var enemy2 = [{x: 200, y: 200}, {x: 400, y: 200}, {x: 600, y: 200}];
    var bullet = [];
    var score = 1000;

    function displayHero(){
        $('#hero').css({"top": hero.y + 'px', "left": hero.x + 'px'});
    };
    function displayEnemy(){
        var output = "";
        for(var i=0; i<enemy1.length; i++){
            output += "<div class='enemy1' style='top: "+enemy1[i].y+"px; left: "+enemy1[i].x+"px;'></div>";
            for(var j=0; j<enemy2.length; j++){
                output += "<div class='enemy2' style='top: "+enemy2[j].y+"px; left: "+enemy2[j].x+"px;'></div>";
            }
        };
        $('#enemies').html(output);
    };
    function displayBullet(){
        var output = "";
        for(var i=0; i<bullet.length; i++){
            output += "<div class='bullet' style='top: "+bullet[i].y+"px; left: "+bullet[i].x+"px;'></div>"; // failed at first cuz i put it as: "style='top: "+hero.y+"px; left: "+hero.x+"px;", but i defined bullet's x & y in the onkeydown function!!!
        }
        document.getElementById('bullets').innerHTML = output;
    };
    function displayScore(){
        document.getElementById('score').innerHTML = score;
    };

    document.onkeydown = function(event){
        if(event.keyCode == 37){
            hero.x -= 15;
        }
        else if(event.keyCode == 39){
            hero.x += 15;
        }
        else if(event.keyCode == 38){
            hero.y -= 15;
        }
        else if(event.keyCode == 40){
            hero.y += 15;
        }
        else if(event.keyCode == 32){
            bullet.push({x: hero.x+6, y: hero.y-15});
            console.log(bullet);
            // displayBullet();
        }
        // displayHero();
    };

    function moveEnemy(){
        for(var i=0; i<enemy1.length; i++){
            enemy1[i].y += 10;
            if(enemy1[i].y > 550){
                enemy1[i].y = 0;
                enemy1[i].x = Math.random()*200;
            }
        };
        for(var j=0; j<enemy2.length; j++){
            enemy2[j].y += 10;
            if(enemy2[j].y > 550){
                enemy2[j].y = 0;
                enemy2[j].x = Math.random()*700;
            }
        };

    };
    function moveBullet(){
        for(var i=0; i<bullet.length; i++){
            bullet[i].y -= 10;
            if(bullet[i].y < 0){
                bullet[i] = bullet[bullet.length-1];
                bullet.pop();
                console.log(bullet);
            }
        }
    };
    // function displayScore();
    function detectCollision(){
        for(var k=0; k<bullet.length; k++){
            for(var i=0; i<enemy1.length; i++){
                if(Math.abs(enemy1[i].x - hero.x) < 10 && Math.abs(enemy1[i].y - hero.y) < 10){
                    score -= 500;
                    console.log("oh noooooooooo")
                }
                if(Math.abs(enemy1[i].x - bullet[k].x) < 10 && Math.abs(enemy1[i].y - bullet[k].y) < 10){
                    score += 10;
                    // $(this).css("background-position", "10px -20px");
                    // document.getElementsByTagName('enemy1[i]').style.backgroundPosition = '10px' + '-20px';
                    // console.log('explode');
                    console.log("and it's exploded")
                }
            };
            for(var j=0; j<enemy2.length; j++){
                if(Math.abs(enemy2[j].x - hero.x) < 10 && Math.abs(enemy2[j].y - hero.y) < 10){
                    score -= 500;
                    console.log("oh noooooooooo 2")
                }
                if(Math.abs(enemy2[j].x - bullet[k].x) < 10 && Math.abs(enemy2[j].y - bullet[k].y) < 10){
                    score += 10;
                    console.log("and it's exploded 2")
                }
            };
        }
    };
    // function displayExplosion(){
    //     for(var k=0; k<bullet.length; k++){
    //         for(var i=0; i<enemy1.length; i++){
    //             if(Math.abs(enemy1[i].x - hero.x) < 10 && Math.abs(enemy1[i].y - hero.y) < 10){
    //                 score -= 500;
    //             }
    //             if(Math.abs(enemy1[i].x - bullet[k].x) < 10 && Math.abs(enemy1[i].y - bullet[k].y) < 10){
    //                 score += 10;
    //                 console.log('bullet hit enemy1');
    //             }
    //         };
    //         for(var j=0; j<enemy2.length; j++){
    //             if(Math.abs(enemy2[j].x - hero.x) < 10 && Math.abs(enemy2[j].y - hero.y) < 10){
    //                 score -= 500;
    //             }
    //             if(Math.abs(enemy2[j].x - bullet[k].x) < 10 && Math.abs(enemy2[j].y - bullet[k].y) < 10){
    //                 score += 10;
    //                 console.log('bullet hit enemy2');
    //             }
    //         };
    //     }
    // }

    function gameLoop(){
        displayHero();
        // moveHero();
        displayEnemy();
        moveEnemy();
        displayBullet();
        moveBullet();
        detectCollision();
        displayScore();
    };
    setInterval(gameLoop, 100);

});
