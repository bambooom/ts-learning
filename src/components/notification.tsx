/*
 * Created by zhuzi on Wed May 24 2017
 */

import * as NotificationSystem from 'react-notification-system';

export const NotiLevel = {
    Success: 'success',
    Error: 'error',
    Warning: 'warning',
    Info: 'info'
};

export const NotiPosition = {
    TopRight: 'tr',
    TopLeft: 'tl',
    BottomRight: 'br',
    BottomLeft: 'bl',
    TopCenter: 'tc',
    BottomCenter: 'bc',
};

class Notification {
    private notificationSystem: NotificationSystem.System;

    init(notificationSystem: NotificationSystem.System) {
        this.notificationSystem = notificationSystem;
    }

    add(msg: string,
        level: 'success' | 'error',
        autoDismiss: number = 5,
        dismissible: boolean = true,
        position: 'tc' = 'tc') {
        const notification: NotificationSystem.Notification = {
            message: msg,
            level,
            position,
            autoDismiss,
            dismissible,
        };
        this.notificationSystem.addNotification(notification);
    }
}

const noti = new Notification();

export function showError(msg: string) {
    noti.add(msg, 'error');
}

export function showSuccess(msg: string) {
    noti.add(msg, 'success');
}

export default noti;