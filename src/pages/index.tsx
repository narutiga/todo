import type { CustomNextPage } from "next";
import { Auth } from "src/pages_component/index";
import { SimpleLayout } from "src/pages_layout/SimpleLayout";

const IndexPage: CustomNextPage = (props) => {
  return <Auth {...props} />;
};

IndexPage.getLayout = SimpleLayout;

export default IndexPage;
