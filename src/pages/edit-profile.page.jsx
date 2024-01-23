import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../App";
import axios, { Axios } from "axios";
import { profileDataStructure } from "./profile.page";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { Toaster, toast } from "react-hot-toast";
import InputBox from "../components/input.component";
import { uploadImage } from "../common/aws";
import { storeInSession } from "../common/session";

const EditProfile = () => {
  let {
    userAuth,
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);
  let bioLimit = 150;
  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [charactersLeft, setCharactersLeft] = useState(bioLimit);
  const [updatedProfileImg, setUpdatedProfileImg] = useState(null);

  let profileImgEle = useRef();
  let updateProfileForm = useRef();
  let {
    personal_info: {
      username: profile_username,
      fullname,
      profile_img,
      email,
      bio,
    },
    social_links,
  } = profile;

  useEffect(() => {
    if (access_token) {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {
          username: userAuth.username,
        })
        .then(({ data }) => {
          setProfile(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [access_token]);

  const handleCharacterChange = (e) => {
    setCharactersLeft(bioLimit - e.target.value.length);
    if (charactersLeft == 0) {
      return;
    }
  };
  const handleImagePreview = (e) => {
    let img = e.target.files[0];
    profileImgEle.current.src = URL.createObjectURL(img);
    setUpdatedProfileImg(img);
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    let loadingToast = toast.loading("Uploading...");
    if (updatedProfileImg) {
      e.target.setAttribute("disable", true);
      uploadImage(updatedProfileImg)
        .then((url) => {
          if (url) {
            axios
              .post(
                import.meta.env.VITE_SERVER_DOMAIN + "/update-profile-img",
                {
                  url,
                },
                {
                  headers: { Authorization: "Bearer " + access_token },
                }
              )
              .then(({ data }) => {
                let newUserAuth = {
                  ...userAuth,
                  profile_img: data.profile_img,
                };
                storeInSession("user", JSON.stringify(newUserAuth));
                setUserAuth(newUserAuth);
                setUpdatedProfileImg(null);
                toast.success("Uploaded!");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    toast.dismiss(loadingToast);
    e.target.removeAttribute("disabled");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(updateProfileForm.current);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    let {
      username,
      bio,
      youtube,
      facebook,
      twitter,
      github,
      instagram,
      website,
    } = formData;
    if (username.length < 3) {
      return toast.error("Username must be longer than 3");
    }
    let loadingToast = toast.loading("Updating");
    e.target.setAttribute("disabled", true);
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/update-profile",
        {
          username,
          bio,
          social_links: {
            youtube,
            facebook,
            twitter,
            instagram,
            github,
            website,
          },
        },
        {
          headers: { Authorization: "Bearer " + access_token },
        }
      )
      .then(({ data }) => {
        if (userAuth.username !== data.username) {
          let newUserAuth = { ...userAuth, username: data.username };
          storeInSession("user", JSON.stringify(newUserAuth));
          setUserAuth(newUserAuth);
          toast.success("Profile updated");
        }
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
        console.log(response);
      });
    toast.dismiss(loadingToast);
    e.target.removeAttribute("disabled");
  };

  return (
    <>
      <AnimationWrapper>
        {loading ? (
          <Loader />
        ) : (
          <form ref={updateProfileForm}>
            <Toaster />
            <h1 className="max-md:hidden">Edit Profile</h1>
            <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
              <div className="max-lg:center mb-5">
                <label
                  className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden"
                  htmlFor="uploadImg"
                  id="profileImgLabel"
                >
                  <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center text-white bg-black/50 opacity-0 hover:opacity-100 cursor-pointer">
                    Upload Image
                  </div>
                  <img ref={profileImgEle} src={profile_img} alt="" />
                </label>
                <input
                  onChange={handleImagePreview}
                  type="file"
                  id="uploadImg"
                  accept=".jpeg, .png, .jpg"
                  hidden
                />
                <button
                  onClick={handleImageUpload}
                  className="btn-light mt-5 max-lg:center lg:w-full px-10"
                >
                  Upload
                </button>
              </div>
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                  <div>
                    <InputBox
                      name={"fullname"}
                      type="text"
                      value={fullname}
                      placeholder="Full Name"
                      disabled={true}
                      icon="fi-rr-user"
                    />
                  </div>
                  <div>
                    <InputBox
                      name={"email"}
                      type="email"
                      value={email}
                      placeholder="Email"
                      disabled={true}
                      icon="fi-rr-mailbox"
                    />
                  </div>
                </div>
                <InputBox
                  name={"username"}
                  type="text"
                  value={profile_username}
                  placeholder="Username"
                  icon="fi-rr-at"
                />
                <p className="text-dark-grey -mt-3">
                  Username will be used to search user and visible to all user
                </p>
                <textarea
                  name="bio"
                  id=""
                  maxLength={bioLimit}
                  value={bio}
                  className="input-box lg:h-40 resize-none h-64 leading-7 mt-5 pl-5"
                  placeholder="User's Bio"
                  onChange={handleCharacterChange}
                ></textarea>
                <p className="text-dark-grey mt-1">
                  {charactersLeft} characters left.
                </p>
                <p className="my-6 text-dark-grey">
                  Add your social handles below
                </p>
                <div className="md:grid md:grid-cols-2 gap-x-6">
                  {Object.keys(social_links).map((key, i) => {
                    let link = social_links[key];

                    return (
                      <InputBox
                        key={i}
                        name={key}
                        type="text"
                        value={link}
                        placeholder={"https://www." + key}
                        icon={
                          key !== "website" ? "fi-brands-" + key : "fi-rr-globe"
                        }
                      />
                    );
                  })}
                </div>
                <button
                  onClick={handleSubmit}
                  className="btn-dark w-auto px-10 "
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        )}
      </AnimationWrapper>
    </>
  );
};
export default EditProfile;
