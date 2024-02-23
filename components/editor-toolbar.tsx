import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockTypeDropdown,
  ColorStyleButton,
  CreateLinkButton,
  TextAlignButton,
  ToggledStyleButton,
  Toolbar,
  ToolbarButton,
} from "@blocknote/react";
import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import AskAIDrawer from "./custom-drawer";
import { Wand2 } from "lucide-react";

const EditorToolbar = ({ editor }: { editor: BlockNoteEditor }) => {
  return (
    <Toolbar>
      <BlockTypeDropdown editor={editor} />
      <ToggledStyleButton editor={editor} toggledStyle={"bold"} />
      <ToggledStyleButton editor={editor} toggledStyle={"italic"} />
      <ToggledStyleButton editor={editor} toggledStyle={"underline"} />
      <ToggledStyleButton editor={editor} toggledStyle={"strike"} />
      <ToggledStyleButton editor={editor} toggledStyle={"code"} />
      <TextAlignButton editor={editor} textAlignment={"left"} />
      <TextAlignButton editor={editor} textAlignment={"center"} />
      <TextAlignButton editor={editor} textAlignment={"right"} />
      <ColorStyleButton editor={editor} />
      <CreateLinkButton editor={editor} />

      <CustomDialog editor={editor}>
        <ToolbarButton mainTooltip="Edit with AI">
          <Wand2 className="w-4 h-4" />
        </ToolbarButton>
      </CustomDialog>
    </Toolbar>
  );
};

const CustomDialog = ({
  children,
  editor,
}: {
  children: ReactNode;
  editor: BlockNoteEditor;
}) => {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-3">
        <div className="flex flex-col gap-2">
          <h5 className="text-sm text-muted-foreground">Edit selection</h5>
          <Separator />
          <AskAIDrawer
            buttonLabel="Fix spelling and grammar"
            editor={editor}
            title="Fix spelling and grammar"
            option="FIX_SPELLING_GRAMMAR"
            description="Fix spelling and grammar of selected text."
          />
          <AskAIDrawer
            buttonLabel="Make a short summary"
            editor={editor}
            title="Short summary"
            option="SHORT_SUMMARY"
            description="Make a short summary of selected text."
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditorToolbar;
