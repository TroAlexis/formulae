import { NotificationProps, notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const notifySuccess = (notification: NotificationProps) => {
  return notifications.show({
    color: "teal",
    icon: <IconCheck />,
    ...notification,
  });
};

export const notifyError = (notification: NotificationProps) => {
  return notifications.show({
    color: "red",
    icon: <IconX />,
    ...notification,
  });
};
