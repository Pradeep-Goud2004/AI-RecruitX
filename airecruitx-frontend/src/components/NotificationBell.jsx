import { useEffect, useRef, useState } from "react";
import { FaBell, FaCheck, FaCheckDouble } from "react-icons/fa";
import api from "../services/api";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);

    // Load notifications
    const loadNotifications = async () => {
        try {
            const [notificationsResponse, countResponse] = await Promise.all([
                api.get("/notifications"),
                api.get("/notifications/unread-count")
            ]);

            setNotifications(notificationsResponse.data);
            setUnreadCount(countResponse.data.count);
        } catch (error) {
            console.error("Failed to load notifications:", error);
        }
    };

    useEffect(() => {
        loadNotifications();

        // Refresh notifications every 30 seconds
        const interval = setInterval(loadNotifications, 30000);

        return () => clearInterval(interval);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Mark one notification as read
    const markAsRead = async (notificationId) => {
        try {
            await api.put(`/notifications/${notificationId}/read`);

            setNotifications((previous) =>
                previous.map((notification) =>
                    notification.id === notificationId
                        ? { ...notification, read: true }
                        : notification
                )
            );

            setUnreadCount((previous) =>
                Math.max(0, previous - 1)
            );
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };

    // Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            await api.put("/notifications/read-all");

            setNotifications((previous) =>
                previous.map((notification) => ({
                    ...notification,
                    read: true
                }))
            );

            setUnreadCount(0);
        } catch (error) {
            console.error("Failed to mark all notifications:", error);
        }
    };

    // Format notification time
    const formatTime = (createdAt) => {
        if (!createdAt) return "";

        const date = new Date(createdAt);
        const now = new Date();

        const difference = Math.floor(
            (now - date) / 1000
        );

        if (difference < 60) {
            return "Just now";
        }

        if (difference < 3600) {
            return `${Math.floor(difference / 60)} min ago`;
        }

        if (difference < 86400) {
            return `${Math.floor(difference / 3600)} hr ago`;
        }

        if (difference < 604800) {
            return `${Math.floor(difference / 86400)} days ago`;
        }

        return date.toLocaleDateString();
    };

    return (
        <div className="notification-wrapper" ref={dropdownRef}>

            {/* Notification Bell */}
            <button
                className="notification-button"
                onClick={() => setOpen((previous) => !previous)}
                aria-label="Notifications"
            >
                <FaBell />

                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

            {/* Notification Dropdown */}
            {open && (
                <div className="notification-dropdown">

                    <div className="notification-header">
                        <div>
                            <h3>Notifications</h3>

                            {unreadCount > 0 && (
                                <span>
                                    {unreadCount} unread
                                </span>
                            )}
                        </div>

                        {unreadCount > 0 && (
                            <button
                                className="mark-all-button"
                                onClick={markAllAsRead}
                            >
                                <FaCheckDouble />
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="notification-list">

                        {notifications.length === 0 ? (
                            <div className="no-notifications">
                                <FaBell />
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${
                                        !notification.read
                                            ? "unread"
                                            : ""
                                    }`}
                                >
                                    <div className="notification-icon">
                                        <FaBell />
                                    </div>

                                    <div className="notification-content">
                                        <p>
                                            {notification.message}
                                        </p>

                                        <div className="notification-meta">
                                            <span>
                                                {formatTime(
                                                    notification.createdAt
                                                )}
                                            </span>

                                            {!notification.read && (
                                                <button
                                                    onClick={() =>
                                                        markAsRead(
                                                            notification.id
                                                        )
                                                    }
                                                    title="Mark as read"
                                                >
                                                    <FaCheck />
                                                    Read
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;