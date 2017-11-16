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
//fill game_field array with 0 or int
var gui_game_field = document.getElementsByClassName("quad");
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        if(gui_game_field[i*9 + j].innerHTML=="0"){
            gui_game_field[i *9+ j].innerHTML='';
            game_field[i][j] = 0;
        }
        else{            
            game_field[i][j] = parseInt(gui_game_field[i*9 + j].innerHTML);            
        }
    }
}
//console.log(game_field);
////////////////////////////////

//HIGHLIGHT SELECTED QUAD, LINE AND COLUMN
var current_selected_quad_id = -1;
var previous_selected_quad_id = -1;
var previous_selected_quad_row = -1;
var previous_selected_quad_column = -1;
var current_row;
var current_column;
var current_quad_start_column;
var current_quad_start_row;
for(i=0; i <9*9;i++){
    gui_game_field[i].onclick = function(event){
        //selected_quad_id        
        var id = this.getAttribute("data-id");
        current_selected_quad_id = id;
        //console.log(id);
        current_row = Math.floor(id/9);
        // console.log(current_row);
        current_column = id - current_row*9;
        //console.log(current_column);
        current_quad_start_row = Math.floor(current_row/3)*3;
        current_quad_start_column = Math.floor(current_column/3)*3;
        //console.log(current_quad_start_row);
        //console.log(current_quad_start_column);
        //console.log(game_field[current_row][current_column]);        
        var current_game_field_value = game_field[current_row][current_column];        
        if(previous_selected_quad_id!=-1){
            var str = gui_game_field[previous_selected_quad_id].className;            
            //console.log(str);
            str = str.replace(/ selected /gi,"");            
            gui_game_field[previous_selected_quad_id].className=str;
            //console.log(gui_game_field[previous_selected_quad_id].className);
            if(previous_selected_quad_row!=current_row){
                for(var j=0;j<9;j++){
                    str = gui_game_field[previous_selected_quad_row*9 + j].className;
                    gui_game_field[previous_selected_quad_row*9 + j].className = str.replace(/ line /gi,"");
                
                }            
            }
            if(previous_selected_quad_column!=current_column){
                for(var j=0;j<9;j++){
                    str = gui_game_field[j*9 + previous_selected_quad_column].className;
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




var fill_empty_cells_button = document.getElementById("fill_empty_button");
fill_empty_cells_button.onclick = fill_empty;

//fill array 1..9 for empty cells and draw it
function fill_empty(event, to_draw){    
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
    if(typeof to_draw === "undefined"){
        draw_field();
    }
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
                    //elements[k].innerHTML = game_field[i][j][k];
                    elements[k].innerHTML = k+1;
                    if(game_field[i][j][k]==0){
                        elements[k].className+=" deleted ";
                    }
                    ul.appendChild(elements[k]);
                }
                gui_game_field[i*9+j].innerHTML = "";
                gui_game_field[i*9+j].appendChild(ul);
            }
        }
    }
}

var clear_horizontal_button = document.getElementById("clear_horizontal_button");
clear_horizontal_button.onclick = clear_horizontal;
function clear_horizontal(event, row_index){
    var to_draw =0;
    if(typeof row_index ==="undefined"){
        row_index = current_row;
        to_draw=1;
    } 
    for(var i=0; i <9; i++){
        if(!Array.isArray(game_field[row_index][i])){
            var value_to_test_against = game_field[row_index][i];
            for(var j =0; j<9; j++){
                var tested_value = game_field[row_index][j];
                if(Array.isArray(tested_value)){
                    for(var k=0; k <9; k++){
                        if(tested_value[k] == value_to_test_against){
                            tested_value[k] = 0;
                            //console.log(tested_value)
                            //console.log(value_to_test_against)
                            
                        }
                    }
                }
            }
        }
        
    }
    if(to_draw==1){
        draw_field();
    }
}

var clear_vertical_button = document.getElementById("clear_vertical_button");
clear_vertical_button.onclick = clear_vertical;
function clear_vertical(event, column_index){
    var to_draw =0;
    if(typeof column_index ==="undefined"){
        column_index = current_column;
        to_draw=1;
    }    
    
    for(var i=0; i <9; i++){
        if(!Array.isArray(game_field[i][column_index])){
            var value_to_test_against = game_field[i][column_index];
            for(var j =0; j<9; j++){
                var tested_value = game_field[j][column_index];
                if(Array.isArray(tested_value)){
                    for(var k=0; k <9; k++){
                        if(tested_value[k] == value_to_test_against){
                            tested_value[k] = 0;
                            //console.log(tested_value)
                            //console.log(value_to_test_against)
                            
                        }
                    }
                }
            }
        }
        
    }
    if(to_draw==1){
        draw_field();
    }
}

var clear_quad_button = document.getElementById("clear_quad_button");
clear_quad_button.onclick = clear_quad;
function clear_quad(event, column_index,row_index){
   var to_draw =0;
    if(typeof column_index ==="undefined"){
        column_index = current_quad_start_column;
        row_index = current_quad_start_row;
        to_draw=1;
    }   
    for(var i=column_index; i <column_index+3; i++){
        for(var j=row_index; j <row_index+3; j++){        
            if(!Array.isArray(game_field[j][i])){
                var value_to_test_against = game_field[j][i];
                for(var n=column_index; n <column_index+3; n++){
                    for(var m=row_index; m <row_index+3; m++){
                        var tested_value = game_field[m][n];
                        if(Array.isArray(tested_value)){
                            for(var k=0; k <9; k++){
                                if(tested_value[k] == value_to_test_against){
                                    tested_value[k] = 0;
                                    //console.log(tested_value)
                                    //console.log(value_to_test_against)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
   if(to_draw==1){
        draw_field();
    }
}

var fill_draft_button = document.getElementById("fill_draft_button");
fill_draft_button.onclick = function(event){
    fill_empty(null,0);
    for(var i=0; i<9; i++){
        clear_vertical(null,i);
        clear_horizontal(null,i);
    }
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            clear_quad(null,i*3,j*3);
        }
    }
    draw_field();
    //clear_horizontal();
    
}

var log_game_field_to_console_button = document.getElementById("log_game_field_to_console");
log_game_field_to_console.onclick = function(event){
    console.log(game_field);
}