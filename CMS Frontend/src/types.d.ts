interface DefaultProps {
  className?: string;
  username?: string;
}
interface UnitFormProps extends DefaultProps {
  unit?: Unit
}
interface MajorFormProps extends DefaultProps {
  major?: Major
}
interface SpecFormProps extends DefaultProps {
  spec?: Specialization
}
interface CognitoJWT {
  at_hash: string
  aud: string
  auth_time: number
  'cognito:username': string
  exp: number
  iat: number
  iss: string
  sub: string
  token_use: string
}
interface Delivery {
  delivery: "Internal" | "Online";
}
interface DeliveryAddProps extends DefaultProps {
  add: (deliveryName: "Online" | "Internal") => void;
}
interface RequistePathProps extends DefaultProps {
  path: Array<string>
  updatePath: (newArr: Array<string>, idx: number) => void;
  idx: number
  delete: (idx: number) => void
}
interface DeliveryListProps extends DefaultProps {
  list: Array<string>
  remove: (deliveryName: string) => void;
}
interface MajorListProps extends DefaultProps {
  list: Array<string>
  remove: (unitCode: string) => void;
}
interface UnitEntryProps extends DefaultProps {
  unit: Unit
}
interface MajorEntryProps extends DefaultProps {
  major: Major
}
interface SpecEntryProps extends DefaultProps {
  spec: Specialization
}
interface CreateUnitForm {
  unitCode: string
	unitName: string
	unitDescription: string
	unitCredits: number
	delivery: string
	prerequistes: string[][]
	corequistes: string[][]
	antirequistes: string[][]
}
interface CreateSpecForm {
  SpecCode: string
	Name: string
	Description: string
	Credits: number
	CourseInternal: boolean
	Units: string[]
	UnitAntiReqs: string[][]
	SpecAntiReqs: string[][]
	MajorAntiReqs: string[][]
}
interface CreateMajorForm {
  majorCode: string
  name: string
  description: string
  credits: number
  units: string[]
  unitAntiReqs: string[][]
  specAntiReqs: string[][]
}
interface Unit {
  Credits: Number
  Antirequistes: Array<Array<string>>
  Prerequistes: Array<Array<string>>
  Corequistes: Array<Array<string>>
  Name: string
  Delivery: string
  UnitCode: string
  Description: string
}
interface Major {
  MajorCode: string,
	Name: string,
	Description: string,
	Credits: Number,
	Units: string[],
	UnitAntiReqs: Array<Array<string>>
	SpecAntiReqs: Array<Array<string>>
}
interface PaginatedUnitsProps extends DefaultProps {
  units: Array<Unit>
}
interface PaginatedMajorProps extends DefaultProps {
  majors: Array<Major>
}
interface PaginatedSpecializationProps extends DefaultProps {
  specs: Array<Specialization>
}
interface PromptData {
  promptTitle: string
  promptContent: string
  showPrompt: bool
}
interface ErrorProps extends DefaultProps {
  promptTitle: string
  promptContent: string
  showPrompt: bool
  onAccept: Function
}
interface Specialization {
  SpecializationCode: string
	Name: string
	Description: string
	Credits: number
	Internal: boolean
	Units: string[]
	UnitAntiReqs: string[][]
	SpecAntiReqs: string[][]
	MajorAntiReqs: string[][]
}