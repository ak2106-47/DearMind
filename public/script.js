async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = userInput.value;
    userInput.value = ''; // Clear input after sending

    // Display user message
    chatBox.innerHTML += `<div>User: ${message}</div>`;

    // Send message to server and get response
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
    }).then(res => res.json());

    // Display bot response
    chatBox.innerHTML += `<div>Bot: ${response.response}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
