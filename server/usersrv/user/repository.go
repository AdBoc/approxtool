package user

import (
	"context"
	"github.com/jackc/pgx/v4"
	pb "usersrv/protos/userService"
)

type userPGRepository struct {
	db *pgx.Conn
}

func NewUserPGRepository(db *pgx.Conn) *userPGRepository {
	return &userPGRepository{db: db}
}

func (u *userPGRepository) Create(newUser *pb.NewUserRequest) error {
	_, err := u.db.Exec(context.Background(), insertNewUserQuery, newUser.Login, newUser.Password, newUser.Email)
	if err != nil {
		return err
	}

	return nil
}

func (u *userPGRepository) GetById(id uint32) (*pb.GetUserResponse, error) {
	var user pb.GetUserResponse

	if err := u.db.QueryRow(context.Background(), getByIdQuery, id).Scan(
		&user.Id, &user.Username,
	); err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *userPGRepository) GetAll() (*pb.GetUsersResponse, error) {
	list := &pb.GetUsersResponse{}

	rows, err := u.db.Query(context.Background(), getAllQuery)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		user := &pb.GetUserResponse{}
		err := rows.Scan(&user.Id, &user.Username)
		if err != nil {
			return nil, err
		}
		list.Users = append(list.Users, user)
	}

	return list, nil
}

func (u *userPGRepository) DeleteById(id uint32) error {
	if _, err := u.db.Exec(context.Background(), deleteByIdQuery, id); err != nil {
		return err
	}

	return nil
}
