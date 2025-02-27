// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHxxuzYE6u6PLgus0udT5uaDD6Q7lcqCo",
    authDomain: "fitness-tracker-498d6.firebaseapp.com",
    projectId: "fitness-tracker-498d6",
    storageBucket: "fitness-tracker-498d6.firebasestorage.app",
    messagingSenderId: "1000926076568",
    appId: "1:1000926076568:web:ce7cb61bb981b75ebcfaed",
    measurementId: "G-FNQSJ3GKYK"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to save data
function saveData() {
    const date = document.getElementById('date').value;
    const steps = document.getElementById('steps').value;
    const calories = document.getElementById('calories').value;

    if (date && steps && calories) {
        const fitnessData = {
            date,
            steps: parseInt(steps),
            calories: parseInt(calories)
        };

        database.ref('fitnessData').push(fitnessData)
            .then(() => {
                alert('Data saved successfully!');
                displayData();
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    } else {
        alert('Please fill in all fields!');
    }
}

// Function to display data
function displayData() {
    const dataTable = document.querySelector('#data-table tbody');
    dataTable.innerHTML = '';

    database.ref('fitnessData').once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
            const row = `<tr>
                <td>${data.date}</td>
                <td>${data.steps}</td>
                <td>${data.calories}</td>
            </tr>`;
            dataTable.innerHTML += row;
        });
    });
}

// Load data on page load
window.onload = displayData;
