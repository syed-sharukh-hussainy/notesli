"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import CollectionList from "./_components/collection-list";
import ContainerWrapper from "@/components/container-wrapper";
import AddCollectionDialog from "./_components/add-collection-dialog";

const Collections = () => {
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  return (
    <>
      <ContainerWrapper
        icon={CheckCircle}
        label="My Collections"
        buttonLabel="Add Collection"
        setShowDialog={setShowCollectionDialog}
      >
        <CollectionList />
      </ContainerWrapper>
      <AddCollectionDialog
        open={showCollectionDialog}
        setOpen={setShowCollectionDialog}
      />
    </>
  );
};

export default Collections;
