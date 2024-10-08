import _ from "lodash";
import clsx from "clsx";

import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useConversationMessageList } from "../api/getConversationMessageList";
import { MessageCardUI } from "./MessageCardUI";

interface ConversationMessageListProps {
  companyId: Company["id"];
  conversationId: string;
}

export function ConversationMessageList({
  companyId,
  conversationId,
}: ConversationMessageListProps) {
  const conversationMessageListQuery = useConversationMessageList({
    companyId,
    conversationId,
    source: "shopee",
    maxPageSize: 50,
    pageToken: null,
  });

  if (!conversationMessageListQuery.data) return <Spinner />;

  return (
    <div className="flex flex-col items-start gap-4">
      {_.orderBy(
        conversationMessageListQuery.data.results,
        "sent_at",
        "asc"
      ).map((m) => (
        <div
          key={m.id}
          className={clsx("w-fit", {
            "ml-auto": m.sender_role === "seller",
            "mr-auto": m.sender_role === "buyer",
          })}
        >
          <MessageCardUI message={m} />
        </div>
      ))}
    </div>
  );
}
