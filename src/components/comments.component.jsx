import { useContext } from "react";
import { BlogContext } from "../pages/blog.page";
import CommentField from "./comment-field.component";
import axios from "axios";
import NoDataMessage from "./nodata.component";
import AnimationWrapper from "../common/page-animation";
import CommentCard from "./comment-card.component";

export const fetchComments = async ({
  skip = 0,
  blog_id,
  setParentCommentCountFunc,
  comment_array = null,
}) => {
  let res;

  await axios
    .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog-comments", {
      blog_id,
      skip,
    })
    .then(({ data }) => {
      data.map((comment) => {
        comment.childrenLevel = 0;
      });
      setParentCommentCountFunc((state) => state + data.length);
      if (comment_array == null) {
        res = { result: data };
      } else {
        res = { result: [...comment_array, ...data] };
      }
    });

  return res;
};

const CommentContainer = () => {
  let {
    commentsWrapper,
    setCommentsWrapper,
    blog: {
      _id,
      title,
      comments: { result: commentsArr },
      activity: { total_parent_comments },
    },
    blog,
    setBlog,
    totalParentCommentsLoaded,
    setTotalParentCommentsLoaded,
  } = useContext(BlogContext);
  console.log(blog.comments);

  const loadMoreComments = async () => {
    let newCommentArr = await fetchComments({
      skip: totalParentCommentsLoaded,
      blog_id: _id,
      setParentCommentCountFunc: setTotalParentCommentsLoaded,
      comment_array: commentsArr,
    });
    setBlog({ ...blog, comments: newCommentArr });
  };

  return (
    <div
      className={
        "max-sm:w-full fixed duration-700 " +
        (commentsWrapper
          ? "top-0 sm:right-0"
          : "top-[-100%] sm:right-[-100%]") +
        " msx-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden"
      }
    >
      <div className="relative">
        <h1 className="text-xl font-medium">Comments</h1>
        <p className="text-lg mt-2 w-[70%] text-dark-grey line-clamp-1">
          {title}
        </p>
        <button
          onClick={() => setCommentsWrapper(false)}
          className="absolute top-0 right-0 flex justify-center items-center w-12 h-12 rounded-full"
        >
          <i className="fi fi-rr-cross-circle text-2xl mt-1"></i>
        </button>
      </div>
      <hr className="border-grey my-8 w-[120%] -ml-10" />
      <CommentField action={"comment"} />

      {commentsArr && commentsArr.length ? (
        commentsArr.map((comment, i) => {
          return (
            <AnimationWrapper key={i}>
              <CommentCard
                commentData={comment}
                index={i}
                leftVal={comment.childrenLevel * 4}
              />
            </AnimationWrapper>
          );
        })
      ) : (
        <NoDataMessage message={"No comment yet"} />
      )}

      {total_parent_comments > totalParentCommentsLoaded ? (
        <button
          onClick={loadMoreComments}
          className="text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
        >
          Load more
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
export default CommentContainer;
