import {useEffect} from "react";
import {useParams, Outlet, Link, useLocation} from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";

const QuoteDetails = () => {
  const param = useParams();
  const location = useLocation();
  const {quotesId} = param;
  const {
    sendRequest,
    data: quote,
    error,
    status,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quotesId);
  }, [quotesId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!quote.text) {
    return <h2 className="centered">no quote found!</h2>;
  }

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      {location.pathname === `/quotes/${param.quotesId}` && (
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${param.quotesId}/comments`}>
            Load Comments
          </Link>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default QuoteDetails;
