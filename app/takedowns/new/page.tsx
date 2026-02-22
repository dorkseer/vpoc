import TakedownSubmissionForm from "@/app/components/TakedownSubmissionForm";

export default function SubmitNewTakedownPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Submit New Takedown</h1>
      <TakedownSubmissionForm />
    </div>
  );
}
