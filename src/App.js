import React, {Suspense} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Comments from "./components/comments/Comments";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
// import AllQuotes from "./pages/AllQuotes";
// import NewQuate from "./pages/NewQuate";
import NotFound from "./pages/NotFound";
import QuoteDetails from "./pages/QuoteDetails";
const NewQuate = React.lazy(() => import("./pages/NewQuate"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to={"/quotes"} />} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/quotes/:quotesId" element={<QuoteDetails />}>
            <Route path="comments" element={<Comments />} />
          </Route>
          <Route path="/new-quote" element={<NewQuate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
