"use client";

import { useToast } from "@/hooks/use-toast";
import { updateUserPassword } from "@/lib/actions/user";
import { useState } from "react";

export default function ChangePasswordForm({ userid }) {
  const { toast } = useToast();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password cannot be empty",
      });
      setConfirmPassword("");
      setPassword("");
      return;
    }
    if (password.trim().length < 5) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 5 characters long",
      });
      setConfirmPassword("");
      setPassword("");
      return;
    }
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }
    setIsPopupVisible(true);
  };

  const resetPassword = async () => {
    try {
      setIsLoading(true);
      const result = await updateUserPassword(userid, password);
      if (result.status === "SUCCESS") {
        toast({
          variant: "success",
          title: "Success",
          description: "Password changed successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to change password",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to change password",
      });
    } finally {
      setIsLoading(false);
      setConfirmPassword("");
      setPassword("");
      setIsPopupVisible(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="font-semibold">Enter New Password</h1>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-2 border-gray-300 p-2 rounded-md w-[40vw]"
        placeholder="Enter New Password"
      />
      <h1 className="font-semibold">Confirm New Password</h1>
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border-2 border-gray-300 p-2 rounded-md w-[40vw]"
        placeholder="Confirm New Password"
      />
      <button
        onClick={handleFormSubmit}
        className="mt-4 w-[20vw] px-6 py-3 bg-red-boss text-white rounded-lg font-medium hover:bg-red-600 transition duration-300"
      >
        Change Password
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-medium">
              Are You Sure You Want to Change Your Password?
            </p>

            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={resetPassword}
                disabled={isLoading}
                className={`mt-4 px-6 py-2 text-white rounded-lg font-medium transition duration-300 w-auto
                ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {isLoading ? "Changing Password..." : "Change Password"}
              </button>
              <button
                onClick={closePopup}
                className="mt-4 px-6 py-2 rounded-lg font-medium border-2 transition duration-300 w-[15vw]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
