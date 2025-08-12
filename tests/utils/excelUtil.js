import Excel from 'exceljs';


const fileName = "C:/framework/nemo-ui-automaion-wdio/data/testdata.xlsx";

async function excelTest() {

    const workbook = new Excel.Workbook();
    await workbook.xlsx.read(fileName).then(() => {
        const worksheet = workbook.getWorksheet('Sheet1');
        worksheet.eachRow((row, rowNumber) => {

            row.eachCell((cell, celNumber) => {
                console.log(cell.value);
            })
        })

    })

}


