package services

//map Role to db values
// TODO: MAKE IT THE SAME AS IN PROTO
var (
	DbRoleName = map[int32]string{
		0: "USER",
		1: "ADMIN",
	}

	DbRoleValue = map[string]int32{
		"USER":  0,
		"ADMIN": 1,
	}
)
