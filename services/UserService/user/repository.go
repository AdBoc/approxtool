package user

import (
	"context"
	"github.com/jackc/pgx/v4/pgxpool"
	pb "usersrv/protos/user"
	"usersrv/services"
)

type userPGRepository struct {
	db *pgxpool.Pool
}

func NewUserPGRepository(db *pgxpool.Pool) *userPGRepository {
	return &userPGRepository{db: db}
}

func (u *userPGRepository) Create(newUser *pb.InternalNewUserRequest) (*pb.UserResponse, error) {
	var (
		user       pb.UserResponse
		userStatus string
	)

	if err := u.db.QueryRow(context.Background(), insertNewUserQuery, newUser.Email, newUser.Password, newUser.Username, services.Db_Role_name[int32(newUser.Status)]).Scan(
		&user.Id, &user.Username, &user.Email, &userStatus,
	); err != nil {
		return nil, err
	}

	user.Status = pb.Role(services.Db_Role_value[userStatus])

	return &user, nil
}

func (u *userPGRepository) GetAll() (*pb.GetUsersResponse, error) {
	list := &pb.GetUsersResponse{}

	rows, err := u.db.Query(context.Background(), allUsersQuery)
	if err != nil {
		return nil, err
	}

	var userStatus string
	for rows.Next() {
		user := &pb.UserResponse{}
		err := rows.Scan(&user.Id, &user.Username, &user.Email, &userStatus)
		user.Status = pb.Role(services.Db_Role_value[userStatus])
		if err != nil {
			return nil, err
		}
		list.Users = append(list.Users, user)
	}
	defer rows.Close()

	return list, nil
}

func (u *userPGRepository) DeleteById(id uint32) error {
	if _, err := u.db.Exec(context.Background(), deleteByIdQuery, id); err != nil {
		return err
	}

	return nil
}

func (u *userPGRepository) GetUserByEmail(email string) (*User, error) {
	var user User
	var userStatus string

	err := u.db.QueryRow(context.Background(), userByEmailQuery, email).Scan(&user.id, &user.username, &user.password, &userStatus)
	user.role = pb.Role(services.Db_Role_value[userStatus])
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *userPGRepository) ChangeUserStatus(userId uint32, status *pb.Role) error {
	_, err := u.db.Query(context.Background(), changeStatusQuery, services.Db_Role_name[int32(*status)], userId)
	if err != nil {
		return err
	}

	return nil
}

func (u *userPGRepository) SearchUserByName(userQuery string) (*pb.SearchResponse, error) {
	var userStatus string
	list := &pb.SearchResponse{}

	rows, err := u.db.Query(context.Background(), userByNameQuery, userQuery)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		user := &pb.UserResponse{}
		err := rows.Scan(&user.Id, &user.Username, &user.Email, &userStatus)
		user.Status = pb.Role(services.Db_Role_value[userStatus])
		if err != nil {
			return nil, err
		}
		list.Users = append(list.Users, user)
	}
	defer rows.Close()

	return list, nil
}
