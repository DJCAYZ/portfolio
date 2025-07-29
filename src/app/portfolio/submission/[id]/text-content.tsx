import Markdown from "react-markdown";

import styles from './text-content.module.css';

export default function TextContent({ contents }: { contents?: string }) {
  return (
    <div className={styles.textContent}>
      <Markdown>
        {contents}
      </Markdown>
    </div>
  );
}