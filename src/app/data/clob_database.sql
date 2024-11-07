CREATE DATABASE clob_database;


-- Connect to the newly created database
\c clob_database;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE decks (
    deck_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    deck_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, deck_name) -- Each user can only have one deck with the same name
);

CREATE TABLE deck_cards (
    deck_card_id SERIAL PRIMARY KEY,
    deck_id INT REFERENCES decks(deck_id) ON DELETE CASCADE,
    card_id VARCHAR(50) NOT NULL, -- Scryfall card ID
    quantity INT DEFAULT 1 CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index to speed up searching cards within a deck
CREATE INDEX idx_deck_cards_deck_id ON deck_cards(deck_id);

INSERT INTO users (username, email, password_hash)
VALUES ('Test User', 'testuser@example.com', '1234');


-- DROP DATABASE clob_database;