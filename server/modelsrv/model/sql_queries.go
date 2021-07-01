package model

const (
	getAllModelsQuery    = `SELECT id, name, expression, lex_expression FROM models WHERE user_id=$1;`
	insertNewModelQuery  = `INSERT INTO models (id, name, expression, lex_expression, user_id) VALUES (DEFAULT, $1, $2, $3, $4);`
	deleteModelByIdQuery = `DELETE FROM models WHERE id=$1;`
)
