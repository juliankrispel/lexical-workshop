import { DecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { $parseSerializedNode, DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode } from "lexical";
import { Button } from "../components/Button";
import { CollapseButton } from "./CollapseButton";

export class ExpandButton extends DecoratorBlockNode {
  __jsonContent: string;

  static getType(): string {
    return "expand-button";
  }

  constructor(content: string, key?: NodeKey) {
    super(key as any);
    this.__jsonContent = content;
  }

  static importJSON(_serializedNode: SerializedLexicalNode): LexicalNode {
    return new CollapseButton();
  }

  static clone(_node: ExpandButton): LexicalNode {
    return new ExpandButton(_node.__jsonContent);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: ExpandButton.getType(),
      version: 1,
    };
  }

  expandContent = () => {
    const node = $parseSerializedNode(JSON.parse(this.__jsonContent));
    this.insertBefore(node);
    this.selectPrevious();
    this.remove();
  };

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return (
      <div>
        <Button
          onClick={() => {
            console.log("expand");
            this.expandContent();
          }}
        >
          ↓
        </Button>
      </div>
    );
  }
}
