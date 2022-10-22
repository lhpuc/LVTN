import SignupForm from "../../Components/SignupForm/SignupForm";
import "../Login/Login.css";

const Signup = ({ typeForm = "signup" }) => {
  return (
    <div className="page page-login">
      {typeForm === "signup" && <SignupForm />}
    </div>
  );
};

export default Signup;
