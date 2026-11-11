'use cache';
import { codeToHtml } from "shiki";
import CopyButton from "./CopyButton";

interface Tab {
  tabName: string;
  code: string;
  language?: string;
}

interface Props {
  tabs: Tab[];
  defaultLanguage?: string;
}

export default async function CodeBlock({ tabs, defaultLanguage = "tsx" }: Props) {
  const rendered = await Promise.all(
    tabs.map((tab) =>
      codeToHtml(tab.code.trim(), {
        lang: tab.language ?? defaultLanguage,
        theme: "vesper",
      })
    )
  );

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 text-sm font-mono">
      {rendered.map((html, i) => (
        <div key={tabs[i].tabName}>
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4">
            <span className="py-2 text-xs text-white/50">{tabs[i].tabName}</span>
            <CopyButton text={tabs[i].code.trim()} />
          </div>
          <div
            className="overflow-x-auto [&>pre]:p-5 [&>pre]:bg-transparent!"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      ))}
    </div>
  );
}
