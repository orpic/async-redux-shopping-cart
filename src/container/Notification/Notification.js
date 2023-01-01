import React from "react";
import "./Notification.css";

const Notification = ({ status, title, message }) => {
  //
  let specialClasses = "";

  if (status === "error") {
    specialClasses = "noti-error";
  }

  if (status === "success") {
    specialClasses = "noti-success";
  }

  const cssClasses = `${"notification"} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <p className="notification-title">{title}</p>
      <p className="notification-message">{message}</p>
    </section>
  );
};

export default Notification;
