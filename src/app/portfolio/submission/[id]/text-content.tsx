import Markdown from "react-markdown";

import styles from './text-content.module.css';
import { cn } from "@/lib/utils";

export default function TextContent({ contents }: { contents?: string }) {
  return (
    <div className={styles.textContent}>
      <Markdown>
        {contents}
      </Markdown>
    </div>
  );
}