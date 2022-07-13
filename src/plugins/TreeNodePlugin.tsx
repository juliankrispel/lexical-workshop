import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $createTextNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useEffect } from "react";
import { $createCustomNode, TreeNode } from "../nodes/TreeNode";
import { CollapseButton } from "../nodes/CollapseButton";
import { mergeRegister } from "@lexical/utils";
import { QuoteNode } from "@lexical/rich-text";

export function TreeNodePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    /**
     * mergeRegister returns a callback that removes all registered
     * listeners passed into mergeRegister
     */
    const unregister = mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          /**
           * TODO: select
           */
          return false;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerNodeTransform(QuoteNode, (node) => {
        /**
         * if we find an ExpandButton which
         */
      }),
      /**
       * Ensures that a TreeNodes always has a CollapseButton
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
          /**
           * Add a collapse button if there is none yet
           */
          if (
            !children.some(
              (child) => child.getType() === CollapseButton.getType()
            ) &&
            firstChild != null
          ) {
            const collapser = new CollapseButton();
            firstChild.insertBefore(collapser);
          }

          // if (children.filter($isCollapseButton).length > 1) {
          //   children.slice(1).forEach((child) => {
          //     child.remove();
          //   });
          // }
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