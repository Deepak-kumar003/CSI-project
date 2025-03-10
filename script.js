const API_KEY = 'AIzaSyD4_DHFvN3U9kweJDTk8gAFJTS5UERzVps';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const resultDiv = document.getElementById('result');
const recognizeBtn = document.querySelector('[onclick="recognizeDrawing()"]');
const loader = document.getElementById('loader');
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.draw-area');
    const ctx = canvas.getContext('2d');
    recognizeBtn.addEventListener('click', recognizeDrawing);
});

async function recognizeDrawing() {
    try {
        loader.style.display = 'inline-block';
        recognizeBtn.disabled = true;
        const imageData = canvas.toDataURL('image/png');
        const requestBody = {
            contents: [{
                parts: [
                    { text: "Describe this drawing in single line." },
                    {
                        inline_data: {
                            mime_type: "image/png",
                            data: imageData.split(',')[1] 
                        }
                    }
                ]
            }]
        };
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error.message}`);
        }
        const data = await response.json();
        const description = data.candidates[0].content.parts[0].text;
        resultDiv.textContent = description;
        resultDiv.style.backgroundColor = '#e9f5ff';
    } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = `Error: ${error.message}`;
        resultDiv.style.backgroundColor = '#f8d7da';
    } finally {
        loader.style.display = 'none';
        recognizeBtn.disabled = false;
    }
}
