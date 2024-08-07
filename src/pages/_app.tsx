import { SWRConfig, SWRConfiguration } from "swr";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";
import { APIError } from "@/apiClient";
import { Toaster, useToast } from "@/components/toaster";
import { useLoad } from "@/features/authentication";
import { font } from "@/styles/font";

export default function App({ Component, pageProps }: AppProps) {
  useLoad();

  const { toast } = useToast();

  const swrConfig: SWRConfiguration = {
    dedupingInterval: 500,
    shouldRetryOnError: false,
    onError: (e: APIError) => {
      if (e.response) {
        e.response.data.errors.forEach((e) =>
          toast({
            variant: "destructive",
            title: e.title,
            description: e.detail || "",
          })
        );
      }
    },
  };

  return (
    <SWRConfig value={swrConfig}>
      <div className={font.className}>
        <Component {...pageProps} />
        <Toaster />
        <Analytics mode="production" />
      </div>
    </SWRConfig>
  );
}
