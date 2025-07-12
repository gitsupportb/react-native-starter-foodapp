const GOOGLE_PLACES_API_KEY = 'your-google-places-api-key';

export interface Place {
  id: string;
  name: string;
  address: string;
  rating: number;
  priceLevel: number;
  types: string[];
  photos: string[];
  openingHours: any;
  phoneNumber: string;
  website: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export const searchNearbyRestaurants = async (
  latitude: number,
  longitude: number,
  radius: number = 5000,
  type: string = 'restaurant'
): Promise<Place[]> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_PLACES_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK') {
      return data.results.map((place: any) => ({
        id: place.place_id,
        name: place.name,
        address: place.vicinity,
        rating: place.rating || 0,
        priceLevel: place.price_level || 0,
        types: place.types || [],
        photos: place.photos?.map((photo: any) => photo.photo_reference) || [],
        openingHours: place.opening_hours,
        phoneNumber: place.formatted_phone_number,
        website: place.website,
        geometry: place.geometry,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error searching nearby restaurants:', error);
    return [];
  }
};

export const getPlaceDetails = async (placeId: string): Promise<Place | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,rating,price_level,types,photos,opening_hours,formatted_phone_number,website,geometry&key=${GOOGLE_PLACES_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK') {
      const place = data.result;
      return {
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        rating: place.rating || 0,
        priceLevel: place.price_level || 0,
        types: place.types || [],
        photos: place.photos?.map((photo: any) => photo.photo_reference) || [],
        openingHours: place.opening_hours,
        phoneNumber: place.formatted_phone_number,
        website: place.website,
        geometry: place.geometry,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
};