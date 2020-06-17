
fetch("https://api.covid19api.com/summary")
    .then(data=>data.json())
    .then(
        (datajson)=>{
            const trArray=[];
            datajson.Countries.forEach(element => {
                let tr=document.createElement("TR");
                Object.values(element).forEach(x => {
                let NodeElement=document.createElement("TD");
                var t = document.createTextNode(x); 
                NodeElement.appendChild(t);
                tr.appendChild(NodeElement);
                });
                trArray.push(tr)
            });
            let tr=document.createElement("TR");
            Object.keys(datajson.Countries[1]).forEach(x=>{
                let NodeElement=document.createElement("TD");
                let NodeElementstr=document.createElement("STRONG");
                var t = document.createTextNode(x);
                NodeElementstr.appendChild(t);
                NodeElement.appendChild(NodeElementstr);
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
            const tableData={
                currentPage:1,
                pageCount:10,
                noOfRows:trArray.length,
            }
            function TablePagination(currentPage,pageCount){
                let startPoint=(currentPage-1)*pageCount;
                let endPoint = startPoint+pageCount;
                let renderArr=trArray.slice(startPoint,endPoint);
                document.querySelector("tbody").innerHTML="";
                renderArr.forEach(element=>{
                    document.querySelector("tbody").appendChild(element);
                })
            }
            function PaginationButton(noOfPages){
                document.getElementById("paginationbtn").innerHTML="";
                for(let i=0;i<noOfPages;i++){
                    document.getElementById("paginationbtn").innerHTML=`${document.getElementById("paginationbtn").innerHTML}<li class='page-item' style='display:inline-block'><a class='page-link page z-depth-1' data-btn='${i+1}'>${i+1}</a></li>`
                }
            }
            TablePagination(tableData.currentPage,tableData.pageCount)
            PaginationButton(Math.ceil(tableData.noOfRows/tableData.pageCount));
            document.querySelectorAll(".page").forEach(element=>{element.addEventListener("click",(event)=>{
                tableData.currentPage=parseInt(event.target.dataset.btn);
                TablePagination(tableData.currentPage,tableData.pageCount);
            })})
            document.querySelectorAll(".pageleft").forEach(element=>{element.addEventListener("click",(event)=>{
                if(tableData.currentPage>1){
                    tableData.currentPage=tableData.currentPage-1;
                    TablePagination(tableData.currentPage,tableData.pageCount);
                }

            })})
            document.querySelectorAll(".pageright").forEach(element=>{element.addEventListener("click",(event)=>{
                if(tableData.currentPage<Math.ceil(tableData.noOfRows/tableData.pageCount)){
                    tableData.currentPage=tableData.currentPage+1;
                    TablePagination(tableData.currentPage,tableData.pageCount);
                }

            })})
            document.querySelector("select").addEventListener("change",event=>{
                if(event.target.value=="All"){
                    tableData.pageCount=tableData.noOfRows;
                    TablePagination(tableData.currentPage,tableData.pageCount);
                    PaginationButton(Math.ceil(tableData.noOfRows/tableData.pageCount));
                }
                else{
                    tableData.pageCount=parseInt( event.target.value);
                    TablePagination(tableData.currentPage,tableData.pageCount);
                    PaginationButton(Math.ceil(tableData.noOfRows/tableData.pageCount));
                }
            })
        }
    )

