


var Main1 = document.getElementById("Main1")
var Main2 = document.getElementById("Main2")
var Main3 = document.getElementById("Main3")
var Cam = document.getElementById("Cam")
var tbdy
var DDElmt
var Recordsarr
var Recordsarr1
var SOJBT
var RCnt
var RCntr
var BatchesArr = []
var Arr1 
var TgtElmt
var txt=""
var Loc

if(localStorage.getItem("Loc")== null){
  Loc = 5
}else{
  Loc = localStorage.getItem("Loc")
}

var RolledUp
if(localStorage.RolledUp == null){
  RolledUp = ""
}else{
  RolledUp = localStorage.RolledUp
}

if(typeof Customer == 'undefined'){
  var Customer = "All Customers"
}

var Locs = ["GARNET", "WELSHPOOL", "WILDFIRE", "KWINANA", "ALL SITES"]
var Ln
var Customers = []
var Cstr ="<p id='8,1' class='S5'>All Customers</p>"
var CellsArr = []
var Cells
var Allcust
var Main1txt = ""
var Main2txt = ""
var Main3txt = ""
var Search
var SC
var SS = 0
var TLR
const TL = 400
var Searchtxt = ""
const ABatches = {}  // for Asscociative Batches


//---------------------------------------------


function Load1() {

  GetCells()

  var hr = new XMLHttpRequest()
  var RequestString = "Req=Load1&Loc=" + Loc
  hr.open("POST", "OPSD.php", true)
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString)

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Recordsarr = JSON.parse(hr.responseText)
      Ln = Recordsarr.length
      GetBatches()
    }
  };
}


function Load2() {

  Recordsarr1 = Recordsarr

  var hr = new XMLHttpRequest()
  var RequestString = "Req=Load2&Loc=" + Loc
  hr.open("POST", "OPSD.php", true)
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString)

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Recordsarr = JSON.parse(hr.responseText)
      Ln = Recordsarr.length
      Main3txt = ""
      CreateHTML()
      Main3.children[0].children[0].children[0].children[0].insertAdjacentHTML("beforeend", Main3txt)
      Recordsarr = Recordsarr1.concat(Recordsarr)
      Load3()
    }
  }
}


function Load3() {

  Recordsarr1 = Recordsarr

  var hr = new XMLHttpRequest()
  var RequestString = "Req=Load3&Loc=" + Loc
  hr.open("POST", "OPSD.php", true)
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString)

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Recordsarr = JSON.parse(hr.responseText)
      Ln = Recordsarr.length
      Main3txt = ""
      CreateHTML()
      Main3.children[0].children[0].children[0].children[0].insertAdjacentHTML("beforeend", Main3txt)
      Recordsarr = Recordsarr1.concat(Recordsarr)
      GetCustomers()
      Main1.children[0].children[0].children[3].innerHTML = Cstr
      Allcust = document.getElementById("8,1")
      Allcust.style = "Display:none;"
    }
  }
}


function GetCells() {

  var sub
  var hr = new XMLHttpRequest();
  var RequestString = "Req=Cells";
  hr.open("POST", "OPSD.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Cells = JSON.parse(hr.responseText)
      for(var i in Cells){ 
        sub = [Cells[i][1],Cells[i][2]] 
        CellsArr[Cells[i][0]] = sub 
      }

    }
  };
}


function GetBatches() {

  var hr = new XMLHttpRequest();
  var RequestString = "Req=Batches";
  hr.open("POST", "OPSD.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      BatchesArr = JSON.parse(hr.responseText)
      for (const [first, second, key] of BatchesArr) {
          ABatches[key] = [first, second]
      }
      
      LoadPage()
      Load2()
    }
  };
}






function GetCustomers(){

  Recordsarr.forEach(Rw => {
    if(Rw[3] != ""){ 
      if(!Customers.includes(Rw[3].substring(0, 7))){
        Customers.push(Rw[3].substring(0, 7))
      }
    }
  })

  Customers.sort()
  Cstr = "<p id='8,1' class='S5'>All Customers</p><div Class='Customers'>"
  Customers.forEach(Cst => {
    Cstr += "<p id='8' Class='S5'>" + Cst + "</p>"
  })
  Cstr += "</div>"
}




