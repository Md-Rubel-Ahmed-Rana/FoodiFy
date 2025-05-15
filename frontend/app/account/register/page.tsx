import Register from "@/pages/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
  description: "FoodiFy your best food menu",
};

const RegisterPage = () => {
  return (
    <div>
      <Register />
    </div>
  );
};

export default RegisterPage;
