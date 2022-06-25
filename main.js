let allData = []
let vidSrc
let mass = []
let search_item = []

$.ajax("http://myjson.dit.upm.es/api/bins/htnh", {
  success : function(res){
    mass = res
    // console.log(res);
    render(res)
    // qidiruv(res)
  }
})

function qidiruv(src){
    search_item =  mass.filter(item => {
        return item.description.toLowerCase().includes(src.value.toLowerCase())
    })
    render(search_item)
}

function render(data){
    $(".middle").html("")
        data.map(element => {
        let card =`
        <div class="col-3 my-4">
        <div class="card img-fluid list">
        <iframe src="${element.video}" frameborder="0"></iframe>
            <div clas="d-flex">
                <p class="p-2 pe-3 text-start">${element.description}</p>
            </div>
        </div>
        </div>
        `
        $(".middle").append(card)
    });
}


$(".addBtn").on("click", () => {
    let title = $(".title").val()
    allData.push({
        vid : vidSrc,
        title : title
    })
 
    $(".title").val("") 
    
    reRender(allData)
 })
 
function getImageURL(val) {
    val.src = window.URL.createObjectURL(val.files[0])
    vidSrc = val.src
    console.log(vidSrc);
}
 
 function reRender(data) { 
    $(".result").html("")
    let sanoq = 0
    data.map(item => {
        let col = `
            <div class="col-3">
                <div class="card">
                    <video src="${item.vid}"></video>
                   <p class="p-2 text-start">${item.title}</p>
                   <i onclick="deleteFun(${sanoq})" class="delete fa-solid  fa-trash p-2 fs-4"></i>
                </div>
            </div>
        `
        $(".result").append(col)
        sanoq ++ 
        console.log(item.title);
    })

}
function deleteFun(sanoq) { 
    allData.splice(sanoq, 1)

    reRender(allData)
 }

 
 $(".search").on("input", () => {
    let value = $(".search").val()
     let searchResult = allData.filter(item => {
         return item.title.toLowerCase().includes(value.toLowerCase())
     })
     reRender(searchResult)
 })

$(".change").on("click", () =>{
    $(".footer").toggleClass("bg-dark")
    $("i").toggleClass("text-light")
    $(".row").toggleClass("bg-dark")
    $(".main").toggleClass("bg-dark")
    $(".card").toggleClass("bg-dark")
    $(".card").toggleClass("text-light")
    $(".card").toggleClass("border-light")
})

$(".notti").on("click", () =>{
    $(".notti").toggleClass("text-warning")
})