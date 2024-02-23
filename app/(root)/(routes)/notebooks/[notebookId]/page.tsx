"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getIconFile } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import { Loader2, MoreVertical, Wand2 } from "lucide-react";
import { ReactNode, useMemo } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/loading";

interface NoteBookIdProps {
  params: {
    notebookId: Id<"notebooks">;
  };
}

const NoteBookId = ({ params }: NoteBookIdProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const notebook = useQuery(api.notebooks.getNotebookById, {
    notebookId: params.notebookId,
  });

  const update = useMutation(api.notebooks.update);

  if (notebook === undefined) {
    return <Loading />;
  }

  if (notebook === null) {
    return <div>Not found</div>;
  }

  const noteIcon = (icon: string): ReactNode => {
    const IconFile = getIconFile(icon);

    if (IconFile) {
      return <IconFile className="w-7 h-7 md:h-10 md:w-10 text-white" />;
    }
    return undefined;
  };

  const onChange = (content: string) => {
    update({
      id: params.notebookId,
      content: content,
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex gap-x-4 items-center">
        <div
          style={{
            backgroundColor: notebook?.color!,
          }}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl"
        >
          {noteIcon(notebook?.icon!)}
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-bold capitalize">
            {notebook?.title}
          </h2>
          <p className="text-muted-foreground text-sm">
            {format(new Date(notebook._creationTime), "do MMM yyy")}
          </p>
        </div>
      </div>
      <div className="mt-10">
        <Editor onChange={onChange} initialContent={notebook.content} />
      </div>
    </div>
  );
};

export default NoteBookId;
