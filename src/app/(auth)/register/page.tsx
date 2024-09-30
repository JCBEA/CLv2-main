// app/(auth)/register/page.tsx

"use client";  // To use Client Component features

import _RegisterForm from "./_registerform";

const RegisterPage = () => {
  return (
    <main className="container mx-auto p-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Register for Creative Legazpi</h1>
      <_RegisterForm />
    </main>
  );
};

export default RegisterPage;
