import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { user } from "@services";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),

  username: z
    .string()
    .min(1, { message: "Email is required" })
    .min(3, { message: "Invalid email." }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(5, { message: "Password is too short" }),
});

type FormData = z.infer<typeof schema>;

function Register() {
  const navigate = useNavigate();

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(data: FormData) {
    console.log("Submitted", data);
    try {
      await user.register(data);
      navigate("/foods");
    } catch (error: any) {
      if (error.response.status === 400) {
        setError("username", { message: error.response.data });
        console.log(error.response.data);
      }
    }
  }

  return (
    <div className="vh-100 d-grid justify-content-center align-content-center">
      <div className="p-5 shadow rounded-3" style={{ width: "400px" }}>
        <h1 className="mb-4 text-center">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>

            <input
              {...register("name")}
              id="name"
              type="text"
              className="form-control"
            />

            {errors.name && (
              <p className="text-danger mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email
            </label>

            <input
              {...register("username")}
              id="username"
              type="email"
              className="form-control"
            />

            {errors.username && (
              <p className="text-danger mt-1">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              {...register("password")}
              id="password"
              type="password"
              className="form-control w-100 login-input"
            />

            {errors.password && (
              <p className="text-danger mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            disabled={!isValid}
            type="submit"
            className="btn btn-primary w-100"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
