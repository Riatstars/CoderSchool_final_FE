import axios from "axios";

const filterPaginationData = async ({
  create_new_arr = false,
  state,
  data,
  page,
  countRoute,
  data_to_send = {},
  user = undefined,
}) => {
  let obj;

  let headers = {};

  if (user) {
    headers.headers = { Authorization: "Bearer " + user };
  }

  if (state !== null && !create_new_arr) {
    obj = { ...state, results: [...state?.results, ...data], page: page };
  } else {
    let dataKeys = Object.keys(data_to_send);
    await axios
      .get(
        import.meta.env.VITE_SERVER_DOMAIN +
          countRoute +
          "?" +
          dataKeys.reduce((accummulator, key) => {
            return accummulator + key + "=" + data_to_send[key] + "&";
          }, ""),
        headers
      )
      .then(({ data: { totalDocs } }) => {
        obj = { results: data, page, totalDocs };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return obj;
};

export default filterPaginationData;
