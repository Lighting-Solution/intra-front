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
  const [mainModalIsOpen, setMainModalIsOpen] = useState(false);
  const [attendeeModalIsOpen, setAttendeeModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    id: null,
    title: "",
    content: "",
    start: new Date(),
    end: new Date(),
    attendees: [],
    createAt: new Date(),
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // 이벤트 상태 업데이트
  const fetchEvents = () => {
    axios
      .get("http://localhost:9000/api/v1/lighting_solutions/calendar/events")
      .then((response) => {
        setEvents(
          response.data.map((event) => ({
            id: event.calendarId,
            title: event.calendarTitle,
            content: event.calendarContent,
            start: moment(event.calendarStartAt).tz("Asia/Seoul").toDate(), // Convert to Asia/Seoul timezone
            end: moment(event.calendarEndAt).tz("Asia/Seoul").toDate(),
            attendees: event.attendees || [],
            createAt: new Date(event.calendarCreateAt),
          }))
        );
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  };

  // 특정 세부 정보에 newEvent 상태 업데이트, 모달 열기
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
          start: moment(eventData.calendarStartAt).tz("Asia/Seoul").toDate(),
          end: moment(eventData.calendarEndAt).tz("Asia/Seoul").toDate(),
          attendees: eventData.attendees || [],
          createAt: new Date(eventData.calendarCreateAt),
        });
        setMainModalIsOpen(true);
      })
      .catch((error) => {
        console.error(
          `Error fetching event details for event ID ${eventId}`,
          error
        );
      });
  };

  // 캘린더 슬롯 선택 시 newEvent 상태 업데이트 및 모달 열기
  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({
      id: null,
      title: "",
      content: "",
      start,
      end,
      attendees: [],
      createAt: new Date(),
    });
    setMainModalIsOpen(true);
  };

  // 캘린더 이벤트 선택 시 세부 정보 가져오기
  const handleSelectEvent = (event) => {
    fetchEventDetails(event.id);
  };

  // 새로운 이벤트 추가
  const handleAddEvent = () => {
    const startKST = moment(newEvent.start).tz("Asia/Seoul").toISOString();
    const endKST = moment(newEvent.end).tz("Asia/Seoul").toISOString();
    const attendees = newEvent.attendees || [];

    axios
      .post("http://localhost:9000/api/v1/lighting_solutions/calendar/events", {
        calendarId: newEvent.id,
        calendarTitle: newEvent.title,
        calendarContent: newEvent.content,
        calendarStartAt: startKST,
        calendarEndAt: endKST,
        calendarCreateAt: moment(newEvent.createAt)
          .tz("Asia/Seoul")
          .toISOString(),
        attendees: attendees,
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
            createAt: new Date(newEventData.calendarCreateAt),
          },
        ]);
        // 참가자 추가 요청
        addAttendeesToEvent(newEventData.calendarId, attendees);
        setMainModalIsOpen(false);
        clearNewEventState();
      })
      .catch((error) => {
        console.error("There was an error adding the event!", error);
      });
  };

  // 이벤트 업데이트
  const handleUpdateEvent = () => {
    const startKST = moment(newEvent.start).tz("Asia/Seoul").toISOString();
    const endKST = moment(newEvent.end).tz("Asia/Seoul").toISOString();

    axios
      .put(
        `http://localhost:9000/api/v1/lighting_solutions/calendar/events/${newEvent.id}`,
        {
          calendarTitle: newEvent.title,
          calendarContent: newEvent.content,
          calendarStartAt: startKST,
          calendarEndAt: endKST,
          attendees: newEvent.attendees,
          calendarCreateAt: moment(newEvent.createAt)
            .tz("Asia/Seoul")
            .toISOString(),
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
                start: moment(updatedEventData.calendarStartAt)
                  .tz("Asia/Seoul")
                  .toDate(),
                end: moment(updatedEventData.calendarEndAt)
                  .tz("Asia/Seoul")
                  .toDate(),
                attendees: updatedEventData.attendees || [],
                createAt: new Date(updatedEventData.calendarCreateAt),
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

  // 이벤트 삭제
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

  // 참가자 추가 요청
  const addAttendeesToEvent = async (eventId, attendees) => {
    try {
      for (let attendee of attendees) {
        await axios.post(
          "http://localhost:9000/api/v1/lighting_solutions/calendar/attendees",
          {
            eventId: eventId,
            team: attendee.team,
            employee: attendee.employee,
          }
        );
      }
      fetchEvents(); // 참가자 추가 후 이벤트 목록 업데이트
    } catch (error) {
      console.error("There was an error adding the attendees!", error);
    }
  };

  // 참가자 추가
  const handleAddAttendee = (team, employee) => {
    const newAttendee = { team, employee };
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      attendees: [...prevEvent.attendees, newAttendee],
    }));
    setAttendeeModalIsOpen(false);
  };

  // 참가자 제거
  const handleRemoveAttendee = (attendeeIndex) => {
    const updatedAttendees = [...newEvent.attendees];
    updatedAttendees.splice(attendeeIndex, 1);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      attendees: updatedAttendees,
    }));
  };

  // 초기화
  const clearNewEventState = () => {
    setNewEvent({
      id: null,
      title: "",
      content: "",
      start: new Date(),
      end: new Date(),
      attendees: [],
      createAt: new Date(),
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
      <Modal
        isOpen={mainModalIsOpen}
        onRequestClose={() => setMainModalIsOpen(false)}
        contentLabel={newEvent.id ? "일정 수정" : "일정 등록"}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <h2>{newEvent.id ? "일정 수정" : "일정 등록"}</h2>
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
              value={moment(newEvent.start)
                .tz("Asia/Seoul")
                .format("YYYY-MM-DDTHH:mm")}
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
              value={moment(newEvent.end)
                .tz("Asia/Seoul")
                .format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setNewEvent({ ...newEvent, end: new Date(e.target.value) })
              }
              required
            />
          </div>
          <div className="form-group">
            <label></label>
            {newEvent.attendees.map((attendee, index) => (
              <div key={index} className="attendee-item">
                <span>{`${attendee.team} - ${attendee.employee}`}</span>
                <button
                  type="button"
                  className="btn btn-sm ml-2"
                  onClick={() => handleRemoveAttendee(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              {newEvent.id ? "일정 수정" : "일정 등록"}
            </button>
            {newEvent.id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteEvent}
              >
                일정 삭제
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setMainModalIsOpen(false)}
            >
              취소
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={attendeeModalIsOpen}
        onRequestClose={() => setAttendeeModalIsOpen(false)}
        contentLabel="Add Attendee"
        className="attendee-modal"
        overlayClassName="custom-overlay"
      >
        <h2>참석자 추가</h2>
        <AddAttendeeModal
          isOpen={attendeeModalIsOpen}
          closeModal={() => setAttendeeModalIsOpen(false)}
          onAddAttendee={handleAddAttendee}
          calendar={{
            calendarId: newEvent.id,
            calendarTitle: newEvent.title,
            calendarCreateAt: newEvent.createAt,
            calendarContent: newEvent.content,
            calendarStartAt: newEvent.start,
            calendarEndAt: newEvent.end,
          }}
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
