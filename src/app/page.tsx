import { getServerSession } from "next-auth";
import HomePage from "./components/HomePage";

export default async function Home() {
  const session = await getServerSession();

  return (
    <>
      <HomePage name={session?.user?.name} />
    </>
  );
}
