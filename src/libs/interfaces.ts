export interface DentistItem {
    DentistID: number;
    name: string;
    experience: number;
    expertise: string;
}

export interface DentistJson {
    success: boolean;
    pagination: object;
    data: DentistItem[];
}

export interface DentistResponse {
    success: boolean;
    data: DentistItem;
}

export interface BookingItem {
    dentistID: number;
    bookDate: Date;
    userID?: number | null;
}

export interface UserItem {
    userID: number | null;
}