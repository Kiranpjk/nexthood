import LoginForm from "@/components/auth/LoginForm";
import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Pick up where you left off."
      body="Your preferences and shortlist are waiting. Log in to keep comparing neighborhoods."
    >
      <LoginForm />
    </AuthLayout>
  );
}
