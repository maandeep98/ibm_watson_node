var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine','ejs');
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

// var x=document.getElementById('img');
var x;
//var config=require('./config');
var visualRecognition = new VisualRecognitionV3({
    version_date: '2018-08-10',
    iam_apikey: "m3wX4YW3Lts8r3Aj8PzwVyBq16vCzieHIlQhkqUrdCRw"
});
app.get('/',function (req,res) {
    res.render('index');
});
app.post('/submit',function (req,res) {
    x = req.body.image;
    var va = final();
    console.log(x);
    // res.render('sub',{va});
});

function final() {

    var images_file = fs.createReadStream(x);
    var classifier_ids = ["superhero_1051735074"];
    var threshold = 0.49;

    var params = {
        images_file: images_file,
        classifier_ids: ["superhero_1051735074"],
        threshold: 0.49
    };
    var y;
    visualRecognition.classify(params, function (err, response) {

        if (err)
            console.log(err);
        else
            y = JSON.stringify(response, null, 2)
    });
    return y;
}
app.listen(8080,function(){

});