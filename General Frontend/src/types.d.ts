export interface DefaultProps {
  className?: string;
  username?: string;
}

export interface DataId extends DefaultProps {
  id: string;
}

export interface CareerEntryProps extends DefaultProps {
  careerTitle: string;
  careerContent: string;
}

export interface CareerProps extends DefaultProps {
  careerName: string;
  careerDescription: string;
  careerIndustry: string;
  careerReqs: string;
  careerTraits: string;
}

export interface MajorEntryProps extends DefaultProps {
  majorTitle: string;
  majorContent: string;
}

export interface MajorProps extends DefaultProps {
  majorCode : string;
  majorName : string;
  majorDescription : string;
  majorUnits : string;
  majorPreReqs : string;
  majorCoReqs : string;
  majorAntiReqs : string;
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
