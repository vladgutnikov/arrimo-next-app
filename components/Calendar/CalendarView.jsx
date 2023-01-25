import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventDialog } from "./EventDialog";
import { getError } from "../../utils/error";

export const CalendarView = () => {
  const BASE_URL = "http://localhost:3000/";
  const calanderRef = useRef();

  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [isEditModal, setIsEditModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventModal, setEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [id, setId] = useState("");

  const getAllEvents = () => {
    axios.get(`${BASE_URL}api/events`).then((response) => {
      setEvents(response.data);
      window.localStorage.setItem("events", JSON.stringify(response.data));
    });
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const addNewEvent = () => {
    let newStartDate = moment(startDate).format("YYY-MM-DD");
    let newEndDate = moment(endDate).format("YYY-MM-DD");

    let newEvents = {
      id: events.length + 1,
      title: eventTitle,
      start: newStartDate.substring(2, 13),
      end: newEndDate.substring(2, 13),
    };
    try {
      axios.post(`${BASE_URL}api/events`, newEvents).then((response) => {
        getAllEvents();
      });
    } catch (err) {
      toast.error(getError(err));
    }
    setEventModal(false);
    setStartDate(undefined);
    setEndDate(undefined);
    setEventTitle("");
  };

  const editEvent = () => {
    let find = events.filter((e) => e._id === id);
    find.map((item) => {
      let updatedEvent = {
        ...item,
        title: eventTitle,
      };
      try {
        axios
          .put(`${BASE_URL}api/events/${id}`, updatedEvent)
          .then((response) => {
            getAllEvents();
          });
      } catch (err) {
        toast.error(getError(err));
      }
    });

    setStartDate(undefined);
    setEndDate(undefined);
    setIsEditModal(false);
    setEventTitle("");
    setEventModal(false);
  };

  const deleteEvent = () => {
    try {
      axios.delete(`${BASE_URL}api/events/${id}`).then((response) => {
        getAllEvents();
      });
    } catch (err) {
      toast.error(getError(err));
    }
    setEventTitle("");
    setEventModal(false);
  };

  const handleEventClick = (info) => {
    setId(info.event.extendedProps._id);
    setEvent(info.event);
    setStartDate(info.event.start);
    setEndDate(info.event.end);
    setEventTitle(info.event.title);
    setIsEditModal(true);
    setEventModal(true);
  };

  const handleDateSelect = (info) => {
    setStartDate(info.start);
    setEndDate(info.end);
    setIsEditModal(false);
    setEventModal(true);
  };

  return (
    <div>
      <FullCalendar
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next today dayGridMonth",
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={5}
        weekends={true}
        ref={calanderRef}
        events={events}
        eventClick={handleEventClick}
        select={handleDateSelect}
        eventAdd={function () {}}
        eventChange={function () {}}
      />

      <EventDialog
        eventModal={eventModal}
        setEventModal={setEventModal}
        event={event}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        addNewEvent={addNewEvent}
        editEvent={editEvent}
        deleteEvent={deleteEvent}
        isEditModal={isEditModal}
      />
    </div>
  );
};
