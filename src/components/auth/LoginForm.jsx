import { actions } from "@actions/actions";
import { api } from "@api/api";
import Field from "@components/Field";
import { useAuth } from "@hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const { dispatchAuth } = useAuth();

  // Handle form submission
  const onSubmit = async (data) => {
    //send data to the server and authenticate the user
    try {
      const response = await api.post("/auth/login", data);
      if (response.status === 200) {
        const { token, user } = response.data;

        if (token) {
          const accessToken = token.accessToken;
          const refreshToken = token.refreshToken;

          //set the token in the context
          dispatchAuth({
            type: actions.auth.LOGIN,
            payload: { accessToken, refreshToken, user },
          });
        }

        //redirect to home
        navigate("/");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: error.response.data.error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field label={"Email Address"} error={errors.email}>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          id="email"
          name="email"
          className={`form-input ${errors.email && "border-red-500"}`}
        />
      </Field>
      <Field label={"Password"} error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type="password"
          id="password"
          name="password"
          className={`form-input ${errors.password && "border-red-500"}`}
        />
      </Field>
      <p className="text-red-500">{errors?.root?.random?.message}</p>
      <Field>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Login
        </button>
      </Field>

      <p className="text-center">
        {"Don\n't have an account? "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
