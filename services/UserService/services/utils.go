package services

//map Role to db values
// TODO: MAKE IT THE SAME AS IN PROTO
var (
	DbRoleName = map[int32]string{
		0: "user",
		1: "admin",
	}

	DbRoleValue = map[string]int32{
		"user":  0,
		"admin": 1,
	}
)
