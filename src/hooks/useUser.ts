import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import type { User } from "@supabase/supabase-js";

export type UserWithRole = User & {
  user_metadata: {
    role?: string;
  };
};

export function useUser() {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user as UserWithRole);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as UserWithRole || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
} 