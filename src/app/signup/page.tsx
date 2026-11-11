import SignUpForm from "@/components/auth/SignUpForm";
import AuthLayout from "@/components/auth/AuthLayout";

export default function SignUpPage() {
  return (
    <AuthLayout
      heading="Arrive knowing where you want to live."
      body="An account keeps your answers, so every neighborhood gets a match score built around your routine."
    >
      <SignUpForm />
    </AuthLayout>
  );
}
