var game_field = [];
function create_game_field() {
    for (var i = 0; i < 9; i++) {
        game_field[i] = [];
        for (var j = 0; j < 9; j++) {
            game_field[i][j] = [];
            for (var k = 0; k < 9; k++) {
                game_field[i][j][k] = k;
            }
        }
    }
}
create_game_field();
//console.log(game_field);
//var elem = document.getElementsByClassName("quad")[10];


//HOW TO GENERATE LIST OF 9
/*var ul = document.createElement("ul");
ul.className = "block_small_numbers";
var elements = [];
for (var i = 0; i < 9; i++) {
    elements[i] = document.createElement("li");
    elements[i].className = "small_number";
    elements[i].innerHTML = i + 1;
    ul.appendChild(elements[i]);
}
elem.innerHTML = "";
elem.appendChild(ul);
*/


//HIGHLIGHT SELECTED QUAD, LINE AND COLUMN
var previous_selected_quad_id = -1;
var gui_game_field = document.getElementsByClassName("quad");
var previous_selected_quad_row = -1;
var previous_selected_quad_column = -1;
for(i=0; i <9*9;i++){
    gui_game_field[i].onclick = function(event){
        //selected_quad_id        
        var id = this.getAttribute("data-id");
        console.log(id);
        var current_row = Math.floor(id/9);
        console.log(current_row);
        var current_column = id - current_row*9;
        console.log(current_column);
        if(previous_selected_quad_id!=-1){
            var str = gui_game_field[previous_selected_quad_id].className;            
            //console.log(str);
            str = str.replace(/ selected /gi,"");            
            gui_game_field[previous_selected_quad_id].className=str;
            //console.log(gui_game_field[previous_selected_quad_id].className);
            if(previous_selected_quad_row!=current_row){
                for(var j=0;j<9;j++){
                    gui_game_field[previous_selected_quad_row*9 + j].className = str.replace(/ line /gi,"");
                
                }            
            }
            if(previous_selected_quad_column!=current_column){
                for(var j=0;j<9;j++){
                    gui_game_field[j*9 + previous_selected_quad_column].className = str.replace(/ line /gi,"");
                }
            }
        }        
        for(var j=0;j<9;j++){
            var str = gui_game_field[current_row*9 + j].className;
            gui_game_field[current_row*9 + j].className = str.replace(/ line /gi,"");
            gui_game_field[current_row*9 + j].className+= " line ";
            var str2 = gui_game_field[j*9 + current_column].className;
            gui_game_field[j*9 + current_column].className = str2.replace(/ line /gi,"");
            gui_game_field[j*9 + current_column].className+=" line ";
        }
        
        previous_selected_quad_id = id;
        previous_selected_quad_row = current_row;
        previous_selected_quad_column = current_column;
        this.className+=" selected ";
    }
}

//fill game_field array with 0 or int
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        if(gui_game_field[i*9 + j].innerHTML=="0"){
            gui_game_field[i *9+ j].innerHTML='';
            game_field[i][j] = 0;
        }
        else{
            game_field[i][j] = parseInt(gui_game_field[i*9 + j].innerHTML, 10);
        }
    }
}
console.log(game_field);


var fill_empty_cells_button = document.getElementById("fill_empty_button");
fill_empty_cells_button.onclick = fill_empty;

//fill array 1..9 for empty cells and draw it
function fill_empty(){
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if(game_field[i][j] == 0){
                game_field[i][j] = [];
                for (var k = 0; k < 9; k++) {
                    game_field[i][j][k]=k+1;
                }
            }
            
        }
    }
    draw_field();
}


//fill numbers from game_field array to gui_game_field to interface
function draw_field(){        
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if(game_field[i][j] == 0){
                gui_game_field[i*9+j].innerHTML = "";
            }
            if(Array.isArray(game_field[i][j])){
                var ul = document.createElement("ul");
                ul.className = "block_small_numbers";
                var elements = [];
                for (var k = 0; k < 9; k++) {
                    elements[k] = document.createElement("li");
                    elements[k].className = "small_number";
                    elements[k].innerHTML = game_field[i][j][k];
                    ul.appendChild(elements[k]);
                }
                gui_game_field[i*9+j].innerHTML = "";
                gui_game_field[i*9+j].appendChild(ul);
            }
        }
    }
}

