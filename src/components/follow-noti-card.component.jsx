import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const FollowNotiCard = ({ data }) => {
  let {
    seen,
    createdAt,
    user: {
      personal_info: { profile_img, username, fullname },
    },
  } = data;

  return (
    <>
      <div
        className={
          "p-6 border-b border-grey border-l-black " +
          (!seen ? "border-l-2" : "")
        }
      >
        <div className="flex gap-5 mb-3">
          <img
            className="w-14 h-14 flex-none rounded-full"
            src={profile_img}
            alt=""
          />
          <div className="w-full">
            <h1 className="font-medium text-xl text-dark-grey">
              <span className="lg:inline-block hidden capitalize">
                {fullname}
              </span>
              <Link
                className="mx-1 text-black underline"
                to={"/user/" + username}
              >
                @{username}
              </Link>
              <span className="font-normal">follows you</span>
            </h1>
          </div>
        </div>

        <div className="ml-4 pl-5 mt-3 text-dark-grey flex gap-8">
          <p>{getDay(createdAt)}</p>
        </div>
      </div>
    </>
  );
};

export default FollowNotiCard;
