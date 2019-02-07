
// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyAU8ehsaZ6met98kG_2zJ_eVlJDBDm_mXw",
  authDomain: "trains-e321f.firebaseapp.com",
  databaseURL: "https://trains-e321f.firebaseio.com",
  projectId: "trains-e321f",
  storageBucket: "trains-e321f.appspot.com",
  messagingSenderId: "503340945253"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
event.preventDefault();

// Grabs user input
var empName = $("#train-name-input").val().trim();
var empdestination = $("#destination-input").val().trim();
var emptime = $("#time-input").val().trim();
var empfrequency = $("#frequency-input").val().trim();
// console.log(empfrequency);
// Creates local "temporary" object for holding train data
var newEmp = {
  name: empName,
  destination: empdestination,
  time: emptime,
  frequency: empfrequency
};

// Uploads train data to the database
database.ref().push(newEmp);

// Logs everything to console
// console.log(newEmp.name);
// console.log(newEmp.destination);
// console.log(newEmp.time);
// console.log(newEmp.frequency);

// alert("train successfully added");

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");
});







// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
// console.log(childSnapshot.val());

// Store everything into a variable.
var empName = childSnapshot.val().name;
var empdestination = childSnapshot.val().destination;
var emptime = childSnapshot.val().time;
var empfrequency = childSnapshot.val().frequency;

var emptimeConverted = moment(emptime, "HH:mm").subtract(1, "years");
    console.log(moment(emptimeConverted).format("hh:mm"));

var diffTime = moment().diff(moment(emptimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
var tRemainder = diffTime % empfrequency;
    console.log(tRemainder);
    // Minute Until Train
var tMinutesTillTrain = empfrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

// // train Info
// console.log(empName);
// console.log(empdestination);
// console.log(emptime);
// console.log(empfrequency);

// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(empName),
  $("<td>").text(empdestination),
  $("<td>").text(empfrequency),
  $("<td>").text(moment(nextTrain).format("hh:mm")),
  $("<td>").text(tMinutesTillTrain),
);

// Append the new row to the table
$("#train-table > tbody").append(newRow);
});

