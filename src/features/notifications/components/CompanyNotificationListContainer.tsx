import { useState } from "react";
import Link from "next/link";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/select";
import { format } from "@/utils/format";
import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { MaxPageSize } from "@/apiClient";
import { Company } from "@/features/companies";

import { useCompanyNotificationListInfinite } from "../api/getCompanyNotificationList";
import { Notification } from "../types";

interface CompanyNotificationListContainerProps {
  id: Company["id"];
}

export function CompanyNotificationListContainer({
  id,
}: CompanyNotificationListContainerProps) {
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <div className="max-w-screen-tablet mx-auto">
      <TypographyH1>Notifications</TypographyH1>
      <br />
      <NotificationListController
        maxPageSize={maxPageSize}
        changePageSize={(ps) => setPageSize(ps)}
      />
      <br />
      <CompanyNotificationList id={id} maxPageSize={maxPageSize} />
    </div>
  );
}

interface NotificationListControllerProps {
  maxPageSize: MaxPageSize;
  changePageSize: (ps: MaxPageSize) => void;
}

const pageSizeMapping = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 50,
    label: "50",
  },
];

function NotificationListController({
  maxPageSize,
  changePageSize,
}: NotificationListControllerProps) {
  return (
    <div className="py-4 flex gap-4">
      <Select
        value={String(maxPageSize)}
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

interface CompanyNotificationListProps {
  id: Company["id"];
  maxPageSize: number;
}

function CompanyNotificationList({
  id,
  maxPageSize,
}: CompanyNotificationListProps) {
  const { data, hasEnded, loadMore, isValidating } =
    useCompanyNotificationListInfinite({
      id,
      maxPageSize,
    });

  if (!data) return <Spinner />;

  return (
    <div>
      <div className="flex flex-col gap-6">
        {data.results.map((c, i) => (
          <NotificationCardUI key={i} notification={c} />
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

interface NotificationCardUIProps {
  notification: Notification;
}

export function NotificationCardUI({ notification }: NotificationCardUIProps) {
  const { id, recipient_company_id, created_at, is_read, text, reference } =
    notification;

  if (reference && reference.type === "conversation")
    return (
      <Link
        className="p-4 rounded-lg border"
        href={`/c/${recipient_company_id}/conversations/${reference.id}/messages`}
      >
        <p>{text}</p>
        <p>{`Read: ${is_read}`}</p>
        <p className="text-sm text-gray-600 w-fit ml-auto">{`${format.date(
          new Date(created_at)
        )} | ${format.time(new Date(created_at))}`}</p>
      </Link>
    );

  return <div />;
}