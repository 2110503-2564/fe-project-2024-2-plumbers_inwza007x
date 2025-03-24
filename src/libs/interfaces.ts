export interface DentistItem {
    dentistID: number;
    name: string;
    experience: number;
    expertise: string;
}

export interface DentistJson {
    success: boolean;
    pagination?: object;
    data: DentistItem[];
}

export interface DentistResponse {
    success: boolean;
    data: DentistItem;
}

export interface BookingItem {
    bookingID: number;
    userID: number;
    dentistID: number;
    date: Date;
}

export interface BookingJson {
    success: boolean;
    pagination?: object;
    data: BookingItem;
}

export interface UserItem {
    userID: number | null;
    token: string;
}