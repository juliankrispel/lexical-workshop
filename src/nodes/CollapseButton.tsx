import { $isElementNode, DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, SerializedLexicalNode } from "lexical";
import { Button } from "../components/Button";
import { ExpandButton } from "./ExpandButton";

export class CollapseButton extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return "collapse-button";
  }

  static importJSON(_serializedNode: SerializedLexicalNode): LexicalNode {
    return new CollapseButton();
  }

  static clone(node: CollapseButton) {
    return new CollapseButton(node.__key);
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
    const parent = this.getParent();
    console.log(parent);

    if ($isElementNode(parent)) {
      const children = parent.getChildren().map((node) => node.exportJSON());
      const serializedNode = parent.exportJSON();
      serializedNode.children = children;
      const expandedButton = new ExpandButton(JSON.stringify(serializedNode));
      parent.insertBefore(expandedButton);
      parent.selectPrevious();
      parent.remove();
    }
  };

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return <Button onClick={this.collapseSibling}>→</Button>;
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }
}
