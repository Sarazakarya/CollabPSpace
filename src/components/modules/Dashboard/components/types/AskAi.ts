export interface AIMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
}

export type AskAIBody = {
  data?:
    | string
    | { answer?: string; response?: string; reply?: string; message?: string };
};
