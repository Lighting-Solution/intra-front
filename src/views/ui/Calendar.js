import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import axios from "axios";
import Modal from "react-modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import AddAttendeeModal from "./AddAttendeeModal.js";
import { FaTimes } from "react-icons/fa";
import moment from "moment-timezone";

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [events, setEvents] = useState([]);
  const [mainModalIsOpen, setMainModalIsOpen] = useState(false); // Main modal state
  const [attendeeModalIsOpen, setAttendeeModalIsOpen] = useState(false); // Attendee modal state
  const [newEvent, setNewEvent] = useState({
    id: null,
    title: "",
    content: "",
    start: new Date(),
    end: new Date(),
    attendees: [],
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("http://localhost:9000/api/v1/lighting_solutions/calendar/events")
      .then((response) => {
        setEvents(
          response.data.map((event) => ({
            id: event.calendarId,
            title: event.calendarTitle,
            content: event.calendarContent,
            start: new Date(event.calendarStartAt),
            end: new Date(event.calendarEndAt),
            attendees: event.attendees || [],
          }))
        );
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  };

  const fetchEventDetails = (eventId) => {
    axios
      .get(
        `http://localhost:9000/api/v1/lighting_solutions/calendar/events/${eventId}`
      )
      .then((response) => {
        const eventData = response.data;
        setNewEvent({
          id: eventData.calendarId,
          title: eventData.calendarTitle,
          content: eventData.calendarContent,
          start: new Date(eventData.calendarStartAt),
          end: new Date(eventData.calendarEndAt),
          attendees: eventData.attendees || [],
        });
        setMainModalIsOpen(true); // Open the edit event modal
      })
      .catch((error) => {
        console.error(
          `Error fetching event details for event ID ${eventId}`,
          error
        );
      });
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({
      id: null,
      title: "",
      content: "",
      start,
      end,
      attendees: [],
    });
    setMainModalIsOpen(true);
  };

  const handleSelectEvent = (event) => {
    fetchEventDetails(event.id); // Fetch event details including attendees
  };

  const handleAddEvent = () => {
    // Convert start and end dates to ISO strings in Korea Standard Time (KST)
    const startKST = moment(newEvent.start)
      .tz("Asia/Seoul")
      .format("YYYY-MM-DDTHH:mm:ss");
    const endKST = moment(newEvent.end)
      .tz("Asia/Seoul")
      .format("YYYY-MM-DDTHH:mm:ss");
    console.log(startKST);
    console.log(endKST);
    axios
      .post("http://localhost:9000/api/v1/lighting_solutions/calendar/events", {
        calendarTitle: newEvent.title,
        calendarContent: newEvent.content,
        calendarStartAt: startKST,
        calendarEndAt: endKST,
        attendees: newEvent.attendees,
      })
      .then((response) => {
        const newEventData = response.data;
        setEvents([
          ...events,
          {
            id: newEventData.calendarId,
            title: newEventData.calendarTitle,
            content: newEventData.calendarContent,
            start: new Date(newEventData.calendarStartAt),
            end: new Date(newEventData.calendarEndAt),
            attendees: newEventData.attendees || [],
          },
        ]);
        setMainModalIsOpen(false);
        clearNewEventState();
      })
      .catch((error) => {
        console.error("There was an error adding the event!", error);
      });
  };

  const handleUpdateEvent = () => {
    const startKST = moment(newEvent.start).tz("Asia/Seoul").toISOString();
    const endKST = moment(newEvent.end).tz("Asia/Seoul").toISOString();
    console.log(startKST);
    console.log(endKST);
    axios
      .put(
        `http://localhost:9000/api/v1/lighting_solutions/calendar/events/${newEvent.id}`,
        {
          calendarTitle: newEvent.title,
          calendarContent: newEvent.content,
          calendarStartAt: startKST,
          calendarEndAt: endKST,
          attendees: newEvent.attendees,
        }
      )
      .then((response) => {
        const updatedEventData = response.data;
        const updatedEvents = events.map((event) =>
          event.id === updatedEventData.calendarId
            ? {
                id: updatedEventData.calendarId,
                title: updatedEventData.calendarTitle,
                content: updatedEventData.calendarContent,
                start: new Date(updatedEventData.calendarStartAt),
                end: new Date(updatedEventData.calendarEndAt),
                attendees: updatedEventData.attendees || [],
              }
            : event
        );
        setEvents(updatedEvents);
        setMainModalIsOpen(false);
        clearNewEventState();
      })
      .catch((error) => {
        console.error("There was an error updating the event!", error);
      });
  };

  const handleDeleteEvent = () => {
    axios
      .delete(
        `http://localhost:9000/api/v1/lighting_solutions/calendar/events/${newEvent.id}`
      )
      .then(() => {
        const updatedEvents = events.filter(
          (event) => event.id !== newEvent.id
        );
        setEvents(updatedEvents);
        setMainModalIsOpen(false);
        clearNewEventState();
      })
      .catch((error) => {
        console.error("There was an error deleting the event!", error);
      });
  };

  const handleAddAttendee = (department, employee) => {
    const newAttendee = { department, employee };
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      attendees: [...prevEvent.attendees, newAttendee],
    }));
    setAttendeeModalIsOpen(false); // Close the attendee selection modal
  };

  const handleRemoveAttendee = (attendeeIndex) => {
    const updatedAttendees = [...newEvent.attendees];
    updatedAttendees.splice(attendeeIndex, 1);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      attendees: updatedAttendees,
    }));
  };

  const clearNewEventState = () => {
    setNewEvent({
      id: null,
      title: "",
      content: "",
      start: new Date(),
      end: new Date(),
      attendees: [],
    });
  };

  return (
    <div>
      <h4>일정 목록</h4>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: "86vh", background: "white" }}
      />
      {/* Main Modal for Add/Edit Event */}
      <Modal
        isOpen={mainModalIsOpen}
        onRequestClose={() => setMainModalIsOpen(false)}
        contentLabel={newEvent.id ? "Edit Event" : "Add Event"}
        className="custom-modal"
        overlayClassName="custom-overlay" // This is where you define the class for the overlay
      >
        <h2>{newEvent.id ? "Edit Event" : "Add Event"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newEvent.id ? handleUpdateEvent() : handleAddEvent();
          }}
        >
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <input
              type="text"
              className="form-control"
              value={newEvent.content}
              onChange={(e) =>
                setNewEvent({ ...newEvent, content: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="datetime-local"
              className="form-control"
              value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setNewEvent({ ...newEvent, start: new Date(e.target.value) })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="datetime-local"
              className="form-control"
              value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setNewEvent({ ...newEvent, end: new Date(e.target.value) })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Attendees</label>
            {newEvent.attendees.map((attendee, index) => (
              <div key={index} className="attendee-item">
                <span>{`${attendee.department} - ${attendee.employee}`}</span>
                <button
                  type="button"
                  className="btn btn-sm ml-2"
                  onClick={() => handleRemoveAttendee(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-primary mt-2"
              onClick={() => setAttendeeModalIsOpen(true)} // Open modal for attendee selection
            >
              Add Attendee
            </button>
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              {newEvent.id ? "Update Event" : "Add Event"}
            </button>
            {newEvent.id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteEvent}
              >
                Delete Event
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setMainModalIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      {/* Modal for Add Attendee */}
      <Modal
        isOpen={attendeeModalIsOpen}
        onRequestClose={() => setAttendeeModalIsOpen(false)}
        contentLabel="Add Attendee"
        className="attendee-modal"
        overlayClassName="custom-overlay" // This is where you define the class for the overlay
      >
        <h2>Add Attendee</h2>
        <AddAttendeeModal
          isOpen={attendeeModalIsOpen}
          closeModal={() => setAttendeeModalIsOpen(false)}
          onAddAttendee={handleAddAttendee}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setAttendeeModalIsOpen(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MyCalendar;
