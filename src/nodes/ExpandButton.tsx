import { DecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { $parseSerializedNode, DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode } from "lexical";
import { Button } from "../components/Button";
import { CollapseButton } from "./CollapseButton";

export type SerializedExpandButton = SerializedLexicalNode & {
  jsonContent: string
}

export class ExpandButton extends DecoratorBlockNode {
  __jsonContent: string;

  static getType(): string {
    return "expand";
  }

  constructor(content: string, key?: NodeKey) {
    super(key as any);
    this.__jsonContent = content;
  }

  static importJSON(_serializedNode: SerializedExpandButton): LexicalNode {
    return new CollapseButton(_serializedNode.jsonContent);
  }

  static clone(node: ExpandButton): LexicalNode {
    return new ExpandButton(node.__jsonContent);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      content: this.__jsonContent,
      type: ExpandButton.getType(),
      version: 1,
    };
  }

  /**
   * expandContent replaces itself with the node stored in this.__jsonContent
   */
  expandContent = () => {
    const node = $parseSerializedNode(JSON.parse(this.__jsonContent));
    this.insertBefore(node);
    this.selectPrevious();
    this.remove();
  };

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return (
      <div>
        <Button onClick={this.expandContent}>↓</Button>
      </div>
    );
  }
}

export const $createExpandButton = (content: string) => {
  return new ExpandButton(content);
};

export const $isExpandButton = (node: LexicalNode): node is ExpandButton => {
  return node.getType() === ExpandButton.getType();
};
