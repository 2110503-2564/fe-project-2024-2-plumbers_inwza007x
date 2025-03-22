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
    dentistID: string;
    bookDate: Date;
    userID?: string | null;
}

export interface UserItem {
    userID: string | null;
}