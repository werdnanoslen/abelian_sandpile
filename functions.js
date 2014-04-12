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
            pile.id = x + "-" + y;
            pile.style.width = pile.style.height = pileSize + "px";
            pile.style.marginTop = (pileSize * y) + "px";
            pile.style.marginLeft = (pileSize * x) + "px";
            pile.onclick = function()
            {
                var x = parseInt(this.getAttribute("data-x"));
                var y = parseInt(this.getAttribute("data-y"));
                addToPile(x, y);
            }
        }
    }
}


function changeColor(x, y)
{
    var r,g,b;
    r = g = b = 255 - (255/toppleAt * pileArray[y][x]);
    var newColor = "rgb(" + r +"," + g + "," + b + ")";
    var pile = document.getElementById(x + "-" + y);
    pile.style.backgroundColor = newColor;
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


function addToPile(x, y)
{
    if (pileArray[y][x] === toppleAt)
    {
        pileArray[y][x] = 1;
        addToPile(x, y+1);
        addToPile(x+1, y);
        addToPile(x, y-1);
        addToPile(x-1, y);
    }
    else
    {
        pileArray[y][x] += 1;
    }
    changeColor(x, y);
}
