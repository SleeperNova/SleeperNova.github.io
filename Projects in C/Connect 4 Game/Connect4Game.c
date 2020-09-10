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
    int winner;
    int whichPlayer = 1;
    
    initGrid(dropGrid, n_rows, n_cols);
    printGrid(dropGrid, n_rows, n_cols);

    do{
        askUserForMove(dropGrid, n_rows, n_cols, whichPlayer);
        putchar('\n');
        printGrid(dropGrid, n_rows, n_cols);
        whichPlayer = whichPlayer % 2 + 1;
        winner = checkForWinner(dropGrid, n_rows, n_cols);
    }while(!winner);

    printf("Player %d wins!!!\n", winner);      
    //system("pause");
    return 0;
}


void initGrid(int theGrid[][MAX_COLS], int rows, int cols)
{
    int i, j;
    for(i = 0; i < rows; ++i)
    {
        for(j = 0; j < cols; ++j)
        {
            theGrid[i][j] = BLANK; 
        }  
    }
}

void printGrid(const int theGrid[][MAX_COLS], int rows, int cols)
{
    int i, j;
    for(i = 0; i < rows; ++i)
    {
        for(j = 0; j < cols; ++j)
        {
            printf("%3d", theGrid[i][j]); 
        }//for j  
        putchar('\n');
    }//for i
}

char takeMove(int theGrid[][MAX_COLS], int rows, int cols, int targetColumn, int whichPlayer)
{
    char success = 0;
    int targetRow, i;
    if (targetColumn >= 0 && targetColumn < cols && theGrid[0][targetColumn] == BLANK)
    {
        //ok, there is room in this column
        success = 1; 
        targetRow = 0;
        //search for bottom most open row
        for(i = 1; i < rows; ++i)
        {
            if (theGrid[i][targetColumn] == BLANK)
            {
                targetRow = i;
            }
        }
        theGrid[targetRow][targetColumn]  = whichPlayer;                                               
    }//success  
    return success;    
}

void askUserForMove(int theGrid[][MAX_COLS], int rows, int cols, int whichPlayer)
{
    int move_col;
    char success;
    do{
        printf("Player %d please enter column for your move\n", whichPlayer);
        move_col = -1;
        scanf("%d", &move_col);
        eatInputLine(); //clear this line
        success =  takeMove(theGrid, rows, cols, move_col, whichPlayer);
        if (!success)
        {
            printf("Not a legal move\n");     
        } 
    }while(!success);
}

void eatInputLine()
{
    while (getchar() != '\n'); 
}

/*
    return 0, 1 or 2
    0 no winner
*/

int checkForWinner(int theGrid[][MAX_COLS], int rows, int cols)
{
    int winner = 0;  
    winner = checkForVerticalWinner(theGrid, rows, cols);
    if(winner == 0)
    {
        winner = checkForHorizontalWinner(theGrid, rows, cols);
    }
    if(winner == 0)
    {
        winner = checkForRightDiagonalWinner(theGrid, rows, cols);
    }
    if(winner == 0)
    {
        winner = checkForLeftDiagonalWinner(theGrid, rows, cols);
    }
    return winner; 
}

int checkForVerticalWinner(int theGrid[][MAX_COLS], int rows, int cols)
{
    int i, j, winner = 0, which;
    for(i = 0; i < rows-3; ++i)
    {
        for(j=0; j < cols; ++j)
        {
            if(theGrid[i][j])
            {
                //this cell has a player
                which =  theGrid[i][j];
                if (which == theGrid[i+1][j] &&
                    which == theGrid[i+2][j] &&
                    which == theGrid[i+3][j])
                    {
                        //yahoo, we have  a winner!
                        winner = which; 
                        break;     
                    }//if          
                                
            }//if    
        }//for j
        if (winner)
        {
            break;      
        }
    }//for i
    return winner;//works
}

int checkForHorizontalWinner(int theGrid[][MAX_COLS], int rows, int cols)
{
    int i, j, winner = 0, which;
    for(i = 0; i < rows; ++i)
    {
        for(j=0; j < cols-3; ++j)
        {
            if(theGrid[i][j])
            {
                //this cell has a player
                which =  theGrid[i][j];
                if (which == theGrid[i][j+1] &&
                    which == theGrid[i][j+2] &&
                    which == theGrid[i][j+3])
                    {
                        //yahoo, we have  a winner!
                        winner = which; 
                        break;     
                    }//if                       
            }//if    
        }//for j
        if (winner)
        {
            break;      
        }
    }//for i
    return winner;//works
}

int checkForRightDiagonalWinner(int theGrid[][MAX_COLS], int rows, int cols)
{
    int i, j, winner = 0, which;
    for(i = 3; i < rows; ++i)
    {
        for(j=0; j < cols-3; ++j)
        {
            if(theGrid[i][j])
            {
                //this cell has a player
                which =  theGrid[i][j];
                if (which == theGrid[i-1][j+1] &&
                    which == theGrid[i-2][j+2] &&
                    which == theGrid[i-3][j+3])
                    {
                        //yahoo, we have  a winner!
                        winner = which; 
                        break;     
                    }//if                     
            }//if    
        }//for j
        if (winner)
        {
            break;      
        }
    }//for i
    return winner;//works
}

int checkForLeftDiagonalWinner(int theGrid[][MAX_COLS], int rows, int cols)
{
    int i, j, winner = 0, which;
    for(i = 0; i < rows-3; ++i)
    {
        for(j=0; j < cols-3; ++j)
        {
            if(theGrid[i][j])
            {
                //this cell has a player
                which =  theGrid[i][j];
                if (which == theGrid[i+1][j+1] &&
                    which == theGrid[i+2][j+2] &&
                    which == theGrid[i+3][j+3])
                    {
                        //yahoo, we have  a winner!
                        winner = which; 
                        break;     
                    } //if                        
            }//if    
        }//for j
        if (winner)
        {
            break;      
        }
    }//for i
    return winner;//works
}