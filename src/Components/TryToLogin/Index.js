import React, { useEffect, useContext } from "react";

import { Context as AuthContext } from "../../context/AuthContext";
export default function TryToLogin({ children }) {
  const { state, tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return <>{children}</>;
}
