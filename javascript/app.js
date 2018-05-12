$(document).ready(function () {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA5leULUE1AfLkB6d5oDKqhuWtFV64Nu_g",
      authDomain: "trainsch-a9808.firebaseapp.com",
      databaseURL: "https://trainsch-a9808.firebaseio.com",
      projectId: "trainsch-a9808",
      storageBucket: "trainsch-a9808.appspot.com",
      messagingSenderId: "537354270642"
    };
    firebase.initializeApp(config);
 
    var database = firebase.database();

    // initial values
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var nextOne = firstTrainTime + frequency;
    
    var result = moment(nextOne).diff(moment(firstTrainTime));
    var humanize = moment.duration(result).humanize();
    console.log (humanize);
    //var diffTime
    // capture button click
    // grab values from textboxes
    $("#submit-btn").on("click", function () {

        console.log(moment(firstTrainTime).format("HH:mm"));

        // code for hand in the push
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            nextArrival: nextArrival,
            minutesAway: minutesAway,
        });
    })
    // firebase watcher and initial loader
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrainTime);
        console.log(childSnapshot.val().frequency);
        console.log(childSnapshot.val().nextArrival);
        console.log(childSnapshot.val().minutesAway);

        // Store everything into a variable.
  trainName = childSnapshot.val().name;
  destination = childSnapshot.val().destination;
  frequency = childSnapshot.val().frequency;
  firstTrainTime = childSnapshot.val().firstTrain;

  timeArray = firstTrainTime.split(":");
  trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
  maxMoment = moment.max(moment(), trainTime);
  tMinutes;
  tArrival;

 
 if (maxMoment === trainTime) {
   tArrival = trainTime.format("hh:mm A");
   tMinutes = trainTime.diff(moment(), "minutes");
 } else {

   var differenceTimes = moment().diff(trainTime, "minutes");
   var tRemainder = differenceTimes % tFrequency;
   tMinutes = tFrequency - tRemainder;


   tArrival = moment().add(tMinutes, "m").format("hh:mm A");
 }
 console.log("tMinutes:", tMinutes);
 console.log("tArrival:", tArrival);
        // log everything that is coming out of the snapshot
        $("#train-table").append("<tr><th>" + trainName + "</th><th>" + destination + "</th><th>" + firstTrainTime + "</th><th>" + frequency + "</th><th>" + nextArrival + "</th><th>" + minutesAway + 
    "</th></tr>");
    });
    // full list of items to the table

    // change html

})

// first train plus the current time in minutes
// remainder of the time difference
// frequency minus remainder
