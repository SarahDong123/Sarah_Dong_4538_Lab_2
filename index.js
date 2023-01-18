const express = require('express');
const app = express(); 
const request = require('request');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/index.html");
})

app.post('/chatbot', (req, res) => {
	console.log(req.body);
	res.sendFile(__dirname + "/index.html");
	const message = req.body.message;
	const number = message.match(/\d+/);
	if (number) {
		request.get(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
			res.json({
				text: data
			});
		}).catch(error => {
			res.json({
				text: "Sorry, I couldn't find any information about that number."
			});
		});
	} else {
		res.json({
			text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about."
		});
	}
});