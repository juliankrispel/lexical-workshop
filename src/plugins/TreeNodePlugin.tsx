import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, $getNodeByKey, $getSelection, $isElementNode, $isRangeSelection } from "lexical";
import { useEffect } from "react";
import { $createCustomNode, TreeNode } from "../nodes/TreeNode";
import { CollapseButton } from "../nodes/CollapseButton";
import { mergeRegister } from "@lexical/utils";

export function TreeNodePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = mergeRegister(
      /**
       * Ensures that a CustomNode always has a CollapseButton
       */
      editor.registerNodeTransform(TreeNode, (node) => {
        if ($isElementNode(node)) {
          const children = node.getChildren();
          /**
           * if there's no text node append a text node first
           */
          if (children.length === 0) {
            node.append($createTextNode(""));
          }
          const firstChild = node.getFirstChild();
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
      })
    );

    return () => {
      unregister();
    };
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