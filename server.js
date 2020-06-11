//Install express server
const express = require('express');
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const sanitizeHtml = require('sanitize-html'); //  sanitizeHtml(dirty);
const sanitizeMongoParam = require('mongo-sanitize'); // sanitize(req.params.username);

const HIGH_SCORES_COLLECTION = 'highscores';

const app = express();
app.use(cors())
app.use(bodyParser.json());

let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/memory-game", function (err, client) {
	if (err) {
		console.log(err);
		process.exit(1);
	}

	// Save database object from the callback for reuse.
	db = client.db();
	console.log("Database connection ready");

	app.get('/api/highscores', function(req, res, next) {
		try {
			db.collection(HIGH_SCORES_COLLECTION).find({}).toArray((err, docs) => {
				if (err) {
					handleError(err);
				} else {
					res.status(200).json(docs);
				}
			});
		} catch (error) {
			next(error);
		}
	});

	app.post('/api/highscores', function(req, res, next) {
		try {
			let { name, time, steps, gameSize } = req.body;
			name = sanitizeMongoParam(sanitizeHtml(name));
			if (typeof name !== 'string' || !Number.isInteger(time) || !Number.isInteger(steps) || !Number.isInteger(gameSize)) {
				throw new Error('There is a some kine of error with the request body!');
			}
			db.collection(HIGH_SCORES_COLLECTION).insertOne({ name, time, steps, gameSize });
			res.status(200);
		} catch (error) {
			next(error);
		}
	});

	// Serve only the static files form the dist directory
	app.use(express.static(__dirname + '/dist/memory-game'));

	app.get('/*', function(req, res) {
		res.sendFile(path.join(__dirname + '/dist/memory-game/index.html'));
	});

  // Initialize the app.
	const server = app.listen(process.env.PORT || 8080, function () {
		const port = server.address().port;
		console.log("App now running on port", port);
	});
});
