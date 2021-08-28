package main

type Unit struct {
	UnitCode      string     `json:"unitCode"`
	Name          string     `json:"unitName"`
	Description   string     `json:"unitDescription"`
	Credits       float32    `json:"unitCredits"` // could be a half unit :/
	Delivery      string     `json:"delivery"`
	Prerequistes  [][]string `json:"prerequistes"`
	Corequistes   [][]string `json:"corequistes"`
	Antirequistes [][]string `json:"antirequistes"`
}

type Major struct {
	MajorCode    string     `json:"majorCode"`
	Name         string     `json:"name"`
	Description  string     `json:"description"`
	Credits      float32    `json:"credits"`
	Units        []string   `json:"units"`
	UnitAntiReqs [][]string `json:"unitAntiReqs"`
	SpecAntiReqs [][]string `json:"specAntiReqs"`
}

type Specialization struct {
	SpecCode       string     `json:"specCode"`
	Name           string     `json:"name"`
	Description    string     `json:"description"`
	Credits        float32    `json:"credits"`
	CourseInternal bool       `json:"courseInternal"`
	Units          []string   `json:"units"`
	UnitAntiReqs   [][]string `json:"unitAntiReqs"`
	SpecAntiReqs   [][]string `json:"specAntiReqs"`
	MajorAntiReqs  [][]string `json:"majorAntiReqs"`
}

type BulkAddRequest struct {
	CSVData string `json:"csvData"`
}

type DelUnit struct {
	UnitCode string `json:"unitCode"`
}
type DelMajor struct {
	MajorCode string `json:"majorCode"`
}
type DelSpecialization struct {
	SpecCode string `json:"specCode"`
}
