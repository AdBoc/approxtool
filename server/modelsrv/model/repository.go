package model

import (
	"context"
	"github.com/jackc/pgx/v4/pgxpool"
	pb "modelsrv/protos/modelService"
)

type modelPGRepository struct {
	db *pgxpool.Pool
}

func NewModelPGRepository(db *pgxpool.Pool) *modelPGRepository {
	return &modelPGRepository{db: db}
}

func (m *modelPGRepository) GetUserModels(userId uint32) (*pb.GetModelsResponse, error) {
	list := &pb.GetModelsResponse{}

	rows, err := m.db.Query(context.Background(), getAllModelsQuery, userId)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		model := &pb.Model{}
		err := rows.Scan(&model.Id, &model.Name, &model.Expression, &model.LexExpression)
		if err != nil {
			return nil, err
		}
		list.Models = append(list.Models, model)
	}
	defer rows.Close()

	return list, nil
}

func (m *modelPGRepository) AddModel(newModel *pb.NewModelRequest) error {
	_, err := m.db.Exec(
		context.Background(), insertNewModelQuery, newModel.Name, newModel.Expression, newModel.LexExpression, newModel.UserId,
	)
	if err != nil {
		return err
	}

	return nil
}

func (m *modelPGRepository) DeleteModel(id uint32) error {
	if _, err := m.db.Exec(context.Background(), deleteModelByIdQuery, id); err != nil {
		return err
	}

	return nil
}
