import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { user } from "@services";

// Visa error vid felregistrering'

// När vi registerar en användare vars username redan finns i databasen så får vi ett "400 bad request" och ett meddelande i network response/preview "User already exists".

// Men för användare så ser dom inte dessa meddelande i hemsidan på register sida så det vi vill göra är att visa meddeladnde "user already exists" som en error under Username på hemsidan.

// Knappa in "tryc" så kommer det stå en lista på try catch och tryck enter. Se nedan på koden för svar.

// Det finns ett till sätt att göra en notis att användaren redan existera och det är toast notification. Det viktiga är att välja och framföra ett tydligt meddelande att det inte gick att registrera användare som redan finns.

// Vi börjar med att visa hur man gör under Username i hemsidan och det är att skapa en setError i Register.tsx.

//  const {
//    setError,
//    register,
//    handleSubmit,
//    formState: { errors, isValid },
//  } = useForm<FormData>({
//    resolver: zodResolver(schema),
//    mode: "onChange",
//  });

//  async function onSubmit(data: FormData) {
//    console.log("Submitted", data);
//   try {
//     await user.register(data);
//     navigate("/foods");
//   } catch (error: any) {
//     if (error.response.status === 400) {
//       setError("username", { message: error.response.data });
//       console.log(error.response.data);
//     }
//   }
// }

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
