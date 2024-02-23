import { BlockNoteEditor } from "@blocknote/core";
import { ReactNode, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatText } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useDrawer } from "@/hooks/use-drawer";

interface AskAIDrawerProps {
  title?: string;
  option: "SHORT_SUMMARY" | "FIX_SPELLING_GRAMMAR" | "LONG_SUMMARY";
  description?: string;
  editor: BlockNoteEditor;
  buttonLabel: string;
}

const AskAIDrawer = ({
  title,
  description,
  editor,
  option,
  buttonLabel,
}: AskAIDrawerProps) => {
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState<string | null>("");

  const shortSummary = useAction(api.editselection.shortSummary);
  const fixSpellingGrammar = useAction(api.editselection.fixSpellingAndGrammar);
  const handleOnClick = async (selectedText: string) => {
    try {
      setIsLoading(true);

      if (option === "SHORT_SUMMARY") {
        const response = await shortSummary({ prompt: selectedText });

        setText(response);
      }
      if (option === "FIX_SPELLING_GRAMMAR") {
        const response = await fixSpellingGrammar({ prompt: selectedText });

        setText(response);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleInsertBlock = () => {
    if (editor.getTextCursorPosition().block.type === "bulletListItem") {
      editor.insertBlocks(
        [{ content: text! }],
        editor.getTextCursorPosition().block,
        "nested"
      );
    }
    if (editor.getTextCursorPosition().block.type === "paragraph") {
      editor.insertBlocks(
        [{ content: text! }],
        editor.getTextCursorPosition().block,
        "after"
      );
    }
    setOpen(false);
  };

  const handleReplaceBlock = () => {
    editor.updateBlock(editor.getTextCursorPosition().block, {
      content: text!,
    });
  };

  return (
    <Drawer
      onOpenChange={(value) => setOpen(value)}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DrawerTrigger asChild>
        <div
          onClick={() => {
            const formattedText = formatText(editor.getSelection()?.blocks);
            handleOnClick(formattedText);
            setOpen(true);
          }}
          role="button"
          className="text-sm hover:bg-secondary transition p-2 rounded-md"
        >
          {buttonLabel}
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className=" flex flex-col p-4 pb-10">
            <div className="flex items-center">
              {isLoading ? (
                <Loader2 className="animate-spin " />
              ) : (
                <p className="text-muted-foreground pb-8">{text}</p>
              )}
            </div>
            {!isLoading ? (
              <div className="flex gap-3">
                <Button size="sm" onClick={handleInsertBlock}>
                  Insert
                </Button>
                <Button size="sm" onClick={handleReplaceBlock}>
                  Replace
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    const formattedText = formatText(
                      editor.getSelection()?.blocks
                    );
                    handleOnClick(formattedText);
                  }}
                >
                  Re-run
                </Button>
                <Button size="sm">Copy</Button>
              </div>
            ) : null}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AskAIDrawer;
