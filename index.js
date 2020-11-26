//Using Chalk
var chalk = require('chalk');
//Using readLineSync
var readLineSync = require('readline-sync');

// Level1 AboutME
var aML1_queOne = {
    question: `Who's my favorite batsman?
    a.KL Rahul
    b.Virender Sehwag
    c.Yuvraj Singh\n`,
    answer: `b`
}
var aML1_queTwo = {
    question: `Where do I live?
    a.Chennai
    b.Nellore
    c.Vijayawada\n`,
    answer: `b`
}
var aML1_queThree = {
    question: `Who's my favorite wicket-keeper?
    a.MS Dhoni
    b.Adam Gilchrist
    c.Boucher\n`,
    answer: `b`
}
var aML1_queFour = {
    question: `What's my favorite color?
    a.Black
    b.Green
    c.Orange\n`,
    answer: `c`
}

//Level2 AboutMe
var aML2_queOne = {
    question: `What's my birthday month?
    a.April
    b.August
    c.October\n`,
    answer: `b`
}
var aML2_queTwo = {
    question: `Which series I talk about most?
    a.GOT
    b.Deception
    c.Money Heist\n`,
    answer: `c`
}
var aML2_queThree = {
    question: `What's my favorite IPL team?
    a.RCB
    b.DC
    c.KXIP\n`,
    answer: `c`
}
var aML2_queFour = {
    question: `What's my favorite sport?
    a.Cricket
    b.Volley-Ball
    c.Both\n`,
    answer: `c`
}

//Level3 AboutMe
var aML3_queOne = {
    question: `What's my favorite Money Heist character?
    a.Berlin
    b.Tokyo
    c.Professor\n`,
    answer: `a`
}
var aML3_queTwo = {
    question: `Which season I like the most?
    a.Summer
    b.Winter
    c.Autumn\n`,
    answer: `b`
}
var aML3_queThree = {
    question: `What's my favorite place?
    a.Singapore
    b.Malaysia
    c.Dubai\n`,
    answer: `a`
}
var aML3_queFour = {
    question: `What's my favorite GOT Character?
    a.Daenerys Targaryen
    b.Jon Snow
    c.Aarya Stark\n`,
    answer: `a`
}
var aboutMeL1 = [aML1_queOne, aML1_queTwo, aML1_queThree, aML1_queFour];

var aboutMeL2 = [aML2_queOne, aML2_queTwo, aML2_queThree, aML2_queFour];

var aboutMeL3 = [aML3_queOne, aML3_queTwo, aML3_queThree, aML3_queFour];

//HighScore Array
var highScores = [
  {
    name:"Ram",
    score:38
  },
  {
    name:"Saki",
    score:28
  },
  {
    name:"Sarah",
    score:30
  },
  {
    name:"Parthiv",
    score:14
  },
]
levelScores = [2,3,5];

function startQuiz(question,answer,lvlScore){
  var userAnswer = readLineSync.question(question);
  if(answer===userAnswer.toLowerCase().trim()){
    console.log(chalk.green('Right'));
    highScores[highScores.length-1].score += lvlScore;
  }
  else{
    console.log(chalk.red('Wrong'));
  }
  console.log('Score :',highScores[highScores.length-1].score);
  console.log('----------------------');
}

var maxLevelReached = false;
var secondLvlReached = false;
//function to play quiz
function playQuiz(level){
  var queSet;
  if(level===1){
    queSet = aboutMeL1;
    lvlScore = levelScores[0];
  }
  else if(level===2){
    queSet = aboutMeL2;
    lvlScore = levelScores[1];
    secondLvlReached = true;
  }
  else{
    queSet = aboutMeL3;
    lvlScore = levelScores[2];
    maxLevelReached = true;
  }
  for(var i=0;i<queSet.length;i++){
    startQuiz(queSet[i].question,queSet[i].answer,lvlScore);
  }
  
  if(highScores[highScores.length-1].score>=6 && !maxLevelReached && !secondLvlReached){
    console.log(chalk.bgCyan('----Level 2----'));
    playQuiz(2);
  }
  else if(highScores[highScores.length-1].score>=16 && !maxLevelReached){
    console.log(chalk.bgCyan('----Level 3----'));
    playQuiz(3);
  }
  else{
    return;
  }

}
//Function to check if the User has beaten the highscore
function hasBeatenScore(userScore){
  var maxScore = 0;
  for(var i=0;i<highScores.length-1;i++){
    if(highScores[i].score>=maxScore){
      maxScore = highScores[i].score;
    }
  }
  return userScore>maxScore;
}

//Main Code
console.log(chalk.bgYellow('---------------HOW WELL DO YOU KNOW RAM----------------'));
console.log();
console.log(chalk.inverse('In Level 1 For each right answer you will be awarded +2\nIn Level 2 For each right answer you will be awarded +3\nIn Level 3 For each right answer you will be awarded +5\n'));
//Taking UserName
var user = readLineSync.question('Your name, please: ');
console.log('\nWelcome, '+chalk.yellow(user)+'\n');
highScores.push({
  name:user,
  score:0
});
//Starting the Quiz
console.log(chalk.bgCyan('----Level 1----'));
playQuiz(1);
if(!maxLevelReached){
  console.log(chalk.red(`You couldn't reach another level, ${user}...\nBetter Luck Next Time`));
}

var newUserScore = highScores[highScores.length - 1].score;
//Checking if user has beaten the highScore
var isBeaten = false;
if(hasBeatenScore(newUserScore)){
  isBeaten = true;
}
//Sorting highScores based on the score
highScores.sort((a,b)=>{
  return b.score - a.score;
});
//Printing the scores

console.log(chalk.bgWhite(chalk.black('--------- Leaderboard ---------')));
for(var x=0;x<highScores.length;x++){
  if(highScores[x].name===user){
    console.log(chalk.yellow(`${highScores[x].name} : ${highScores[x].score}`));
  }
  else{
  console.log(`${highScores[x].name} :  ${highScores[x].score}`);
  }
}
console.log();
//Printing the high score message if user has beaten the high score
if(isBeaten){
  console.log(chalk.bgGreen(chalk.black(`Congratulations!! ${user} ,you're the high scorer!`)));
}