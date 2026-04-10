import { PageContainer } from "@/components/layout";
import { LoginForm } from "@/features/auth/components";

export const LoginPage = () => {
  return (
    <PageContainer className="flex justify-center items-center h-dvh">
      <LoginForm />
    </PageContainer>
  );
};