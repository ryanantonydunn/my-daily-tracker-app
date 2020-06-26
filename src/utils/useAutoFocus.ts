import { useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

// auto focus inputs including when navigating back
const useAutoFocus = () => {
  const focusRef = useRef<any>();
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      focusRef.current.focus();
    });
    return unsubscribe;
  }, [navigation]);
  return focusRef;
};

export default useAutoFocus;
