import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { UserContext } from "../App";
import AboutUser from "../components/about.component";
import filterPaginationData from "../common/filter-pagination-data";
import InPageNavigation from "../components/inpage-navigation.component";
import BlogPostCard from "../components/blog-post.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import PageNotFound from "./404.page";

export const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    bio: "",
  },
  account_info: {
    total_posts: 0,
    total_reads: 0,
  },
  social_links: {},
  joinedAt: "",
};

const ProfilePage = () => {
  const { id: profileId } = useParams();
  let {
    userAuth: { username, access_token },
  } = useContext(UserContext);

  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState("");
  const [follow, setFollow] = useState(null);
  const [followings, setFollowings] = useState(0);
  const [followers, setFollowers] = useState(0);

  let {
    personal_info: { username: profile_username, fullname, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt,
  } = profile;

  const fetchUserProfile = (profileId) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {
        username: profileId,
      })
      .then(({ data: user }) => {
        if (user !== null) {
          setProfile(user);
        }
        setProfileLoaded(profileId);
        getBlogs({ user_id: user._id });
        fetchFollowingsInfo({ user_id: user._id });
        fetchFollowersInfo({ user_id: user._id });
        setLoading(false);
      })
      .catch((err) => {
        setProfile({
          ...profile,
          personal_info: { ...profile.personal_info, username: null },
        });
        console.log(err);
        setLoading(false);
      });
  };

  const getBlogs = ({ page = 1, user_id }) => {
    user_id = user_id == undefined ? blogs.user_id : user_id;

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        author: user_id,
        page,
      })
      .then(async ({ data }) => {
        let formatedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { author: user_id },
        });
        formatedData.user_id = user_id;
        setBlogs(formatedData);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchFollow = ({ target }) => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/check-follow",
        {
          target,
        },
        { headers: { Authorization: "Bearer " + access_token } }
      )
      .then(({ data }) => {
        setFollow(data.status);
      })
      .catch((err) => console.log(err));
  };

  const updateFollow = (status) => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/update-follow",
        {
          target: profile._id,
          status,
        },
        { headers: { Authorization: "Bearer " + access_token } }
      )
      .then(({ data }) => {
        setFollow(data.status);
      })
      .catch((err) => console.log(err));
  };
  const fetchFollowingsInfo = ({ user_id }) => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/all-followings-count",
        {
          user_id,
        },
        { headers: { Authorization: "Bearer " + access_token } }
      )
      .then(({ data }) => {
        setFollowings(data.totalDocs);
      })
      .catch((err) => console.log(err));
  };
  const fetchFollowersInfo = ({ user_id }) => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/all-followers-count",
        {
          user_id,
        },
        { headers: { Authorization: "Bearer " + access_token } }
      )
      .then(({ data }) => {
        setFollowers(data.totalDocs);
      })
      .catch((err) => console.log(err));
  };

  const handleFollowClick = (action) => {
    if (action == "follow") {
      updateFollow(true);
    } else {
      updateFollow(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (profileId !== profileLoaded) {
      setBlogs(null);
    }
    if (profileId !== username && access_token) {
      fetchFollow({ target: profileId });
    }
    if (blogs == null) {
      resetState();
      fetchUserProfile(profileId);
    }
    setLoading(false);
  }, [profileId, blogs, follow]);

  const resetState = () => {
    setProfile(profileDataStructure);
    setLoading(true);
    setProfileLoaded("");
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : profile_username !== null ? (
        <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
          <div className="flex flex-col gap-5 max-md:items-center min-w-[250px] md:pl-8 md:border-l border-grey md:sticky md:top-[100px] md:py-10">
            <img
              src={profile_img}
              className="w-48 h-48 bg-grey rounded-full md:w-32 md:h-32"
              alt=""
            />
            <h1 className="text-2xl font-medium">@{profile_username} </h1>
            <p className="text-xl capitalize h-6">{fullname}</p>
            {profile_username == username || !access_token ? (
              ""
            ) : follow == null ? (
              <Loader />
            ) : follow ? (
              <button
                onClick={() => handleFollowClick("unfollow")}
                className="btn-light"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => handleFollowClick("follow")}
                className="btn-dark"
              >
                Follow
              </button>
            )}

            <p>
              {total_posts.toLocaleString()} Blogs -{" "}
              {total_reads.toLocaleString()} Reads
            </p>
            <p>
              {followings.toLocaleString()} Followings -{" "}
              {followers.toLocaleString()} Followers
            </p>

            <div className="flex gap-4 mt-2">
              {profileId == username && (
                <Link
                  to="/settings/edit-profile"
                  className="btn-light rounded-md"
                >
                  Edit profile
                </Link>
              )}
            </div>

            <AboutUser
              className="max-md:hidden"
              bio={bio}
              social_links={social_links}
              joinedAt={joinedAt}
            />
          </div>
          <div className="max-md:mt-12 w-full">
            <InPageNavigation
              routes={["Blog Published", "About"]}
              defaultHidden={["About"]}
            >
              <>
                {blogs === null ? (
                  <Loader />
                ) : blogs.results.length ? (
                  blogs.results.map((blog, i) => {
                    return (
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                        key={i}
                      >
                        <BlogPostCard
                          content={blog}
                          author={blog.author.personal_info}
                        ></BlogPostCard>
                      </AnimationWrapper>
                    );
                  })
                ) : (
                  <NoDataMessage message={"Not found 404"} />
                )}
                <LoadMoreDataBtn state={blogs} fetchDataFunction={getBlogs} />
              </>
              <AboutUser
                bio={bio}
                social_links={social_links}
                joinedAt={joinedAt}
              />
            </InPageNavigation>
          </div>
        </section>
      ) : (
        <PageNotFound />
      )}
    </AnimationWrapper>
  );
};

export default ProfilePage;
