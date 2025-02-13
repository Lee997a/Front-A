function only_front() {
  const front = document.querySelectorAll(".front");
  const back = document.querySelectorAll(".back");
  const database = document.querySelectorAll(".database");

  front.forEach((item, index) => {
    //
    console.log(front[index]);
    front[index].style.display = "block";
  });

  back.forEach((item, index) => {
    //
    console.log(back[index]);
    back[index].style.display = "none";
  });

  database.forEach((item, index) => {
    //
    console.log(database[index]);
    database[index].style.display = "none";
  });
}

function only_back() {
  const front = document.querySelectorAll(".front");
  const back = document.querySelectorAll(".back");
  const database = document.querySelectorAll(".database");

  front.forEach((item, index) => {
    //
    console.log(front[index]);
    front[index].style.display = "none";
  });

  back.forEach((item, index) => {
    //
    console.log(back[index]);
    back[index].style.display = "block";
  });

  database.forEach((item, index) => {
    //
    console.log(database[index]);
    database[index].style.display = "none";
  });
}

function only_database() {
  const front = document.querySelectorAll(".front");
  const back = document.querySelectorAll(".back");
  const database = document.querySelectorAll(".database");

  front.forEach((item, index) => {
    //console.log(front[index]);
    front[index].style.display = "none";
  });

  back.forEach((item, index) => {
    //console.log(back[index]);
    back[index].style.display = "none";
  });

  database.forEach((item, index) => {
    //console.log(database[index]);
    database[index].style.display = "block";
  });
}

//textarea 50자 체크하는 함수
function checkLength() {
  const textarea = document.getElementById("phrase"); //textarea영역
  const maxLength = 50; //최대글자수 제한하기
  const currentLength = textarea.value.length; //현재 글자수 가져오기

  if (currentLength > maxLength) {
    //50자가 넘어가면면
    alert("응원 메시지는 50자까지 작성 가능합니다.");
    textarea.value = textarea.value.substring(0, maxLength);
    // 초과 부분 잘라내기
  }
  //현재 글자수 보이기기
  document.getElementById(
    "charCount"
  ).innerText = `${textarea.value.length} / ${maxLength}`;
}

/*응원메세지*/

/* const testList2=[ 
    {name:"우주연", message: "프론트 프로젝트 시작 합니다!! 재미있게 해 줘요  🍔 🍟  ", date:"2025.02.06" },
    {name:"윤현기", message: "날씨가 넘 추워요 감기 조심  " , date:"2025.02.06" },
    {name:"이동우", message: "for , if, 1차원배열, 함수 연습 연습", date:"2025.02.06" },
    {name:"이수민", message: "함수가 별거냐 ^^", date:"2025.02.06" },
    {name:"이정호", message:  "배열이 별거냐 ^^ ", date:"2025.02.06" }
] ;*/

//응원메시지 입력받아서 저장하기
//입력 버튼 누르면 =>
//작성자 입력을 했는가?
//응원 메시지 50자 이하인가?
//둘다 ok일때 로컬스토리지에 저장하기
//작성자(name), textarea(phrase), 오늘 날짜(date) 저장

function check() {
  const name = document.getElementById("name").value.trim();
  //trim() => 문자열 앞뒤 공백을 제거해주는 함수 (중간 공백은 유지)
  const phrase = document.getElementById("phrase").value.trim();

  if (name == "") {
    alert("작성자 이름을 입력하세요.");
  } else if (phrase == "") {
    alert("응원메시지를 입력하세요.");
  } else if (phrase.length > 50) {
    alert("응원 메시지는 50자까지 작성 가능합니다.");
  } else {
    saveToLocalStorage(); //로컬스토리지 저장함수 실행
  }
}

function saveToLocalStorage() {
  const name = document.getElementById("name").value.trim();
  //trim() => 문자열 앞뒤 공백을 제거해주는 함수 (중간 공백은 유지)
  const phrase = document.getElementById("phrase").value.trim();

  //날짜 받아오기
  const formattedDate = new Date().toLocaleDateString("ko-KR");

  const messageData = {
    //객체로 변수에 저장
    name: name,
    message: phrase,
    date: formattedDate,
  };
  //기존 데이터 가져와서 새 데이터 추가하기(저장되어있는 값이 없으면 빈 배열 가져옴)
  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  messages.push(messageData); // 새 데이터 추가

  // 로컬 스토리지에 다시 저장
  localStorage.setItem("messages", JSON.stringify(messages));

  alert("저장되었습니다!");

  loadMessages(); //메시지 출력함수 실행

  //입력값 초기화
  document.getElementById("name").value = "";
  document.getElementById("phrase").value = "";
  document.getElementById("charCount").innerText = "0 / 50";
}

function loadMessages() {
  const messageList = document.getElementById("cheertable");
  messageList.innerHTML = ""; //기존 리스트 초기화
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  //"messages" 데이터를 localStorage에서 가져와 배열로 변환.
  //null일 경우, [](빈 배열)을 할당.

  if (messages.length === 0) {
    // 로컬스토리지에 저장된게 없을때 출력
    messageList.innerHTML = "<tr><td>저장된 메시지가 없습니다.</td></tr>";
    return;
  }

  let str = "";

  for (let i = 0; i < messages.length; i++) {
    //str 변수에 저장
    str += `<tr><td> ${messages[i].name}: ${messages[i].message} - ${messages[i].date}</td></tr>`;
  }
  messageList.innerHTML = str;
}
