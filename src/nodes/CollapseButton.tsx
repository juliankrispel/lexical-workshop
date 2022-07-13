import { $isElementNode, DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, SerializedLexicalNode } from "lexical";
import { Button } from "./CustomNode";


export class CollapseButton extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return 'collapse-button';
  }

  static importJSON(_serializedNode: SerializedLexicalNode): LexicalNode {
    return new CollapseButton();
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

  collapseSibling = () => {
    const sibling = this.getNextSibling();

    if ($isElementNode(sibling)) {
      const children = sibling.getChildren().map((node) => node.exportJSON());
      const serializedNode = sibling.exportJSON();
      serializedNode.children = children;
      // const collapsedNode = new(JSON.stringify(serializedNode))
      // this.insertBefore(collapsedNode);
      // sibling?.remove();
      // this.selectPrevious();
      // this.remove();
    }
  };

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return <Button />;
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }
}
