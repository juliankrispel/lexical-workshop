import { DecoratorNode, EditorConfig, ElementNode, LexicalEditor, LexicalNode, SerializedElementNode, SerializedLexicalNode } from "lexical";

export class CollapseButton extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return "collapser";
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

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }

}

export class CustomNode extends ElementNode {
  static getType() {
    return "custom";
  }

  static importJSON() {
    return new CustomNode();
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const el = document.createElement("div");

    if (_config.theme.custom) {
      el.className = _config.theme.custom;
    }

    return el;
  }

  static clone(node: CustomNode) {
    return new CustomNode(node.__key);
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }

  exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: this.getType(),
    };
  }
}

export const $createCustomNode = () => {
  return new CustomNode();
};