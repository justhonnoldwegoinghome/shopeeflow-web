import { Assistant } from "@/features/assistants/types";
import { Company } from "@/features/companies";
import { Conversation } from "@/features/conversations";
import { Message } from "@/features/messages";

interface LLMMessage {
  role: "assistant" | "user";
  content: string;
}

export interface Autoreply {
  id: string;
  company_id: Company["id"];
  assistant_id: Assistant["id"];
  conversation_id: Conversation["id"];
  source: "shopee";
  created_at: string;
  input_message_list: Message[];
  output_llm_message_list: LLMMessage[];
  trigger: "manual" | "auto";
  is_require_action: boolean;
}