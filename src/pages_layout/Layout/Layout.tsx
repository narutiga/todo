import { CustomLayout } from "next";

/** @package */
export const Layout: CustomLayout = (page) => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col w-5/6 pt-10 mx-auto items-center">
        {page}
      </main>
    </div>
  );
};
