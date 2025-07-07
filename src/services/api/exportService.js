import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { saveAs } from 'file-saver'

export const exportService = {
  exportToCSV: (data, filename) => {
    try {
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${filename}.csv`);
      return true;
    } catch (error) {
      throw new Error(`CSV export failed: ${error.message}`);
    }
  },

  exportToExcel: (data, filename) => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      
      // Auto-size columns
      const columnWidths = Object.keys(data[0]).map(key => ({
        wch: Math.max(key.length, ...data.map(row => String(row[key]).length)) + 2
      }));
      worksheet['!cols'] = columnWidths;
      
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
      XLSX.writeFile(workbook, `${filename}.xlsx`);
      return true;
    } catch (error) {
      throw new Error(`Excel export failed: ${error.message}`);
    }
  },

  exportToPDF: (data, filename, title) => {
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text(title, 20, 20);
      
      // Prepare table data
      const headers = Object.keys(data[0]);
      const rows = data.map(row => headers.map(header => row[header]));
      
      // Add table
      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
        theme: 'grid',
        styles: {
          fontSize: 8,
          cellPadding: 3
        },
        headStyles: {
          fillColor: [99, 102, 241],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        }
      });
      
      doc.save(`${filename}.pdf`);
      return true;
    } catch (error) {
      throw new Error(`PDF export failed: ${error.message}`);
    }
  }
};