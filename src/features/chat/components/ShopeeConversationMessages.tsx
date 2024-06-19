import { Company } from "@/features/companies";

import { useShopeeConversationMessages } from "../api/getShopeeConversationMessages";

interface ShopeeConversationMessagesProps {
  companyId: Company["id"];
  conversationId: string;
}

export function ShopeeConversationMessages({
  companyId,
  conversationId,
}: ShopeeConversationMessagesProps) {
  const shopeeConversationMessagesQuery = useShopeeConversationMessages({
    companyId,
    conversationId,
  });

  if (!shopeeConversationMessagesQuery.data) return <div></div>;

  return (
    <div>
      <h1 className="font-bold">Messages</h1>
      <div className="flex flex-col items-start gap-8">
        {shopeeConversationMessagesQuery.data.results.map((m, i) => (
          <div key={i} className="border">
            <div>
              <p>{m.processed.id}</p>
              <p>{m.processed.created_at}</p>
              <p>{m.processed.sender_role}</p>
              <p>{m.processed.content.text}</p>
            </div>
            <div className="text-blue-500">
              <div className="underline underline-offset-2">{`message_type: ${m.raw.message_type}`}</div>
              <div>{`status: ${m.raw.status}`}</div>
              <div>{`content.text: ${m.raw.content.text}`}</div>
              <button onClick={() => console.log(m.raw)}>
                Log raw message
              </button>
            </div>
          </div>
        ))}
      </div>
      <br />

      <button className="p-3 bg-green-200">Generate response</button>
    </div>
  );
}
