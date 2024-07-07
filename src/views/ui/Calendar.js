import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import Modal from "react-modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    id: null,
    title: "",
    content: "",
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
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
          }))
        );
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ id: null, title: "", content: "", start, end });
    setModalIsOpen(true);
  };

  const handleSelectEvent = (event) => {
    setNewEvent(event);
    setModalIsOpen(true);
  };

  const handleAddEvent = () => {
    axios
      .post("http://localhost:9000/api/v1/lighting_solutions/calendar/events", {
        calendarTitle: newEvent.title,
        calendarContent: newEvent.content,
        calendarStartAt: newEvent.start,
        calendarEndAt: newEvent.end,
      })
      .then((response) => {
        setEvents([
          ...events,
          {
            id: response.data.calendarId,
            title: response.data.calendarTitle,
            content: response.data.calendarContent,
            start: new Date(response.data.calendarStartAt),
            end: new Date(response.data.calendarEndAt),
          },
        ]);
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.error("There was an error adding the event!", error);
      });
  };

  const handleUpdateEvent = () => {
    axios
      .put(
        `http://localhost:9000/api/v1/lighting_solutions/calendar/events/${newEvent.id}`,
        {
          calendarTitle: newEvent.title,
          calendarContent: newEvent.content,
          calendarStartAt: newEvent.start,
          calendarEndAt: newEvent.end,
        }
      )
      .then((response) => {
        const updatedEvents = events.map((event) =>
          event.id === newEvent.id
            ? {
                id: response.data.calendarId,
                title: response.data.calendarTitle,
                content: response.data.calendarContent,
                start: new Date(response.data.calendarStartAt),
                end: new Date(response.data.calendarEndAt),
              }
            : event
        );
        setEvents(updatedEvents);
        setModalIsOpen(false);
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
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.error("There was an error deleting the event!", error);
      });
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: "90vh", background: "white" }}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel={newEvent.id ? "Edit Event" : "Add Event"}
        className="custom-modal"
        overlayClassName="custom-overlay"
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
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyCalendar;
