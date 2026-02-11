
export interface PromptResponse {
  analysis: string;
  concisePrompt: string;
  deepPrompt: string;
  clarifyingQuestions: string[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
