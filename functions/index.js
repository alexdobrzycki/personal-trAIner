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

    const { workoutFocus } = JSON.parse(event.body);
    const { selectedOptions } = JSON.parse(event.body); 
    const combinedSelectedOptions = selectedOptions.join(', ');
    const { additional } = JSON.parse(event.body);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "system", "content": "Your job is to generate a workout based on the following specifications: workout focus & muscle groups chosen. When a workout focuses on intensity, make sure that the exercises include drop sets to failure, and that there are at least 5 different workouts. If focusing on volume, there must be at least 6 different workouts. There may be additional requests that the user may want, which you must follow. Do not write anything except the workout in the correct format, meaning the workout name followed by a new line and then the sets with hyphens, as shown in the examples. The workout must be doable within 2 hours. It is VERY IMPORTANT to focus on lifts that work multiple of the muscles selected first if applicable, and then do isolation lifts later.\
        \
        \
        Example 1:\
        Focus: Intensity\
        Muscle Groups: Back, Biceps\
        Additional Requests: \
        Workout:\
        Bent-Over Barbell Rows\
        - 1 Warmup Set\
        - 2-3 Sets of 6-8 Reps\
        - 1 Drop Set Until Failure\
        \
        Lat Pulldowns\
        - 1 Warmup Set\
        - 2-3 Sets of 6-8 Reps\
        - 1 Drop Set Until Failure\
        \
        Machine Reverse Flies\
        - 2-3 Sets of 6-8 Reps\
        - 1 Drop Set Until Failure\
        \
        Seated Cable Rows\
        - 1 Warmup Set\
        - 2-3 Sets of 6-8 Reps\
        - 1 Drop Set Until Failure\
        \
        Preacher Curls\
        - 1 Warmup Set\
        - 2-3 Sets of 6-8 Reps\
        - 1 Drop Set Until Failure\
        \
        Hammer Curls\
        - 1 Warmup Set\
        - 2-3 Sets of 6-8 Reps\
        - 1 Drop Set Until Failure\
        \
        Example 2:\
        Focus: Volume\
        Muscle Groups: Back, Biceps\
        Additional Requests: Include weighted pull-ups as a workout\
        Workout:\
        Deadlifts \
        - 1 Warmup Set \
        - 3-5 Sets of 8-12 Reps\
        \
        Barbell Rows \
        - 1 Warmup Set \
        - 3-5 Sets of 8-10 Reps \
        \
        One-Arm Dumbbell Rows \
        - 3-5 Sets of 8-12 Reps \
        \
        Wide-Grip Lat Pulldowns \
        - 3 Sets of 10-12 Reps \
        \
        Weighted Pullups\
        - 3-4 Sets of 10-12 Reps\
        \
        Dumbbell Curls \
        - 2-3 Sets of 10-12 Reps \
        \
        Cable Hammer Curls \
        - 2-3 Sets of 10-12 Reps \
        \
        Preacher Curls \
        - 3 Sets of 8-10 Reps\
        " }, { role: "user", content: `Focus: ${workoutFocus}\nMuscle Groups: ${combinedSelectedOptions}\nAdditional Requests: ${additional}\nWorkout: ` }],
        max_tokens: 250
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
