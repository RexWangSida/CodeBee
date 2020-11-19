// Tells the other side what data is being passed (e.g. the ID is targeted)
var dropTarget = document.querySelector(".drop-target");
var draggables = document.querySelectorAll(".drag-task");
var code = ["i := 10\n",
            "while (i > 0)\n",
            "do\n  output (i)\n  i--\nend\n",
            ];
var leftData = ["i := 10\n",
            "while (i > 0)\n",
            "do\n  output (i)\n  i--\nend\n",
            ];
var rightData = [];


function updateData(index){

    let element = code[parseInt(index)];
    console.log(code);
    if( leftData.includes(element) ){
      leftData = leftData.filter(item => item !== element);
      rightData.push(element);
    }
    else{
      rightData = rightData.filter(item => item !== element);
      leftData.push(element);
    }
}
// Tells the other side what data is being passed (e.g. the ID is targeted)
draggables.forEach(item => {
  item.addEventListener("dragstart", function(ev) {
    ev.dataTransfer.setData("srcId", ev.target.id);
  });
})
// The end destination, prevent browsers default drag and drop (disabling breaks feature)
// because it's disabled by browsers by default
dropTarget.addEventListener('dragover', function(ev) {
  ev.preventDefault();
});
// End destination where item is dropped into
dropTarget.addEventListener('drop', function(ev) {
  ev.preventDefault();
  let target = ev.target;
  let droppable = target.classList.contains('drag-box');
  let srcId = ev.dataTransfer.getData("srcId");
  if (droppable) {
    updateData(srcId);
    ev.target.appendChild(document.getElementById(srcId));
  }
});

function show(){
  let json = {
    challenge:0,
    program: rightData,
  };
  document.getElementById("hey").textContent = JSON.stringify(json, undefined, 2);
}
