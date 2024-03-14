import { api } from "@api/api";
import Field from "@components/Field";
import { useAuth } from "@hooks/useAuth";
import { notify } from "@utils/general";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  //can hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  // ===============================================================
  // Function to handle the registeration
  // ===============================================================
  const onSubmit = async (data) => {
    //send data to the server and authenticate the user

    try {
      //handle the form submission
      const response = await api.post("/auth/register", data);
      if (response.status === 201) {
        notify("Account created successfully", "success");
        //redirect to login
        navigate("/login");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: error.response.data.error,
      });
    }
  };

  //redirect to home if user is already logged in
  useEffect(() => {
    if (auth?.status === "loggedIn") {
      navigate(`/`);
    }
  }, []);

  return (
    <section className="container">
      <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Field label={"First Name"} error={errors.firstName}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              {...register("firstName", { required: "First Name is required" })}
            />
          </Field>
          <Field label={"Last Name"} error={errors.lastName}>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              {...register("lastName", { required: "Last Name is required" })}
            />
          </Field>
          <Field label={"Email"} error={errors.email}>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              {...register("email", { required: "Email is required" })}
            />
          </Field>
          <Field label={"Password"} error={errors.password}>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
          </Field>
          <Field>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Create Account
            </button>
          </Field>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
