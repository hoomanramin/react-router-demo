import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import {addQuote} from "../lib/api";

const NewQuate = () => {
  const {sendRequest, status} = useHttp(addQuote);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "complates") {
      navigate("/quotes", {replace: false});
    }
  }, [status]);

  const addQuoteHandler = quoteData => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuate;
