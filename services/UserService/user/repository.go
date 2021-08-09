package user

import (
	context "context"
	"github.com/jackc/pgx/v4/pgxpool"
	"usersrv/protos/user"
)

type userPGRepository struct {
	db *pgxpool.Pool
}

func NewUserPGRepository(db *pgxpool.Pool) *userPGRepository {
	return &userPGRepository{db: db}
}

func (u *userPGRepository) Create(newUser *user.InternalNewUserRequest) (*user.UserResponse, error) {
	var dbUser user.UserResponse

	if err := u.db.QueryRow(context.Background(), insertNewUserQuery, newUser.Email, newUser.Password, newUser.Username, newUser.Role).Scan(
		&dbUser.Id, &dbUser.Username, &dbUser.Email, &dbUser.Role,
	); err != nil {
		return nil, err
	}

	return &dbUser, nil
}

func (u *userPGRepository) DeleteById(id uint32) error {
	if _, err := u.db.Exec(context.Background(), deleteByIdQuery, id); err != nil {
		return err
	}

	return nil
}

func (u *userPGRepository) GetUserByEmail(email string) (*User, error) {
	var dbUser User

	err := u.db.QueryRow(context.Background(), userByEmailQuery, email).Scan(&dbUser.id, &dbUser.username, &dbUser.password, &dbUser.role)
	if err != nil {
		return nil, err
	}

	return &dbUser, nil
}

func (u *userPGRepository) ChangeUserStatus(userId uint32, status string) error {
	_, err := u.db.Query(context.Background(), changeStatusQuery, status, userId)
	if err != nil {
		return err
	}

	return nil
}

func (u *userPGRepository) SearchUserByName(userQuery string, keySetValue uint32) (*user.SearchResponse, error) {
	list := &user.SearchResponse{}

	rows, err := u.db.Query(context.Background(), userByNameQuery, keySetValue, userQuery)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		dbUser := &user.UserResponse{}
		err := rows.Scan(&dbUser.Id, &dbUser.Username, &dbUser.Email, &dbUser.Role)
		if err != nil {
			return nil, err
		}
		list.Users = append(list.Users, dbUser)
	}
	defer rows.Close()

	return list, nil
}

func (u *userPGRepository) ChangeUserPassword(userId uint32, newPassword string) error {
	if _, err := u.db.Query(context.Background(), changeUserPassword, newPassword, userId); err != nil {
		return err
	}

	return nil
}

func (u *userPGRepository) GetUserById(userId uint32) (string, error) {
	var userRole string
	if err := u.db.QueryRow(context.Background(), userByIdQuery, userId).Scan(&userRole); err != nil {
		return "", err
	}

	return userRole, nil
}
