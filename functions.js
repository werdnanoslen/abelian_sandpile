var pileArray = [];
var body = document.getElementsByTagName("body")[0];
var lotSize = 50;
var pileSize = 12;
var toppleAt = 5;
var toppleDelay = 100;
var dropDelay = 1;
var dropInterval;
var sandlotBuilt = false;
var mousedownInterval;
var randomDrop = false;


buildSandlot();

document.getElementsByName("dropDelay")[0].onchange = function()
{

    dropDelay = parseInt(this.value);
    dropDelay ? autoPile(randomDrop) : clearInterval(dropInterval);
}

document.getElementsByName("toppleDelay")[0].onchange = function()
{
    toppleDelay = this.value;
}

document.getElementById("reset").onclick = function()
{
    randomDrop = false;
    initPileArray();
}

document.getElementById("randomize").onclick = function()
{
    randomDrop = true;
    initPileArray();
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


function autoPile()
{
    if (dropInterval !== undefined) clearInterval(dropInterval);
    dropInterval = window.setInterval(
        function()
        {
            if (randomDrop)
            {
                var randX = Math.floor(Math.random() * lotSize);
                var randY = Math.floor(Math.random() * lotSize);
                addToPile(randX, randY);
            }
            else
            {
                addToPile(Math.floor(lotSize/2), Math.floor(lotSize/2));
            }
        },
        dropDelay
    );
}


function buildSandlot()
{
    sandlotBuilt = false;
    initPileArray();
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
            pile.onmousedown = function()
            {
                var x = parseInt(this.getAttribute("data-x"));
                var y = parseInt(this.getAttribute("data-y"));
                mousedownInterval = window.setInterval(
                    function()
                    {
                        addToPile(x, y);
                    },
                    1
                );
            };
            pile.onmouseup = function()
            {
                window.clearInterval(mousedownInterval);
            };
        }
    }
    sandlotBuilt = true;
    autoPile();
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
            if (randomDrop)
            {
                var rand = Math.floor(Math.random() * toppleAt);
                pileArray[y][x] = rand;
            }
            else
            {
                pileArray[y][x] = 0;
            }
            if (sandlotBuilt) changeColor(x, y);
        }
    }
}
