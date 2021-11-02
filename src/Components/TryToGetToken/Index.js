import React, { useEffect, useContext } from "react";

import { Context as AuthContext } from "../../context/AuthContext";
export default function TryToLogin({ children }) {
  const { state, getToken } = useContext(AuthContext);

  useEffect(() => {
    getToken();
  }, []);

  return <>{children}</>;
}
