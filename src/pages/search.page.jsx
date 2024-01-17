import { useParams } from "react-router-dom";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import BlogPostCard from "../components/blog-post.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import { useEffect, useState } from "react";
import filterPaginationData from "../common/filter-pagination-data";
import axios from "axios";
import UserCard from "../components/usercard.component";

const SearchPage = () => {
  const { query } = useParams();
  let [blogs, setBlogs] = useState(null);
  let [users, setUsers] = useState(null);
  console.log(users);

  const searchBlogs = ({ page = 1, create_new_arr = false }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        query,
        page,
      })
      .then(async ({ data }) => {
        // setBlogs(data.blogs);
        let formatedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { query },
          create_new_arr,
        });
        setBlogs(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsers = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-users", { query })
      .then(({ data: { users } }) => {
        setUsers(users);
      });
  };
  useEffect(() => {
    resetState();
    searchBlogs({ page: 1, create_new_arr: true });
    fetchUsers();
  }, [query]);

  const resetState = () => {
    setBlogs(null);
    setUsers(null);
  };

  const UserCardWrapper = () => {
    return (
      <>
        {users == null ? (
          <Loader />
        ) : users.length ? (
          users.map((user, i) => {
            return (
              <AnimationWrapper
                key={i}
                transition={{ duration: 1, delay: i * 0.08 }}
              >
                <UserCard user={user} />;
              </AnimationWrapper>
            );
          })
        ) : (
          <NoDataMessage message={"No user found!"} />
        )}
      </>
    );
  };

  return (
    <>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <InPageNavigation
            routes={[`Search results for "${query}"`, "Accounts Matched"]}
            defaultHidden={["Accounts Matched"]}
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
              <LoadMoreDataBtn state={blogs} fetchDataFunction={searchBlogs} />
            </>
            <UserCardWrapper />
          </InPageNavigation>
        </div>
        <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <h1 className="font-medium text-xl mb-8">
            <i className="fi fi-rr-portrait mt-1 mr-2"></i>
            User related to search
          </h1>
          <UserCardWrapper />
        </div>
      </section>
    </>
  );
};

export default SearchPage;
