import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import FullScreenLoader from "@/components/FullScreenLoader";
import useAuthToken from "../hooks/useAuthToken";

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-MediumItalic": require("../assets/fonts/Poppins-MediumItalic.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const { userToken, loading } = useAuthToken();

  if (loading) {
    return <FullScreenLoader visible />;
  }

  if (!fontsLoaded) {
    return null;
  }

  // Se o token existir, redireciona para a home, senão para a tela de welcome/login
  return userToken ? <Redirect href="/home" /> : <Redirect href="/welcome" />;
}
