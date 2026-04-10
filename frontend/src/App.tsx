import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
  );
};

export default App;
