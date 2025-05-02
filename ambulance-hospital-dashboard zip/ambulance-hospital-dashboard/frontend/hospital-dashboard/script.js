// frontend/hospital-dashboard/script.js

// Connect to the WebSocket server
const socket = new WebSocket('ws://localhost:8080');

// When WebSocket connection is open
socket.onopen = () => {
    console.log("WebSocket connection established");
};

// Handle incoming messages from Ambulance Dashboard
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received alert data:", data);

    // Display the received alert data on the Hospital Dashboard
    document.getElementById("alert-container").innerHTML = `
        <h3>🚨 Emergency Alert</h3>
        <p>Patient ID: ${data.patientID}</p>
        <p>Condition: ${data.condition}</p>
        <p>Location: ${data.location.lat}, ${data.location.lon}</p>
        <p>Timestamp: ${data.timestamp}</p>
    `;
};