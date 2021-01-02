// input disebled
let valid = {};
let check = (a) => {
  let b = document.getElementById("per_ot");
  let c = document.getElementById("per_ot_%");

  // return removeA();
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
  function removeA() {
    console.log("hi");
    b.removeAttribute("disabled");
    c.removeAttribute("disabled");
  }
};

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

  let result = `
            <tr>
              <td>${perDays.toFixed(2)}</td>
              <td>${workDays}</td>
              <td>${nitSalary.toFixed(2)}</td>
              <td>${OTrate.toFixed(2)}</td>
              <td>${totalOT}</td>
              <td>${nitOT.toFixed(2)}</td>
              <td>${mcReceipt}/${allowance}</td>
              <td>${ans.toFixed(2)}</td>
              <td>${advance}</td>
              <td>${nettSalary.toFixed(2)}</td>
            </tr>
           `;

  table.innerHTML = result;
};

// call main function
button.addEventListener("click", () => {
  if (valid.x && valid.y) {
    calculate();
  } else {
    alert("Please fill in the integer number in the  required field...");
  }
});
