"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

// REDUX =============================================
import { clearError, loginUser } from "@/store/features/user/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

// ===================================================
// LOGIN PAGE COMPONENT (app/page.tsx) ===============
// ===================================================
export default function Login() {
  const router = useRouter();

  // clear state error on page load
  useEffect(() => {
    dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // redux
  const dispatch = useAppDispatch();
  const { loading, error, loggedIn } = useAppSelector(state => state.auth);

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle submit
  const onSubmit: SubmitHandler<any> = (data, event) => {
    console.log(data);
    dispatch(loginUser(data));

    // clear fields
    event?.target.reset();

    // redirect to home
    if (!error) router.push("/");
  };

  // RETURN ==========================================
  return (
    <main className="container w-[90%] md:w-[75%] py-4 flex justify-center">
      <div className="w-[90%] md:w-[40%] mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome Back</h1>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-md"
          >
            {error ? (
              <h1 className="text-2xl text-red-500 text-center mb-4">
                {error}
              </h1>
            ) : (
              loggedIn && (
                <h1 className="text-2xl text-green-500 text-center mb-4">
                  Logged in successfully
                </h1>
              )
            )}
            {/* email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md py-1.5 px-2.5 outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            {/* password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded-md py-1.5 px-2.5 outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>

            {/* submit */}
            <div className="mb-2 pt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

// EXTENDED COMPONENTS =================================
