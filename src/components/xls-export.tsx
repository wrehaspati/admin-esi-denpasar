/* eslint-disable @typescript-eslint/no-explicit-any */
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface XLSEXPORTProps<T> {
    data: any[];
    fileName: string;
    dataSpreadFn?: (item: T) => Record<string, unknown>;
}

const XLSEXPORT = <T,>({ data, fileName, dataSpreadFn }: XLSEXPORTProps<T>) => {
    const flatData = dataSpreadFn ? data.map((item) => dataSpreadFn(item)) : data.map((item: any) => item.original);
    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `${fileName}.xlsx`);
}

export default XLSEXPORT;