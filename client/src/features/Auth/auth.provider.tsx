import React, { useState } from "react";
import authContext, { AuthProp } from "./auth.context";

type Prop = {
  children: React.ReactNode | React.ReactNode[];
};

function AuthProvider({ children }: Prop) {
  const [credentials, setCredentials] = useState<AuthProp["credentials"]>();

  return (
    <authContext.Provider value={{ credentials, setCredentials }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
