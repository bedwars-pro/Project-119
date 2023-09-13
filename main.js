quick_draw_data_set=["aircraft carrier","airplane","alarm clock","cactus","angel","strawberry","ant","axe","backpack","basketball","basket","bat","bathtub","bench","brain","cat","castle"];
random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1);
    sketch=quick_draw_data_set[random_number];
    document.getElementById('sketch_name').innerHTML='Sketch to be drawn: '+sketch;

    timer_counter=0;
    timer_check="";
    drawn_sketch="";
    answer_holder="";
    score=0;

function setup(){
    canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}
function clearCanvas(){
    background("white");
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(10);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
    check_sketch()
    if(drawn_sketch==sketch){
        answer_holder="set"
        score++;
        document.getElementById('score').innerHTML='Score: '+score;
    }
}
function check_sketch(){
    timer_counter++;
    document.getElementById('timer').innerHTML='Timer: '+timer_counter;
    if(timer_counter>400){
        timer_counter=0;
        timer_check="completed"
    }
    if(timer_check=="completed"||answer_holder=="set"){
        timer_check="";
        answer_holder="";
        updateCanvas();
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    drawn_sketch=results[0].label;
    document.getElementById('label').innerHTML='Your Sketch: '+drawn_sketch;
    document.getElementById('confidence').innerHTML='Confidence: '+Math.round(results[0].confidence*100)+'%';

}
function updateCanvas(){
    background("white");
    random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1);
    sketch=quick_draw_data_set[random_number];
    document.getElementById('sketch_name').innerHTML='Sketch to be drawn: '+sketch;
}