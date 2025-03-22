export interface BookingItem {
    dentistID: number;
    bookDate: Date;
    userID?: string | null;
}

export interface UserItem {
    userID: string | null;
}