import { AppShell } from "@/components/app-shell";
import { QuizRunner } from "@/components/quiz-runner";

export default function QuizPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-4xl px-4 py-8">
        <QuizRunner />
      </section>
    </AppShell>
  );
}
