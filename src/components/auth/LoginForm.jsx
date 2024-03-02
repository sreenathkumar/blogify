import Field from "@components/Field";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
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
