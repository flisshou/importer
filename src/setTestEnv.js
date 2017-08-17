import mongoose from 'mongoose';
import XLSX from 'xlsx';
import config from './config';
import ProjectController from './controller/project';

mongoose.connect(config.databaseUri, {
    useMongoClient: true,
});

console.log('Setting up Test Fixture...');

const workbook = XLSX.readFile(config.filePath);
const content = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

content.forEach((c) => {
    console.log('Data------------------------------------------------------------');
    console.dir(c);
    const pc = new ProjectController(c.Username, c.ProjectName);
    // pc.addProject();
    // pc.setUser();
    // pc.removeProject();
});

