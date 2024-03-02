import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

import Results from "./Results";
import Sidebar from "./Sidebar";
import Header from "./components/Header";

const QueryEditor = lazy(() => import("./QueryEditor"));

const Layout = () => {
  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="grid md:grid-cols-[16rem_1fr] flex-1 max-h-[calc(100%-300px)]">
        <Sidebar />
        <div className="h-full overflow-hidden">
          <Header />
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            }
          >
            <QueryEditor />
          </Suspense>
        </div>
      </div>
      <Results />
    </div>
  );
};

export default Layout;
