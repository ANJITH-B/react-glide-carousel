import CodeBlock from '@/components/CodeBlock';
import { DefaultDemo, ScaleDemo, BelowNavDemo, HoverDemo } from '@/components/Demos';
import { installCode, defaultExample, scaleExample, belowNavExample, hoverExample } from '@/utils/snippets';

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center min-h-screen py-40 bg-[#121212]">
      <div className="w-[600px] flex flex-col gap-6">

        <CodeBlock tabs={[{ tabName: 'npm', code: installCode, language: 'bash' }]} />

        <h4 className="italic text-white/40 mt-16"># Default</h4>
        <DefaultDemo />
        <CodeBlock tabs={[{ tabName: 'App.tsx', code: defaultExample }]} />

        <h4 className="italic text-white/40 mt-16"># Scale</h4>
        <ScaleDemo />
        <CodeBlock tabs={[{ tabName: 'App.tsx', code: scaleExample }]} />

        <h4 className="italic text-white/40 mt-16"># Navigation Below</h4>
        <BelowNavDemo />
        <CodeBlock tabs={[{ tabName: 'App.tsx', code: belowNavExample }]} />

        <h4 className="italic text-white/40 mt-16"># Hover to Slide</h4>
        <HoverDemo />
        <CodeBlock tabs={[{ tabName: 'App.tsx', code: hoverExample }]} />

      </div>
    </div>
  );
}
