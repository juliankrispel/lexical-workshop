import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection } from "lexical";
import { $createCustomNode, CustomNode } from "../nodes/CustomNode";

export function CustomPlugin() {
  const [editor] = useLexicalComposerContext();
  return <div>
    <button onClick={() => {
      editor.update(() => {
        const sel = $getSelection();
        if ($isRangeSelection(sel)) {
          const nodes = sel.getNodes()
          if (nodes.length > 0) {
            nodes[0].insertAfter($createCustomNode());
          }
        }
      })
    }}>Insert Custom Node</button>
  </div>
}