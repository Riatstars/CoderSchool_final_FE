import { useContext, useRef } from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../App";

const ChangePassword = () => {
  let changePasswordForm = useRef();
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; //
  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(changePasswordForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    let { currentPassword, newPassword } = formData;
    if (!currentPassword.length || !newPassword.length) {
      return toast.error("Please fill in the inputs");
    }
    if (
      !passwordRegex.test(currentPassword) ||
      !passwordRegex.test(newPassword)
    ) {
      return toast.error(
        "Password must be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters"
      );
    }
    e.target.setAttribute("disabled", true);
    let LoadingToast = toast.loading("Updating");
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/change-password", formData, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then(() => {
        toast.dismiss(LoadingToast);
        e.target.removeAttribute("disabled");
        toast.success("Password changed");
      })
      .catch(({ response }) => {
        toast.dismiss(LoadingToast);
        e.target.removeAttribute("disabled");
        toast.error(response.data.error);
      });
  };
  return (
    <AnimationWrapper>
      <Toaster />
      <form ref={changePasswordForm} action="">
        <h1 className="max-md:hidden">Change Password</h1>
        <div className="py-10 w-full md:max-w-[400px]">
          <InputBox
            name="currentPassword"
            type="password"
            className="profile-edit-input"
            placeholder="Current password"
            icon="fi fi-rr-unlock"
          />
          <InputBox
            name="newPassword"
            type="password"
            className="profile-edit-input"
            placeholder="New password"
            icon="fi fi-rr-unlock"
          />
          <button
            onClick={handleSubmit}
            className="btn-dark px-10 "
            type="submit"
          >
            Change Password
          </button>
        </div>
      </form>
    </AnimationWrapper>
  );
};
export default ChangePassword;
