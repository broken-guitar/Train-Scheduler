// train scheduler Firebase configuration
var cfg = {
    apiKey: "AIzaSyBrSPOn4a08hMj7PGsrn1qgHaz7H_pyZWs",
    authDomain: "train-scheduler-homework-21e32.firebaseapp.com",
    databaseURL: "https://train-scheduler-homework-21e32.firebaseio.com",
    projectId: "train-scheduler-homework-21e32",
    storageBucket: "train-scheduler-homework-21e32.appspot.com",
    messagingSenderId: "62843391204",
    appId: "1:62843391204:web:cfd9d5b54bfd17b4f370f1"
};
// Initialize Firebase
firebase.initializeApp(cfg);

// VARIABLES
var db = firebase.database();



// FUNCTIONS

function getArrivalTimes(firstTrainTime, trainFrequency){
    let firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    // get current time as a Moment object:
    let currentTime = moment(); 
    // use moment to get difference between current time and firstTrainTime in minutes
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // use modulus to get remainder of diffTime divided by trainFrequency in minutes
    let timeRemainder = diffTime % trainFrequency;
    // get minutes to next arrival time: difference of trainFrequency and timeRemainder
    // (note: timeRemainder is basically how many mintues have already passed in the current trip interval,
    // so subtracting this value from the frequency tells us how many more minutes to arrival)
    let minutesAway = trainFrequency - timeRemainder;
    // use moment to add minutesAway to current time to get next arrival time as a moment object
    let nextArrivalMoment = moment().add(minutesAway, "minutes");
    
    return [nextArrivalMoment, minutesAway];
}


// INITIALIZE/MAIN

//console.log("moment test: ", moment().format("YY hh:mm")) // returns current time in specified format



$("#add-train-button").on("click", function (e) {
    e.preventDefault();
    // console.log("add train button clicked");

    let trainName = $("#inputTrainName").val().trim();
    let destination = $("#inputDestination").val().trim();
    let firstTrainTime = $("#inputFirstTrainTime").val().trim();
    let trainFrequency = $("#inputFrequency").val().trim();

    let arrArrivalTimes = getArrivalTimes(firstTrainTime, trainFrequency);

    console.log("arrTimes: ", arrArrivalTimes[0], arrArrivalTimes[1]);

    db.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        trainFrequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

});

db.ref().on("child_added", function (childSnap){

    let firstTrainTime = childSnap.val().firstTrainTime;
    let trainFrequency = childSnap.val().trainFrequency;
    let arrArrivalTimes = getArrivalTimes(firstTrainTime, trainFrequency);
    // next arrival time is returned as a moment object, use moment to format it
    let displayNextArrivalTime = moment(arrArrivalTimes[0]).format("h:mm a");

    let $tr = $("<tr>");
    let $tdTrainName = $("<td>").text(childSnap.val().trainName);
    let $tdDestination = $("<td>").text(childSnap.val().destination);
    // let $tdFirstTrainTime = $("<td>").text(childSnap.val().firstTrainTime);
    let $tdFrequency = $("<td>").text(childSnap.val().trainFrequency);
    let $tdNextArrivalTime = $("<td>").text(displayNextArrivalTime);
    let $tdMinutesAway = $("<td>").text(arrArrivalTimes[1].toString());

    $tr.append($tdTrainName);
    $tr.append($tdDestination);
    // $tr.append($tdFirstTrainTime);
    $tr.append($tdFrequency);
    $tr.append($tdNextArrivalTime);
    $tr.append($tdMinutesAway);

    $("#train-table-body").append($tr);
    

});
// db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (childSnapshot) {

//     // runs this function for every child; runs on load

//     //console.log("child_added: ", childSnapshot.val()._name);

//     // TODO append all employees from the database to the DOM
//     // starter: $("#where-employee-list-goes").append();

//     //
// });

// Ref: db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added"
//      orders by date, then shows last result (one last result)
//      note: useful to show last added user