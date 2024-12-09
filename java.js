let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discound = document.getElementById("discound");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'create'
let tmp;
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value )- +discound.value
        total.innerHTML = result;
        total.style.background = "#040" ;
    }else{
        total.innerHTML ="";
        total.style.background = "#FF5733" ;

    }
        
}
//create prodauct
if (localStorage.prodact != null){
    dataPro = JSON.parse(localStorage.prodact)
}else{dataPro =[];}
submit.onclick =function (){
   let prot ={
    title:title.value.toCapitalize(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discound:discound.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase()
   }

if(mood === 'create'){
      if(prot.count > 1){
    for(let i =0; i <prot.count ;i++ ){
        dataPro.push(prot);
    }
   }else{
    dataPro.push(prot);
   }
}else{
    dataPro [tmp]=prot ;   
    mood = "Create"
    submit.innerHTML =  'Create'
    count.style.display = 'block'
}
 



   localStorage.setItem("prodact",   JSON.stringify(dataPro) )
   cleanData();
   showData();
}
// clean input
function cleanData(){
 title.value = '' ; 
 price.value = '';
 taxes.value = ''; 
 ads.value = '';
 discound.value = '';
getTotal();
 count.value = '';
 category.value = '';
 showData();
}
//red

function showData(){
    
    let table = ''; 
    for(let i = 0 ; i < dataPro.length; i++){
        table +=`
        <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discound}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updataData(${i})"  id="update">update </button></td>
                <td><button onclick="deletData( ${i})" >delete</button></td>
            </tr>` 
    }
  
  document.getElementById("tobody").innerHTML = table;

  let deletbtn=document.getElementById("deletbtn")
  if(dataPro.length > 0){
      deletbtn.innerHTML =`  <button onclick="deletAll()">deleteAll(${ dataPro.length})</button>`
  }else{deletbtn.innerHTML= '';}
  getTotal();
}
showData();
// deletData 
function deletData(i){

    dataPro.splice(i,1);
    localStorage.prodact = JSON.stringify(dataPro)
    showData();
}

function deletAll(){

    localStorage.clear();
    dataPro.splice(0);
    showData();
}
function updataData(i){
    mood = 'Updata';
    title.value= dataPro[i].title;
    price.value= dataPro[i].price;
    taxes.value= dataPro[i].taxes;
    ads.value= dataPro[i].ads;
    discound.value= dataPro[i].discound;
    getTotal();
    count.style.display= "none "
    category.value= dataPro[i].category;
    submit.innerHTML = 'Updata'
    

     scroll({top:0,behavior:"smooth"})
    tmp = i;
    showData();
}




//search 

var searchMood = 'title';
function getsearchMood(id)
{
    
    let search = document.getElementById("search");
    if(id == "searchTitle"){

        searchMood = "title";
        search.placeholder = "Search By Title";

    }else{
        searchMood = "Category";
        search.placeholder = "Search By Category";
    }
    search.focus();
}

function getSearchData(value)
{
  let table = '';
if(searchMood== 'title'){
 for(let i = 0; i< dataPro.length ;i++){
    if(dataPro[i].title.includes(value.toCapitalize())){
       
        table +=`
        <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discound}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updataData(${i})"  id="update">update </button></td>
                <td><button onclick="deletData( ${i})" >delete</button></td>
            </tr>` 

    }
 }

}else{
    for(let i = 0; i< dataPro.length ;i++){
        if(dataPro[i].category.includes(value.toLowerCase())){
           
            table +=`
            <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discound}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updataData(${i})"  id="update">update </button></td>
                    <td><button onclick="deletData( ${i})" >delete</button></td>
                </tr>` 
    
        }
     }
}
document.getElementById("tobody").innerHTML = table;
}