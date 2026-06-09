import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { user } from "@services";

// Skapa en user service

// Målet nu är att skapa en egen user service där vi gör axios anropet från tidigare och sen anropa register. Skapa en ny fil i services mappen med namnet UserService.ts

// Överför axios koden från register.tsx till UserService.ts och importera.

// Skapa en interface i UserService.ts se nedan exempel:

// interface User {
//   name: string;
//   username: string;
//   password: string;
// }

// Kopera hela interface User och klistra in den i types.ts sen importera den i UserService.ts.

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
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(data: FormData) {
    console.log("Submitted", data);
    await user.register(data);
    navigate("/foods");
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
