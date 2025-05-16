"use client";
import { apiUri } from "@/apollo-client/client";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.open(`${apiUri}/auth/google`, "_self");
  };

  return (
    <div className="space-y-4">
      {/* OR Divider */}
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-gray-300" />
        <span className="text-sm text-gray-500 font-medium">OR</span>
        <span className="h-px flex-1 bg-gray-300" />
      </div>

      {/* Google Login Button */}
      <Button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2"
      >
        <FaGoogle size={20} />
        <span className="text-white">Continue with Google</span>
      </Button>
    </div>
  );
};

export default GoogleLoginButton;
