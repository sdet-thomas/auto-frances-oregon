import fs from 'fs';
import path from 'path';

export type Job = {
  'Employer Name': string;
  'Job Title': string;
  'Location': string;
  'Contact Date': string;
  'Contact Method': string;
  'Results': string;
};

export function loadJobsFromCsv(filePath: string): Job[] {
  const absolutePath = path.resolve(__dirname, '..', filePath);
  
  try {
    const csvData = fs.readFileSync(absolutePath, 'utf8');
    const lines = csvData.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      console.error('CSV file is empty or contains only headers');
      return [];
    }

    // Get column indices from header row
    const headers = lines[0].split(',').map(header => header.trim());
    console.log('Headers:', headers);
    
    const dateIdx = headers.indexOf('Contact Date');
    const nameIdx = headers.indexOf('Employer Name');
    const titleIdx = headers.indexOf('Job Title');
    const locIdx = headers.indexOf('Location');
    const methodIdx = headers.indexOf('Contact Method');
    const resultsIdx = headers.indexOf('Results');
    
    if (dateIdx === -1 || nameIdx === -1 || titleIdx === -1 || locIdx === -1 || methodIdx === -1 || resultsIdx === -1) {
      console.error('One or more required columns are missing in the CSV file');
      return [];
    }

    // Parse data rows
    return lines.slice(1).map(line => {
      const fields = line.split(',').map(field => field.trim());
      console.log('Fields:', fields);
      return {
        'Employer Name': fields[nameIdx],
        'Job Title': fields[titleIdx],
        'Location': fields[locIdx],
        'Contact Date': fields[dateIdx],
        'Contact Method': fields[methodIdx],
        'Results': fields[resultsIdx]
      };
    });
  } catch (error) {
    console.error(`Error loading CSV from ${absolutePath}: ${error.message}`);
    return [];
  }
}