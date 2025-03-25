/* eslint-disable @typescript-eslint/no-explicit-any */
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

interface XLSEXPORTProps<T> {
    data: any[]
    fileName: string
    dataSpreadFn?: (item: T) => Record<string, unknown>
}

const flattenObject = (obj: any, prefix = ""): Record<string, unknown> => {
    if (!obj || typeof obj !== "object") return {}

    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key]
        const newKey = prefix ? `${prefix}_${key}` : key

        if (Array.isArray(value)) {
            acc[newKey] = value // Arrays are handled separately
        } else if (typeof value === "object" && value !== null) {
            Object.assign(acc, flattenObject(value, newKey))
        } else {
            acc[newKey] = value ?? ""
        }

        return acc
    }, {} as Record<string, unknown>)
}

// const autoFitColumns = (worksheet: XLSX.WorkSheet, jsonData: Record<string, unknown>[]) => {
//     const colWidths = Object.keys(jsonData[0] || {}).map((key) => ({
//         wch: Math.max(
//             key.length, // Header length
//             ...jsonData.map((row) => (row[key] ? String(row[key]).length : 10)) // Default min width 10
//         ),
//     }))

//     worksheet["!cols"] = colWidths // Apply column widths
// }

const expandDataToRows = (data: any[], dataSpreadFn?: (item: any) => Record<string, unknown>) => {
    const expandedRows: Record<string, unknown>[] = []

    data.forEach((item) => {
        const transformed = dataSpreadFn ? dataSpreadFn(item) : item.original
        const flatItem = flattenObject(transformed)

        // Identify array fields and their positions
        const columnOrder = Object.keys(flatItem)
        const arrayFields = Object.keys(transformed).filter((key) => Array.isArray(transformed[key]))
        const arrayPositions = arrayFields.map((key) => columnOrder.indexOf(key))

        const maxLength = arrayFields.length > 0
            ? Math.max(...arrayFields.map((key) => transformed[key].length))
            : 1

        for (let i = 0; i < maxLength; i++) {
            const newRow: Record<string, unknown> = { ...flatItem } // Default: keep all fields

            // Remove array placeholders
            arrayFields.forEach((key) => delete newRow[key])

            const arrayData: Record<string, unknown> = {}
            arrayFields.forEach((key) => {
                if (transformed[key][i]) {
                    const flatArrayItem = flattenObject(transformed[key][i], key)
                    Object.assign(arrayData, flatArrayItem)
                }
            })

            // Convert object to array for ordered insertion
            const orderedColumns = Object.entries(newRow)
            arrayFields.forEach((field, index) => {
                if (arrayPositions[index] !== -1) {
                    orderedColumns.splice(arrayPositions[index], 0, ...Object.entries(arrayData))
                } else {
                    Object.assign(newRow, arrayData) // Fallback if position not found
                }
            })

            expandedRows.push(Object.fromEntries(orderedColumns))
        }
    })

    return expandedRows
}

const XLSEXPORT = <T,>({ data, fileName, dataSpreadFn }: XLSEXPORTProps<T>) => {
    const flatData = expandDataToRows(data, dataSpreadFn)

    const worksheet = XLSX.utils.json_to_sheet(flatData)
    // autoFitColumns(worksheet, flatData) // Auto-fit column widths

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, `${fileName}.xlsx`)
}

export default XLSEXPORT
