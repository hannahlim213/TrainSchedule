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
var trainName = "";
var destination = "";
var firstTrainTime;
var frequency = 0;
var nextArrival = 0;
var minutesAway = 0;

//var diffTime
// capture button click
// grab values from textboxes
$("#submit-btn").on("click", function () {
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();

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
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrainTime);
        console.log(childSnapshot.val().frequency);
        console.log(childSnapshot.val().nextArrival);
        console.log(childSnapshot.val().minutesAway);
    
        // log everything that is coming out of the snapshot
        $("#train-table").append("<tr><th>" + trainName + "</th><th>" +
     destination + "</th><th>" +firstTrainTime + "</th><th>" +frequency + 
     "</th><th>" + nextArrival + "</th><th>" + minutesAway);
    });
        // full list of items to the table
 
        // change html

 