const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const db = require('../lib/db.js');

router.get('/survey/:uuid', (req, res) => {
	db.query(
		`SELECT * FROM surveys s JOIN answers a ON s.id = a.survey_id WHERE s.id = '${req.params.uuid}'`,
		(err, result) => {
			if (err) {
				throw err;
				res.status(404).send({
					code: 'unknown'
				});
			}

			const survey = {
				question: result[0].question,
				answers: []
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

module.exports = router;
