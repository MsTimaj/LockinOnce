
export interface AttachmentStyleResults {
  secure: number;
  anxious: number;
  avoidant: number;
  disorganized: number;
  dominantStyle: string;
}

export interface AttachmentStyleAssessmentProps {
  onComplete: (results: AttachmentStyleResults) => void;
}

export interface AttachmentQuestion {
  id: number;
  text: string;
  options: {
    value: string;
    text: string;
  }[];
}
