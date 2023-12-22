import { getServerSession } from "next-auth";
import Sidebar from "./components/Sidebar";
import EventBox from "./components/EventBox";

export default async function Home() {
  const session = await getServerSession();

  return (
    <>
      <main className="flex items-center justify-between gap-3">
        <Sidebar />
        <EventBox />
      </main>
    </>
  );
}
