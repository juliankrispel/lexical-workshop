import React from 'react'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function Button({
  children,
  onClick,
}: React.PropsWithChildren<{ onClick: () => void }>) {
  const [editor] = useLexicalComposerContext();
  return (
    <span
      className="toggle"
      onClick={() => {
        editor.update(() => {
          onClick();
        });
      }}
    >
      {children}
    </span>
  );
}
