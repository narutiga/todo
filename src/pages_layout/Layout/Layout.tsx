import { CustomLayout } from "next";

/** @package */
export const Layout: CustomLayout = (page) => {
  return (
    <div>
      <main>{page}</main>
    </div>
  );
};
