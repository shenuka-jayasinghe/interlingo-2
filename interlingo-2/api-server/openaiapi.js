// openai.js

const fetch = require('node-fetch');

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const openAIapiKey = '';

// Function to make the OpenAI API request
async function fetchOpenAIResponse(prompt) {
  const requestData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openAIapiKey}`,
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 50, // Adjust the max_tokens as needed
    }),
  };

  try {
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', requestData);
    if (!response.ok) {
      throw new Error('Failed to fetch data from OpenAI API');
    }
    const data = await response.json();
    const generatedText = data.choices[0].text;
    return generatedText;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = {
  fetchOpenAIResponse,
};
