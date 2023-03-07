    var canvas = undefined;
    var gl = undefined;
    var time = 0.0;

    function init() {
        canvas = document.getElementById("canvas");
        gl = canvas.getContext("webgl2");

        gl.clearColor(0.1, 0.1, 0.1, 1.0);
        
        square = new Square(gl);
        gl.enable(gl.DEPTH_TEST);

        square.P = perspective(45, canvas.width/canvas.height, 0.1, 100.0);
        square.MV = translate(0, 0, -2.0);        

        render();
    }

    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        var near = 0.1;
        var far = 100;
        var aspectRatio = canvas.width/canvas.height;

        time += 1.0;

        var V = translate(-1, 0, -5.0); 

        var P = perspective(40, aspectRatio, near, far);

        square.MV = mult(mult(rotateX(time),rotateY(time)),rotateZ(time));

        square.P = P;
        square.MV = mult(V,square.MV);

        square.render();

        square2 = square;
        var V = translate(1, 1, -5.0); 
        square2.MV = mult(V,square2.MV);
        square2.render();
        
        square3 = square;
        var V = translate(1, -1, 5.0); 
        square3.MV = mult(V,square3.MV);
        square3.render();
        square4 = square;
        var V = translate(-1, -1, -5.0); 
        square4.MV = mult(V,square4.MV);
        square4.render();

        requestAnimationFrame(render);
    }

    window.onload = init;
