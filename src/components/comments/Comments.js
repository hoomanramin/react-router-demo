import {useCallback, useEffect, useState} from "react";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import {useParams} from "react-router-dom";
import useHttp from "../../hooks/use-http";
import {getAllComments} from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const param = useParams();
  const {quotesId} = param;
  const {sendRequest, status, data: loadedComments} = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quotesId);
  }, [quotesId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const onAddHandler = useCallback(() => {
    sendRequest(quotesId);
  }, [sendRequest, quotesId]);

  let comment = "";

  if (status === "pending") {
    comment = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && (loadedComments || loadedComments.length > 0)) {
    comment = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comment = <p className="centered">No comments were added yet!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm onAddComment={onAddHandler} quoteId={param.quotesId} />
      )}
      {comment}
    </section>
  );
};

export default Comments;
