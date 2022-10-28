import { useState, FormEvent } from "react";
import type { NextPage } from "next";
import { useMutateAuth } from "src/lib/hook/useMutateAuth";

/** @package */
export const Auth: NextPage = () => {
  const [isSignin, setIsSignin] = useState(true);
  const {
    email,
    setEmail,
    password,
    setPassword,
    signInMutation,
    signUpMutation,
  } = useMutateAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignin) {
      signInMutation.mutate();
    } else {
      signUpMutation.mutate();
    }
  };

  return (
    <div className="flex w-screen flex-1 flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            className="mb-4 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-rose-400 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="mb-6 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-rose-400 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="mb-6 mr-auto ml-auto group relative flex justify-center rounded-full bg-rose-300 py-2 px-4 text-sm font-medium text-gray-600 hover:bg-rose-300"
        >
          {isSignin ? "Sing In" : "Sing Up"}
        </button>
        <p
          onClick={() => setIsSignin(!isSignin)}
          className="mr-auto ml-auto relative flex justify-center cursor-pointer font-medium border-none outline-none bg-transparent text-rose-500 hover:text-rose-300 underline"
        >
          {isSignin ? "Sign Up ?" : "Sign In ?"}
        </p>
      </form>
    </div>
  );
};
