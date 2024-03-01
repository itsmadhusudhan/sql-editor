import { Suspense } from "react";

import Layout from "@/modules/editor";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout />
    </Suspense>
  );
}

export default App;
