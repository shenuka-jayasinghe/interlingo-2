// openai.js

const fetch = require('node-fetch');

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const deepLapiKey = ''

// Function to make the OpenAI API request
async function fetchDeepLResponse(generatedText, language) {
  const requestData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `DeepL-Auth-Key ${deepLapiKey}`,
    },
    body: JSON.stringify({
      text: [generatedText],
      target_lang: language, 
    }),
  };

  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', requestData);
    if (!response.ok) {
      throw new Error('Failed to fetch data from DeepL API');
    }
    const data = await response.json();
    const translation = data.translations[0].text
    return translation;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = {
  fetchDeepLResponse,
};
