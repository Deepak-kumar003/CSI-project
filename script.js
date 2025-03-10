
const GEMINI_API_KEY = 'AIzaSyD4_DHFvN3U9kweJDTk8gAFJTS5UERzVps'; 
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD4_DHFvN3U9kweJDTk8gAFJTS5UERzVps";

// async function recognizeDrawing() {
//     console.log("hi");
    
//     const imageData = canvas.toDataURL();
//     const base64Image = imageData.split(',')[1];

    
//     const payload = {
//         contents: [{
//             parts: [
//                 { text: "What is this drawing? Describe it in one sentence." },
//                 {
//                     inline_data: {
//                         mime_type: "image/png",
//                         data: base64Image
//                     }
//                 }
//             ]
//         }]
//     };

//     try {
//         const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload)
//         });

//         if (!response.ok) throw new Error('API request failed');

//         const data = await response.json();
//         const result = data.candidates[0].content.parts[0].text;
//         document.getElementById('result').innerText = result;

//     } catch (error) {
//         console.error('Error:', error);
//         document.getElementById('result').innerText = "Error recognizing drawing";
//     }
// }


// Add these at the top of your script
// const API_KEY = 'YOUR_ACTUAL_API_KEY'; // Replace with your API key
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

async function recognizeDrawing() {
  try {
    const prompt = { 
      contents: [{
        parts: [{
          text: "Describe this drawing in detail"
        }]
      }]
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prompt)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error.message}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    if(resultElement) {
      resultElement.innerText = data.candidates[0].content.parts[0].text;
    }
    
  } catch (error) {
    console.error('Request Failed:', error);
    if(resultElement) {
      resultElement.innerText = `Error: ${error.message}`;
    }
  }
}
