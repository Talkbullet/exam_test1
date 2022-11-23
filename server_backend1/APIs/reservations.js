const reservationsAPI = (app, con) =>{

  app.get('/reservations', (req, res) => {
    const sql = `
    SELECT *
    FROM reservavimas`;
    con.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result);
    });
  })

  // app.get('/orders', (req, res) => {
  //     const sql = `
  //     SELECT _order.*, cl.type, cl.color, cl.price 
  //     FROM _order
  //     LEFT JOIN clothes AS cl
  //     ON _order.clothes_id = cl.id
  //     `;
  //     con.query(sql, (err, result) => {
  //       if(err) throw err;
  //       res.send(result);
  //     });
  // })

  app.put('/reservations/:id', (req, res) => {
    const sql = `
    UPDATE reservavimas SET terminas = ?, count = ? WHERE id = ?
    `;
    con.query(sql, [req.body.terminas, req.body.count, req.params.id], (err, result) => {
      if(err) throw err;
      res.send(result);
    });
  })

  app.post('/reservations', (req, res) => {
    const sql = `
    INSERT INTO reservavimas (terminas, count, foods_id)
    VALUES (?, ?, ?)
    `;
    con.query(sql, [req.body.terminas, req.body.count, req.body.foods_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
  })

}

export { reservationsAPI };