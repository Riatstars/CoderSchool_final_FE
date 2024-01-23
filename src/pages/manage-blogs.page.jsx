import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import filterPaginationData from "../common/filter-pagination-data";
import { Toaster, toast } from "react-hot-toast";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import NoDataMessage from "../components/nodata.component";
import AnimationWrapper from "../common/page-animation";
import {
  ManagePublishBlogsCard,
  ManageDraftsBlogCard,
} from "../components/manage-blogcard.component";
import LoadMoreDataBtn from "../components/load-more.component";
import { useSearchParams } from "react-router-dom";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [drafts, setDrafts] = useState(null);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("publish");
  const searchParam = useSearchParams()[0];

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const getBlogs = ({ page, draft, deletedDocCount }) => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/user-written-blogs",
        {
          page,
          draft,
          query,
          deletedDocCount,
        },
        { headers: { Authorization: "Bearer " + access_token } }
      )
      .then(async ({ data }) => {
        const formatedData = await filterPaginationData({
          state: draft ? drafts : blogs,
          data: data.blogs,
          page,
          user: access_token,
          countRoute: "/user-written-blogs-count",
          data_to_send: { draft, query },
        });

        if (draft) {
          setDrafts(formatedData);
        } else {
          setBlogs(formatedData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    let searchQuery = e.target.value;

    if (e.keyCode == 13 && searchQuery.length) {
      setQuery(searchQuery);
      setBlogs(null);
      setDrafts(null);
    }
  };
  const handleChange = (e) => {
    if (!e.target.value.length) {
      setQuery("");
      setBlogs(null);
      setDrafts(null);
    }
  };

  useEffect(() => {
    setActiveTab(searchParam.get("tab"));

    if (access_token) {
      if (blogs == null) {
        getBlogs({ page: 1, draft: false });
      }
      if (drafts == null) {
        getBlogs({ page: 1, draft: true });
      }
    }
  }, [access_token, blogs, drafts]);

  return (
    <>
      <h1 className="max-md:hidden ">Manage Blogs</h1>
      <Toaster />
      <div className="relative max-md:mt-5 md:mt-8 mb-10">
        <input
          onChange={handleChange}
          onKeyDown={handleSearch}
          type="search"
          className="w-full bg-grey p-4 pl-12 pr-6 rounded-full placeholder:text-dark-grey"
          placeholder="Search blogs"
        />
        <i className="fi fi-rr-search-alt absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>
      <InPageNavigation
        routes={["Published Blogs", "Drafts"]}
        defaulActiveIndex={activeTab == "draft" ? 1 : 0}
      >
        <div>
          {blogs == null ? (
            <Loader />
          ) : (
            <>
              {blogs.results.length ? (
                blogs.results.map((blog, i) => {
                  return (
                    <AnimationWrapper key={i} transition={{ delay: i * 0.04 }}>
                      <ManagePublishBlogsCard
                        blog={{
                          ...blog,
                          index: i,
                          setStateFunc: setBlogs,
                        }}
                      />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message={"Nothing to show here!"} />
              )}
              <LoadMoreDataBtn
                state={blogs}
                fetchDataFunction={getBlogs}
                additionalParam={{
                  draft: false,
                  deletedDocCount: blogs.deletedDocCount,
                }}
              />
            </>
          )}
        </div>
        <div>
          {drafts == null ? (
            <Loader />
          ) : (
            <>
              {drafts.results.length ? (
                drafts.results.map((draft, i) => {
                  return (
                    <AnimationWrapper key={i} transition={{ delay: i * 0.04 }}>
                      <ManageDraftsBlogCard
                        blog={{
                          ...draft,
                          index: i,
                          setStateFunc: setDrafts,
                        }}
                      />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message={"Nothing to show here!"} />
              )}
              <LoadMoreDataBtn
                state={drafts}
                fetchDataFunction={getBlogs}
                additionalParam={{
                  draft: true,
                  deletedDocCount: blogs.deletedDocCount,
                }}
              />
            </>
          )}
        </div>
      </InPageNavigation>
    </>
  );
};
export default ManageBlogs;
