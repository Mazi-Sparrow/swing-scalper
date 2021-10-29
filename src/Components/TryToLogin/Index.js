import React, { useEffect, useContext } from "react";

import { Context as AuthContext } from "../../context/AuthContext";
export default function TryToLogin({ children }) {
  const { state, tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  if (state.isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
