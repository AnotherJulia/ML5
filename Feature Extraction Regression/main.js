// has to run via chrome (WebGL)

let mobilenet;
let classifier;
let video;
let label = '';
let value = 0;
let predictor;
let trainButton;
let addButton;


function modelReady() {
  console.log('Model is ready');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log("Training Complete");
    predictor.predict(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    //console.log(results);
    value = results;
    predictor.predict(gotResults);
  }
}

function videoReady() {
  console.log("Video is ready");
}

function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
  predictor = mobilenet.regression(video, videoReady);


  slider = createSlider(0,1, 0.5, 0.1);
  slider.input(function() {
    //console.log(slider.value());
  });

  trainButton = createButton('Train Button');
  trainButton.mousePressed(function() {
    predictor.train(whileTraining);
  });

  addButton = createButton("Add Image");
  addButton.mousePressed(function() {
    predictor.addImage(slider.value());
  });

}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}

