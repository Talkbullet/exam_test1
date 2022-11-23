const foodsAPI = (app, con) =>{

  app.get('/foods', (req, res) => {
      const sql = `
      SELECT * FROM foods
      `;
      con.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
      });
  })

  app.post('/foods', (req, res) => {
    const sql = `
    INSERT INTO foods (name, author, category, date, image)
    VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.name, req.body.author, req.body.category, req.body.date, req.body.image], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
  })

  app.put('/foods/:id', (req, res) => {
    const sql = `
    UPDATE foods SET name = ?, author = ?, category = ?, date = ?, image = ? WHERE id = ?
    `;
    con.query(sql, [req.body.name, req.body.author, req.body.category, req.body.date, req.body.image, req.params.id], (err, result) => {
      if(err) throw err;
      res.send(result);
    });
  })

  app.delete('/foods/:id', (req, res) => {
    const sql = `
      DELETE FROM foods
      WHERE id = ?
      `;
      con.query(sql, [req.params.id], (err, result) => {
          if (err) throw err;
          res.send(result);
      });
  })

}

export { foodsAPI };

// READ RELATIONSHIP JOIN(LEFT, RIGHT, INNER)

// app.get("/resource", (req, res) => {
//   const sql = `
//   SELECT itemsA_atr.*, itemB.id AS itemB_id_rename, itemB.post
//   FROM itemsA AS itemsA_rename
//   LEFT JOIN itemsB AS itemsB_rename
//   ON itemsB_rename.itemA_id = itemsA_rename.id
//   ORDER BY itemsA_rename.title
//   `;
//   con.query(sql, (err, result) => {
//       if (err) throw err;
//       res.send(result);
//   });
// });