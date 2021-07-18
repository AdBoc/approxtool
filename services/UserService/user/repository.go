package user

import (
	"context"
	"github.com/jackc/pgx/v4/pgxpool"
	pb "usersrv/protos/user"
)

type userPGRepository struct {
	db *pgxpool.Pool
}

func NewUserPGRepository(db *pgxpool.Pool) *userPGRepository {
	return &userPGRepository{db: db}
}

func (u *userPGRepository) Create(newUser *pb.NewUserRequest) (*pb.UserResponse, error) {
	var (
		user       pb.UserResponse
		userStatus string
	)

	status := map[int32]string{ //TODO: DRY ENUM
		0: "user",
		1: "admin",
	}

	userStatuses := map[string]int32{
		"user":  0,
		"admin": 1,
	}

	if err := u.db.QueryRow(context.Background(), insertNewUserQuery, newUser.Email, newUser.Password, newUser.Username, status[int32(newUser.Status)]).Scan(
		&user.Id, &user.Username, &user.Email, &userStatus,
	); err != nil {
		return nil, err
	}

	user.Status = pb.Role(userStatuses[userStatus])

	return &user, nil
}

func (u *userPGRepository) GetAll() (*pb.GetUsersResponse, error) {
	list := &pb.GetUsersResponse{}

	userStatuses := map[string]int32{
		"user":  0,
		"admin": 1,
	}

	rows, err := u.db.Query(context.Background(), allUsersQuery)
	if err != nil {
		return nil, err
	}

	var userStatus string
	for rows.Next() {
		user := &pb.UserResponse{}
		err := rows.Scan(&user.Id, &user.Username, &user.Email, &userStatus)
		user.Status = pb.Role(userStatuses[userStatus])
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

func (u *userPGRepository) GetPasswordByEmail(email string) (string, error) {
	var user struct{ password string }

	if err := u.db.QueryRow(context.Background(), userByEmailQuery, email).Scan(
		&user.password,
	); err != nil {
		return "", err
	}

	return user.password, nil
}

func (u *userPGRepository) ChangeUserStatus(userId uint32, status *pb.Role) error {
	newStatus := map[int32]string{
		0: "user",
		1: "admin",
	}

	_, err := u.db.Query(context.Background(), changeStatusQuery, newStatus[int32(*status)], userId)
	if err != nil {
		return err
	}

	return nil
}

func (u *userPGRepository) SearchUserByName(userQuery string) (*pb.SearchResponse, error) {
	var userStatus string
	list := &pb.SearchResponse{}

	userStatuses := map[string]int32{
		"user":  0,
		"admin": 1,
	}

	rows, err := u.db.Query(context.Background(), userByNameQuery, userQuery)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		user := &pb.UserResponse{}
		err := rows.Scan(&user.Id, &user.Username, &user.Email, &userStatus)
		user.Status = pb.Role(userStatuses[userStatus])
		if err != nil {
			return nil, err
		}
		list.Users = append(list.Users, user)
	}
	defer rows.Close()

	return list, nil
}
