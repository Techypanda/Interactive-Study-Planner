# CSV Parser
## Please note ricky's data is now different to ours, as the Prereqs are incorrect in handbook.
## CSV Format
- DATATYPE
- PROPERTIES
...
### Unit Definition
- UNIT
- UNITCODE
- UNIT TITLE
- UNIT DESCRIPTION
- CREDITS
- DELIVERY TYPE (e.g. internal,fully online,...)
- PREREQUISTES (entered as groups, to split into a new group (i.e OR path) use a semicolon else its comma seperated)
- COREQUISTES (entered as groups, to split into a new group (i.e OR path) use a semicolon else its comma seperated)
- ANTIREQUISTES (entered as groups, to split into a new group (i.e OR path) use a semicolon else its comma seperated)
- SEMESTER (1 = Semester 1, 2 = Semester 2, 12 = Semester 1 & 2)
- YEAR_TAKEN_IN (Only for majors/spec units just leave it blank otherwise)
### Major Definition
- MAJOR
- MajorCode
- Name
- Description
- Credits
- Units (CSV Seperated)
- UnitAntiReqs (entered as groups, to split into a new group (i.e OR path) use a semicolon else its comma seperated)
- SpecAntiReqs (entered as groups, to split into a new group (i.e OR path) use a semicolon else its comma seperated)
### Specialiation Definition
- SPECIALIZATION
- SpecCode
- Name
- Description
- Credits
- InternalSpecialization (FALSE/TRUE)
- Units (CSV Seperated)
- UnitAntiReqs (entered as groups, to split into a new group (i.e OR path) use a semicolon else its comma seperated)
- SpecAntiReqs (entered as groups, to split into a new group (i.e OR path) use a semicolon else its comma seperated)
- MajorAntiReqs (entered as groups, to split into a new group (i.e OR path) use a semicolon else its comma seperated)
### Career Definition
- CAREER
- Name
- Description
- Industry
- UnitRequirements (CSV Seperated)
- Traits (CSV Seperated)