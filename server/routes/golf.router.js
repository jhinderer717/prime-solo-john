const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// prime-solo-project has a template.router.js router template


router.get('/', (req, res) => {
  //console.log('golf.get hit, giving 5 latest rounds');
  const queryString = `SELECT * FROM "round" WHERE "user_id" = $1 ORDER BY "date" ASC LIMIT 5;`;
  pool.query(queryString, [req.user.id])
    .then((result) => {
      //console.log('result:', result.rows);
      res.send(result.rows); // rows[0] to get rid of array brackets
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get('/season', (req, res) => {
  //console.log('golf.season all hit');
  const queryString = `SELECT * FROM "round" WHERE "date" > '2020-1-1' AND "user_id" = $1
	                      ORDER BY "date" ASC;`;
  pool.query(queryString, [req.user.id])
    .then((result) => {
      //console.log('result:', result.rows);
      res.send(result.rows); // rows[0] to get rid of array brackets
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get('/all', (req, res) => {
  //console.log('golf.get all hit');
  const queryString = `SELECT * FROM "round" WHERE "user_id" = $1 ORDER BY "date" ASC;`;
  pool.query(queryString, [req.user.id])
    .then((result) => {
      //console.log('result:', result.rows);
      res.send(result.rows); // rows[0] to get rid of array brackets
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});


router.post('/', (req, res) => {
  //console.log('golf.post hit');
  //console.log('req.body:', req.body, 'req.user:', req.user);
  const queryString = `INSERT INTO "round" ("date", "user_id", "number_holes", 
                      "score_to_par", "putts", "approach_shots", "fairways_hit", 
                      "possible_fairways") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  const queryValues = [
    req.body.date,
    req.user.id,
    req.body.number_holes,
    req.body.score_to_par,
    req.body.putts,
    req.body.approach_shots,
    req.body.fairways_hit,
    req.body.possible_fairways,
  ]
  pool.query(queryString, queryValues).then(result =>{
    //console.log('round posted:', result);
    res.sendStatus(201);
  }).catch(err => {
    console.error('Failed to post round', err);
    res.sendStatus(500);
  });
});

router.delete('/:id', (req, res) => {
  // console.log('req.user:', req.user);
  //console.log('attempting to delete round with id:', req.params);
  const queryText = `DELETE FROM "round" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
    .then(() => {res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in DELETE round query', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  //console.log('router.put hit with req.params:', req.params);
  //console.log('router.put hit with req.body:', req.body);
  let queryText = `UPDATE "round"
                    SET "date" = $1,
                    "number_holes" = $2,
                    "score_to_par" = $3,
                    "putts" = $4,
                    "approach_shots" = $5,
                    "fairways_hit" = $6,
                    "possible_fairways" = $7
                    WHERE "id" = $8;`;
  let queryParams = [
    req.body.date,
    req.body.number_holes,
    req.body.score_to_par,
    req.body.putts,
    req.body.approach_shots,
    req.body.fairways_hit,
    req.body.possible_fairways,
    req.params.id,
  ];
  pool.query(queryText, queryParams)
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log('we have an error in put', err);
      res.sendStatus(500);
    });
});

module.exports = router;
