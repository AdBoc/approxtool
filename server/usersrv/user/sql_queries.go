package user

const (
	getByIdQuery       = `SELECT id, username, email, user_status FROM users WHERE id=$1;`
	getByEmailQuery    = `SELECT password FROM users WHERE email=$1;`
	getAllQuery        = `SELECT id, username, email, user_status FROM users;`
	insertNewUserQuery = `INSERT INTO users (id, email, password, username, user_status, created_on) VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT) RETURNING id, username, email, user_status;`
	changeStatusQuery  = `UPDATE users SET user_status=$1 WHERE id=$2;`
	deleteByIdQuery    = `DELETE FROM users WHERE id=$1;`
)
