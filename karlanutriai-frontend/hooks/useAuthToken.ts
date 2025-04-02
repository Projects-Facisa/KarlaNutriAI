import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export function useAuthToken() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      const token = await SecureStore.getItemAsync("userToken");
      setUserToken(token);
      setLoading(false);
    }
    checkToken();
  }, []);

  return { userToken, loading };
}

export default useAuthToken;
