import ApolloWrapper from "@/apollo-client/ApolloWrapper";
import Register from "@/content-pages/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
  description: "FoodiFy your best food menu",
};

const RegisterPage = () => {
  return (
    <ApolloWrapper>
      <Register />
    </ApolloWrapper>
  );
};

export default RegisterPage;
