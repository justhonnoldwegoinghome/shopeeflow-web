import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { useDeleteAssistant } from "../api/deleteAssistant";
import { Assistant } from "../types";

interface DeleteAssistantDialogProps {
  id: Assistant["id"];
  companyId: Company["id"];
  children: (openDialog: () => void) => ReactNode;
}

export function DeleteAssistantDialog({
  id,
  companyId,
  children,
}: DeleteAssistantDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const deleteAssistantMutation = useDeleteAssistant({ id, companyId });

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {children(() => setIsOpen(true))}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete assistant</DialogTitle>
            <DialogDescription>
              Once you delete the assistant, there is no going back. Please be
              certain.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="flex gap-2 ml-auto">
              <DialogClose asChild>
                <Button type="button" variant="secondary" size="sm">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() =>
                  deleteAssistantMutation.trigger().then(() => setIsOpen(false))
                }
                isLoading={deleteAssistantMutation.isMutating}
              >
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
