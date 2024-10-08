import { Plus, Bot } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useCompanyAssistantList } from "../api/getCompanyAssistantList";

interface CompanyAssistantListProps {
  id: Company["id"];
}

export function CompanyAssistantList({ id }: CompanyAssistantListProps) {
  const companyAssistantListQuery = useCompanyAssistantList({ id });

  if (!companyAssistantListQuery.data) return <Spinner />;

  if (companyAssistantListQuery.data.results.length === 0)
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-secondary w-20 h-20 flex items-center justify-center rounded-full">
              <Bot size={30} strokeWidth={1} />
            </div>
            <div>
              <p className="font-medium text-center">No assistants found</p>
              <p className="text-sm text-muted-foreground text-center">
                Create your first assistant below
              </p>
            </div>
          </div>
          <Button asChild size="sm">
            <Link href={`/c/${id}/assistants/create`}>
              <Plus className="mr-2" size={16} />
              <p>Create assistant</p>
            </Link>
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      <div className="w-fit ml-auto">
        <Button asChild size="sm">
          <Link href={`/c/${id}/assistants/create`}>
            <Plus className="mr-2" size={16} />
            <p>Create</p>
          </Link>
        </Button>
      </div>
      <div className="flex flex-col divide-y-[1px]">
        {companyAssistantListQuery.data.results.map((a) => (
          <Link
            href={`/c/${id}/assistants/${a.id}`}
            key={a.id}
            className="p-4 focus:bg-secondary hover:bg-secondary focus:outline-none flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{a.name}</p>
              <p className="text-sm text-muted-foreground">{a.id}</p>
            </div>
            <div>
              {a.is_active ? (
                <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-md text-sm">
                  Active
                </span>
              ) : (
                <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-md text-sm">
                  Inactive
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
