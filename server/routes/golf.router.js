const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});


router.post('/', async (req, res) => {
  // console.log('golf.post hit');
  // console.log('req.body:', req.body, 'req.user:', req.user);
  // const queryString = `INSERT INTO "round" ("date", "number_holes", 
  //                     "score_to_par", "putts", "approach_shots", "fairways_hit", 
  //                     "possible_fairways") VALUES ($1, $2, $3, $4, $5, $6, $7)
  //                     RETURNING "id";`

  //                     // INSERT INTO "user_round" ("user_id", "round_id")
  //                     // VALUES (1, 1);`;
  // const queryValues = [
  //   req.body.date,
  //   req.body.number_holes,
  //   req.body.score_to_par,
  //   req.body.putts,
  //   req.body.approach_shots,
  //   req.body.fairways_hit,
  //   req.body.possible_fairways,
  // ]
  // pool.query(queryString, queryValues).then(result =>{
  //   console.log('round posted:', result);
  //   const newRoundId = result.rows[0].id;
  //   res.sendStatus(201);
  // }).catch(err => {
  //   console.error('Failed to post round', err);
  //   res.sendStatus(500);
  // });
  // console.log('newRoundId', newRoundId);
  const client = await pool.connect();

  try{
    const {
      date,
      number_holes,
      score_to_par,
      putts,
      approach_shots,
      fairways_hit,
      possible_fairways
    } = req.body;
    await client.query('BEGIN')
    const roundInsertResults = await client.query(`
      INSERT INTO "round" ("date", "number_holes", 
      "score_to_par", "putts", "approach_shots", "fairways_hit", 
      "possible_fairways") VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING "id";`, [date, number_holes, score_to_par, putts, approach_shots, fairways_hit, possible_fairways]);
    const roundId = roundInsertResults.rows[0].id;

    console.log('roundId:', roundId);
    // await Promise.all()

  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error POST /api/golf', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
});

module.exports = router;
