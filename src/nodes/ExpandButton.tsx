import { $parseSerializedNode, DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode } from "lexical";
import { Button } from "../components/Button";
import { CollapseButton } from "./CollapseButton";

export class ExpandButton extends DecoratorNode<JSX.Element> {
  __jsonContent: string;

  static getType(): string {
    return "expand-button";
  }

  constructor(content: string, key?: NodeKey) {
    super(key);
    this.__jsonContent = content;
  }

  static importJSON(_serializedNode: SerializedLexicalNode): LexicalNode {
    return new CollapseButton();
  }

  static clone(_node: ExpandButton): LexicalNode {
    return new ExpandButton(_node.__jsonContent);
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const el = document.createElement("btn");
    const className = _config.theme.collapser;
    if (className != null) {
      el.className = className;
    }

    return el;
  }

  exportJSON(): SerializedLexicalNode {
    return {
      type: this.getType(),
      version: 1,
    };
  }

  expandContent = () => {
    const node = $parseSerializedNode(JSON.parse(this.__jsonContent));
    this.insertBefore(node);
    this.selectPrevious();
    this.remove();
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return <Button onClick={() => {
      console.log('expand')
      this.expandContent()
    }} >↓</Button>;
  }
}
