//variable//
score_right_wrist= 0;
song="";
left_wrist_x= 0;
left_wrist_y= 0;
right_wrist_x= 0;
right_wrist_y= 0;
score_left_wrist= 0;
//function//
function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide()
    posenet= ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotposes);
}
function modelloaded() {
    console.log("Posenet is loaded");
}
function gotposes(results) {
if(results.length>0){
    console.log(results);
    score_left_wrist=results[0].pose.keypoints[9].score;
    console.log("Score of left wrist= "+score_left_wrist);
    score_right_wrist= results[0].pose.keypoints[10].score;
    console.log("Score of right wrist= "+score_right_wrist);
    left_wrist_x= results[0].pose.leftWrist.x;
    left_wrist_y= results[0].pose.leftWrist.y;
    console.log("Left wrist x= "+left_wrist_x+" left wrist y= "+left_wrist_y);
    right_wrist_x= results[0].pose.rightWrist.x;
    right_wrist_y= results[0].pose.rightWrist.y;
    console.log("Right wrist x= "+right_wrist_x+" right wrist y= "+right_wrist_y);
}
}
function draw() {
    image(video,0,0,600,500);
    if(score_right_wrist>0.2){
        fill("red")
        stroke("red")
        circle(right_wrist_x,right_wrist_y,20)
        if(right_wrist_y>0 && right_wrist_y<=100) {
             document.getElementById("speed").innerHTML="Speed: 0.5x"
             song.rate(0.5);
        }
        else if(right_wrist_y>100 && right_wrist_y<=200) {
            document.getElementById("speed").innerHTML="Speed: 1x"
            song.rate(1);
       }
       else if(right_wrist_y>200 && right_wrist_y<=300) {
        document.getElementById("speed").innerHTML="Speed: 1.5x"
        song.rate(1.5);
   }
  else if(right_wrist_y>300 && right_wrist_y<=400) {
    document.getElementById("speed").innerHTML="Speed: 2x"
    song.rate(2);
}
else if(right_wrist_y>400 && right_wrist_y<=500) {
    document.getElementById("speed").innerHTML="Speed: 2.5x"
    song.rate(2.5);
}
    }
    if(score_left_wrist>0.2){
        fill("yellow");
        stroke("yellow");
        circle(left_wrist_x,left_wrist_y,20);
        keysNumber=Number(left_wrist_y);
        remove_decimal=floor(keysNumber);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="Volume: "+volume;
        song.setVolume(volume);
    }
}
function preload() {
    song=loadSound("music.mp3");
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop() {
    song.stop();
}    
window.addEventListener("keydown",mykeydown)


function mykeydown(e) {
    keyPressed=e.keyCode
    if (keyPressed=="80"){
        song.play();
    }
    if(keyPressed=="83"){
        song.stop();
    }
}