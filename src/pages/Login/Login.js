import LoginForm from "../../Components/LoginForm/LoginForm";
import './Login.css'

const Login = ({ typeForm = "login" }) => {
  return (
    <div className="page page-login">
      {typeForm === "login" && <LoginForm />}
    </div>
  );
};

export default Login;
