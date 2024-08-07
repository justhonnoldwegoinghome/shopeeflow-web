import { formatDate } from "@/utils";
import { TypographySmall } from "@/components/typography";
import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/form";

import { useUser } from "../api/getUser";
import { User } from "../types";

interface UpdateUserProps {
  id: User["id"];
}

export function UpdateUser({ id }: UpdateUserProps) {
  const userQuery = useUser({ id });
  if (!userQuery.data) return <Spinner />;
  const { joined_at, email } = userQuery.data;

  return (
    <div className="flex flex-col gap-4">
      {[
        {
          header: "Email",
          value: email,
          disabled: true,
        },
        {
          header: "Joined",
          value: formatDate(new Date(joined_at)),
          disabled: true,
        },
      ].map(({ header, value, disabled }) => (
        <div key={header} className="flex gap-4 items-end">
          <div className="flex flex-col gap-2">
            <TypographySmall>{header}</TypographySmall>
            <Input
              id={header}
              value={value}
              disabled={disabled}
              onChange={() => null}
            />
          </div>
          {!disabled && <Button>Update</Button>}
        </div>
      ))}
    </div>
  );
}
