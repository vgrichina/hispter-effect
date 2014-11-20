var container = d3.selectAll(".container");

function updateCells(cells) {
    return cells.style("background-color", function(d) {
        return "hsla(" + 50 * d.style + ",100%,50%," +
            (d.hipster ? "0.5)" : "0.25)");
    })
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

var NUM_CELLS = 50;

var data = [];
for (var i = 0; i < NUM_CELLS; i++) {
    data.push([]);
    for (var j = 0; j < NUM_CELLS; j++) {
        data[i].push({
            //hipster: (i+j) % 2,
            hipster: Math.random() > 0.2,
            style: 0
        });
    }
}

updateData(data);

function map2d(data, fn) {
    return data.map(function(row, i) {
        return row.map(function (d, j) {
            return fn(d, i, j);
        });
    });
}

function percentOfSameStyleNeighbors(data, si, sj) {
    var RADIUS = 10;
    var total = 0;
    var matching = 0;
    for (var i = Math.max(si - RADIUS, 0); i < Math.min(si + RADIUS, data.length - 1); i++) {
        for (var j = Math.max(sj - RADIUS, 0); j < Math.min(sj + RADIUS, data[i].length - 1); j++) {
            total ++;
            if (data[i][j].style == data[si][sj].style) {
                matching++;
            }
        }
    }
    return matching * 1.0 / total;
}

function step() {
    data = map2d(data, function(d, i, j) {
        var sameStylePercent = percentOfSameStyleNeighbors(data, i, j);
        if (d.hipster) {
            sameStylePercent = 1.0 - sameStylePercent;
        }

        var shouldChange = sameStylePercent < 0.5 && Math.random() > 0.75;

        return {
            hipster: d.hipster,
            style: (shouldChange ? !d.style : d.style)
        }
    });
    updateData(data);
}

function stepAnimate() {
    step();
    //setTimeout(stepAnimate, 300);
    //requestAnimationFrame(stepAnimate);
}

stepAnimate();
