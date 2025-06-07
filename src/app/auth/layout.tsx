import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <figure className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          HOTDOG
        </figure>
        <section className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ex, quasi. Fugiat omnis aperiam, fuga consequuntur quaerat dolores
              deserunt qui nostrum dignissimos..&rdquo;
            </p>
            <footer className="text-sm">Agus Darmawan</footer>
          </blockquote>
        </section>
      </div>
      <div className="flex h-full items-center justify-center p-4 lg:p-8">
        <section className="flex w-full max-w-md flex-col items-center justify-center space-y-6">
          {children}
        </section>
      </div>
    </main>
  );
}
