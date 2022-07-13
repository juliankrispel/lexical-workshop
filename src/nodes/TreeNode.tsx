import { EditorConfig, ElementNode, LexicalEditor, LexicalNode, SerializedElementNode } from "lexical";

export class TreeNode extends ElementNode {
  static getType() {
    return "custom";
  }

  static importJSON() {
    return new TreeNode();
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const el = document.createElement("div");

    if (_config.theme.custom) {
      el.className = _config.theme.custom;
    }

    return el;
  }

  static clone(node: TreeNode) {
    return new TreeNode(node.__key);
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }

  exportJSON(): SerializedElementNode {
    const children = this.getChildren().map((v) => v.exportJSON());
    return {
      ...super.exportJSON(),
      children,
      type: this.getType(),
    };
  }
}

export const $createCustomNode = () => {
  return new TreeNode();
};

export const $isCustomNode = (node: LexicalNode): node is TreeNode => {
  return node.getType() === TreeNode.getType();
};
