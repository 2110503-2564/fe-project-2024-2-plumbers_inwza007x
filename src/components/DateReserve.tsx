import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface DateReserveProps {
    value: Date;
    onChange: (date: Date) => void;
}

export default function DateReserve({ value, onChange }: DateReserveProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={dayjs(value)} onChange={(newValue) => onChange(newValue ? newValue.toDate() : new Date())} />
        </LocalizationProvider>
    );
}
