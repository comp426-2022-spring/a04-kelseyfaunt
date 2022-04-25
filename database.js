const data = require('better-sqlite3')
const logdb = new data('log.db')

const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`
);

let row = stmt.get();
if(row == undefinded) {
    console.log('Your database appears to be empty. I will initialize it now.');

    const logdata = `CREATE TABLE accesslog (
        id INTEGER PRIMARY KEY,
        remoteaddr TEXT,
        remoteuser TEXT,
        time TEXT,
        method TEXT,
        url TEXT,
        protocol TEXT,
        httpversion TEXT,
        status TEXT,
        referrer TEXT,
        useragent TEXT
    );
    `

    logdb.exec(logdata)
} else {
    console.log('Database exists')
}


module.exports = logdb