import { Link } from "react-router-dom";
import { BlogStats } from "./manage-blogcard.component";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { getDay } from "../common/date";
import UserCard from "./usercard.component";

const LikedBlogCard = ({ blog }) => {
  console.log(blog);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);
  let [showStats, setShowStats] = useState(false);

  return (
    <>
      <>
        <div className="flex gap-10 border-b mb-6 max-md:px4 border-grey pb-6 items-center">
          <img
            src={blog?.banner}
            alt=""
            className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover"
          />
          <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
            <div>
              <Link className="blog-title mb-4" to={"/blog/" + blog?.blog_id}>
                {blog?.title}
              </Link>
              <p className="line-clamp-1 mb-4">{blog?.des}</p>
            </div>
            <div className="flex gap-2 items-center">
              <img
                src={blog.author.personal_info?.profile_img}
                className="w-6 h-6 rounded-full"
              />
              <p className="line-clamp-1">
                {blog.author.personal_info?.fullname} @
                {blog.author.personal_info?.username}
              </p>
              <p className="min-w-fit">{getDay(blog?.publishedAt)}</p>
            </div>
            <div className="flex gap-6 mt-3">
              <button
                onClick={() => setShowStats((state) => !state)}
                className="lg:hidden pr-4 py-2 underline"
              >
                Stats
              </button>
            </div>
          </div>
          <div className="max-lg:hidden">
            <BlogStats stats={blog?.activity} />
          </div>
        </div>
        {showStats ? (
          <div className="lg:hidden">
            <BlogStats stats={blog?.activity} />
          </div>
        ) : (
          ""
        )}
      </>
    </>
  );
};

export default LikedBlogCard;
