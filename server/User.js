const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    console.log("sql", sql);
    console.log("args", args);
    req.mysqlDb.query(sql, args, (err, rows) => { console.log("rows", rows);
        console.log("err", err);
        if (err)
            return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

//const getUsers = (args, req) => queryDB(req, "select * from users").then(data => data);

function getUser(args, req){
    queryDB(req, "select * from users").then(data => data);
}

module.exports = getUser;