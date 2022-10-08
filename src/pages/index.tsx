import type { CustomNextPage } from "next";
import { Index } from "src/pages_component/index";
import { Layout } from "src/pages_layout/Layout/Layout";

const IndexPage: CustomNextPage = (props) => {
  return <Index {...props} />;
};

IndexPage.getLayout = Layout;

export default IndexPage;
