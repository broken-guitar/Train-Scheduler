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

$("#add-train-button").on("click", function (e) {
    e.preventDefault();
    // console.log("add train button clicked");

    let trainName = $("#inputTrainName").val().trim();
    let destination = $("#inputDestination").val().trim();
    let firstTrainTime = $("#inputFirstTrainTime").val().trim();
    let inputFrequency = $("#inputFrequency").val().trim();

    let trainData = {
        "name": trainName,
        "destination": destination,
        "frequency": inputFrequency,
        "dateAdded": firebase.database.ServerValue.TIMESTAMP
    };

    trainsRef.once('value')

    let destData = {
        "name":destination,
        train:
    }
    let newTrainKey = db.ref().child('/trains').push().key;
    let updates = {};
    updates['/trains/' + newTrainKey] = trainData;
    updates['/dests/' + destination] = {
        "train": trainName
    };

    db.ref().update(updates);

    // TODOS (big list, lots to still figure out)
    // - trying to flatten data in firebase by putting trains and destinations in separate nodes
    // - need to figure out if a train already exists by same name value
    // -    - need to loop through children in /trains and find existing child with same name
    // -        if the child exists then use that unique id to update/add child in destination node
    // -   - work on looping through list of /trains children (which are unique push keys);
    //          - then see if:
    //          -   can i get name value for each unique key? 
    //          -       -if yes: then can i check BEFORE i create new child (value change event necessary? once?)    
    //          -       -   -   can i run the 'once' listener WITHIN another listener to check existence before pushing?
    // - NOTE TO SELF/READER:
    //      this working through lists in firebase to maintain links between separate nodes
    //      while preventing duplication is apparently move involved then just appending a
    //      single flat list of children containint all table values (and also less real world functional)
    //
    //      firebase only has listener functions to 'read/write' data; how to handle updates while checking for existence?
    //      

});

db.ref().on("value", function (snap) {
    // do something when values in database change
    console.log("db.ref snap.val: ", snap.val());

    console.log(rootRef.child("/"))

});

db.ref("/trains").on("child_added", function (snap) {
    // runs this function for every child; runs on load

    console.log("child_added listner: ", snap.val());

    snap.forEach(function (childSnap) {
        console.log("foreach: ", snap.key, childSnap.key, childSnap.val(), childSnap.parent);
    });

});

// Ref: db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added"
//      orders by date, then shows last result (one last result)
//      note: useful to show last added user
// TODO append all employees from the database to the DOM
// starter: $("#where-employee-list-goes").append();