function LoadPage() {

  Main1txt = "<div class='d1'><div class='d2'><h1 id='2,5' class='S" + Loc + "'>" + Locs[Loc-1] + "</h1><div id = '500' class='TTLDD' style= 'height:0;'><p id='7,1' Class='S1'>GARNET</p><p id='7,2' Class='S2'>WELSHPOOL</p><p id='7,3' Class='S3'>WILDFIRE</p><p id='7,4' Class='S4'>KWINANA</p><p id='7,5' Class='S5'>ALL SITES</p></div><p id='2,5' Class='S5 CTTL'>" + Customer + "</p><div class='TTLDD' style= 'height:0;' >" + Cstr + "</div></div></div>"
  
  Main3txt = "<div class='d1'><div class='d2'><table><tbody>"

  CreateHTML()

  Main3txt+= "</tbody></table></div></div>"

  Main1.innerHTML = Main1txt

  Main3.innerHTML = Main3txt

  if(SS == 0 ){SearchSetup()}


}


function FilterPage(){
  Main1.children[0].children[0].children[2].innerHTML = Customer 
  Main3txt = ""
  CreateHTML()
  Main3.children[0].children[0].children[0].children[0].innerHTML = Main3txt
 
  if(Customer=='All Customers'){
    Allcust.style = "Display:none;"
  }else{
    Allcust.style = "Display:block;"
  }
}



