import { Link } from "react-router-dom";
import { getFullDay } from "../common/date";

const AboutUser = ({ bio, social_links, joinedAt, className }) => {
  return (
    <div className={"md:w-[90%] md:mt-7 " + className}>
      <p className="text-xl leading-7">
        {bio.length ? bio : "Nothing to read here"}
      </p>
      <div className="flex gap-x-7 gap-y-2 flex-wrap gap-y-7 my-7 items-center text-dark-grey">
        {Object.keys(social_links).map((key) => {
          let link = social_links[key];
          if (!!link) {
            return (
              <Link key={key} to={link} target="_blank">
                <i
                  className={
                    "fi " +
                    (key !== "website" ? "fi-brands-" + key : "fi-rr-globe") +
                    " text-2xl hover:text-black"
                  }
                ></i>
              </Link>
            );
          } else return "";
        })}
      </div>
      <p className="text-xl leading-7 text-dark-grey">
        Joined on {getFullDay(joinedAt)}
      </p>
    </div>
  );
};

export default AboutUser;
