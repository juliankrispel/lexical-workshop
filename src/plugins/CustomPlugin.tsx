import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, $getNodeByKey, $getSelection, $isElementNode, $isRangeSelection, ParagraphNode } from "lexical";
import { useEffect, useLayoutEffect } from "react";
import { $createCustomNode, CollapseButton, CollapsedContent, CustomNode, NODE_COLLAPSED_CONTENT, NODE_COLLAPSE_BUTTON } from "../nodes/CustomNode";

export function CustomPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {

    editor.registerMutationListener(CustomNode, (mutations) => {
      editor.update(() => {
        for (const [key, type] of mutations) {
          const node = $getNodeByKey(key);
  
          switch (type) {
            case "created":
              
              if ($isElementNode(node)) {
                const children = node.getChildren()
                /**
                 * if there's no text node append a text node first
                 */
                if (children.length === 0) {
                  node.append($createTextNode(""));
                }
                const firstChild = node.getFirstChild()
                if (
                  !children.some(
                    (child) => child.getType() === CollapseButton.getType()
                  ) &&
                  firstChild != null
                ) {
                  const collapser = new CollapseButton();
                  firstChild.insertBefore(collapser);
                }
              }
              break;
            default:
              break;
          }
        }
      });
    });

  }, []);

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