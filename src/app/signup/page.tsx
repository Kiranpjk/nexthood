import Header from "@/components/common/Header";
import SignUpForm from "@/components/auth/SignUpForm";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <SignUpForm />
      </main>
    </div>
  );
}
