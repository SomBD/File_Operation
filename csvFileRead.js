const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'D:/NodeJs/QuestionBank.csv';

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/questions', async (req, res) => {

  let items = [];
  await fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => items.push(data))
    .on('end', () => {
      function getRandomQuestions(arr, num) {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      }
      items = getRandomQuestions(items, 5);
      res.status(200).send(items);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
