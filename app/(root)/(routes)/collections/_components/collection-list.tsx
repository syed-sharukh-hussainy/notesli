"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import CollectionItem from "./collection-item";
import GridItemsWrapper from "@/components/grid-wrapper";
import Loading from "@/components/loading";
import EmptyList from "@/components/empty-list";

const CollectionList = () => {
  const collections = useQuery(api.collections.getCollections);

  if (collections === undefined) {
    return <Loading />;
  }

  return (
    <>
      {collections && collections?.length !== 0 ? (
        <GridItemsWrapper>
          {collections.map((collection) => (
            <CollectionItem key={collection._id} collection={collection} />
          ))}
        </GridItemsWrapper>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default CollectionList;
