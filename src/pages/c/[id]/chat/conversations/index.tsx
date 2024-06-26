import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyConversationList } from "@/features/chat";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return <LoggedIn>{(userId) => <CompanyConversationList id={id} />}</LoggedIn>;
}
