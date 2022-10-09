import type { CustomNextPage } from "next";
import { Dashboard } from "src/pages_component/dashboard/index";
import { Layout } from "src/pages_layout/Layout/Layout";

const IndexPage: CustomNextPage = (props) => {
  return <Dashboard {...props} />;
};

IndexPage.getLayout = Layout;

export default IndexPage;
