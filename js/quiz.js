const start=document.getElementById("start");
const quiz=document.getElementById("quiz");
const qImage=document.getElementById("qImage");
const question=document.getElementById("question");
const choice=document.getElementById("choice");
const choiceA=document.getElementById("choiceA");
const choiceB=document.getElementById("choiceB");
const choiceC=document.getElementById("choiceC");
const progress=document.getElementById("progress");
const scoreShow=document.getElementById("socreContainer");
const counter=document.getElementById("counter");
const timeGauge=document.getElementById("timeGauge");
let TIMER;
// question infomation
let questions=[
    {
     "questionText": "What does CEO stand for?",
     "choiceA": "chief excutive officer",
     "choiceB":"Chinko ero oppai" ,
     "choiceC":"chief excellent officer" ,
     "answer":  "A",
     "image":  "./img/photo-1575623196339-2ce1a4e7e9f0.jpg"
    },
    {
    "questionText": "What does AI stand for?",
    "choiceA": "Artificial intelligent",
    "choiceB": "Android Interpriter",
    "choiceC":"AnAn Iuno" ,
    "answer":  "A",
    "image":  "./img/photo-1516110833967-0b5716ca1387.jpg" 
   },
   {"questionText": "Sup?",
   "choiceA": "Not bad",
   "choiceB": "No idea",
   "choiceC": "Huh?",
   "answer":  "A",
   "image": "./img/photo-1575623196339-2ce1a4e7e9f0.jpg" 
  }
//   {"questionText": ,
//   "choiceA": ,
//   "choiceB": ,
//   "choiceC": ,
//   "answer":  ,
//   "image":  
//  }
//  {"questionText": ,
//  "choiceA": ,
//  "choiceB": ,
//  "choiceC": ,
//  "answer":  ,
//  "image":  
// }
]

// 最後の質問の番号
let lastQuestionIndex=questions.length-1;
// 画面に表示されている質問の番号
let questionIndexDone=0;

// Get started this app
// スタート画面をクリックすることで開始
start.addEventListener("click",startQuiz);
function startQuiz(){
    document.getElementById("start").style.display="none";
    document.getElementById("quiz").style.display="block";
    getQuiz();
    counterTime();
    TIMER=setInterval(counterTime,1000);
    progressQuiz();
    
}

// questionsに記載してある質問・選択肢・画像を画面に表示させる
 function getQuiz(){
        let q=questions[questionIndexDone];
        question.innerHTML="<p>"+q.questionText+"</p>";
        choiceA.innerHTML="<p>"+q.choiceA+"</p>";
        choiceB.innerHTML="<p>"+q.choiceB+"</p>";
        choiceC.innerHTML="<p>"+q.choiceC+"</p>";
        qImage.innerHTML="<img src="+q.image +">";
 }

//  質問が全て終わったら結果を表示
function getResult(){
       // quiz.style.display="none";
       scoreShow.style.display="block";
       let scorePercent=Math.round(score/questions.length);
       let comment =(scorePercent=>80) ? "EXCELLENT":
       (scorePercent=>60) ? "Great":
       (scorePercent=>40) ? "pretty good":
       (scorePercent=>20) ? "Not bad": "Idiot";
       scoreShow.innerHTML="<p>"+scorePercent+"/"+lastQuestionIndex+":::"+comment+"</p>";
}

// 質問の数だけ番号を下に表示
function progressQuiz(){
    for(let qIndex=0;qIndex<=lastQuestionIndex;qIndex++){
        document.getElementById("progress").innerHTML += "<div class='prog' id="+qIndex+">"+"</div>";
    }
}
// 解答が正解なら質問番号の背景が緑になる
function correctAnswer(){
       document.getElementById(questionIndexDone).style.backgroundColor="green";
}
// 解答が不正解なら質問番号の背景が赤になる
function wrongAnswer(){
       document.getElementById(questionIndexDone).style.backgroundColor="red";
}
// 解答時間の表示
const questionTime=5;
const gaugeWidth=150;
let count=0;
const gaugeProgressUnit=gaugeWidth/questionTime;
function counterTime(){
       if(count <= questionTime){
              counter.innerHTML=count;
              timeGauge.style.width=gaugeProgressUnit*count+"px";
              count++;
       }else{
              count=0;
              if(questionIndexDone<lastQuestionIndex){
                     questionIndexDone++;
                     getQuiz();
              }else{
                     getResult();
                     clearInterval(TIMER);
              }
       }
}

// 問題の正誤を判定
let score=0;
function checkAnswer(answer){
       if(questions[questionIndexDone].answer==answer){
              score++;
              correctAnswer();
              questionIndexDone++;
              getQuiz();
       }else{
              wrongAnswer();
              questionIndexDone++;
              getQuiz();
       }
       if(questions[questionIndexDone].length<lastQuestionIndex){
              getQuiz();
       }else{
              getResult();
       }
}

