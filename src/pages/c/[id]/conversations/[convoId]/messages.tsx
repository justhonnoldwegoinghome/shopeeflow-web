import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import {
  Conversation,
  ConversationMessageList,
} from "@/features/conversations";
import { CompanyLayout } from "@/layouts";

export default function Page() {
  const query = useRouter().query;
  let { id, convoId } = query;

  if (!id || !convoId) return <div />;

  id = id as Company["id"];
  convoId = convoId as Conversation["id"];

  return (
    <CompanyLayout id={id} tab="conversations">
      <LoggedIn>
        {(userId) => (
          <ConversationMessageList companyId={id} conversationId={convoId} />
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
