import internal from "stream";

export interface DefaultProps {
  className?: string;
  style?: React.CSSProperties | undefined;
}
export interface WorkspaceProps extends DefaultProps {
  units: Array<Unit>
  specs: Array<Specialization>
  majors: Array<Major>
  select: (selected: Unit | Major | Specialization) => void
}
export interface PlanProps extends DefaultProps {
  mainMajor?: Major;
  majors: Array<Major>;
  updateMainMajor: (m: Major) => void;
  plan: Plan
  removeFromPlan: (i: Major | Unit | Specialization) => void;
}
export interface PlanExplainProps extends DefaultProps {
  title: string;
  explaination: string;
}
export interface CareerListSPAProps extends DefaultProps {
  careers: Array<Career>
}

export interface idkwhatimdoing extends DefaultProps { 
  careers: Array<Career>
  selectCareer: (c : Career) => void;
}
export interface InitialCareerSPAProps extends DefaultProps {
  majors: Array<Major>
  selectMajor: (m: Major) => void;
}
export interface CareerListEntryProps extends DefaultProps {
  title: string;
}
export interface UnitFirstSPAContextProps {
  careers: Array<Career>
  units: Array<Unit>
  specs: Array<Specialization>
  majors: Array<Major>
}
export interface OptionCardProps extends DefaultProps, Clickable {
  title: string;
  type: string;
  description: string;
}

export interface Clickable {
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export interface CardPromptProps extends DefaultProps, Clickable {
  title: string;
  src: string;
  alt: string;
  description: string;
}

export interface TextSectionProps extends DefaultProps {
  sectionHeading: string;
  sectionContent?: string;
}

export interface CareerProps {
  careerName? : string;
  careerDescription? : string;
  careerIndustry? : string;
  careerReqs? : string[];
  careerTraits? : string[];
}

export interface MajorProps {
  majorCode? : string;
  majorName? : string;
  majorDescription? : string;
  majorCredits? : integer;
  majorUnits? : string[];
  majorSpecAntiReqs? : string[];
  majorUnitAntiReqs? : string[];
}

export interface Specialization {
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

export interface Major {
  MajorCode: string,
	Name: string,
	Description: string,
	Credits: Number,
	Units: string[],
	UnitAntiReqs: Array<Array<string>>
	SpecAntiReqs: Array<Array<string>>
}

export interface Plan {
  mainMajor?: Major;
  optionalUnits?: Unit[];
  specializations?: Specialization[];
  doubleMajor?: Major;
}

export interface Career {
  CareerId: string
  Description: string
  Industry: string
  Name: string
  Requirements: string[]
  Traits: string[]
}

export interface EntryProps extends DefaultProps {
  title: string;
  content: string;
}

export interface SpecProps {
  specCode: string;
  specName?:string;
  specCredits?: integer;
  specDescription?: string;
  specInternal?: boolean;
  specMajorAntiReqs?: string[];
  specSpecAntiReqs?: string[];
  specUnitAntiReqs?: string[];
  specUnits?: string[];
}

export interface CareerProps {
  careerName? : string;
  careerId? : string;
  careerDescription? : string;
  careerIndustry? : string;
  careerReqs? : string[];
  careerTraits? : string[];
}

export interface ListDataProps extends DefaultProps {
  sectionHeading: string;
  list?: string[];
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

export interface CareerListProps extends DefaultProps { 
  careerList? : string[];
}

export interface MajorUnitListProps extends DefaultProps { 
  majorUnitList: string[];
}

export interface InfoCardProps extends DefaultProps { 
  Code : string;
  Title : string;
  Description : string;
}

export interface MajorListProps extends DefaultProps { 
  majorList : MajorProps[];
}

export interface CareerPropsList extends DefaultProps { 
  listOfCareers? : CareerProps[];
}

export interface RequiredUnitsList extends DefaultProps { 
  listOfRequiredUnits? : string[]
}

export interface testPayload extends DefaultProps { 
  majorCode : string;
  majorName? : string;
  majorDescription? : string;
  majorCredits? : BigInteger;
  majorUnits? : string[];
  majorAntiReqs? : string[]
  requiredUnits? : string[];
}
