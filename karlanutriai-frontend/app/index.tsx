import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-MediumItalic": require("../assets/fonts/Poppins-MediumItalic.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    async function checkToken() {
      const token = await SecureStore.getItemAsync("userToken");
      setUserToken(token);
      setLoading(false);
    }
    checkToken();
  }, []);

  if (loading) {
    return <FullScreenLoader visible />;
  }

  if (!fontsLoaded) {
    return null;
  }

  // Se o token existir, redireciona para a home, senão para a tela de welcome/login
  return userToken ? <Redirect href="/home" /> : <Redirect href="/welcome" />;
}
