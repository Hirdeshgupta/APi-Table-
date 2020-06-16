fetch("https://api.covid19api.com/summary")
    .then(data=>data.json())
    .then(
        (datajson)=>{
            datajson.Countries.forEach(element => {
                let tr=document.createElement("TR");
                Object.values(element).forEach(x => {
                let NodeElement=document.createElement("TD");
                var t = document.createTextNode(x); 
                NodeElement.appendChild(t);
                tr.appendChild(NodeElement);
                });
                document.querySelector("tbody").appendChild(tr);
            });
            let tr=document.createElement("TR");
            Object.keys(datajson.Countries[1]).forEach(x=>{
                let NodeElement=document.createElement("TD");
                var t = document.createTextNode(x);
                NodeElement.appendChild(t);
                tr.appendChild(NodeElement);
            })
            document.querySelector("thead").appendChild(tr);
            document.querySelector("input").addEventListener("keydown",()=>{
                let search =document.querySelector("input").value;
                let regex = new RegExp(search,"ig")
                document.querySelectorAll("tbody tr").forEach(element=>{
                    if(!((element.children[0].textContent.match(regex)))){
                        element.style.display="none"
                    }
                    else{
                        element.style.display="table-row"
                    }
                })
            })
        }
    )