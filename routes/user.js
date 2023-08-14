const express = require('express');
const router = express.Router();
const db = require('../model/db');


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/categories', (req, res) => {
    db.all('SELECT * FROM categories', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(rows);
      }
    });
  });

router.post('/categories', (req, res) => {
    const name = req.body.name;
    console.log(name)

    db.run('INSERT OR IGNORE INTO categories (name) VALUES (?)', [name], function(err){
        if (err) {
            res.send(err);
          } else if (this.changes === 0) {
            res.send('Category already exists.');
          } else {
            res.send('Category added successfully.');
          }
      })
})

router.delete('/categories/:name', (req, res) => {
    const name = req.params.name;

    db.run(`DELETE FROM categories  WHERE name=?`, [name], function(err) {
        if(err){
            res.status(500).send("Internal server error");
        }
        else if (this.changes === 0) {
            res.status(404).send('Category does not exist.');
        } 
        else{
            res.status(202).send(`${name} has been deleted.`)
        }

    })
})

module.exports = router;