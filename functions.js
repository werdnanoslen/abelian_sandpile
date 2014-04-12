var pileArray = [];
var body = document.getElementsByTagName("body")[0];
var lotSize = 100;
var pileSize = 5;
var toppleAt = 5;
var toppleDelay = 100;
var dropDelay = 1;
var dropInterval;


initPileArray();
buildSandlot();



function autoPile()
{
    if (dropInterval !== undefined) clearInterval(dropInterval);
    dropInterval = window.setInterval(
        function()
        {
            var randX = Math.floor(Math.random() * lotSize);
            var randY = Math.floor(Math.random() * lotSize);
            addToPile(randX, randY);
        },
        dropDelay
    );
}


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
    setTimeout(
        function()
        {
            if (pileArray[y][x] === toppleAt)
            {
                pileArray[y][x] = 1;
                if (y < lotSize-1)
                    addToPile(x, y+1);
                if (x < lotSize -1)
                    addToPile(x+1, y);
                if (y > 0)
                    addToPile(x, y-1);
                if (x > 0)
                    addToPile(x-1, y);
            }
            else
            {
                pileArray[y][x] += 1;
            }
            changeColor(x, y);
        },
        toppleDelay
    );
}
