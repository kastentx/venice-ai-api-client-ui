export interface IModel {
  id: string;
  type: string;
  object: string;
  created: number;
  owned_by: string;
  model_spec: {
    availableContextTokens: number;
    traits: string[];
    modelSource: string;
  };
}

export interface ICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
      reasoning_content: null | string;
      tool_calls: any[];
    };
    logprobs: null | any;
    finish_reason: string;
    stop_reason: null | string;
  }[];
  usage: {
    prompt_tokens: number;
    total_tokens: number;
    completion_tokens: number;
    prompt_tokens_details: null | any;
  };
}
