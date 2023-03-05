/////////////////////////////////////////////////////////////////////////////
//
//  Square.js
//

function Square(gl, vertexShader, fragmentShader) {

    vertexShader ||= "Square-vertex-shader";
    fragmentShader ||= "Square-fragment-shader";

    let program = initShaders(gl, vertexShader, fragmentShader);

    // Set up our data:
    //   - positions contains our vertex positions
    //   - indices contains how to organize the vertices
    //       into primitives
    //
    let positions = [
        0.0, 0.0, 0.0,  // Vertex 0
        1.0, 0.0, 0.0, // Vertex 1
        1.0, 1.0, 0.0, // Vertex 2
        0.0, 1.0, 0.0, // Vertex 3

        0.0, 0.0, 1.0,  // Vertex 4
        1.0, 0.0, 1.0, // Vertex 5
        1.0, 1.0, 1.0, // Vertex 6
        0.0, 1.0, 1.0 // Vertex 7
    ];

    let indices = [
         4,6,7, //face 
         4,5,6, //
         5,2,6, // right
         5,1,2, // 
         1,3,2, //
         1,0,3, // back
         0,7,3, //left
         0,4,7,
         7,2,3, //top
         7,6,2,
         0,5,4, //bottom
         0,1,5

    ];

    // Initialize all of our WebGL "plumbing" variables
    //
    let aPosition = new Attribute(gl, program, positions,
	    "aPosition", 3, gl.FLOAT);

    indices = new Indices(gl, indices);

    let MV = new Uniform(gl, program, "MV");
    let P  = new Uniform(gl, program, "P");

    this.render = () => {
        gl.useProgram(program);

        aPosition.enable();
        indices.enable();

        MV.update(this.MV);
        P.update(this.P);

        gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);

        indices.disable();
        aPosition.disable();
    };
};
