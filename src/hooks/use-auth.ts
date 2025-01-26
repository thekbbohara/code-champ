"use client";

import useAuthStore from "@/app/auth/_store";
import { getUserData } from "@/app/auth/_store/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useAuth = () => {
  const { data, status } = useSession();
  const { user, setUser, authStatus, setAuthStatus } = useAuthStore();

  useEffect(() => {
    // Check if the session is loading or if the user is already set
    if (status === "loading" || user) return;
    if (status === "unauthenticated") {
      setAuthStatus("unauthenticated");
    }

    const fetchUserData = async () => {
      if (data?.user.username) {
        setAuthStatus("authenticated");
        try {
          const { data: response } = await getUserData({
            username: data.user.username,
          });
          setUser(response);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [status, data, user, setUser, authStatus, setAuthStatus]);

  return { status: authStatus, user };
};
