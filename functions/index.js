const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

module.exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { message } = JSON.parse(event.body);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "system", "content": "" }, { role: "user", content: message }],
        max_tokens: 8,
    });

    if (response.data) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: response.data.choices[0].message.content }),
        };
    } else {
        return { statusCode: 500, body: 'Internal Server Error' };
    }
};
