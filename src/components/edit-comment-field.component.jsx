import { useContext, useState } from "react";
import { UserContext } from "../App";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { BlogContext } from "../pages/blog.page";

const EditCommentField = ({
  commentData,
  action,
  setIsEditting,
  setComment: setCommentContent,
}) => {
  let {
    userAuth: { access_token },
  } = useContext(UserContext);
  const [comment, setComment] = useState(commentData.comment);

  const handleEditComment = () => {
    if (!access_token) {
      return toast.error("Log in first to edit a comment");
    }
    if (!comment.length) {
      return toast.error("Write something to change comment");
    }

    axios
      .put(
        import.meta.env.VITE_SERVER_DOMAIN + "/edit-comment",
        {
          _id: commentData._id,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        toast.success("Your comment has been changed");
        setCommentContent(data.comment);
        setComment(data.comment);
        setIsEditting(false);
      })

      .catch((err) => {
        return toast.error(err.response.data.error);
      });
  };

  return (
    <>
      <Toaster />
      <textarea
        value={comment}
        placeholder="Edit comment..."
        onChange={(e) => setComment(e.target.value)}
        className="input-box pl-5 placeholder:text-dark-grey resize-one h-[150px] overflow-auto"
      ></textarea>
      <button onClick={handleEditComment} className="btn-dark mt-5 px-10">
        {action}
      </button>
    </>
  );
};

export default EditCommentField;
