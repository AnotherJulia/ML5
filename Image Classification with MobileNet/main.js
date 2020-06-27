let mobilenet;
let img;

function modelReady() {
    console.log("MobileNet ready");
    mobilenet.predict(img, results);
}

function results(error, data) {
    if (error) {
        console.error(error);
    } else {
        console.log(data);
        let label1 = data[0].label;
        let label2 = data[1].label;
        let prob = data[0].confidence * 100;

        createP(label1);
        createP(prob + "%");

        if (prob < 40) {
            createP("Or perhaps: " + label2);
        }
    }
}

function imageReady() {
    image(img, 0, 0, width, height);
}

function setup() {
    createCanvas(640, 480);
    background(200);
    img = createImg("../Animals/panda.jpg", imageReady);
    img.hide();
    mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}

