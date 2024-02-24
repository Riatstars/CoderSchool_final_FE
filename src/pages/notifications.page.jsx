import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App.jsx";
import filterPaginationData from "../common/filter-pagination-data";
import Loader from "../components/loader.component.jsx";
import NotificationCard from "../components/notification-card.component.jsx";
import AnimationWrapper from "../common/page-animation.jsx";
import NoDataMessage from "../components/nodata.component.jsx";
import LoadMoreDataBtn from "../components/load-more.component.jsx";
import FollowNotiCard from "../components/follow-noti-card.component.jsx";

const Notification = () => {
  const [filter, setFilter] = useState("all");
  let filters = ["all", "like", "comment", "reply"];
  let {
    userAuth: { access_token, new_notification_available },
    userAuth,
    setUserAuth,
  } = useContext(UserContext);
  const [notifications, setNotifications] = useState(null);

  const fetchNotifications = ({ page, deletedDocCount = 0 }) => {
    let data_to_send = {
      page,
      filter,
      deletedDocCount,
    };
    let dataKeys = Object.keys(data_to_send);
    axios
      .get(
        import.meta.env.VITE_SERVER_DOMAIN +
          "/notifications" +
          "?" +
          dataKeys.reduce((accummulator, key) => {
            return accummulator + key + "=" + data_to_send[key] + "&";
          }, ""),
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      )
      .then(async ({ data: { notifications: data } }) => {
        if (new_notification_available) {
          setUserAuth({ ...userAuth, new_notification_available: false });
        }
        let formatedData = await filterPaginationData({
          state: notifications,
          data,
          page,
          countRoute: "/all-notifications-count",
          data_to_send: { filter },
          user: access_token,
        });

        setNotifications(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (access_token) {
      fetchNotifications({ page: 1 });
    }
  }, [access_token, filter]);

  const handleFilter = (e) => {
    let btn = e.target;
    setFilter(btn.innerHTML);
    setNotifications(null);
  };

  return (
    <>
      <div>
        <h1 className="max-md:hidden">Recent Notifications</h1>
        <div className="my-8 flex gap-6">
          {filters.map((filterName, i) => {
            return (
              <button
                key={i}
                onClick={handleFilter}
                className={
                  "py-2 " + (filter === filterName ? "btn-dark" : "btn-light")
                }
              >
                {filterName}
              </button>
            );
          })}
        </div>
        {notifications == null ? (
          <Loader />
        ) : (
          <>
            {notifications?.results?.length ? (
              notifications?.results?.map((notification, i) => {
                return (
                  <AnimationWrapper key={i} transition={{ delay: i * 0.08 }}>
                    {notification.blog ? (
                      <NotificationCard
                        data={notification}
                        index={i}
                        notificationState={{ notifications, setNotifications }}
                      />
                    ) : (
                      <FollowNotiCard
                        data={notification}
                        index={i}
                        notificationState={{ notifications, setNotifications }}
                      />
                    )}
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataMessage message={"No notification to display!"} />
            )}
            <LoadMoreDataBtn
              state={notifications}
              additionalParam={{
                deletedDocCount: notifications.deletedDocCount,
              }}
              fetchDataFunction={fetchNotifications}
            />
          </>
        )}
      </div>
    </>
  );
};
export default Notification;
