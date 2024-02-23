"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import NotebookItem from "./notebook-item";

import EmptyList from "@/components/empty-list";
import GridItemsWrapper from "@/components/grid-wrapper";
import Loading from "@/components/loading";

const NotebookLists = () => {
  const notebooks = useQuery(api.notebooks.getNotebooks);

  if (notebooks === undefined) {
    return <Loading />;
  }

  return (
    <>
      {notebooks && notebooks?.length !== 0 ? (
        <GridItemsWrapper>
          {notebooks.map((notebook) => (
            <NotebookItem key={notebook._id} notebook={notebook} />
          ))}
        </GridItemsWrapper>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default NotebookLists;
