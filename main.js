Status="";
object=[];
video="";



function setup ()
{
    canvas=createCanvas(480,380);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
}


function draw ()
{
    image(video,0,0,480,380);
    if(Status !="")
    {
        objectDetector.detect(video,gotresults);
        for(i=0; i<object.length;i++)
        {
            document.getElementById("Status").innerHTML="Object detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are:"+object.length;

            fill("red");
            percent=floor(object[i].confidence*100);
            text(object[i].label +" "+percent+"%",object[i].x+15,object[i].y+14);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

            if(object[i].label == object_name)
            {
              video.stop();
              objectDetector.detect(gotResult);
              document.getElementById("object_status").innerHTML = object_name + " Found";
              synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(object_name + "Found");
              synth.speak(utterThis);
            }
            else
            {
              document.getElementById("object_status").innerHTML = object_name + " Not Found";
            } 
        }
    }
}

function gotresults (error,results)
{
    if(error)

    {
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
    

}

function start ()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("Status").innerHTML="Status: Detecting objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded ()
{
    console.log("Initialised model loaded!");
    Status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
