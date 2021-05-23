export interface DefaultProps {
  className?: string;
  username?: string;
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
  unitTitle: string;
  unitContent: string;
}
export interface CreateUnitForm {
  unitCode: string
	name: string
	description: string
	credits: number
	delivery: string
	prerequistes: string[]
	corequistes: string[]
	antirequistes: string[]
}