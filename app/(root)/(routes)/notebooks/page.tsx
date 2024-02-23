"use client";
import { BookText } from "lucide-react";
import NotebookLists from "./_components/notebooks-list";
import CreateEditNotebook from "@/app/(root)/(routes)/notebooks/_components/create-notebook-dialog";
import { useState } from "react";
import ContainerWrapper from "@/components/container-wrapper";

const Notebooks = () => {
  const [showNotebookDialog, setShowNotebookDialog] = useState(false);

  return (
    <>
      <ContainerWrapper
        icon={BookText}
        label="My Notebooks"
        buttonLabel="Add Notebook"
        setShowDialog={setShowNotebookDialog}
      >
        <NotebookLists />
      </ContainerWrapper>
      <CreateEditNotebook
        open={showNotebookDialog}
        setOpen={setShowNotebookDialog}
      />
    </>
  );
};

export default Notebooks;
