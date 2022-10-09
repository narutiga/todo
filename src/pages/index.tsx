import type { CustomNextPage } from "next";
import { Auth } from "src/pages_component/index";
import { Layout } from "src/pages_layout/Layout/Layout";

const IndexPage: CustomNextPage = (props) => {
  return <Auth {...props} />;
};

IndexPage.getLayout = Layout;

export default IndexPage;
