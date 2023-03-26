import { FC } from "react";
import Header from "../componenets/header";
import Card from "../Reusable/Card";
const Home: FC = () => {
    return (
    <div>
      <Header />
      <div className="container mx-auto mt-8 flex justify-between  items-center ">
      <div className="w-full max-w-screen-lg flex">
        <div className="ml-12 mr-10">
            <Card item={{name: "News"}}  />
        </div>
        <div className="w-1/3">
            <Card item={{name: "project"}}  />
                <div className="mt-4">
            <Card item={{name: "Ranking"}} />
                </div>
        </div>
      </div>
    </div>

    </div>
  );
}

export default Home;
