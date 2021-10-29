import React, { useCallback, useMemo } from 'react';
import { useState } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const closeNotification = useCallback(() => {
    if (!notifications.length) {
      return;
    }
    const updated = notifications.slice(1);
    setNotifications(updated);
  }, [notifications, setNotifications]);

  const addNotification = useCallback(
    (text: string) => {
      console.log('addNotificatons ----', notifications);
      setNotifications([...notifications, text]);
      // setTimeout(() => {
      //   closeNotification();
      // }, 2000);
    },
    [notifications, setNotifications]
  );

  const NotificationList = useMemo(
    () => (
      <div className="notificationList">
        {notifications.map((text) => (
          <div key={text}>{text}</div>
        ))}
      </div>
    ),
    [notifications]
  );

  return {
    NotificationList,
    addNotification,
    notifications,
  };
};
