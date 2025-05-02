// frontend/ambulance-dashboard/script.js

// Connect to the WebSocket server
const socket = new WebSocket('ws://localhost:8080');

// Send data when WebSocket connection is open
socket.onopen = () => {
    console.log("WebSocket connection established");

    // Sending a sample alert data
    const alertData = {
        location: { lat: 12.9716, lon: 77.5946 },  // Example coordinates (latitude, longitude)
        patientID: "12345",
        condition: "Critical",
        timestamp: new Date().toLocaleString()
    };
    
    // Send alert data to the WebSocket server
    socket.send(JSON.stringify(alertData));
};

// Handle incoming WebSocket messages (for updates)
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received message:", data);

    // Display status on the webpage
    document.getElementById("status").innerText = Emergency Alert Sent: ${data.timestamp};
};