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

// VARIABLES

// FUNCTIONS

// EXAMPLE: update() method to update than one location 
function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}


// INITIALIZE/MAIN

console.log("moment test: ", moment().format("YY hh:mm"))

// TODO: initialize database nodes if necessary
var rootRef = db.ref();
var trainsRef = db.ref("/trains");
var destsRef = db.ref("/dests");
// trainsRef.on("value", function (snap) {
//     if (!snap.exists()) {
//         rootRef.set({
//             trains: {}
//         });
//     };
// });

// destinationsRef.on("value", function (snap) {
//     if (!snap.exists()) {
//         rootRef.set({
//             dests: {}
//         });
//     };
// });





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

    let trainName = $("#inputTrainName").val().trim();
    let destination = $("#inputDestination").val().trim();
    let firstTrainTime = $("#inputFirstTrainTime").val().trim();
    let inputFrequency = $("#inputFrequency").val().trim();

    let trainData = {
        name: trainName,


    }


    let newTrainKey = trainsRef.push.key;
    let updates = {};
    updates['/posts/' + newTrainKey]

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