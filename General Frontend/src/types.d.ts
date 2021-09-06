import internal from "stream";

export interface DefaultProps {
  className?: string;
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
  majorCode : string;
  majorName? : string;
  majorDescription? : string;
  majorCredits? : integer;
  majorUnits? : string[];
  majorAntiReqs? : string[];
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
  specInternal: boolean;
  specMajorAntiReqs?: string[];
  specSpecAntiReqs?: string[];
  specUnitAntiReqs?: string[];
  specUnits?: string[];
}

export interface CareerProps {
  careerName? : string;
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