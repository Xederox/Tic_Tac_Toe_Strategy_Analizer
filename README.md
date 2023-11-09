# Tic_Tac_Toe_Strategy_Analizer

Goal of the project is to learn optimal strategy for the more advanced version of the Tic Tak Toe game. Later it is named "Stage 1" though googling 'ultimate tik tak toe' shows this evact version.
Classic 3x3 version ('Stage 0") has been done as a warm-up.

While playing the game, list of all possible moves with their properties is provided from database.

Properties are: Cell's ID, Perfect Play, Random Play, Wins, Draws, Loses.

Cell's ID - just an ID or Coordinates (same thing here)

Perfect Play - shows what the result of the game will be if both players make no mistakes

Random Play - shows as a percentage how good or bad opponent's next move would be for us if it was made at random (100%: we are guaranteed a way to win, 0% opponent is guaranteed a way to win)

Wins, Draws, Loses - distribution of final results


<h2>Stage 1 Tutorial</h2>

Game is divided into <b>Big Cells</b> forming 3x3 grid. Each <b>Big Cell</b> contains 3x3 grid of <b>Small Cells</b> for a total of nine grids.
Players take turns in <b>Taking Control</b> of <b>Small Cells</b> by putting either 'O' or 'X'.
First Player to control all 3 <b>Small Cells</b> in any row, column or long diagonal within single <b>Big Cell</b> <b>Takes Control</b> of that <b>Big Cell</b>.
<b>Big Cell</b> under control of either of players or without eligible moves is considered <b>Disabled</b>.

First Player to control all 3 <b>Big Cells</b> in any row, column or long diagonal wins.

There are restrictions though.
Every move has to be made inside <b>Big Cell</b> corresponding to position of the <b>Small Cell</b> opponent took control in their last move.

First move of the game has no restrictions.
If player is forced to make a move inside a <b>Disabled</b> <b>Big Cell</b> then instead that move has no restrictions.
Move without restrictions can be made inside any non-<b>Disabled</b> <b>Big Cell</b>

<h2>TODO:</h2>

-make a database for Stage 1,

-change script for Stage 0 so that it creates necessary tables in database instead of just filling them in

-do something with css
