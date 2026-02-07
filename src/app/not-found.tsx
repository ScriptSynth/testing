import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 gradient-bg">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <img src="/icon.svg" alt="Syros" width={64} height={64} className="h-16 w-16 rounded-2xl" />
        </div>
        <h1 className="text-6xl font-bold tracking-tight text-foreground">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This page doesn&apos;t exist — but Syros soon will.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-0.5"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
