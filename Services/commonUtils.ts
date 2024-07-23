import moment from "moment";

export function formatDate(dateValue: string| null, format: string): string {
    if (dateValue)
        return moment(dateValue).format(format);
    else 
        return '';
}