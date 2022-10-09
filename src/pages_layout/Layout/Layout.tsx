import { IconLogout } from "@tabler/icons";
import { CustomLayout } from "next";
import { supabase } from "src/lib/util/supabase";

/** @package */
export const Layout: CustomLayout = (page) => {
  const signOnt = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <div className="flex justify-between align-middle">
          <p className="ml-40 text-4xl font-bold">
            Oin<span className="text-rose-500"> Todo</span>
          </p>
          <IconLogout
            className="my-auto mr-16 h-6 w-6 cursor-pointer text-rose-500 "
            onClick={signOnt}
          />
        </div>
      </header>
      <main className="mx-8 flex flex-1 flex-col pt-10 items-center">
        {page}
      </main>
    </div>
  );
};
