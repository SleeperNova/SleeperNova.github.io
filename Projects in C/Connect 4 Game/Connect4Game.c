/*
    Francisco Saavedra 
    Connect 4 Game
*/

#include <stdio.h>
#include <stdlib.h>

const int MAX_ROWS = 7;
const int MAX_COLS = 10;
const int BLANK = 0;

void initGrid(int theGrid[][MAX_COLS], int rows, int cols);
void printGrid(const int theGrid[][MAX_COLS], int rows, int cols);
void askUserForMove(int theGrid[][MAX_COLS], int rows, int cols, int whichPlayer);
char takeMove(int theGrid[][MAX_COLS], int rows, int cols,
int targetColumn, int whichPlayer);
void eatInputLine();

int checkForWinner(int theGrid[][MAX_COLS], int rows, int cols);
int checkForVerticalWinner(int theGrid[][MAX_COLS], int rows, int cols);
int checkForHorizontalWinner(int theGrid[][MAX_COLS], int rows, int cols);
int checkForRightDiagonalWinner(int theGrid[][MAX_COLS], int rows, int cols);
int checkForLeftDiagonalWinner(int theGrid[][MAX_COLS], int rows, int cols);

int main() 
{
    int dropGrid[MAX_ROWS][MAX_COLS];
    int n_rows = 6;
    int n_cols = 8;
    
    initGrid(dropGrid, n_rows, n_cols);
    printGrid(dropGrid, n_rows, n_cols);

    return 0;
}

void initGrid(int theGrid[][MAX_COLS], int rows, int cols)
{
    int i, j;
     for(i = 0; i < rows; ++i){
         for(j = 0; j < cols; ++j)
         {
               theGrid[i][j] = BLANK; 
         }  
     }
}

void printGrid(const int theGrid[][MAX_COLS], int rows, int cols)
{
     int i, j;
     for(i = 0; i < rows; ++i){
         for(j = 0; j < cols; ++j)
         {
               printf("%3d", theGrid[i][j]); 
         }//for j  
         putchar('\n');
     }//for i
}

char takeMove(int theGrid[][MAX_COLS], int rows, int cols, int targetColumn, int whichPlayer)
{
    
}

void askUserForMove(int theGrid[][MAX_COLS], int rows, int cols, int whichPlayer)
{

}

void eatInputLine()
{

}

/*
    return 0, 1 or 2
    0 no winner
*/
int checkForWinner(int theGrid[][MAX_COLS], int rows, int cols)
{

}

int checkForVerticalWinner(int theGrid[][MAX_COLS], int rows, int cols)
{

}

int checkForHorizontalWinner(int theGrid[][MAX_COLS], int rows, int cols)
{

}

int checkForRightDiagonalWinner(int theGrid[][MAX_COLS], int rows, int cols)
{

}

int checkForLeftDiagonalWinner(int theGrid[][MAX_COLS], int rows, int cols)
{

}