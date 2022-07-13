import { EditorConfig, ElementNode, LexicalEditor, SerializedElementNode } from "lexical";

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