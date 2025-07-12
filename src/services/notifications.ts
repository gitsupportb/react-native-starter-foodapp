import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestNotificationPermissions = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Notification permissions not granted');
      return false;
    }
    
    // Get the token for push notifications
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Push token:', token);
    
    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

export const scheduleLocalNotification = async (
  title: string,
  body: string,
  data?: any,
  trigger?: Notifications.NotificationTriggerInput
) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: trigger || null,
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error canceling notifications:', error);
  }
};

export const getBadgeCount = async () => {
  try {
    return await Notifications.getBadgeCountAsync();
  } catch (error) {
    console.error('Error getting badge count:', error);
    return 0;
  }
};

export const setBadgeCount = async (count: number) => {
  try {
    await Notifications.setBadgeCountAsync(count);
  } catch (error) {
    console.error('Error setting badge count:', error);
  }
};

// Notification types for Food Buddy
export const NOTIFICATION_TYPES = {
  MATCH_FOUND: 'match_found',
  FRIEND_JOINED: 'friend_joined',
  SMART_SUGGEST: 'smart_suggest',
  CHAT_MESSAGE: 'chat_message',
  SESSION_UPDATE: 'session_update',
} as const;

// Notification templates
export const NOTIFICATION_TEMPLATES = {
  [NOTIFICATION_TYPES.MATCH_FOUND]: {
    title: '🎉 Match Found!',
    body: 'You and your friends found a restaurant match!',
  },
  [NOTIFICATION_TYPES.FRIEND_JOINED]: {
    title: '👋 Friend Joined',
    body: 'A friend joined your food session',
  },
  [NOTIFICATION_TYPES.SMART_SUGGEST]: {
    title: '🍽️ Smart Suggestions',
    body: 'New restaurant suggestions are ready for you!',
  },
  [NOTIFICATION_TYPES.CHAT_MESSAGE]: {
    title: '💬 New Message',
    body: 'You have a new message in your food session',
  },
  [NOTIFICATION_TYPES.SESSION_UPDATE]: {
    title: '📱 Session Update',
    body: 'Your food session has been updated',
  },
} as const;