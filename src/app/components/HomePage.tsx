import EventBox from "./EventBox";
import Sidebar from "./Sidebar";

const HomePage = ({ name }: any) => {
  return (
    <>
      <main className="flex items-center justify-start gap-5">
        <Sidebar name={name} />
        <EventBox />
      </main>
    </>
  );
};

export default HomePage;
