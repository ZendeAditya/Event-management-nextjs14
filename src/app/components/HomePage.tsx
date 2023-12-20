import EventBox from "./EventBox";
import Sidebar from "./Sidebar";

const HomePage = () => {
  return (
    <>
      <main className="flex items-center justify-start gap-5">
        <Sidebar />
        <EventBox />
      </main>
    </>
  );
};

export default HomePage;
