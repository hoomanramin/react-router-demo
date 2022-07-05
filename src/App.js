import {Route, Routes, Navigate} from "react-router-dom";
import Comments from "./components/comments/Comments";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import NewQuate from "./pages/NewQuate";
import NotFound from "./pages/NotFound";
import QuoteDetails from "./pages/QuoteDetails";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={"/quotes"} />} />
        <Route path="/quotes" element={<AllQuotes />} />
        <Route path="/quotes/:quotesId" element={<QuoteDetails />}>
          <Route path="comments" element={<Comments />} />
        </Route>
        <Route path="/new-quote" element={<NewQuate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
