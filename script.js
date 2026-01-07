let myleads = ["www.example.com"]




const input = document.getElementById("inputel")
const btn = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-list")
const deletel = document.getElementById("delete-btn")
const savebtn = document.getElementById("save")

let leadsfromlocalstorage = JSON.parse(localStorage.getItem("myleads"))

console.log(leadsfromlocalstorage);

if(leadsfromlocalstorage){
    myleads = leadsfromlocalstorage
    render(myleads)
}

savebtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify( myleads ))
        render(myleads)
    })
})

deletel.addEventListener("dblclick",function(){
    console.log("double click has detected");
    localStorage.clear()
    myleads = []
    render(myleads)

    
})


btn.addEventListener("click", function (){
    console.log("This was clicked from the event !");
    myleads.push(input.value)
    input.value = ""

    
    localStorage.setItem("myleads", JSON.stringify(myleads))

    render(myleads)
    
    
    
})



function render(leads){
    let listitem = ""
    for(let i = 0; i < leads.length; i++){
        // listitem += "<li><a href='"+myleads[i]+"' target='_blank'>"+ myleads[i] + "</a></li>"   
        listitem += `
        <li>
            <a href='${leads[i]}' target='_blank'>
                ${leads[i]}
            </a>
        </li>`
        console.log(listitem);
    }
    ulEl.innerHTML = listitem
    
}