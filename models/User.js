const db = require('../databases/connection');
const bcrypt = require('bcryptjs');

class User {
    constructor(rowid, firstName, lastName, username, email, password) {
        this.rowid = rowid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    };

    static create(user) {
        const { firstName, lastName, username, email, password } = user;

        if (this.search('username', user.username)) {
            throw new Error(`Username in use`);
        };

        if (this.search('email', user.email)) {
            throw new Error(`Email in use`);
        };

        const hashedPassword = this.hashPassword(password);
        const new_user = { firstName, lastName, username, email, password: hashedPassword };

        const fields = '(:firstName, :lastName, :username, :email, :password)';
        const query = `INSERT INTO users VALUES ${fields}`;
        const rowid = db.fetchLastRowId(query, new_user);

        return new this({ rowid, new_user });
    };

    static findById(user) {
        const query = 'SELECT oid, * FROM users WHERE oid=?';
        const result = db.fetchOne(query, user.rowid);

        if (!result) {
            throw new Error(`RowID ${user.rowid} not exists`);
        };

        const { firstName, lastName, username, email, password } = result;

        return new this(user.rowid, firstName, lastName, username, email, password);
    };

    static listAll() {
        const query = 'SELECT oid, * FROM users';

        const results = db.fetchAll(query);

        let data = [];

        results.forEach(({ rowid, firstName, lastName, username, email, password }) => {
            data.push(new this(rowid, firstName, lastName, username, email, password));
        });

        return data;
    }

    static search(field, value) {
        const query = `SELECT oid FROM users WHERE ${field}=?`;

        return db.fetchOne(query, value);
    };

    static update(user) {
        const result = this.findById({ ...user });

        if ((user.username != result.username) && this.search('username', user.username)) {
            throw new Error(`Username in use`);
        };

        if ((user.email != result.email) && this.search('email', user.email)) {
            throw new Error(`Email in use`);
        };

        const { rowid, firstName, lastName, username, email, password } = user;
        const hashedPassword = this.hashPassword(password);
        const new_user = { rowid, firstName, lastName, username, email, password: hashedPassword };

        const fields = 'firstName = :firstName, lastName = :lastName, username = :username, email = :email, password = :password';
        const query = `UPDATE users SET ${fields} WHERE oid = :rowid`;

        db.fetchNone(query, new_user);

        return new this(new_user);
    };

    static remove(user) {
        const result = this.findById(user);

        const query = 'DELETE FROM users WHERE oid = ?';

        db.fetchNone(query, user.rowid);

        return result;
    }

    static hashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    };

    static comparePassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    };
};

module.exports = User;
