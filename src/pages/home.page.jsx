import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useContext, useEffect, useState } from "react";
import BlogPostCard from "../components/blog-post.component";
import Loader from "../components/loader.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import { activeTabRef } from "../components/inpage-navigation.component";
import NoDataMessage from "../components/nodata.component";
import filterPaginationData from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";
import { UserContext } from "../App";

const HomePage = () => {
  let [blogs, setBlogs] = useState(null);
  let [trendingBlogs, setTrendingBlogs] = useState(null);
  let [pageState, setPageState] = useState("home");

  let categories = [
    "programming",
    "hollywood",
    "film making",
    "game",
    "game programming",
    "teck",
    "123",
  ];

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const fetchLatestBlogs = ({ page = 1 }) => {
    console.log(access_token);
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN +
          "/latest-blogs" +
          (access_token ? "-with-auth" : ""),
        { page },
        access_token
          ? { headers: { Authorization: "Bearer " + access_token } }
          : {}
      )
      .then(async ({ data }) => {
        // setBlogs(data.blogs);
        let formatedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/all-latest-blogs-count",
        });
        setBlogs(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBlogsByCategory = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        tag: pageState,
        page,
      })
      .then(async ({ data }) => {
        let formatedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { tag: pageState },
        });
        setBlogs(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBlogsByCategory = (e) => {
    let category = e.target.innerText.toLowerCase();
    setBlogs(null);
    if (pageState == category) {
      setPageState("home");
      return;
    }
    setPageState(category);
  };

  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    activeTabRef.current.click();
    if (pageState == "home") {
      setBlogs(null);
      fetchLatestBlogs({ page: 1 });
    } else {
      setBlogs(null);
      fetchBlogsByCategory({ page: 1 });
    }
    if (!trendingBlogs) {
      fetchTrendingBlogs();
    }
  }, [pageState, access_token]);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10 ">
        {/* {latest Blogs} */}
        <div className="w-full  ">
          <InPageNavigation
            routes={[pageState, "trending blogs"]}
            defaultHidden={["trending blogs"]}
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
              <LoadMoreDataBtn
                state={blogs}
                fetchDataFunction={
                  pageState == "home" ? fetchLatestBlogs : fetchBlogsByCategory
                }
              />
            </>
            {trendingBlogs == null ? (
              <Loader />
            ) : trendingBlogs.length ? (
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}
                  >
                    <MinimalBlogPost blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataMessage message={"Not found 404"} />
            )}
            :
          </InPageNavigation>
        </div>

        {/* {filter and trending blogs} */}
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">
                Stories from all interest
              </h1>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => {
                  return (
                    <button
                      onClick={loadBlogsByCategory}
                      className={
                        "tag " +
                        (pageState == category ? "bg-black text-white" : "")
                      }
                      key={i}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h1 className="font-medium text-xl mb-8">
                <i className="fi fi-br-chart-line-up"></i> Trending{" "}
              </h1>
              {trendingBlogs == null ? (
                <Loader />
              ) : trendingBlogs.length ? (
                trendingBlogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <MinimalBlogPost blog={blog} index={i} />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message={"Not found 404"} />
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
