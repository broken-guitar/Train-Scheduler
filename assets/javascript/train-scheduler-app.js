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
var db = firebase.database();

// TODO: initialize database nodes if necessary
var rootRef = db.ref();
rootRef.once("value").then(function (snap) {
    let key = snap.key
    let trainsKey = snap.child("/trains").key;
    let trainsRef = snap.child("/trains");
    let destinationsRef = snap.child("/destinations")

    console.log("/trains exists? ", trainsRef.exists());
});








// database.ref().push({
//     _name: null,
//     _role: null,
//     _startDate: null,
//     _monthlyRate: null,
//     _dateAdded: null
// });

// console.log("database.snapshot: ", database.snapshot);

$("#add-train-button").on("click", function (e) {
    e.preventDefault();
    // console.log("add train button clicked");

    let name = $("#inputEmployeeName").val().trim();
    let role = $("#inputRole").val().trim();
    let startDate = $("#inputStartDate").val().trim();
    let monthlyRate = $("#inputMonthlyRate").val().trim();
    // let something = ?;

    db.ref().push({
        _name: name,
        _role: role,
        _start_date: startDate,
        _monthly_rate: monthlyRate,
        _dateAdded: firebase.database.ServerValue.TIMESTAMP
        // _something: null
    });

});

db.ref().on("value", function (snapshot) {
    // do something when values in database change


});



db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (childSnapshot) {

    // runs this function for every child; runs on load

    console.log("child_added: ", childSnapshot.val()._name);

    // TODO append all employees from the database to the DOM
    // starter: $("#where-employee-list-goes").append();

    //
});

// Ref: db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added"
//      orders by date, then shows last result (one last result)
//      note: useful to show last added user