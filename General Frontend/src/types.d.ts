export interface DefaultProps {
  className?: string;
  username?: string;
}

export interface CareerProps extends DefaultProps {
       careerTitle: string;
       careerDescription: string;
}

export interface ErrorProps extends DefaultProps {
  promptTitle: string
  promptContent: string
  showPrompt: bool
  onAccept: Function
}