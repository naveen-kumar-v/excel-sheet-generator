let table = document.getElementsByClassName("sheet-body")[0];
let rows = document.getElementsByClassName("rows")[0];
let columns = document.getElementsByClassName("columns")[0];
let tableExists = false

const generateTable = () => {
    let rowsNumber = parseInt(rows.value);
    let columnsNumber = parseInt(columns.value)
    table.innerHTML = ""

    for (let i = 0; i < rowsNumber; i++) {
        var tableRow = ""
        for (let j = 0; j < columnsNumber; j++) {
            tableRow += `<td contenteditable></td>`
        }
        table.innerHTML += tableRow
    }
    if (rowsNumber > 0 && columnsNumber > 0) {
        tableExists = true
    } else {
        swal({
            title: " Oops!",
            text: " Please enter a valid number of row(s) and column(s)",
        });
    }

}

const ExportToExcel = (type, fn, dl) => {
    if (!tableExists) {
        swal("Uh oh..", "Nothing to export :(");
        return
    }
    var elt = table
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" })
    return dl ? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || ('MyNewSheet.' + (type || 'xlsx')))
}