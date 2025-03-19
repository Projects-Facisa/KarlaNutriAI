import { Redirect } from "expo-router";
import * as Font from "expo-font";
import { useState, useEffect } from "react";

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

  if (!fontsLoaded) {
    return null;
  }

  return <Redirect href="/welcome" />;
}
