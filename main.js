// set localStorage function
function setStorage(nam, obj) {
  if (typeof nam != "undefined" && typeof obj != "undefined") {
    const string = JSON.stringify(obj);
    localStorage.setItem(nam, string);
  } else {
    console.log("arguments not be empty");
  }
}

// get localStorage function
function getStorage(nam) {
  return typeof nam != "undefined"
    ? localStorage.getItem(nam) !== null
      ? JSON.parse(localStorage.getItem(nam))
      : "value null"
    : "argument not be empty";
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
const resetBtn = document.getElementById("button-reset");

// remove disabled attrivute
resetBtn.addEventListener("click", () => {
  let b = document.getElementById("per_ot");
  let c = document.getElementById("per_ot_%");
  b.removeAttribute("disabled");
  c.removeAttribute("disabled");
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

  // function call for Overtime calculate
  let OTrate = OTcal(perOT, perPar, perDays);
  nitOT = totalOT * OTrate;
  nitSalary = perDays * workDays;
  let ans = nitSalary + nitOT + mcReceipt + allowance;
  let nettSalary = ans - advance;

  // Output object
  object = {
    operDay: perDays.toFixed(2),
    oworkDays: workDays,
    onitSalary: nitSalary.toFixed(2),
    oOTrate: OTrate.toFixed(2),
    ototalOT: totalOT,
    onitOT: nitOT.toFixed(2),
    omcReceipt: mcReceipt,
    oallowance: allowance,
    oans: ans.toFixed(2),
    oadvance: advance,
    onettSalary: nettSalary.toFixed(2),
    time: new Date().toLocaleString(),
  };

  if (typeof Storage !== "undefined") {
    setStorage("data", object);
    showdata();
  } else {
    let result = `
            <tr>
              <td>${object.operDay}</td>
              <td>${object.oworkDays}</td>
              <td>${object.onitSalary}</td>
              <td>${object.oOTrate}</td>
              <td>${object.ototalOT}</td>
              <td>${object.onitOT}</td>
              <td>
                ${object.omcReceipt}/${object.oallowance}
              </td>
              <td>${object.oans}</td>
              <td>${object.oadvance}</td>
              <td>${object.onettSalary}</td>
            </tr>
           `;

    table.innerHTML = result;
  }
}; //main funcion end

// show old storage data
function showdata() {
  if (typeof Storage !== "undefined") {
    let data = getStorage("data");
    let result = `
            <tr>
              <td>${data.operDay}</td>
              <td>${data.oworkDays}</td>
              <td>${data.onitSalary}</td>
              <td>${data.oOTrate}</td>
              <td>${data.ototalOT}</td>
              <td>${data.onitOT}</td>
              <td>
                ${data.omcReceipt}/${data.oallowance}
              </td>
              <td>${data.oans}</td>
              <td>${data.oadvance}</td>
              <td>${data.onettSalary}</td>
            </tr>
           `;
    table.innerHTML = result;
    timeid.innerHTML = `Your last calculaton : ${data.time}`;
  } else {
    console.log("Storage not supported");
  }
}
showdata();

// call main function
button.addEventListener("click", () => {
  if (valid.x && valid.y) {
    calculate();
  } else {
    alert("Please fill in the integer number in the  required field...");
  }
});
