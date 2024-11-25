
# Magic: The Gathering Deck Builder

Clobknocka is a Magic: The Gathering web app that allows users to create and manage MTG decks, search for cards and play against others.

There is a landing page with buttons that send you to the different pages of the app. 
There is also a header and a footer component.
The header has all the page buttons, and the footer has the creaters names, and the privacy policy/terms of service

We have non-functional register and login pages.

The app features a deck builder page that allows users to search for cards and create decks.
You can search cards by name, artist, card type, creature type, and by mana cost.
It also allows users to stay updated on card legality for all formats of MTG, such as standard, moderen, and commander. 

The app displays all card prices at the bottom of the card in the deck page,so users know how much their cards are worth.

There is a decks page which allows users to choose between the different decks they have. 

on the deck ID page it shows the cards with the selected deck, this is were the legality and pricing is shown.  
users can also delete cards from their deck.

There is a help pages that has FAQ about the app.

## Project Setup
### PREREQUISITES
#### Windows

1. Install [PostgreSQL 15.8](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). (Uncheck 'Stack builder' and 'pgAdmin' when installing, we don't need those.)
2. After installation, open your Command Prompt and type `psql`.

- If `psql` is not recognized, then open your environment variables, and add `C:\Program Files\PostgreSQL\15\lib` and `C:\Program Files\PostgreSQL\15\bin` to your system variables PATH. (If you don't know how to access the environment variables, see the link below.)
- [Follow this tutorial to access and edit the environment variables.](https://www.c-sharpcorner.com/article/how-to-addedit-path-environment-variable-in-windows-11/#:~:text=We%20require%20permission%20from%20the,if%20you%20are%20not%20one.&text=Press%20Windows%2BR%2C%20type%20%22,%22%20and%20press%20%22Ok%22.)
- Open and close Command Prompt, try `psql` again. (If issues persist, message Soraya if you need help.)

3. In cmd, type `psql -U postgres`. Press enter, then enter your password. If this all works, you're good to go!

#### MacOS

1. Install [PostgreSQL 16.4](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). (Uncheck 'Stack builder' and 'pgAdmin' when installing, we don't need those.)
2. After installation, open a terminal window and type `psql` to ensure that PostgreSQL is added to your system’s PATH.

- If `psql` is not recognized, then open your .zshrc or .bash_profile file in a text editor (depending on which shell you’re using):
- - code ~/.zshrc # For zsh users
- - nano ~/.bash_profile # For bash users
- - - Instead of using the nano text editor you could use VS Code using: code ~/.bash_profile
- Add the following line (adjust the path if needed):
- - export PATH="/Library/PostgreSQL/16/bin:$PATH"
- Save and close the file, then reload your terminal by running:
- - source ~/.zshrc # For zsh users
- - source ~/.bash_profile # For bash users

3. Open a new terminal window and type `psql --version`. If you see `psql(PostgreSQL)16.4`, then it worked!

### DATABASE SETUP

After cloning the repo:

1. Navigate to the clobknockanextjs folder in terminal by typing `cd clobknockanextjs`.
2. Install packages by typing `npm install` in terminal. You can also type `npm i`.
3. Create a file named `.env` in the base folder. Add the following contents inside:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=[your postgreSQL password here]
DB_NAME=clob_database
DATABASE_URL=postgres://postgres:[your postgreSQL password here]@localhost:5432/clob_database
```
Do not include the brackets when adding in the password. 

4. In terminal, type `psql -U postgres -f src/app/data/clob_database.sql`. This creates the database for you.
5. Install the PostgreSQL Explorer by Chris Kolkman on VS Code.
6. Once you install this, follow the instructions in [this Youtube video](https://youtu.be/ezjoDYs72GA?si=0U7jKxL2xwNuQ5YR&t=680) to create a connection to the database. The instruction ends at 13:20.
7. Run the program using `npm run dev`.
8. Go to <http://localhost:3000> to view the website.
9. Kill the program by pressing `CTRL+C` in the terminal.

## Credits
#### Soraya Boza
What Soraya worked on...
* Setup the database for the project, along with all API connections
* Deck creation feature (stored in database)
* Adding cards to deck (stored in database)
* Search filter for mana cost, types, and artists
* Hover effect to cards in deckId page
* Delete cards from deck function (removed from database)
* Initial header/footer components
* Made it where added cards show up in their respective decks
* Fixed certain UI in the project
#### Nathan Duncan
What Nathan worked on...
* Created the landing page, sign in page, register page, help page
* Created the header/footer components
* Created the search by  creature type
* Created the legality/prices displays
#### Logan Lann
What Logan worked on...
* Implemented card animations flip cards, and upside down cards.

