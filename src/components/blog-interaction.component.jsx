import { useContext, useEffect } from "react";

import { BlogContext, blogStructure } from "../pages/blog.page";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const BlogInteraction = () => {
  let {
    blog: {
      _id,
      title,
      blog_id,
      activity,
      activity: { total_likes, total_comments },
      author: {
        personal_info: { username: author_username },
      },
    },
    blog,
    setBlog,
    isLikedByUser,
    setIsLikedByUser,
    commentsWrapper,
    setCommentsWrapper,
  } = useContext(BlogContext);

  let {
    userAuth: { username, access_token },
    userAuth,
  } = useContext(UserContext);
  console.log(userAuth);

  useEffect(() => {
    if (access_token) {
      axios
        .get(import.meta.env.VITE_SERVER_DOMAIN + "/isliked-by-user/" + _id, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(({ data: { result } }) => {
          setIsLikedByUser(Boolean(result));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleLike = () => {
    if (access_token) {
      setIsLikedByUser((state) => !state);
      !isLikedByUser ? total_likes++ : total_likes--;
      setBlog({
        ...blog,
        activity: { ...activity, total_likes },
      });

      axios
        .post(
          import.meta.env.VITE_SERVER_DOMAIN + "/like-blog",
          {
            _id,
            isLikedByUser,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then(({ data }) => {})
        .catch((err) => console.log(err));
    } else {
      toast.error("You must login first to like a blog");
    }
  };
  return (
    <>
      <Toaster />
      <hr className="border-grey my-2" />
      <div className="flex gap-6 justify-between">
        <div className="flex gap-3 items-center">
          <button
            onClick={handleLike}
            className={
              "w-10 h-10 rounded-full flex justify-center items-center bg-grey/80 " +
              (isLikedByUser ? "text-red bg-red/20 " : "bg-grey/80")
            }
          >
            <i
              className={"fi fi-" + (isLikedByUser ? "sr" : "rr") + "-heart"}
            ></i>
          </button>
          <p className="text-xl text-dark-grey">{total_likes}</p>

          <button
            onClick={() => setCommentsWrapper((state) => !state)}
            className="w-10 h-10 rounded-full justify-center flex items-center bg-grey/80"
          >
            <i className="fi fi-rr-comment-alt-dots"></i>
          </button>
          <p className="text-xl text-dark-grey">{total_comments}</p>
        </div>
        <div className="flex gap-6 items-center">
          {username == author_username && (
            <Link
              to={"/editor/" + blog_id}
              className="underline hover:text-purple"
            >
              Edit
            </Link>
          )}
          <Link
            to={`http://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}
          >
            <i className="fi fi-brands-twitter text-xl hover:text-twitter"></i>
          </Link>
        </div>
      </div>
      <hr className="border-grey my-2" />
    </>
  );
};
export default BlogInteraction;
