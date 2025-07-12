import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setLocation, requestLocationPermission, getCurrentLocation } from '../store/slices/locationSlice';

interface LocationContextType {
  location: { latitude: number; longitude: number } | null;
  hasPermission: boolean;
  isLoading: boolean;
  error: string | null;
  requestPermission: () => Promise<void>;
  refreshLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  hasPermission: false,
  isLoading: false,
  error: null,
  requestPermission: async () => {},
  refreshLocation: async () => {},
});

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: React.ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { currentLocation, hasPermission, isLoading, error } = useSelector(
    (state: RootState) => state.location
  );

  const requestPermission = async () => {
    try {
      await dispatch(requestLocationPermission()).unwrap();
      if (hasPermission) {
        await refreshLocation();
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const refreshLocation = async () => {
    try {
      const location = await dispatch(getCurrentLocation()).unwrap();
      dispatch(setLocation(location));
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  useEffect(() => {
    // Check initial permission status
    const checkPermission = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === 'granted') {
        await refreshLocation();
      }
    };

    checkPermission();
  }, []);

  const value: LocationContextType = {
    location: currentLocation,
    hasPermission,
    isLoading,
    error,
    requestPermission,
    refreshLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};