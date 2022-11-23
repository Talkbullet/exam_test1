const authorization = (app, con) =>{
    
    const doAuth = function (req, res, next) {
    if (0 === req.url.indexOf("/admin")) {
        // admin
        const sql = `
            SELECT
            name, role
            FROM users
            WHERE session = ?
        `;
        //Only admin
        con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
        if (err) throw err;
        //Viena eilute
        if (!results.length || results[0].role !== 2) {
            res.status(401).send({});
            req.connection.destroy();
        } else {
            //Praleidziame
            next();
        }
        });
    } else if (
        0 === req.url.indexOf("/login-check") ||
        0 === req.url.indexOf("/login") ||
        0 === req.url.indexOf("/register")
    ) {
        next();
    } else {
        const sql = `
            SELECT
            name, role
            FROM users
            WHERE session = ?
        `;
        //Home
        con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
        if (err) throw err;
        if (!results.length) {
            res.status(401).send({});
            req.connection.destroy();
        } else {
            next();
        }
        });
    }
    };
    app.use(doAuth);
}

export { authorization };
