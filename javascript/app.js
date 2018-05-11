$(document).ready(function () {

   
    var database = firebase.database();

    // initial values
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    var nextOne = firstTrainTime + frequency;

    // var diffTime = moment().diff(moment.unix(firstTrainTime), "minutes");
    // var timeRemainder = moment().diff(moment.unix(firstTrainTime), "minutes") % frequency;
    // var minutes = frequency - timeRemainder;

    // var nextArrival = moment().add(minutes, "m".format("hh:mm");
    // var minutesAway = moment();
    
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

        // log everything that is coming out of the snapshot
        $("#train-table").append("<tr><th>" + trainName + "</th><th>" + destination + "</th><th>" + firstTrainTime + "</th><th>" + frequency + "</th><th>" + nextArrival + "</th><th>" + minutesAway + 
    "</th></tr>");
    });
    // full list of items to the table

    // change html

})