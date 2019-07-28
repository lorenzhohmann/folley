const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const router = require('./routes/router.js');
app.use('/api', router);

// handle production
if (process.env.NODE_ENV === 'production') {
	// static folder
	app.use(express.static(__dirname + '/public'));

	// handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// fallback for RestAPI
app.use((req, res) => res.status(404).send());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
