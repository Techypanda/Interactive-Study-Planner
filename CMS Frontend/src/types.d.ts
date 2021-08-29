interface DefaultProps {
  className?: string;
  username?: string;
}
interface UnitFormProps extends DefaultProps {
  unit?: Unit
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
interface UnitEntryProps extends DefaultProps {
  unit: Unit
}
interface CreateUnitForm {
  unitCode: string
	unitName: string
	unitDescription: string
	unitCredits: number
	delivery: string
	prerequistes: string[]
	corequistes: string[]
	antirequistes: string[]
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
interface PaginatedUnitsProps extends DefaultProps {
  units: Array<Unit>
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