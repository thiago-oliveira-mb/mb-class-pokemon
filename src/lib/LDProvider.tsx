"use client";

import { asyncWithLDProvider, LDProvider } from "launchdarkly-react-client-sdk";
import { useEffect, useState } from "react";

interface AsyncLDProviderProps {
  children: React.ReactNode;
}

let hydrating = true;

const LDDynaProvider = ({ children }: AsyncLDProviderProps) => {
  const [LDProviderComponent, setLDProviderComponent] =
    useState<React.ComponentType<{ children: React.ReactNode }> | null>(null);

  useEffect(() => {
    if (hydrating) {
      (async () => {
        const LDProviderComponent = await asyncWithLDProvider({
          clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_ID || "",
          reactOptions: {
            useCamelCaseFlagKeys: false,
          },
          context: {
            kind: "user",
            key: "0001",
            name: "Thiago Oliveira",
            plan: "premium",
          },
        });
        setLDProviderComponent(() => LDProviderComponent);
        hydrating = false;
      })();
    }
  }, []);

  if (LDProviderComponent) {
    return <LDProviderComponent>{children}</LDProviderComponent>;
  }

  return <>{children}</>;
};

export default LDDynaProvider;
