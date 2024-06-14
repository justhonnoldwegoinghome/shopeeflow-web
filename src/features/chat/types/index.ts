import { Company } from "@/features/companies";

export interface ChatSettings {
  company_id: Company["id"];
  is_auto_reply: boolean;
}
