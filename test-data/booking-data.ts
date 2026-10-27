export interface BookingData {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms: number;
  hotelName: string;
}

export const sampleBooking: BookingData = {
  destination: "Lisbon",
  checkIn: "2027-05-10",
  checkOut: "2027-05-14",
  adults: 2,
  rooms: 1,
  hotelName: "Synthetic Riverside Hotel"
};
