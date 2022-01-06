const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("canvasRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");


//canvas 의 범위 설정. 설정안할시 작동이 안됨
canvas.width = 700;
canvas.height = 700;

//디폴트값들. 
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c"
ctx.lineWidth = 2.5;

//스위치로 이용할 요소. 
let painting = false;
let filling = false;


function stopPainting() {
    painting = false;
};

function startPainting() {
    painting = true;
};

function mouseMove(event) {
    const x = event.offsetX;//event가 이루어 지고 있는 장소의 좌표
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath(); //path를 실시간으로 만듦
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y); // 이론적으로는 path에 색칠하는 요소. 더 공부 필요
        ctx.stroke();
    }
};

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
};

function handleRangeChange(event) {
    const size = (event.target.value / 10);
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";

    }
}
//영역 전체에 색을 덮는 함수
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, 700, 700);
    }
};

function handleCM(event) {
    event.preventDefault();
}//우클릭을 통한 다운로드 방지.

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}//이미지를 다운 받기 위한 함수. 조금더 공부 할 필요있음



if (canvas) {
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
};

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange);
};

if (mode) {
    mode.addEventListener("click", handleModeClick);
};

if (save) {
    save.addEventListener("click", handleSaveClick);
};  