function CreateHTML() {

  var TaskName = ""
  var DDDiv = ""
  var BatchDiv = ""
  var SOJobID = Recordsarr[0][7]
  var TreatID = 0
  var cmpbtn
  var i = 0
  var i1
  var batchdd
  var BatchLink
  var ttl
  var BP = 1
  var BPTxt = 0
  var BL // Batch Link
  var BU // Batch Unlink
  var BK
  var RUS // Rolled up Status
  

  i = 0
  while (i < Ln) {

    if((Customer == "All Customers" || Recordsarr[i][3] == Customer) && (Recordsarr[i][12] == Loc  || Loc == 5) && ( Searchtxt =="" || Recordsarr[i][2].includes(Searchtxt)|| Recordsarr[i][3].toLowerCase().includes(Searchtxt.toLowerCase()) || Recordsarr[i][4].includes(Searchtxt) )){



      //Title Blocks
      if(TaskName != Recordsarr[i][1] ){
        if(Recordsarr[i][0] =='350') {
          var Batcharr = Recordsarr[i][1].split(",")
          ttl = "<h2 id='10," + Batcharr[2] + "," + CellsArr[Batcharr[0]][0] + "' class='S" + CellsArr[Batcharr[0]][0] + "' style='display: inline-block;'>" + CellsArr[Batcharr[0]][1] + " " + Batcharr[1] + "</h2><h2 id='11," + Batcharr[2] + "' class='S" + CellsArr[Batcharr[0]][0] + "' style='display: inline-block;'>&#x2610;</h2>"
        }else{
          BatchLink = "" 
          ttl = "<h2 id='16," + Recordsarr[i][0] + "'>" + Recordsarr[i][1] + "</h2>"
        }
        Main3txt+= "<tr><td colspan=10  align=center >" + ttl + "</td></tr>"
      } 



      if(Recordsarr[i][0] > 90 && Recordsarr[i][0] < 310 && Recordsarr[i][19] == 0){
        BatchDiv = "<div class='SelectDD' style= 'height:0;'>"
        for(var i2 in BatchesArr){
          if(CellsArr[BatchesArr[i2][0]][0]  == Recordsarr[i][12])
          BatchDiv += "<p id = '6," + BatchesArr[i2][2] + "'>" + CellsArr[BatchesArr[i2][0]][1]+ " " + BatchesArr[i2][1] + "</p>"
        }
        for(var i2 in Cells){
          if(Cells[i2][1] == Recordsarr[i][12])
          BatchDiv += "<p id = '5," + Cells[i2][0] + "," + Cells[i2][1] + "'>NEW " + Cells[i2][2] + "</p>"
        }
        BatchDiv += "</div>"
      
      batchdd = BatchDiv
    }else{
        batchdd = ""
    }   


    if( Recordsarr[i][0] != 100 && Recordsarr[i][0] != 350){
      BK = "<p id='9," + Recordsarr[i][7] + "'>BACK</p>"  
    }else{
      BK = ""
    }



    if( Recordsarr[i][19] != 0){
      
     // var Batcharr = BatchesArr.find(row => row[2] === Recordsarr[i][19]);
      if (ABatches[Recordsarr[i][19]]) {
        BL = "<div class='SelectDD' style='height: 0;'><p id='10," + Recordsarr[i][19] + "," + CellsArr[ABatches[Recordsarr[i][19]][0]][0] + "' style='display: inline-block;'>" + CellsArr[ABatches[Recordsarr[i][19]][0]][1] + " " + ABatches[Recordsarr[i][19]][1] + "</p></div>"
      }else{
        BL = "<div class='SelectDD' style='height: 0;'><p id='10," + Recordsarr[i][19] + "," + Recordsarr[i][12] + "' style='display: inline-block;'>Go To Batch</p></div>"
      }
    }else{
      BL = ""
    }   


    if( Recordsarr[i][19] != 0 && Recordsarr[i][0] < 380){
      BU = "<div class='SelectDD' style='height: 0;'><p id='15," +  Recordsarr[i][15] + "' style='display: inline-block;'>UNLINK</p></div>"
    }else{
      BU = ""
    }   


      i1 = i
      cmpbtn = ""
      DDDiv = "" 


      while(i1< Ln && Recordsarr[i1][7] == Recordsarr[i][7]){
        //Treatment
        if(TreatID != Recordsarr[i1][8]){
          DDDiv += "<p id='2,6'>" + Recordsarr[i1][9] + "</p>" 
        }


        DDDiv+= "<p id='2,6'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Recordsarr[i1][10] + "</p>" 
        TreatID = Recordsarr[i1][8]
        i1++
      }



      cmpbtn = ""
      if(Recordsarr[i][11] != 0 && Recordsarr[i][0] != 1000){
        if(Recordsarr[i][0] == 300){
          cmpbtn = "<h3 id = '2,4'>BATCH</h3>"        
        }else{
        cmpbtn = "<p id='3," + Recordsarr[i][7] + "' class= 'cbx'>&#x2610;</p>"        
        }
      }

      if(RolledUp.includes(Recordsarr[i][0] + ",")){RUS = "style='display: none;'"}else{RUS = ""}

      if(Recordsarr[i][0] == 380) {
        Main3txt+= "<tr class='R" + Recordsarr[i][0] + "' " + RUS + "><td></td><td colspan=2 id='10," + Recordsarr[i][7] +"," + Recordsarr[i][12] +"'>" + Recordsarr[i][3] + " Batch "  + Recordsarr[i][8] + " </td></tr>"
      }else{
        if(Recordsarr[i][13] == 0) {
          Main3txt+= "<tr id='" + Recordsarr[i][15] + "' class='MR R" + Recordsarr[i][0] + "' " + RUS + "><td id = '1," + Recordsarr[i][15] + "', class = 'S" + Recordsarr[i][12] + "'>" + Recordsarr[i][2] + "</td><td id='2,2'>" + Recordsarr[i][3] + "</td><td id='2,2'>" + Recordsarr[i][16] + "</td><td id='2,2'>" + Recordsarr[i][17] + "</td><td id='2,2'>" + Recordsarr[i][18] + "</td><td id= '14' contenteditable = 'true'>" + Recordsarr[i][5] + "</td><td>" + cmpbtn + "</td></tr>"
          Main3txt+= "<tr class='DDR R" + Recordsarr[i][0] + "' " + RUS + "><td><div class='SelectDD' style= 'height:0;'>" + BK + "<p id='4," + Recordsarr[i][7] + "'>SPLIT</p><label for='Cam' id='" + Recordsarr[i][15] + "'><p id = '" + Recordsarr[i][15] + "'>&#128247;<br>Blast<br>Tape</p></label></div></td><td colspan=6 ><div id= '" + Recordsarr[i][7] + "'class= 'DDDiv'><div class='Dropdown' style= 'height:0;'>" + DDDiv + "</div><div id='" + Recordsarr[i][15] + "' class='DelDD' style= 'height:0;'><p id='12,1' class='CL1 CLB'>Garnet</p><p id='12,2' class='CL2 CLB'>Welshpool</p><p id='12,3' class='CL3 CLB'>Wildfire</p><p id='12,4' class='CL4 CLB'>Kwinana</p></div>" + BL + BU + batchdd + "</div></td></tr>" 
        }else{
          Main3txt+= "<tr id='" + Recordsarr[i][15] + "' class='PBR R" + Recordsarr[i][0] + "' " + RUS + "><td id = '1," + Recordsarr[i][15] + "', class = 'S" + Recordsarr[i][12] + "'>" + Recordsarr[i][2] + "</td><td id='2,2'>" + Recordsarr[i][3] + "</td><td id='2,2'>" + Recordsarr[i][16] + "</td><td id='2,2'>" + Recordsarr[i][17] + "</td><td id='2,2'>" + Recordsarr[i][18] + "</td><td id='2,2'>" + Recordsarr[i][5] + "</td><td></td></tr>"
          Main3txt+= "<tr class='DDR R" + Recordsarr[i][0] + "' " + RUS + "><td><div class='SelectDD' style= 'height:0;'></div></td><td colspan=6 ><div id= '" + Recordsarr[i][7] + "'class= 'DDDiv'><div class='Dropdown' style= 'height:0;'>" + DDDiv + "</div><div id='" + Recordsarr[i][15] + "' class='DelDD' style= 'height:0;'></div>" + BU + batchdd + "</div></td></tr>" 
        }
      }
    
      SOJobID = Recordsarr[i][7]
      TreatID = 0
      TaskName = Recordsarr[i][1]

      i = i1 

    }else{
      i++
    }
  }
}





