export interface DefaultProps {
  className?: string;
  username?: string;
}
export interface UnitFormProps extends DefaultProps {
  unit?: Unit
}
export interface CognitoJWT {
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
export interface UnitEntryProps extends DefaultProps {
  unit: Unit
}
export interface CreateUnitForm {
  unitCode: string
	unitName: string
	unitDescription: string
	unitCredits: number
	delivery: string
	prerequistes: string[]
	corequistes: string[]
	antirequistes: string[]
}
export interface Unit {
  Credits: Number
  Antirequistes: Array<Array<string>>
  Prerequistes: Array<Array<string>>
  Corequistes: Array<Array<string>>
  Name: string
  Delivery: string
  UnitCode: string
  Description: string
}
export interface PaginatedUnitsProps extends DefaultProps {
  units: Array<Unit>
}
export interface PromptData {
  promptTitle: string
  promptContent: string
  showPrompt: bool
}
export interface ErrorProps extends DefaultProps {
  promptTitle: string
  promptContent: string
  showPrompt: bool
  onAccept: Function
}