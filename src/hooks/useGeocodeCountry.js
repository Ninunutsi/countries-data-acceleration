import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_KEY = "AIzaSyDkbN18AI3TuRm4_WJszAdk5v2xukNLe0o"

export default function useGeocodeCountry() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [country, setCountry] = useState('');
    const [loadingCode, setLoadingCode] = useState(true);
  
    useEffect(() => {
      const fetchLocation = async () => {
        try {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
              },
              (error) => {
                console.error('Error getting geolocation:', error);
              }
            );
          } else {
            console.error('Geolocation not available in this browser.');
          }
        } catch (error) {
          console.error('Error fetching geolocation:', error);
        }
      };
  
      const fetchCountry = async () => {
        try {
          if (latitude !== null && longitude !== null) {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
            );
  
            if (response.data.status === 'OK') {
              const addressComponents = response.data.results[0].address_components;
              for (const component of addressComponents) {
                if (component.types.includes('country')) {
                  setCountry(component.long_name);
                  break;
                }
              }
            } else {
              console.error('Geocoding error:', response.data.status);
            }
          } else {
            console.error('Latitude and/or longitude is null.');
          }
        } catch (error) {
          console.error('Error geocoding:', error);
        } finally {
          setLoadingCode(false);
        }
      };
  
      fetchLocation();
      fetchCountry();
    }, [latitude, longitude]);
  
    return { country, loadingCode };
}