require('dotenv').config({ path: './.env' });
const Database = require('better-sqlite3');

const fetchLastRowId = (query, parameters) => {
    const db = new Database(process.env.SQLITE3_PATH, { verbose: console.log });
    db.pragma = 'journal_mode = WAL';

    const stmt = db.prepare(query);

    const info = (!parameters)
        ? stmt.run()
        : stmt.run(parameters);

    db.close;

    return info.lastInsertRowid;
};

const fetchOne = (query, parameters) => {
    const db = new Database(process.env.SQLITE3_PATH, { verbose: console.log });
    db.pragma = 'journal_mode = WAL';

    const stmt = db.prepare(query);
    const info = stmt.get(parameters);

    db.close;

    return info;
};

const fetchAll = (query) => {
    const db = new Database(process.env.SQLITE3_PATH, { verbose: console.log });
    db.pragma = 'journal_mode = WAL';

    const stmt = db.prepare(query);
    const info = stmt.all();

    db.close;

    return info;
};

const fetchNone = (query, parameters) => {
    const db = new Database(process.env.SQLITE3_PATH, { verbose: console.log });
    db.pragma = 'journal_mode = WAL';

    const stmt = db.prepare(query);
    if (!parameters) {
        stmt.run();
    } else {
        stmt.run(parameters);
    };

    db.close;
};

module.exports = {
    fetchLastRowId,
    fetchOne,
    fetchAll,
    fetchNone
};
