var container = d3.selectAll(".container");

function updateCells(cells) {
    return cells.style("background-color", function(d) {
        console.log("update", d);
        return "hsl(" + d/30.0 * 360 + ",100%,50%)";
    }).text(String)
}

function updateData(data) {
    var table = d3.select("table");
    var rows = table.selectAll("tr").data(data);
    rows.enter().append("tr");
    rows.exit().remove();

    var cells = rows.selectAll("td").data(function(d) {return d;});
    updateCells(cells);

    var appendedCells = cells.enter().append("td");
    updateCells(appendedCells);
    cells.exit().remove();

    return cells;
}

updateData([[1, 2, 3], [4, 5, 6], [8]])
