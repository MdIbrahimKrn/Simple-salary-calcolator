// set localStorage function
function setStorage(nam, obj) {

  if (typeof nam != "undefined" && typeof obj != "undefined") {
    const vall = getStorage(nam)
    if (vall != null) {
      vall.push(obj)
      const string = JSON.stringify(vall);
      localStorage.setItem(nam, string);
    } else if(vall == null) {

      obj = [obj]
      const string = JSON.stringify(obj);
      localStorage.setItem(nam, string);
    }

  } else {
    alert("arguments not be empty");
  }
}


// get localStorage function
function getStorage(nam) {
  return JSON.parse(localStorage.getItem(nam)) 
  
}



// input disebled
let valid = {};
const check = (a) => {
  let b = document.getElementById("per_ot");
  let c = document.getElementById("per_ot_%");
  if (a.id === "per_ot" && a.value) {
    c.setAttribute("disabled", "disabled");
  } else {
    c.removeAttribute("disabled");
  }
  if (a.id === "per_ot_%" && a.value) {
    b.setAttribute("disabled", "disabled");
  } else {
    b.removeAttribute("disabled");
  }
};

let object;
let timeid = document.getElementById("time");

// get button
const button = document.getElementById("button");
const table_responsive = document.getElementById("table-responsive");
const resetBtn = document.getElementById("button-reset");
const dateEl = document.getElementById("show-date");

// remove disabled attrivute
resetBtn.addEventListener("click", () => {
  let b = document.getElementById("per_ot");
  let c = document.getElementById("per_ot_%");
  b.removeAttribute("disabled");
  c.removeAttribute("disabled");
  valid.x = null;
  valid.y = null;
});

// main function
const calculate = (e) => {
  // get input value
  let main_salary = document.getElementById("main_salary").value;
  let works_d = document.getElementById("works_d").value;
  let ot_h = document.getElementById("ot_h").value;
  let per_ot = document.getElementById("per_ot").value;
  let per_ot_ = document.getElementById("per_ot_%").value;
  let Bonus = document.getElementById("Bonus").value;
  let mc_r = document.getElementById("mc_r").value;
  let advanceE = document.getElementById("advance").value;
  let table = document.getElementById("table");


  // convert input value string to integer
  const mainSalary = Number(main_salary);
  const workDays = Number(works_d);
  const totalOT = Number(ot_h);
  const perOT = Number(per_ot);
  const perPar = Number(per_ot_);
  const allowance = Number(Bonus);
  const mcReceipt = Number(mc_r);
  const advance = Number(advanceE);


  // Overtime calculate
  function OTcal(perOT, perPar, perDays) {
    let OT;
    if (perPar) {
      OT = (perDays / 8) * perPar;
    } else {
      OT = perOT;
    }

    return OT;
  }

  // main calculate start
  let nitSalary, nitOT;
  let perDays = mainSalary / 26;
  let weeklyHour = 45;
  let weeklyDays = 6
  let perHour = perDays / (weeklyHour/weeklyDays)
  let absent = perHour * workDays

  // function call for Overtime calculate
  let OTrate = OTcal(perOT, perPar, perDays);
  nitOT = totalOT * OTrate;
  nitSalary = mainSalary - absent;
  let ans = nitSalary + nitOT + mcReceipt + allowance;
  let nettSalary = ans - advance;

  // Output object
  object = {
    operDay: perDays.toFixed(2),
    oworkDays: absent.toFixed(2),
    onitSalary: nitSalary.toFixed(2),
    oOTrate: OTrate.toFixed(2),
    ototalOT: totalOT,
    onitOT: nitOT.toFixed(2),
    omcReceipt: mcReceipt,
    oallowance: allowance,
    oans: ans.toFixed(2),
    oadvance: advance.toFixed(2),
    onettSalary: nettSalary.toFixed(2),
    time: new Date().toLocaleString()
  };

  showdata([object]);

  if (typeof Storage !== "undefined") {
    setStorage("dataCal", object);
  }
}; //main funcion end

function showDate(e) {

  const el = e.target.parentElement;
  let top = e.clientY
  dateEl.innerText = el.dataset.date
  dateEl.style.display = "block"
  dateEl.style.top = top + "px";
}
// show old storage data
function showdata(data) {
  if (!data) return;
  for (let x = 0; x < data.length; x++) {

    let result = document.createElement("tr");
    result.dataset.date = data[x].time;
    result.onclick = showDate;

    result.innerHTML = `
            <td >${data[x].operDay}</td>
            <td>${data[x].oworkDays}</td>
            <td>${data[x].onitSalary}</td>
            <td>${data[x].oOTrate}</td>
            <td>${data[x].ototalOT}</td>
            <td>${data[x].onitOT}</td>
            <td>
              ${data[x].omcReceipt}/${data[x].oallowance}
            </td>
            <td>${data[x].oans}</td>
            <td>${data[x].oadvance}</td>
            <td>${data[x].onettSalary}</td>
            <span class ="show-date" id ="show-date">${data[x].time}</span>`
    table.prepend(result);
  }
  table_responsive.scrollTop = 0;

}
if (typeof Storage !== "undefined") {
  showdata(getStorage("dataCal"));
}
// call main function
button.addEventListener("click", () => {
  if (valid.x && valid.y) {
    calculate();
  } else {
    alert("Please fill in the integer number in the  required field...");
  }
});

table_responsive.addEventListener("click", (e) => { console.log(e) })
