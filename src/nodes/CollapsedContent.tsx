import { DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, SerializedLexicalNode } from "lexical";
import { CollapseButton } from "./CollapseButton";


export class CollapsedContent extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return 'collapsed-content';
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
