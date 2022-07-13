import "./App.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { createEmptyHistoryState, HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { TreeNode } from "./nodes/TreeNode";
import { ExpandButton } from "./nodes/ExpandButton";
import { TreeNodePlugin } from "./plugins/TreeNodePlugin";
import { CollapseButton } from "./nodes/CollapseButton";

const initialState = {
  root: {
    children: [
      {
        type: "paragraph",
        children: [
          {
            text: "Hello ",
            type: "text",
          },
          {
            type: "linebreak",
          },
          {
            text: "World",
            type: "text",
          },
        ],
      },
      {
        type: TreeNode.getType(),
        children: [
          {
            type: "text",
            text: "Hai friends",
          },
        ],
      },
    ],
    type: "root",
  },
};

export default function App() {
  const history = createEmptyHistoryState();
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "test",
        nodes: [TreeNode, CollapseButton, ExpandButton],
        editorState: JSON.stringify(initialState),
        theme: {
          custom: "custom",
          expand: 'expand',
        },
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <HistoryPlugin externalHistoryState={history} />
      <OnChangePlugin
        onChange={(editorState) => {
          console.log(editorState.toJSON().root.children);
        }}
      />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div className="placeholder">Type something</div>}
      />
      <ClearEditorPlugin />
      <TreeNodePlugin />
    </LexicalComposer>
  );
}