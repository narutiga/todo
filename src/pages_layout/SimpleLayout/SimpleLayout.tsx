import { CustomLayout } from "next";

/** @package */
export const SimpleLayout: CustomLayout = (page) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <p className="ml-40 text-4xl font-bold">
          Oin<span className="text-rose-500"> Todo</span>
        </p>
      </header>
      <main className="mx-8 flex flex-1 flex-col pt-10 items-center">
        {page}
      </main>
    </div>
  );
};
