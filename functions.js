var pileArray = [];
var body = document.getElementsByTagName("body")[0];
var lotSize = 50;
var pileSize = 10;
var toppleAt = 5;



initPileArray();
buildSandlot();



function buildSandlot()
{
    for (var y=0; y<lotSize; ++y)
    {
        for (var x=0; x<lotSize; ++x)
        {
            var pile = document.createElement("div");
            body.appendChild(pile);
            pile.setAttribute("data-x", x);
            pile.setAttribute("data-y", y);
            pile.className = "pile";
            pile.style.width = pile.style.height = pileSize + "px";
            pile.style.marginTop = (pileSize * y) + "px";
            pile.style.marginLeft = (pileSize * x) + "px";
            pile.onclick = function()
            {
                changeColor(this);
            }
        }
    }
}


function changeColor(pile)
{
    var x = pile.getAttribute("data-x");
    var y = pile.getAttribute("data-y");
    pileArray[y][x] = (pileArray[y][x] + 1) % toppleAt;
    var r,g,b;
    r = g = b = 255 - (255/toppleAt * pileArray[y][x]);
    var newColor = "rgb(" + r +"," + g + "," + b + ")";
    pile.style.backgroundColor = newColor;
    console.log(newColor);
}


function initPileArray()
{
    for (var y=0; y<lotSize; ++y)
    {
        pileArray[y] = [];
        for (var x=0; x<lotSize; ++x)
        {
            pileArray[y][x] = 0;
        }
    }
}
