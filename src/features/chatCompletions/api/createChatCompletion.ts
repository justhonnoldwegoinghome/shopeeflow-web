import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";

import { ChatCompletion } from "../types";
import { Message } from "@/features/messages";

interface CreateChatCompletionParams {
  data: {
    companyId: Company["id"];
    source: "shopee";
    inputMessageList: Message[];
  };
}

export function createChatCompletion({ data }: CreateChatCompletionParams) {
  return post<ChatCompletion>("/chat-completions", {
    company_id: data["companyId"],
    source: data["source"],
    input_message_list: data["inputMessageList"],
  });
}

export function useCreateChatCompletion({
  companyId,
}: {
  companyId: Company["id"];
}) {
  return useSWRMutation(
    `/companies/${companyId}/chat-completions`,
    (_, { arg }: { arg: Pick<CreateChatCompletionParams, "data"> }) =>
      createChatCompletion({
        data: arg["data"],
      }),
    {
      throwOnError: false,
    }
  );
}
