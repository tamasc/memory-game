//Install express server
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;

const sanitize = require('mongo-sanitize'); // sanitize(req.params.username);
const sanitizeHtml = require('sanitize-html'); //  sanitizeHtml(dirty);

const HIGH_SCORES_COLLECTION = 'highscores';

const app = express();
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

	app.get('/api/highscores', function(req,res) {
		db.collection(HIGH_SCORES_COLLECTION).find({}).toArray((err, docs) => {
			if (err) {
				handleError(res, err.message, "Failed to get contacts.");
			} else {
				res.status(200).json(docs);
			}
		});
	});

	// Serve only the static files form the dist directory
	app.use(express.static(__dirname + '/dist/memory-game'));

	app.get('/*', function(req, res) {
		console.log(234234);
		res.sendFile(path.join(__dirname + '/dist/memory-game/index.html'));
	});

  // Initialize the app.
	const server = app.listen(process.env.PORT || 8080, function () {
		const port = server.address().port;
		console.log("App now running on port", port);
	});
});
