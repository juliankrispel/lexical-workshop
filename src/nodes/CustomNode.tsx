import { $isElementNode, DecoratorNode, EditorConfig, ElementNode, LexicalEditor, LexicalNode, SerializedElementNode, SerializedLexicalNode } from "lexical";

const Button = () => {
  return <span className="toggle">➡</span>;
}


export const NODE_COLLAPSE_BUTTON = 'collapse-button'
export class CollapseButton extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return NODE_COLLAPSE_BUTTON;
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
      const serializedNode = sibling.exportJSON()
      serializedNode.children = children
      // const collapsedNode = new(JSON.stringify(serializedNode))
      // this.insertBefore(collapsedNode);
      // sibling?.remove();
      // this.selectPrevious();
      // this.remove();
    }
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return <Button />
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }
}

export const NODE_COLLAPSED_CONTENT = 'collapsed-content'
export class CollapsedContent extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return NODE_COLLAPSED_CONTENT;
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