"use client";

import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface DateReserveProps {
    value: string;
    onChange: (date: string) => void;
}

export default function DateReserve({value, onChange}: DateReserveProps) {
    return (
        <div className="w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={value ? dayjs(value) : null} onChange={(newValue) => onChange(newValue ? newValue.format("YYYY-MM-DD") : "")} />
            </LocalizationProvider>
        </div>
    );
}
