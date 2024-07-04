import { useState } from "react";

import { PageSize } from "@/apiClient";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/select";
import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useConversationListInfinite } from "../api/getConversationList";
import { ConversationCardUI } from "./ConversationCardUI";

export type Source = "shopee";
export type ConvoType = "all" | "unread" | "pinned";

interface ConversationListContainerProps {
  companyId: Company["id"];
}

export function ConversationListContainer({
  companyId,
}: ConversationListContainerProps) {
  const [source, setSource] = useState<Source>("shopee");
  const [convoType, setConvoType] = useState<ConvoType>("all");
  const [pageSize, setPageSize] = useState<PageSize>(5);

  return (
    <div className="max-w-screen-tablet mx-auto">
      <TypographyH1>Conversations</TypographyH1>
      <br />
      <ConversionListController
        source={source}
        changeSource={(s) => setSource(s)}
        convoType={convoType}
        changeConvoType={(ct) => setConvoType(ct)}
        pageSize={pageSize}
        changePageSize={(ps) => setPageSize(ps)}
      />
      <br />
      <ConversationList
        companyId={companyId}
        source={source}
        convoType={convoType}
        pageSize={pageSize}
      />
    </div>
  );
}

interface ConversionListControllerProps {
  source: Source;
  changeSource: (s: Source) => void;
  convoType: ConvoType;
  changeConvoType: (ct: ConvoType) => void;
  pageSize: PageSize;
  changePageSize: (ps: PageSize) => void;
}

const sourceMapping = [
  {
    value: "shopee",
    label: "Shopee",
  },
];

const convoTypeMapping = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "unread",
    label: "Unread",
  },
  {
    value: "pinned",
    label: "Pinned",
  },
];

const pageSizeMapping = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
];

function ConversionListController({
  source,
  changeSource,
  convoType,
  changeConvoType,
  pageSize,
  changePageSize,
}: ConversionListControllerProps) {
  return (
    <div className="py-4 flex gap-4">
      <Select value={source} onValueChange={changeSource}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sourceMapping.map((c) => (
              <SelectItem key={c.label} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={convoType} onValueChange={changeConvoType}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {convoTypeMapping.map((c) => (
              <SelectItem key={c.label} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={String(pageSize)}
        onValueChange={(ps) => changePageSize(Number(ps))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {pageSizeMapping.map((c) => (
              <SelectItem key={c.label} value={String(c.value)}>
                {c.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

interface ConversationListProps {
  companyId: Company["id"];
  source: "shopee";
  convoType: "all" | "unread" | "pinned";
  pageSize: number;
}

function ConversationList({
  companyId,
  source,
  convoType,
  pageSize,
}: ConversationListProps) {
  const { data, hasEnded, loadMore, isValidating } =
    useConversationListInfinite({
      companyId,
      source,
      pageSize,
      convoType,
    });

  if (!data) return <Spinner />;

  return (
    <div>
      <div className="flex flex-col gap-8">
        {data.results.map((c, i) => (
          <ConversationCardUI key={i} conversation={c} />
        ))}
      </div>
      <br />
      {hasEnded ? (
        <Button disabled variant="outline">
          End of list
        </Button>
      ) : (
        <Button onClick={loadMore} isLoading={isValidating}>
          Load more
        </Button>
      )}
    </div>
  );
}