import md5 from 'js-md5';
import { v4 as uuid } from 'uuid';

const userValidationAPI = (app, con) =>{
    
    app.get("/login-check", (req, res) => {
        const sql = `
            SELECT
            name, role
            FROM users
            WHERE session = ?
            `;
        con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
            if (err) throw err;
            if (!result.length) {
                res.send({ msg: 'error', status: 1 }); // user not logged
            } else {
                if ('admin' === req.query.role) {
                    if (result[0].role !== 2) {
                        res.send({ msg: 'error', status: 2 }); // not an admin
                    } else {
                        res.send({ msg: 'ok', status: 3 }); // is admin
                    }
                } else {
                    res.send({ msg: 'ok', status: 4 }); // is user
                }
            }
        });
    });

    app.post("/login", (req, res) => {
        //Creating token
        const key = uuid();
        const sql = `
        UPDATE users
        SET session = ?
        WHERE name = ? AND password = ?
        `;
        con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
            if (err) throw err;
            //Checking if row is updated
            if (!result.affectedRows) {
                res.send({ msg: 'error', key: '' });
            } else {
                res.send({ msg: 'ok', key });
            }
        });
    });

}

export { userValidationAPI }