function expcol(){

  switch (Arr1[1]) {

  // case "1":
  //   DDElmt = TgtElmt.parentElement.nextSibling.nextSibling.childNodes[0].childNodes[0]
  //   TgglHgt()
  //   DDElmt = TgtElmt.parentElement.nextSibling.nextSibling.nextSibling.childNodes[0].childNodes[0]
  //   TgglHgt()
  //   break;

  case "2":
    DDElmt = TgtElmt.parentElement.nextSibling.childNodes[0].childNodes[0]
    TgglHgt()
    DDElmt = TgtElmt.parentElement.nextSibling.childNodes[1].childNodes[0].childNodes[0]
    TgglHgt()
    DDElmt = TgtElmt.parentElement.nextSibling.childNodes[1].childNodes[0].childNodes[1]
    TgglHgt()
    DDElmt = TgtElmt.parentElement.nextSibling.childNodes[1].childNodes[0].childNodes[2]
    TgglHgt()
    DDElmt = TgtElmt.parentElement.nextSibling.childNodes[1].childNodes[0].childNodes[3]
    TgglHgt()
    break;

  case "3":
    DDElmt = TgtElmt.parentElement
    TgglHgt()
    break;

  case "4":
    DDElmt = TgtElmt.parentElement.parentElement.nextSibling.childNodes[1].childNodes[0].childNodes[2]
    TgglHgt()
    break;

  case "5":
    DDElmt = TgtElmt.nextSibling
    TgglHgt()
    break;

  case "6":
    DDElmt = TgtElmt.parentElement
    TgglHgt()
    DDElmt = TgtElmt.parentElement.parentElement.parentElement.previousSibling.childNodes[0]
    TgglHgt()
    break;

  case "7":
    DDElmt = TgtElmt.parentElement.nextSibling.childNodes[0].childNodes[0]
    TgglHgt()
    DDElmt = TgtElmt.parentElement.nextSibling.childNodes[1].childNodes[0].childNodes[0]
    TgglHgt()
    DDElmt = DDElmt.nextSibling
    TgglHgt()
    break;
      
  case "8":
    DDElmt = TgtElmt.parentElement.parentElement.parentElement.previousSibling.childNodes[0]
    TgglHgt()
    DDElmt = TgtElmt.parentElement
    TgglHgt()
    DDElmt = DDElmt.nextSibling
    TgglHgt()
    break;

  }

}

function TgglHgt(){
  if(DDElmt.style.height == "0px"){
    DDElmt.style.height = DDElmt.scrollHeight + "px"
  }else{
    DDElmt.style.height = "0px"
  }
}



function SetLocation(){
  Loc = Arr1[1]
  localStorage.setItem("Loc", Loc)
  Load1()
}


function SelectCustomer(){
  Customer = TgtElmt.innerHTML
  FilterPage()
}


function OpenSOJBT(){
  localStorage.setItem("SOJID", Arr1[1])
  window.open("SalesOrder.html")
}


function GoToBatch(){
  localStorage.setItem("Batch", Arr1[1])
  if(Arr1[2]==3){
    window.open("Test/Batch.html")
  }else{
    window.open("Batch.html")
  }
}



