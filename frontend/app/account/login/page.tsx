import Login from "@/content-pages/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login account",
  description: "FoodiFy your best food menu",
};

const LoginPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
