"use client";

import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  FormattingToolbarPositioner,
  useBlockNote,
  HyperlinkToolbarPositioner,
  SideMenuPositioner,
  SlashMenuPositioner,
} from "@blocknote/react";
import "@blocknote/react/style.css";

import { useTheme } from "next-themes";

import EditorToolbar from "./editor-toolbar";
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  return (
    <BlockNoteView
      suppressHydrationWarning
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    >
      <FormattingToolbarPositioner
        editor={editor}
        formattingToolbar={EditorToolbar}
      />
      <HyperlinkToolbarPositioner editor={editor} />
      <SlashMenuPositioner editor={editor} />
      <SideMenuPositioner editor={editor} />
    </BlockNoteView>
  );
};

export default Editor;
