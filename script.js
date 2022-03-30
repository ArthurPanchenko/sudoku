var sudoku_array = [
    [2, 4, 5, 0, 3, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 5],
    [9, 1, 7, 6, 0, 0, 8, 3, 0],
    [4, 5, 3, 0, 0, 9, 1, 0, 0],
    [0, 0, 0, 5, 0, 2, 0, 0, 0],
    [0, 0, 6, 1, 0, 0, 5, 9, 8],
    [0, 9, 2, 0, 0, 6, 3, 8, 7],
    [8, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 5, 4],
]


var sudoku_play_array = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]


var blocked_cells = []
var cell = document.querySelectorAll('.sudoku-cell');
var selected_item = null;
cell.forEach((item, i) => {
    if (sudoku_array[Math.floor(i / 9)][i % 9] != 0) {
        item.textContent = sudoku_array[Math.floor(i / 9)][i % 9];
        sudoku_play_array[Math.floor(i / 9)][i % 9] = sudoku_array[Math.floor(i / 9)][i % 9]
        blocked_cells.push(item);
        item.classList.add('sudoku-cell--default-cell');
    }
    if (!blocked_cells.includes(item)) {
        item.addEventListener('click', (e) => {
        
            if (selected_item != null) {
                selected_item.cell.classList.remove('sudoku-cell--hover');
            }
            if (selected_item != null && e.target == selected_item.cell  ) {
                selected_item = null;
            } else {
                selected_item = {
                    cell: item,
                    pos1: Math.floor(i / 9),
                    pos2: i % 9
                };
                selected_item.cell.classList.add('sudoku-cell--hover');
            }
        })
    }
})


window.addEventListener('keydown', (e) => {
    if (e.keyCode > 48 && e.keyCode < 58 && selected_item != null) {
        selected_item.cell.textContent = '' + e.key + '';
        sudoku_play_array[selected_item.pos1][selected_item.pos2] = parseInt(e.key);
    }
})



function is_array_complete() {
    var count = 0;
    for (var elem of sudoku_play_array) {
        if (!(elem.includes(0))) {
            count++;
        }
    }
    if (count == 9) {
        return true;
    } else {
        return false;
    }
    
}


function check_rows() {
    var check = 0;
    for (var row of sudoku_play_array) {
        var set = new Set(row);
        if (row.length == set.size) {
            check++;
        }
    }
    if (check == 9) {
        return true;
    } else {
        return false;
    }
}


function check_columns() {
    var check = 0
    for (let i = 0; i < sudoku_play_array.length; i++) {
        var temp_arr = [];
        for (var elem of sudoku_play_array) {
            
            temp_arr.push(elem[i]);
        }
        var temp_set = new Set(temp_arr)
        if (temp_arr.length == temp_set.size) {
            check++;
        }
    }
    if (check == 9) {
        return true;
    } else {
        return false;
    }
}


function check_boxes() {
    countI = 0
    countJ = 0
    count = 0
    check = 0
    for (let i = 0; i < sudoku_play_array.length; i++) {
        temp_arr = []
        if (countI == 9) {
            countI = 0;
            countJ += 3
        }
        for (let j = countI; j < countI + 3; j++) {

            for (let k = countJ; k < countJ + 3; k++) {
                temp_arr.push(sudoku_play_array[j][k])
                count++
            }
        }
        temp_set = new Set(temp_arr);
        if (temp_arr.length == temp_set.size) {
            check++;
        }
        countI += 3
    }
    if (check == 9) {
        return true;
    } else {
        return false
    }
}


readyBtn = document.querySelector('.check-sudoku');

readyBtn.addEventListener('click', () => {
    if (is_array_complete()) {
        if (check_rows() && check_columns() && check_boxes()) {
            alert('GRAZZZZZ')
        }
    }
})
