import { useState, FormEvent } from "react";
import type { NextPage } from "next";
import { useMutateAuth } from "src/lib/hook/useMutateAuth";
import { IconCrown } from "@tabler/icons";

/** @package */
export const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate();
    } else {
      registerMutation.mutate();
    }
  };

  return (
    <div>
      <IconCrown className="h-12 w-12 text-orange-400" />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-orange-400 focus:outline-none"
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
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-orange-400 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="mr-auto ml-auto group relative flex justify-center rounded-full bg-orange-300 py-2 px-4 text-sm font-medium text-gray-600 hover:bg-orange-200"
        >
          {isLogin ? "Sing In" : "Sing Up"}
        </button>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="cursor-pointer font-medium border-none outline-none bg-transparent text-gray-300 hover:text-orange-300 underline"
        >
          change mode ?
        </button>
      </form>
    </div>
  );
};
