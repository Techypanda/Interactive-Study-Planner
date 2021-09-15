import internal from "stream";

export interface DefaultProps {
  className?: string;
}

export interface TextSectionProps extends DefaultProps {
  sectionHeading: string;
  sectionContent?: string;
}

export interface CareerEntryProps extends DefaultProps {
  careerTitle: string;
  careerContent: string;
}

export interface CareerProps {
  careerName? : string;
  careerDescription? : string;
  careerIndustry? : string;
  careerReqs? : string[];
  careerTraits? : string[];
}

export interface MajorEntryProps extends DefaultProps {
  majorTitle: string;
  majorContent: string;
}

export interface MajorProps {
  majorCode? : string;
  majorName? : string;
  majorDescription? : string;
  majorCredits? : integer;
  majorUnits? : string[];
  majorAntiReqs? : string[];
}

export interface CareerEntryProps extends DefaultProps {
  careerTitle: string;
  careerContent: string;
}

export interface CareerProps {
  careerName? : string;
  careerId? : string;
  careerDescription? : string;
  careerIndustry? : string;
  careerReqs? : string[];
  careerTraits? : string[];
}

export interface MajorEntryProps extends DefaultProps {
  majorTitle: string;
  majorContent: string;
}


export interface UnitProps extends DefaultProps {
  unitTitle: string;
  unitContent: string;
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

export interface MajorProps extends DefaultProps { 
  majorCode : string;
  majorName? : string;
  majorDescription? : string;
  majorCredits? : integer; 
  majorUnits? : string[];
  majorAntiReqs? : string[];
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