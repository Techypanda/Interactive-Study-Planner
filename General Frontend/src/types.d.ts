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


export interface UnitProps extends DefaultProps {
  unitTitle: string;
  unitContent: string;
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