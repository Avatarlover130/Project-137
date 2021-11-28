status = "";
object = [];

function preload() {
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 500, 400);
    if (status != "") {
        objectDetector.detect(video, gotResult)
        for (i = 0; i < object.length; i++) {
            document.getElementById('status').innerHTML = "Status: Object Detected";
            fill("#e1affd");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + "%", object[i].x + 35, object[i].y + 35);
            noFill();
            stroke("#e1affd");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label == object_name) {
                video.stop();
                objectDetector.dectect(gotResult);
                document.getElementById('status').innerHTML = object_name + "Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }
            else {
                document.getElementById('status').innerHTML = object_name + "Not Found";
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("val-of-obj-nm").value;
}

function modelLoaded() {
    console.log("Model Loaded !");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}