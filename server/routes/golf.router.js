const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// prime-solo-project has a template.router.js router template


router.get('/', (req, res) => {
  console.log('golf.get hit');
  const queryString = `SELECT * FROM "round" WHERE "user_id" = $1 ORDER BY "date" ASC LIMIT 5`;
  pool.query(queryString, [req.user.id])
    .then((result) => {
      console.log('result:', result.rows);
      res.send(result.rows); // rows[0] to get rid of array brackets
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});


router.post('/', (req, res) => {
  console.log('golf.post hit');
  console.log('req.body:', req.body, 'req.user:', req.user);
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
    console.log('round posted:', result);
    res.sendStatus(201);
  }).catch(err => {
    console.error('Failed to post round', err);
    res.sendStatus(500);
  });

  // const client = await pool.connect();

  // try{
  //   const {
  //     date,
  //     number_holes,
  //     score_to_par,
  //     putts,
  //     approach_shots,
  //     fairways_hit,
  //     possible_fairways
  //   } = req.body;
  //   await client.query('BEGIN')
  //   const roundInsertResults = await client.query(`
  //     INSERT INTO "round" ("date", "number_holes", 
  //     "score_to_par", "putts", "approach_shots", "fairways_hit", 
  //     "possible_fairways") VALUES ($1, $2, $3, $4, $5, $6, $7)
  //     RETURNING "id";`, [date, number_holes, score_to_par, putts, approach_shots, fairways_hit, possible_fairways]);
  //   const roundId = roundInsertResults.rows[0].id;

  //   //console.log('roundId:', roundId);
  //   const queryString = `INSERT INTO "user_round" ("user_id", "round_id")
  //                       VALUES ($1, $2);`;
  //   const queryParams = [
  //     req.user.id,
  //     roundId
  //   ]
  //   console.log('queryParams:', queryParams);
  //   // pool.query(queryString, queryParams).then(result => {
  //   //   console.log('Item created in POST', result);
  //   //   res.sendStatus(201);
  //   // }).catch(err => {
  //   //   console.error('Failed in POST', err);
  //   //   res.sendStatus(500);
  //   // })

  // } catch (error) {
  //   await client.query('ROLLBACK')
  //   console.log('Error POST /api/golf', error);
  //   res.sendStatus(500);
  // } finally {
  //   client.release()
  // }
});

module.exports = router;
