const inputList = document.getElementById("inputList")
const submit = document.getElementById("submit")
const people = document.getElementById("people")
const start = document.getElementById("start")
const result = document.getElementById("result")

let team = []
let timeCount = 0
let teamLen, teamDiv, teamCount

// 隨機
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 大寫逗號轉小寫
const transDot = (str) => {
  return str.replace(/，/g, ',')
}

// 送出名單
const submitList = () => {
  let input = transDot(inputList.value)

  // 文字轉陣列
  team = input.split(",")

  // 陣列資訊
  teamLen = team.length
  teamDiv = teamLen / 2
  teamCount = Math.round(teamDiv)

  // 顯示參與者
  people.innerText = team
}

// 整除分配
const intTeam = () => {
  for (let i = 0; i < teamCount; i++) {
    result.insertAdjacentHTML("beforeend", `
    <p><span class="name"></span> ↔ <span class="name"></span></p>
    `)
  }
}

// 非整除分配
const floatTeam = () => {
  let len = teamCount - 2
  // 雙
  for (let i = 0; i < len; i++) {
    result.insertAdjacentHTML("beforeend", `
    <p><span class="name"></span> ↔ <span class="name"></span></p>
    `)
  }
  // 三
  result.insertAdjacentHTML("beforeend", `
  <div class="three">
    <p class="three-left"><span class="name"></span></p>
    <p class="three-mid"><span class="name"></span></p>
    <p class="three-right"><span class="name"></span></p>
  </div>
    `)
}

// 分配名單
const nameList = () => {
  const names = document.querySelectorAll(".name")
  const list = []

  for (let i = 0; i < teamLen; i++) {
    // 隨機名字
    let name = team[rand(0, teamLen - 1)]
    // 避免重複
    while (list.includes(name)) {
      name = team[rand(0, teamLen - 1)]
    }
    // 推入陣列、並顯示文字
    list.push(name)
    names[i].innerText = list[i]
  }
}

// input submit
submit.addEventListener("click", submitList, false)
document.addEventListener("keydown", (val) => {
  if (val.keyCode === 13) submitList()
}, false)

// Start
start.addEventListener("click", () => {
  if (team.length === 0) {
    alert("未輸入名單")
    return
  }
  if (team.length < 3) {
    alert("名單至少需要輸入 3 人")
    return
  }

  // 初始 result、計時器、按鈕禁止
  result.innerHTML = ""
  timeCount = 0
  start.disabled = true
  start.style.cursor = "not-allowed"
  result.style.opacity = "0"

  // 出現 result
  result.style.opacity = "1"

  // 插入 html
  // 四捨五入可判別是奇數(不整除，會多0.5)或偶數(整除)
  Math.round(teamDiv) === teamDiv ? intTeam() : floatTeam()

  // 隨機顯示
  let timer = setInterval(() => {
    nameList()
    timeCount += 100
    // 暫停
    if (timeCount === 3000) {
      clearInterval(timer)
      start.disabled = false
      start.style.cursor = "pointer"
    }
  }, 100)

}, false)