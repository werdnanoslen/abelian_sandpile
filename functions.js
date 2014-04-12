buildSandlot();

function buildSandlot()
{
    var body = document.getElementsByTagName("body")[0];
    var lotSize = 50;
    var pileSize = 10;

    for (var y=0; y<lotSize; ++y)
    {
        for (var x=0; x<lotSize; ++x)
        {
            var pile = document.createElement("div");
            body.appendChild(pile);
            pile.id = x + "-" + y;
            pile.setAttribute("data-x", x);
            pile.setAttribute("data-y", y);
            pile.className = "pile";
            pile.style.width = pile.style.height = pileSize + "px";
            pile.style.marginTop = (pileSize * y) + "px";
            pile.style.marginLeft = (pileSize * x) + "px";
        }
    }
}
