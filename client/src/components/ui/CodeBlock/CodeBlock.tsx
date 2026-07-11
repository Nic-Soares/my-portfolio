import React from "react";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, title }) => {
  return (
    <div className={styles.codeWrapper}>
      {title && <span className={styles.codeTitle}>{title}</span>}
      <pre className={styles.pre}>
        <code className={styles.code}>{code}</code>
      </pre>
    </div>
  );
};
