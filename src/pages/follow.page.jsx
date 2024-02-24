import { Toaster } from "react-hot-toast";
import InPageNavigation from "../components/inpage-navigation.component";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import Loader from "../components/loader.component";
import NoDataMessage from "../components/nodata.component";
import filterPaginationData from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";
import UserCard from "../components/usercard.component";

const FollowPage = () => {
  const [followings, setFollowings] = useState(null);
  const [followers, setFollowers] = useState(null);

  let {
    userAuth: { access_token, _id },
  } = useContext(UserContext);

  const getFollowInfo = ({ type, page }) => {
    axios
      .get(
        import.meta.env.VITE_SERVER_DOMAIN + "/get-" + type + "?page=" + page,
        { headers: { Authorization: "Bearer " + access_token } }
      )
      .then(async ({ data }) => {
        const formatedData = await filterPaginationData({
          state: type == "followings" ? followings : followers,
          data: type == "followings" ? data.followings : data.followers,
          page,
          user: access_token,
          countRoute: "/all-" + type + "-count/" + _id,
          data_to_send: {},
        });
        if (type == "followings") {
          setFollowings(formatedData);
        } else {
          setFollowers(formatedData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (access_token) {
      if (followings == null) {
        getFollowInfo({ page: 1, type: "followings" });
      }
      if (followers == null) {
        getFollowInfo({ page: 1, type: "followers" });
      }
    }
  }, [access_token, followers, followings]);

  return (
    <>
      <Toaster />
      <InPageNavigation routes={["followings", "followers"]}>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3">
          {followings == null ? (
            <Loader />
          ) : followings?.results?.length ? (
            followings?.results.map((following, i) => {
              return <UserCard key={i} user={following.target_user} />;
            })
          ) : (
            <NoDataMessage message={"Nothing to show here"} />
          )}
          <LoadMoreDataBtn
            state={followings}
            fetchDataFunction={getFollowInfo}
            additionalParam={{ type: "followings" }}
          />
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3">
          {followers == null ? (
            <Loader />
          ) : followers?.results?.length ? (
            followers?.results.map((follower, i) => {
              return <UserCard key={i} user={follower.author} />;
            })
          ) : (
            <NoDataMessage message={"Nothing to show here"} />
          )}
          <LoadMoreDataBtn
            state={followers}
            fetchDataFunction={getFollowInfo}
            additionalParam={{ type: "followers" }}
          />
        </div>
      </InPageNavigation>
    </>
  );
};

export default FollowPage;
