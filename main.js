
function init(){
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(1, 0.5, 0.5, 1);

    //cube = new Cube(gl, 6);
    square = new Square(gl);
    render();
}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    square.render();
}

window.onload = init;