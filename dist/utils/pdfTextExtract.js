"use strict";
// import pdf from 'pdf-parse'
// import fs from 'fs'
// import path from 'path'
// export const pdfTextExtract = async (file: string) => {
//     // console.log('FILE', file)
//     // const binaryData = file
//     // const saveDirectory = path.join(__dirname, "..", "common");
//     // const filePath = path.resolve(saveDirectory, 'curriculo.pdf');
//     // if (!fs.existsSync(saveDirectory)) {
//     //     fs.mkdirSync(saveDirectory);
//     // }
//     // fs.writeFileSync(filePath, binaryData, 'binary');
//     // const dataBuffer = fs.readFileSync(filePath);
//     const test = {data: file}
//    return pdf(test).then(function(data) {
//         // Data agora contém o texto extraído do PDF
//         console.log('Texto extraído do PDF:');
//         console.log(data.text);
//     }).catch(function(error) {
//         console.log('Erro ao extrair texto do PDF:', error);
//     });
// }
// // function base64toPDF(data) {
// //     var bufferArray = base64ToArrayBuffer(data);
// //     var blobStore = new Blob([bufferArray], { type: "application/pdf" });
// //     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
// //         window.navigator.msSaveOrOpenBlob(blobStore);
// //         return;
// //     }
// //     var data = window.URL.createObjectURL(blobStore);
// //     var link = document.createElement('a');
// //     document.body.appendChild(link);
// //     link.href = data;
// //     link.download = "file.pdf";
// //     link.click();
// //     window.URL.revokeObjectURL(data);
// //     link.remove();
// // }
// function base64ToArrayBuffer(data: string) {
//     var bString = window.atob(data);
//     var bLength = bString.length;
//     var bytes = new Uint8Array(bLength);
//     for (var i = 0; i < bLength; i++) {
//         var ascii = bString.charCodeAt(i);
//         bytes[i] = ascii;
//     }
//     return bytes;
// };
//# sourceMappingURL=pdfTextExtract.js.map