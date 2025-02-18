/* eslint-disable @typescript-eslint/no-explicit-any */
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface XLSEXPORTProps<T> {
    data: any[];
    fileName: string;
    dataSpreadFn?: (item: T) => Record<string, unknown>;
}

const flattenObject = (obj: any, prefix = ""): Record<string, unknown> => {
    if (!obj || typeof obj !== "object") return {};

    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        const newKey = prefix ? `${prefix}_${key}` : key;

        if (typeof value === "object" && value !== null) {
            Object.assign(acc, flattenObject(value, newKey)); 
        } else {
            acc[newKey] = value ?? ""; 
        }

        return acc;
    }, {} as Record<string, unknown>);
};

const XLSEXPORT = <T,>({ data, fileName, dataSpreadFn }: XLSEXPORTProps<T>) => {
    const flatData = data.map((item) => {
        const transformed = dataSpreadFn ? dataSpreadFn(item) : item.original;
        return flattenObject(transformed); 
    });

    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
};

export default XLSEXPORT;
