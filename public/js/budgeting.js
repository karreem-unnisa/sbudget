async function sendMessage() {
    const input = document.getElementById('user-input').value;
    const chatOutput = document.getElementById('chat-output');

    if (input) {
        chatOutput.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
        document.getElementById('user-input').value = '';

        // Send message to server
        try {   
            const response = await fetch('/api/chatbot/suggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: '12345', message: input }),
            });

            if (response.ok) {
                const data = await response.json();
                chatOutput.innerHTML += `<p><strong>Chatbot:</strong> ${data.response}</p>`;
            } else {
                chatOutput.innerHTML += `<p><strong>Error:</strong> ${response.statusText}</p>`;
            }
        } catch (error) {
            console.error('Error fetching chatbot response:', error);
            chatOutput.innerHTML += `<p><strong>Error:</strong> Unable to get response</p>`;
        }
    }
}