function CompleteTask(){
  TgtElmt.innerHTML = "&#x2611;"
  var hr = new XMLHttpRequest();
  var RequestString = "Req=CompleteTask&SOJBT=" + Arr1[1]
  hr.open("POST", "OPSD.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Load1();
    }
  };
}



function Split(){
  var hr = new XMLHttpRequest();
  var RequestString = "Req=Split&SOJBT=" + Arr1[1]
  hr.open("POST", "OPSD.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Load1();
      //console.log(hr.responseText)
    }
  };
}




function NewBatch(){
  var hr = new XMLHttpRequest();
  var RequestString = "Req=NewBatch&SOJBT=" + TgtElmt.parentElement.parentElement.id + "&CellID=" + Arr1[1] + "&Loc=" + Arr1[2]
  hr.open("POST", "OPSD.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Load1();
      //console.log(hr.responseText)
    }
  };
}




function CompleteBatch(){
  var hr = new XMLHttpRequest();
  var RequestString = "Req=CompleteBatch&SOJBID=" + Arr1[1]
  hr.open("POST", "OPSD.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Load1();
      //console.log(hr.responseText)
    }
  };
}




function AddToBatch(){
  var hr = new XMLHttpRequest();
  var RequestString = "Req=AddToBatch&SOJBT=" + TgtElmt.parentElement.parentElement.id + "&BatchID=" + Arr1[1]
  hr.open("POST", "OPSD.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Load1();
      //console.log(hr.responseText)
    }
  };
}




function UpdateDescription(){
  var hr = new XMLHttpRequest();
  var ND = TgtElmt.innerHTML.replace(/'/,"''")   // New Description
  //alert(ND)
  var RequestString = "Req=UpdateDescription&SOJID=" + TgtElmt.parentElement.id + "&Des=" + ND
  hr.open("POST", "OPSD.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Load1();
    }
  };
}





function BlastPriority(){
  var hr = new XMLHttpRequest();
  var Priority
  if(TgtElmt.innerHTML==""){Priority=0}else{Priority=TgtElmt.innerHTML}
  var RequestString = "Req=BlastPriority&SOJBT=" + Arr1[1] + "&Priority=" + Priority
  hr.open("POST", "OPSD.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Load1();
    }
  };
}



function Back(){
  var hr = new XMLHttpRequest();
  var RequestString = "Req=Back&SOJBT=" + Arr1[1]
  hr.open("POST", "OPSD.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Load1();
      //console.log(hr.responseText)
    }
  };
}





function Unlink(){
  var hr = new XMLHttpRequest();
  var RequestString = "Req=Unlink&SOJID=" + Arr1[1]
  hr.open("POST", "OPSD.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Load1();
      //console.log(hr.responseText)
    }
  };
}





function Roll(){
  if (RolledUp.includes(Arr1[1] + ",")) {
    var rws = document.querySelectorAll(".R" + Arr1[1])
    rws.forEach(rw => {
      rw.style.display = 'table-row'
    })
    RolledUp = RolledUp.replace(Arr1[1] + ",", "")
    localStorage.RolledUp = RolledUp
  } else {
    var rws = document.querySelectorAll(".R" + Arr1[1])
    rws.forEach(rw => {
      rw.style.display = 'none'
    })
    RolledUp = RolledUp + Arr1[1] + ","
    localStorage.RolledUp = RolledUp
  }
}


function ClickSelect(){

  switch (Arr1[0]) {

    case "1":
      OpenSOJBT()
      break;

    case "2":
      expcol()
      break;

    case "3":
      CompleteTask()
      break;

    case "4":
      Split()
      break;

    case "5":
      NewBatch()
      break;

    case "6":
      AddToBatch()
      break;

    case "7":
      SetLocation()
      break;

    case "8":
      SelectCustomer()
      DDElmt =   Main1.children[0].children[0].children[3]
      TgglHgt()
      break;
        
    case "9":
      Back()
      break;
                
    case "10":
      GoToBatch()
      break;

    case "11":
      CompleteBatch()
      break;

    case "12":
      UpdateLocation()
      break;

    case "15":
      Unlink()
      break;

    case "16":
      Roll()
      break;
      
  }
}



function UpdateSelect(){

  switch (Arr1[0]) {
    case "13":
      BlastPriority()
      break;

    case "14":
      UpdateDescription()
      break;

    
  }


}


