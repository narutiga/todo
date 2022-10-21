import "src/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import type { CustomAppPage } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueriesObserver, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { supabase } from "src/lib/util/supabase";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: CustomAppPage = ({ Component, pageProps }) => {
  const { push, pathname } = useRouter();
  const validateSession = async () => {
    const user = supabase.auth.user();
    if (user && pathname === "/") {
      push("/dashboard");
    } else if (!user && pathname !== "/") {
      await push("/");
    }
  };
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === "SIGNED_IN" && pathname === "/") {
      push("/dashboard");
    }
    if (event === "SIGNED_OUT") {
      push("/");
    }
  });
  useEffect(() => {
    validateSession();
  }, []);

  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
