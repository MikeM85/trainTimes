
// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyBXXGnt7d6ghP47Jbl5O0H-t9wm3p7bWNQ",
  authDomain: "mondayssuck-8d907.firebaseapp.com",
  databaseURL: "https://mondayssuck-8d907.firebaseio.com",
  projectId: "mondayssuck-8d907",
  storageBucket: "mondayssuck-8d907.appspot.com",
  messagingSenderId: "591121740036"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
event.preventDefault();

// Grabs user input
var empName = $("#train-name-input").val().trim();
var empdestination = $("#destination-input").val().trim();
var emptime = moment($("#time-input").val().trim(), "MM/DD/YYYY").format("X");
var empfrequency = $("#frequency-input").val().trim();

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
console.log(newEmp.name);
console.log(newEmp.destination);
console.log(newEmp.time);
console.log(newEmp.frequency);

alert("train successfully added");

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

// Store everything into a variable.
var empName = childSnapshot.val().name;
var empdestination = childSnapshot.val().destination;
var emptime = childSnapshot.val().time;
var empfrequency = childSnapshot.val().frequency;

// train Info
console.log(empName);
console.log(empdestination);
console.log(emptime);
console.log(empfrequency);


// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(empName),
  $("<td>").text(empdestination),
  $("<td>").text(emptime),
  
);

// Append the new row to the table
$("#train-table > tbody").append(newRow);
});

