package model

const (
	getAllModelsQuery    = `SELECT id, name, expression, lexExpression FROM models;`
	insertNewModelQuery  = `INSERT INTO models (id, name, expression, lexExpression) VALUES (DEFAULT, $1, $2, $3);`
	deleteModelByIdQuery = `DELETE FROM models WHERE id=$1;`
)
