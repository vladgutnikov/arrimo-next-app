import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import { CalendarView } from "../components/Calendar/CalendarView";

const Calendar = () => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <Layout title="Calendar">
          <CalendarView />
        </Layout>
      )}
    </>
  );
};

export default Calendar;
