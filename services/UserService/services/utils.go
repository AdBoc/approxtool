package services

//map Role to db values
// TODO: MAKE IT THE SAME AS IN PROTO
var (
	Db_Role_name = map[int32]string{
		0: "user",
		1: "admin",
	}

	Db_Role_value = map[string]int32{
		"user":  0,
		"admin": 1,
	}
)
