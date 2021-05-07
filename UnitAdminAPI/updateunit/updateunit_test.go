package main

/* Really hard to unit test due to the reliance on a endpoint :/

func TestDBIntialization(t *testing.T) { // I think it panics when it fails?
	var db *dynamodb.DynamoDB
	initializeDB(&db)
}

func TestDatabaseAdd(t *testing.T) {
	unit := Unit{UnitCode: "COMP0008", Name: "Introduction To Podcasting", Description: "This unit is a introduction to podcasts",
		Credits: 12.5, Delivery: "Podcast", Prerequistes: []string{"COMP2000", "COMP2001", "COMP2002"}, Corequistes: []string{"COMP2000", "COMP2001", "COMP2002"},
		Antirequistes: []string{"COMP2000", "COMP2001", "COMP2002"},
	}
	var db *dynamodb.DynamoDB
	initializeDB(&db)
	err := addToDatabase(unit, db)
	if err != nil {
		t.Fatalf("failed test: %v", err)
	}
} */
