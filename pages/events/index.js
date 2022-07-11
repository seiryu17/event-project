import { useRouter } from "next/router";
import React from "react";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../src/components/events/event-list";
import EventsSearch from "../../src/components/events/events-search";

const AllEventsPage = (props) => {
  const router = useRouter();
  const { events } = props;
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
      revalidate: 60,
    },
  };
}

export default AllEventsPage;
