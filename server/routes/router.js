const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const db = require('../lib/db.js');

router.get('/survey', (req, res) => {
	db.query(
		'SELECT *, DATE_FORMAT(s.created, "%d.%m.%Y") as created_date, DATE_FORMAT(s.created, "%H:%i") as created_time FROM surveys s JOIN answers a ON s.id = a.survey_id GROUP BY s.id ORDER BY created DESC LIMIT 5',
		(err, result) => {
			if (err) {
				throw err;
				res.status(404).send({
					code: 'unknown'
				});
			}

			console.log(result);

			res.status(200).send(result);
		}
	);
});

router.get('/survey/:uuid', (req, res) => {
	db.query(
		`SELECT *, DATE_FORMAT(s.created, '%d.%m.%Y') as created_date, DATE_FORMAT(s.created, '%H:%i') as created_time FROM surveys s JOIN answers a ON s.id = a.survey_id WHERE s.id = '${req.params.uuid}'`,
		(err, result) => {
			if (err) {
				throw err;
				res.status(404).send({
					code: 'unknown'
				});
			}

			const survey = {
				question: result[0].question,
				answers: [],
				created_date: result[0].created_date,
				created_time: result[0].created_time
			};

			for (let i = 0; i < result.length; i++) {
				survey['answers'].push({
					id: result[i]['id'],
					answer: result[i]['answer']
				});
			}

			res.status(200).send(survey);
		}
	);
});

router.post('/survey', (req, res) => {
	const newUuid = uuid.v4();
	const question = req.body.question;
	const answers = req.body.answers;

	// validation
	if (question == undefined || question == '') {
		res.status(400).send({
			code: 'no-question'
		});
		return false;
	}
	if (answers == undefined || answers.length < 2) {
		res.status(400).send({
			code: 'no-answers'
		});
		return false;
	}

	// insert question
	db.query(
		`INSERT INTO surveys VALUES ('${newUuid}', '${question}', now())`,
		(err, result) => {
			if (err) {
				throw err;
				res.status(400).send({
					code: 'unknown'
				});
			}

			// insert answers
			for (let i = 0; i < answers.length; i++) {
				db.query(
					`INSERT INTO answers (survey_id, answer) VALUES ('${newUuid}', '${answers[i]}')`,
					(err, result) => {
						if (err) {
							throw err;
							res.status(400).send({
								code: 'unknown'
							});
						}
					}
				);
			}
		}
	);
	res.status(200).send({
		uuid: newUuid
	});
});

router.get('/survey/:surveyID/votes', (req, res) => {
	const surveyID = req.params.surveyID;

	let votes = [];

	db.query(
		`SELECT a.id, answer, COUNT(v.id) votes FROM answers a JOIN surveys s ON a.survey_id = s.id JOIN votes v ON v.answer_id = a.id WHERE s.id = '${surveyID}' GROUP BY a.id`,
		async (err, result) => {
			for (let i = 0; i < result.length; i++) {
				let row = result[i];
				row.names = [];

				let voter = await getVoter(row['id']);
				for (let j = 0; j < voter.length; j++) {
					row.names.push(voter[j].name);
				}

				votes.push(row);
			}
			res.status(200).send(votes);
		}
	);
});

function getVoter(answerID) {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT name FROM votes WHERE answer_id = ${answerID}`,
			(subErr, subResult) => {
				resolve(subResult);
			}
		);
	});
}

router.post('/survey/:surveyID', (req, res) => {
	const answers = req.body.answers;
	const name = req.body.name;

	for (let i = 0; i < answers.length; i++) {
		db.query(
			`INSERT INTO votes (ip, name, answer_id) VALUES ('xxx.xxx.xxx.xxx', '${name}', ${answers[i]})`
		);
	}

	res.status(200).send();
});

module.exports = router;
