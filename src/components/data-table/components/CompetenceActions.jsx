import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { Button } from "@/components/ui/button.jsx";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx";
import { toast } from "sonner";
import CompetenceApi from "@/services/Api/CompetenceApi.js"; // Import CompetenceApi instead of ThemeApi
import EditCompetence from "../../CRUD/RegioCentreManager/Competences/EditCompetence"; // Adjust the import path
export const CompetenceActions = ({ competenceId }) => {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
          >
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <AlertDialog open={isDelete}>
            <DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <span onClick={() => setIsDelete(true)}>Delete</span>
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </AlertDialog>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Edit Competence
          </DropdownMenuItem>
          {/* Other actions */}
        </DropdownMenuContent>
      </DropdownMenu>

      {open && (
        <EditCompetence
          setOpen={setOpen}
          id={competenceId} // Pass competenceId
        />
      )}

      <AlertDialog open={isDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this competence?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDelete(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const deletingLoader = toast.loading("Deleting in progress.");

                try {
                  const response = await CompetenceApi.deleteCompetence(
                    competenceId,
                  ); // Pass competenceId
                  toast.dismiss(deletingLoader);
                  if (response?.status === 200) {
                    toast.success("Competence deleted successfully");
                  }
                } catch (err) {
                  toast.dismiss(deletingLoader);
                  toast.error(
                    "Competence not deleted. Please try again later.",
                  );
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
