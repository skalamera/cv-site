import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

async function parseResume() {
    const dataBuffer = new Uint8Array(fs.readFileSync('C:\\Users\\skala\\OneDrive\\Documents\\Resumes\\Resume_2026.pdf'));
    
    try {
        const loadingTask = pdfjsLib.getDocument(dataBuffer);
        const pdfDocument = await loadingTask.promise;
        let fullText = "";

        for (let i = 1; i <= pdfDocument.numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map((item) => item.str);
            fullText += strings.join(" ") + "\n";
        }
        
        console.log(fullText);
    } catch (error) {
        console.error("Error parsing PDF:", error);
    }
}

parseResume();