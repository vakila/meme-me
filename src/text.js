export function drawText(canvas) {
  const textData = getTextData();
  const context = canvas.getContext("2d");

  // Clear any previous text
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let { text, x, y } of textData) {
    const maxWidth = canvas.width - 10 - x;
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.font = "80px Impact";
    context.fillText(text, x, y, maxWidth);
    context.strokeText(text, x, y, maxWidth);
  }
}

function getTextData() {
  const top = document.getElementById("text-top");
  const topData = {
    text: top.value.toUpperCase(),
    x: 10,
    y: 90,
  };

  const bottom = document.getElementById("text-bottom");
  const bottomData = {
    text: bottom.value.toUpperCase(),
    x: 10,
    y: 470,
  };
  return [topData, bottomData];
}
