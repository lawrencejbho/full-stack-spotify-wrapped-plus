import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./index.css";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {!code ? <Login /> : <Dashboard code={code} />}
      </QueryClientProvider>
    </>
  );
}

export default App;
