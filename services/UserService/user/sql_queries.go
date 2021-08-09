package user

const (
	userByEmailQuery   = `SELECT id, username, password, user_status FROM users WHERE email=$1;`
	userByNameQuery    = `SELECT id, username, email, user_status FROM users WHERE id > $1 AND username LIKE $2 || '%' LIMIT 50;`
	userByIdQuery      = `SELECT user_status FROM users WHERE id=$1;`
	insertNewUserQuery = `INSERT INTO users (id, email, password, username, user_status, created_on) VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT) RETURNING id, username, email, user_status;`
	changeStatusQuery  = `UPDATE users SET user_status=$1 WHERE id=$2;`
	deleteByIdQuery    = `DELETE FROM users WHERE id=$1;`
	changeUserPassword = `UPDATE users SET password=$1 WHERE id=$2;`
)
