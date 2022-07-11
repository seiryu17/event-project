import React from "react";
// import { getEventById } from "../../dummy-data";
import { getFeaturedEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "../../src/components/event-detail/event-summary";
import EventLogistics from "../../src/components/event-detail/event-logistics";
import EventContent from "../../src/components/event-detail/event-content";
import ErrorAlert from "../../src/components/UI/error-alert";

const EventDetail = (props) => {
  const { selectedEvent } = props;
  const event = selectedEvent;

  if (!event)
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((x) => ({ params: { eventId: x.id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetail;
