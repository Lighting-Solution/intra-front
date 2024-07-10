import React, { useEffect } from "react";
import Calendar from "tui-calendar"; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import "../ui/Calendar.css";

const myTheme = {
  // Theme object to extends default dark theme.
};

const today = new Date();

const getDate = (type, date, value, operator) => {
  const newDate = new Date(date);
  if (type === "date") {
    if (operator === "+") {
      newDate.setDate(newDate.getDate() + value);
    } else {
      newDate.setDate(newDate.getDate() - value);
    }
  } else if (type === "hours") {
    if (operator === "+") {
      newDate.setHours(newDate.getHours() + value);
    } else {
      newDate.setHours(newDate.getHours() - value);
    }
  }
  return newDate;
};

const CalendarComponent = () => {
  useEffect(() => {
    const calendar = new Calendar("#calendar", {
      defaultView: "month",
      taskView: true,
      scheduleView: true,
      useDetailPopup: true,
      useCreationPopup: true,
      template: {
        monthDayname(dayname) {
          return `<span class="calendar-week-dayname-name">${dayname.label}</span>`;
        },
        milestone(schedule) {
          return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
        },
        milestoneTitle() {
          return "Milestone";
        },
        allday(schedule) {
          return `${schedule.title}<i class="fa fa-refresh"></i>`;
        },
        alldayTitle() {
          return "All Day";
        },
      },
      theme: myTheme,
      week: {
        showTimezoneCollapseButton: true,
        timezonesCollapsed: true,
      },
      month: {
        startDayOfWeek: 0,
      },
      timezones: [
        {
          timezoneOffset: 540,
          displayLabel: "GMT+09:00",
          tooltip: "Seoul",
        },
        {
          timezoneOffset: -420,
          displayLabel: "GMT-08:00",
          tooltip: "Los Angeles",
        },
      ],
    });

    const calendars = [
      {
        id: "0",
        name: "Private",
        bgColor: "#9e5fff",
        borderColor: "#9e5fff",
      },
      {
        id: "1",
        name: "Company",
        bgColor: "#00a9ff",
        borderColor: "#00a9ff",
      },
    ];

    const schedules = [
      {
        id: "1",
        calendarId: "0",
        title: "TOAST UI Calendar Study",
        category: "time",
        dueDateClass: "",
        start: today.toISOString(),
        end: getDate("hours", today, 3, "+").toISOString(),
      },
      {
        id: "2",
        calendarId: "0",
        title: "Practice",
        category: "milestone",
        dueDateClass: "",
        start: getDate("date", today, 1, "+").toISOString(),
        end: getDate("date", today, 1, "+").toISOString(),
        isReadOnly: true,
      },
      {
        id: "3",
        calendarId: "0",
        title: "FE Workshop",
        category: "allday",
        dueDateClass: "",
        start: getDate("date", today, 2, "-").toISOString(),
        end: getDate("date", today, 1, "-").toISOString(),
        isReadOnly: true,
      },
      {
        id: "4",
        calendarId: "0",
        title: "Report",
        category: "time",
        dueDateClass: "",
        start: today.toISOString(),
        end: getDate("hours", today, 1, "+").toISOString(),
      },
    ];

    // 캘린더에 일정 추가
    calendar.createSchedules(schedules);
    // 캘린더 설정 추가
    calendar.setCalendars(calendars);

    // 일정 생성 이벤트 핸들러 추가
    calendar.on("beforeCreateSchedule", (event) => {
      const { start, end, title, calendarId } = event;
      calendar.createSchedules([
        {
          id: String(Math.random()), // 임의의 ID 생성
          calendarId: calendarId || "0", // 기본 캘린더 ID 설정
          title,
          category: "time",
          dueDateClass: "",
          start,
          end,
        },
      ]);
    });

    // 일정 수정 이벤트 핸들러 추가
    calendar.on("beforeUpdateSchedule", (event) => {
      const { schedule, changes } = event;

      calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
    });

    // 일정 삭제 이벤트 핸들러 추가
    calendar.on("beforeDeleteSchedule", (event) => {
      const { id, calendarId } = event.schedule;

      calendar.deleteSchedule(id, calendarId);
    });

    return () => {
      calendar.destroy(); // 컴포넌트가 언마운트될 때 Calendar 인스턴스 해제
    };
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

  return <div id="calendar"></div>;
};

export default CalendarComponent;
