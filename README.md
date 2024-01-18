# Tic Tac Toe - Strategy Analizer

Goal of the project is to learn optimal strategy for the game of Tic Tac Toe and its advanced version Ultimate Tic Tak Toe.  
While playing, a list of moves (sorted from best to worst) will be shown along with some values describing them.  

<h1>Stages</h1>
Stage 0 - Classic 3x3 Tic Tac Toe  <br/>
Stage 1 - Ultimate Tic Tac Toe  <br/>
While there is no limit how high stages can go, Stage 1 already proved to be too challanging to solve.  <br/>
For better picture: Stage 1 game takes roughly 5-15 minutes to play, where the only Stage 2 game I have ever played took around 100 hours from start to finish over the span of one year (thanks to my friend who was willing to drag it to the end).  <br/>

<h1>Description</h1>
After choosing stage and starting player you wil start a game and list of moves will be shown.  <br/>
There are two modes: Solved and MCTS (Monte Carlo Tree Search). Solved is on by default and shows perfect solution of the game. There is NO solution for Stage 1 game yet. To show MCTS mode just check the checkbox while playing.  <br/>
<br/>
<b>Properties of Solved Move</b>:  <br/>
Coord - coordinates of the cell  <br/>
Perfect - result of a perfect play  <br/>
Random - score of a random play (100% win, 50% draw, 0% lose and all in between)  <br/>
Wins, Draws, Loses - distributin of all possible results  <br/>
<br/>
<b>Properties of MCTS Move</b>:  <br/>
Coord - coordinates of the cell  <br/>
Score - score of given move (value/total*100 rounded down)  <br/>
value - amount of wins and draws during simulation for given move (draws count as 0.5)  <br/>
total - total amount of simulations for given move  <br/>

<h1>Technology Used</h1>
- Typescript <br/>
- React <br/>
- Express <br/>
- mysql2 <br/>
 
<h1>Shortcomings</h1>
- not hosting-friendly (probably, don't know actually, I would assume it isn't) <br/>
- MCTS isn't simulated on a fly, instead is taken from database  <br/>
- First move of Stage 1 MCTS is limited to 15 options (all unique moves), moves outside of those are omitted  <br/>
- Scripts for filling database's tables ignore board symmetries  <br/>
- Looks the way it looks  <br/>

<h1>License</h1>
Copyright free
