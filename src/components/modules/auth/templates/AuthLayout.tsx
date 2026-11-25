import type { ReactNode } from "react";

import { LangToggle } from "@/components/common/LangToggle";
import Logo from "../atoms/Logo";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: Props) {
  return (
    <div className="ds-bg flex min-h-screen flex-col">
      <header className="flex items-center justify-between p-4 sm:px-8">
        <Logo />
        <LangToggle />
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <section className="ds-card w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="ds-title-lg ds-text-primary">{title}</h1>
            <p className="ds-text-sm ds-text-secondary mt-1">{subtitle}</p>
          </div>
          {children}
        </section>
      </main>
    </div>
  );
}