function SearchSetup(){

  Main2.innerHTML = "<p class='SearchIcon'>&#x26B2;</p><p id='Search' contenteditable='true' ></p><p id='SC' class='Clear'>Clear</p>"
  Search = document.getElementById("Search")
  SC = document.getElementById("SC")
  SS = 1
  


  Search.addEventListener("keydown", function(event){
    TLR = Date.now()
    setTimeout(function(){Filter()}, TL) 
 },true);


 SC.addEventListener("click", function(event){
  Searchtxt = ""
  Search.innerHTML = ""
  LoadPage() 
 },true);

}


function Filter(){
  if(TLR < Date.now()-TL ){
    Searchtxt = Search.innerHTML
    FilterPage()
  }
  
}


function UpdateLocation() {
  
  var RequestString = "Req=UpdateLocation&SOJID=" + TgtElmt.parentElement.id + "&Loc=" + Arr1[1]
  hr = new XMLHttpRequest()
  hr.open("POST", "SalesOrder.php", true);
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  hr.send(RequestString);

  hr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Load1()
    }
  };
}



function SendImage() {
  var IWidth;
  var IHeight;
  var P; // Portrait
  var SL; // shortest side length
  var TWidth
  var THeight

  const file = Cam.files[0]

  const reader = new FileReader()

  reader.onload = function(event) {
    const img = new Image()

    img.src = event.target.result

    img.onload = function() {
      if (img.width < img.height) {
        IWidth = 1008
        THeight = 100
        IHeight = Math.round(IWidth/img.width*img.height)
        TWidth = Math.round(THeight*img.width/img.height)
        
        P = 1
        SL = img.width
      } else {
        IHeight = 1008
        TWidth = 100
        IWidth = Math.round(IHeight/img.height*img.width)
        THeight = Math.round(TWidth*img.height/img.width)
        P = 0
        SL = img.height
      }

      var Thmfile

      const canvas = document.createElement('canvas');
      canvas.width = TWidth;
      canvas.height = THeight;

      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, TWidth, THeight);

      let imageData = canvas.toDataURL();

      Thmfile = dataURLtoFile(imageData, 'image.jpg');

      var Imgfile

      if (SL > 1008) {

        canvas.width = IWidth;
        canvas.height = IHeight;

        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, IWidth, IHeight);

        imageData = canvas.toDataURL();

        Imgfile = dataURLtoFile(imageData, 'image.jpg');
      } else {
        Imgfile = file;
        IWidth = img.width;
        IHeight = img.height;
      }

      const ImageData = new FormData();
      ImageData.append('imagefile', Imgfile);
      ImageData.append('Thumbnail', Thmfile);
      ImageData.append('SOJID', TgtElmt.id);
      ImageData.append('Width', IWidth);
      ImageData.append('Height', IHeight);
      ImageData.append('Type', "1"); // type 1 is Blast Tape
      TgtElmt = '';
      Cam.value = '';

      var hr = new XMLHttpRequest();
      hr.open('POST', '../ImageFiles/Upload.php', true);

      hr.send(ImageData);

      hr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 500) {
          alert('File Upload Failed');
        }
        if (this.readyState == 4 && this.status == 200) {
          alert(hr.responseText);
        }
      };
    };
  };
  reader.readAsDataURL(file);
}


function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

//-------------------------------------------


Load1()



Main1.addEventListener("click", function(event){
  event.preventDefault()
  TgtElmt = event.target
  Arr1 = event.target.id.split(",")
  ClickSelect()
},true);


Main3.addEventListener("click", function(event){
  TgtElmt = event.target
  Arr1 = event.target.id.split(",")

  if(event.target.parentElement.tagName != "LABEL"){
    event.preventDefault()
    ClickSelect()   
  }
},true);



Main3.addEventListener("focus", function(event){
  txt = event.target.innerHTML;
},true);

Main3.addEventListener("blur", function(event){ 
  if (txt != event.target.innerHTML) {
    TgtElmt = event.target
    Arr1 = event.target.id.split(",")
    UpdateSelect()
  }
},true);

Main3.addEventListener("keydown", function(event){ 
  if (event.key === 'Enter'){
  if(txt != event.target.innerHTML) {
    txt = event.target.innerHTML
    TgtElmt = event.target
    Arr1 = event.target.id.split(",")
    UpdateSelect()
  }
    event.preventDefault()
}
},true);

Cam.addEventListener("change", function(event){ 
  // console.log("change")
  // console.log(event.target.tagName)
  SendImage()
},true)
