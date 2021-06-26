package user

const (
	getByIdQuery       = `SELECT id, username FROM users WHERE id=$1;`
	getAllQuery        = `SELECT id, username FROM users;`
	insertNewUserQuery = `INSERT INTO users (id, username, password, email) VALUES (DEFAULT, $1, $2, $3);`
	deleteByIdQuery    = `DELETE FROM users WHERE id=$1;`
)
