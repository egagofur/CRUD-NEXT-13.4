"use client";

import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function Login() {
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen">
      <Card color="white" className="px-6 py-16 shadow-md" shadow={false}>
        <Typography
          variant="h2"
          color="blue"
          textGradient
          className="text-center"
        >
          Login
        </Typography>
        <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
          <div className="flex flex-col gap-6 mb-4">
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>

          <Button className="mt-6" fullWidth onSubmit={() => handleSubmit()}>
            Login
          </Button>
        </form>
      </Card>
    </main>
  );
}
