import React, { useEffect, useContext } from "react";

import { Context as AuthContext } from "../../context/AuthContext";
export default function TryToLogin({ children }) {
  const { state, getToken } = useContext(AuthContext);

  useEffect(() => {
    getToken();
  }, []);

  console.log("try to get token");
  if (state.isLoading) {
    return (
      <div>
        <h1>Loading...</h1>{" "}
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
