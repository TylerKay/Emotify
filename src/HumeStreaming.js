Y// HumeStreaming.js

import WebSocket from 'websocket-library'; // Import your chosen WebSocket library

const API_KEY = '<6KXHAbIn0GpPUA3DOKErXAO0GzKBMSjSAKyvHlZXDCZOWBYS>'; // Replace with your Hume AI API key

// Configure the WebSocket connection
const webSocket = new WebSocket('wss://api.hume.ai/v0/stream/models', {
  headers: {
    'X-Hume-Api-Key': API_KEY,
  },
});

// Set up event listeners for WebSocket events
webSocket.onopen = (event) => {
  console.log('WebSocket connection opened:', event);
};

webSocket.onmessage = (event) => {
  // Handle incoming messages here
  const data = JSON.parse(event.data);
  console.log('Received WebSocket message:', data);
};

webSocket.onclose = (event) => {
  console.log('WebSocket connection closed:', event);
};

webSocket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Export the WebSocket object for use in other parts of your application
export default webSocket;
