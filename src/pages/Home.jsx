import { useSelector } from "react-redux";
import Nav from "../components/Nav/Nav";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-4xl md:text-5xl font-bold mt-8 text-center">
          Welcome to Real-Estate Listing Home page!
        </h1>
        <p className="text-lg md:text-xl text-center mt-4">
          {user ? `Logged in as: ${user.name}` : "Not logged in"}
        </p>
      </div>
    </>
  );
};

export default Home;
