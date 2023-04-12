import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import Login from "./pages/Login";
import Layout from "./pages/Layout";
import "./index.css";
import * as dotenv from "dotenv";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {!code ? <Login /> : <Layout code={code} />}
      </QueryClientProvider>
    </>
  );
}

export default App;
