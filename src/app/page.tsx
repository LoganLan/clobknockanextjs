"use client";

import React, { useState, useEffect } from 'react';
import Heading from "@/app/components/Heading";
import Footer from "@/app/components/Footer";


interface Categories {
    colors: string[];
    cardTypes: string[];
    tribes: string[];
    guilds: string[];
    wedges: string[];
    nephilim: string[];
    sets: string[];
    formats: string[];
}

const items: string[] = [
        "Red", "Green", "Blue", "Black", "White",

        "Land", "Creature", "Artifact", "Enchantment", "Planeswalker", "Battle", "Instant", "Sorcery", "Tribal", "Token", "Emblem", "Dungeon", "Phenomenon", "Plane", "Scheme", "Bounties", "Conspiracy",

        "Aetherborn","Advisor","Ally","Alien","Angel","Antelope","Ape","Archer","Army","Archon","Artificer","Assassin","Assembly-Worker","Astartes","Atog","Aurochs","Avatar","Azra",
        "Badger","Balloon","Barbarian","Basilisk","Bat","Bear","Beast","Beaver","Beeble","Beholder","Berserker","Bird","Blinkmoth","Boar","Bringer","Brushwagg",
        "Camarid","Camel","Capybara","Caribou","Carrier","Cat","Centaur","Child","Cephalid","Chimera","Citizen","Cleric","Clown","Cockatrice","Construct","Coward","Coyote","Crab","Crocodile","Custodes","Cybermen","Cyclops","C'tan",
        "Dalek","Dauthi","Demigod","Demon","Deserter","Detective","Devil","Dinosaur","Djinn","Doctor","Dog","Dragon","Drake","Dreadnought","Drone","Druid","Dryad","Dwarf",
        "Efreet","Egg","Elder", "Eldrazi","Elemental","Elephant","Elf","Elk","Employee","Eye",
        "Faerie","Ferret","Fish","Flagbearer","Fox","Fractal", "Frog","Fungus",
        "Gamer","Gargoyle","Germ","Giant","Gith","Glimmer","Gnoll","Gnome","Goat","Goblin","God","Golem","Gorgon","Graveborn","Gremlin","Griffin","Guest",
        "Hag","Halfling","Hamster","Harpy","Hellion","Hippo","Hippogriff", "Homunculus","Horror","Horse","Human","Hound","Hydra","Hyena",
        "Illusion","Imp","Incarnation","Inkling","Inquisitor","Insect",
        "Jackal","Jellyfish","Juggernaut",
        "Kavu","Kirin","Kithkin","Knight","Kobold", "Kor","Kraken",
        "Lamia","Lammasu","Leech", "Leviathan","Lhurgoyf","Licid", "Lizard","Llama",
        "Manticore","Masticore", "Mercenary", "Merfolk","Metathran", "Minion", "Minotaur","Mite", "Mole","Monger","Mongoode","Monk", "Monkey","Moonfolk","Mount","Mouse", "Mutant","Myr","Mystic",
        "Naga","Nautilus","Necron","Nephilim","Nightmare","Nightstalker","Ninja","Noble","Noggle","Nomad","Nymph",
        "Octopus","Ogre","Ooze", "Orb", "Orc","Orgg","Otter","Ouphe","Ox","Oyster",
        "Pangolin","Pegasus","Pentavite","Performer","Pest","Pilot","Phelddagrif","Phoenix","Phyrexian", "Plant", "Porcupine","Possum","Pirate", "Praetor","Primarch","Prism","Processor",
        "Rabbit", "Raccoon","Ranger","Rat","Rebel","Reflection", "Rhino", "Rigger", "Robot","Rogue", 
        "Sable","Salamander","Samurai","Sand","Saproling","Satyr","Scarecrow","Scientist", "Scion", "Scorpion","Scout","Serf","Serpent","Servo","Shade", "Shaman", "Shapeshifter","Shark", "Sheep", "Siren","Skeleton","Skunk","Slith","Sliver","Sloth","Slug", "Snail","Snake","Soldier","Soltari","Spawn","Specter","Spellchaser","Sphinx","Spider","Spike","Spirit","Splinter","Sponge", "Squid", "Squirrel","Starfish","Surrakar","Survivor","Synth",
        "Tentacle","Tetravite","Thalakos", "Thopter", "Thrull","Tiefling","Time Lord","Toy","Treefolk","Trilobite","Triskelavite","Troll", "Turtle", "Tyranid",
        "Unicorn",
        "Vampire","Varmint","Vedalken","Viashino","Volver",
        "Wall","Walrus","Warlock","Warrior","Weasel","Weird", "Werewolf", "Whale", "Wizard","Wolverine","Wombat", "Worm","Wraith", "Wurm",
        "Yeti",
       "Zombie","Zubera",

       "Azorius","Boros","Orzhov","Dimir","Golgari","Selesnya","Gruul","Izzet","Rakdos","Simic",

       "Bant","Esper","Grixis","Jund","Naya","Mardu","Temur","Abzan","Jeskai","Sultai",

       "Choas","Dune","Witch","Yore","Altruism",

       "Alpha","Beta","Unlimited","Arabian Nights","Antiquities","Legends","The Dark","Fallen Empires","Homelands","Alliances","Mirage","Visions","Weatherlight","Tempest","Stronghold",
        "Exodus","Urza's Saga","Urza's Legacy","Urza's Destiny","Mercadian Masques","Ninth Edition","Torment","Judgment","Onslaught","Legions","Scourge","Eighth Edition","Dissension",
        "Guildpact","Ravnica: City of Guilds","Mirrodin","Darksteel","Fifth Dawn","Coldsnap","Time Spiral","Planar Chaos","Future Sight","Lorwyn","Morningtide","Shadowmoor","Eventide","Shards of Alara","Conflux","Alara Reborn","Zendikar","Worldwake",
        "Rise of the Eldrazi","Magic 2010","Scars of Mirrodin","Mirrodin Besieged","Dark Ascension","Avacyn Restored","Magic 2013","Return to Ravnica","Gatecrash","Dragon's Maze",
        "Theros","Born of the Gods","Journey into Nyx","Magic 2015","Khans of Tarkir","Fate Reforged","Dragons of Tarkir","Magic Origins","Battle for Zendikar","Oath of the Gatewatch",
        "Shadows over Innistrad","Eldritch Moon","Kaladesh","Aether Revolt","Amonkhet","Hour of Devastation","Ixalan","Rivals of Ixalan","Dominaria",
        "Core Set 2019","Guilds of Ravnica","Ravnica Allegiance","War of the Spark","Core Set 2020","Throne of Eldraine","Theros: Beyond Death","Ikoria: Lair of Behemoths",
        "Core Set 2021","Zendikar Rising","Kaldheim","Strixhaven: School of Mages","Modern Horizons 2","Dungeons & Dragons: Adventures in the Forgotten Realms","Innistrad: Midnight Hunt","Innistrad: Crimson Vow",
        "Kamigawa: Neon Dynasty","Streets of New Capenna","Unfinity","Dominaria United","The Brothers' War","Phyrexia: All Will Be One","March of the Machine","March of the Machine: The Aftermath","Eldraine Remastered",
        "Lost Caverns of Ixalan","Wilds of Eldraine",

        "Alchemy","Brawl","Booster Draft","Canadian Highlander","Commander (EDH)","Constructed","Cube Draft","Duel Commander","Extended","Explorer","Frontier","Historic","Historic Brawl","Legacy","Limited","Modern","Oathbreaker",
        "Pauper","Pauper Commander","Pioneer","Premodern","Sealed Deck","Singleton","Standard","Tiny Leaders","Two-Headed Giant","Vintage"
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
  const [filteredItems, setFilteredItems] = useState<string[]>([]); // Filtered results state
  const [categories, setCategories] = useState<Categories>({
      colors: [],
      cardTypes: [],
      tribes: [],
      guilds: [],
      wedges: [],
      nephilim: [],
      sets: [],
      formats: [],
  });

  useEffect(() => {
      // Filter items based on the search term
      const filtered = items.filter(item => 
          item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
  }, [searchTerm]);

  const categorizeItems = (items: string[]) => {
      const newCategories: Categories = {
          colors: [],
          cardTypes: [],
          tribes: [],
          guilds: [],
          wedges: [],
          nephilim: [],
          sets: [],
          formats: [],
      };


      items.forEach(item => {
        if (["Red", "Green", "Blue", "Black", "White"].includes(item)) {
            newCategories.colors.push(item);
        } else if (["Land", "Creature", "Artifact", "Enchantment", "Planeswalker", "Battle", "Instant", "Sorcery", "Tribal", "Token", "Emblem", "Dungeon", "Phenomenon", "Plane", "Scheme", "Bounties", "Conspiracy"].includes(item)) {
            newCategories.cardTypes.push(item);

        } else if (["Aetherborn","Advisor","Ally","Alien","Angel","Antelope","Ape","Archer","Army","Archon","Artificer","Assassin","Assembly-Worker","Astartes","Atog","Aurochs","Avatar","Azra",
        "Badger","Balloon","Barbarian","Basilisk","Bat","Bear","Beast","Beaver","Beeble","Beholder","Berserker","Bird","Blinkmoth","Boar","Bringer","Brushwagg",
        "Camarid","Camel","Capybara","Caribou","Carrier","Cat","Centaur","Child","Cephalid","Chimera","Citizen","Cleric","Clown","Cockatrice","Construct","Coward","Coyote","Crab","Crocodile","Custodes","Cybermen","Cyclops","C'tan",
        "Dalek","Dauthi","Demigod","Demon","Deserter","Detective","Devil","Dinosaur","Djinn","Doctor","Dog","Dragon","Drake","Dreadnought","Drone","Druid","Dryad","Dwarf",
        "Efreet","Egg","Elder", "Eldrazi","Elemental","Elephant","Elf","Elk","Employee","Eye",
        "Faerie","Ferret","Fish","Flagbearer","Fox","Fractal", "Frog","Fungus",
        "Gamer","Gargoyle","Germ","Giant","Gith","Glimmer","Gnoll","Gnome","Goat","Goblin","God","Golem","Gorgon","Graveborn","Gremlin","Griffin","Guest",
        "Hag","Halfling","Hamster","Harpy","Hellion","Hippo","Hippogriff", "Homunculus","Horror","Horse","Human","Hound","Hydra","Hyena",
        "Illusion","Imp","Incarnation","Inkling","Inquisitor","Insect",
        "Jackal","Jellyfish","Juggernaut",
        "Kavu","Kirin","Kithkin","Knight","Kobold", "Kor","Kraken",
        "Lamia","Lammasu","Leech", "Leviathan","Lhurgoyf","Licid", "Lizard","Llama",
        "Manticore","Masticore", "Mercenary", "Merfolk","Metathran", "Minion", "Minotaur","Mite", "Mole","Monger","Mongoode","Monk", "Monkey","Moonfolk","Mount","Mouse", "Mutant","Myr","Mystic",
        "Naga","Nautilus","Necron","Nephilim","Nightmare","Nightstalker","Ninja","Noble","Noggle","Nomad","Nymph",
        "Octopus","Ogre","Ooze", "Orb", "Orc","Orgg","Otter","Ouphe","Ox","Oyster",
        "Pangolin","Pegasus","Pentavite","Performer","Pest","Pilot","Phelddagrif","Phoenix","Phyrexian", "Plant", "Porcupine","Possum","Pirate", "Praetor","Primarch","Prism","Processor",
        "Rabbit", "Raccoon","Ranger","Rat","Rebel","Reflection", "Rhino", "Rigger", "Robot","Rogue", 
        "Sable","Salamander","Samurai","Sand","Saproling","Satyr","Scarecrow","Scientist", "Scion", "Scorpion","Scout","Serf","Serpent","Servo","Shade", "Shaman", "Shapeshifter","Shark", "Sheep", "Siren","Skeleton","Skunk","Slith","Sliver","Sloth","Slug", "Snail","Snake","Soldier","Soltari","Spawn","Specter","Spellchaser","Sphinx","Spider","Spike","Spirit","Splinter","Sponge", "Squid", "Squirrel","Starfish","Surrakar","Survivor","Synth",
        "Tentacle","Tetravite","Thalakos", "Thopter", "Thrull","Tiefling","Time Lord","Toy","Treefolk","Trilobite","Triskelavite","Troll", "Turtle", "Tyranid",
        "Unicorn",
        "Vampire","Varmint","Vedalken","Viashino","Volver",
        "Wall","Walrus","Warlock","Warrior","Weasel","Weird", "Werewolf", "Whale", "Wizard","Wolverine","Wombat", "Worm","Wraith", "Wurm",
        "Yeti",
       "Zombie","Zubera"
      
      ].includes(item)) {
            newCategories.tribes.push(item);

        } else if (["Azorius", "Boros", "Orzhov", "Dimir", "Golgari", "Selesnya", "Gruul", "Izzet", "Rakdos", "Simic"].includes(item)) {
            newCategories.guilds.push(item);

        } else if (["Bant", "Esper", "Grixis", "Jund", "Naya", "Mardu", "Temur", "Abzan", "Jeskai", "Sultai"].includes(item)) {
            newCategories.wedges.push(item);

        } else if (["Chaos", "Dune", "Witch", "Yore", "Altruism"].includes(item)) {
            newCategories.nephilim.push(item);

        } else if (["Alpha", "Beta", "Unlimited", "Arabian Nights", "Antiquities", "Legends", "The Dark", "Fallen Empires", "Homelands", "Alliances", "Mirage", "Visions", "Weatherlight", "Tempest", "Stronghold", "Exodus", "Urza's Saga", "Urza's Legacy", "Urza's Destiny", "Mercadian Masques", "Ninth Edition", "Torment", "Judgment", "Onslaught", "Legions", "Scourge", "Eighth Edition", "Dissension", "Guildpact", "Ravnica: City of Guilds", "Mirrodin", "Darksteel", "Fifth Dawn", "Coldsnap", "Time Spiral", "Planar Chaos", "Future Sight", "Lorwyn", "Morningtide", "Shadowmoor", "Eventide", "Shards of Alara", "Conflux", "Alara Reborn", "Zendikar", "Worldwake", "Rise of the Eldrazi", "Magic 2010", "Scars of Mirrodin", "Mirrodin Besieged", "Dark Ascension", "Avacyn Restored", "Magic 2013", "Return to Ravnica", "Gatecrash", "Dragon's Maze", "Theros", "Born of the Gods", "Journey into Nyx", "Magic 2015", "Khans of Tarkir", "Fate Reforged", "Dragons of Tarkir", "Magic Origins", "Battle for Zendikar",
                    "Oath of the Gatewatch", "Shadows over Innistrad", "Eldritch Moon", "Kaladesh", "Aether Revolt", "Amonkhet", "Hour of Devastation", "Ixalan", "Rivals of Ixalan", "Dominaria", "Core Set 2019", "Guilds of Ravnica", "Ravnica Allegiance", "War of the Spark", "Core Set 2020", "Throne of Eldraine", "Theros: Beyond Death", "Ikoria: Lair of Behemoths", "Core Set 2021", "Zendikar Rising", "Kaldheim", "Strixhaven: School of Mages", "Modern Horizons 2", "Dungeons & Dragons: Adventures in the Forgotten Realms", "Innistrad: Midnight Hunt", "Innistrad: Crimson Vow", "Kamigawa: Neon Dynasty", "Streets of New Capenna", "Unfinity", "Dominaria United", "The Brothers' War", "Phyrexia: All Will Be One", "March of the Machine", "March of the Machine: The Aftermath", "Eldraine Remastered", "Lost Caverns of Ixalan", "Wilds of Eldraine"].includes(item)) {
            newCategories.sets.push(item);

        } else if (["Alchemy", "Brawl", "Booster Draft", "Canadian Highlander", "Commander (EDH)", "Constructed", "Cube Draft", "Duel Commander", "Extended", "Explorer", "Frontier", "Historic", "Historic Brawl", "Legacy", "Limited", "Modern", "Oathbreaker", "Pauper", "Pauper Commander", "Pioneer", "Premodern", "Sealed Deck", "Singleton", "Standard", "Tiny Leaders", "Two-Headed Giant", "Vintage"].includes(item)) {
            newCategories.formats.push(item);
        }
    });

    setCategories(newCategories);
};

return (
  <div style={{ backgroundColor: 'Gray', minHeight: '100vh' }}>

    {/* Light gray background */}
    <Heading />

    {/* Main Content */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        transform: 'translateX(-10px)',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '30px' }}>Clobknocka</h1>
    </div>

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        transform: 'translateX(-10px)',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '22px' }}>
        A Database for Magic the Gathering
      </h1>
    </div>

    {/* Centered Search bar */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Horizontally center the search bar
        alignItems: 'center', // Vertically center the search bar
        height: '50vh', // Full viewport height to center the content
      }}
    >
      <div
        className="search-container rounded-xl text-center p-3"
        style={{
          color: 'black',
        }}
      >
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              width: '200px',
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px',
              border: '1px solid gray',
            }}
          />
          <button
            onClick={() => {
              // Filter logic to set filtered items
              setFilteredItems(
                items.filter((item) =>
                  item.toLowerCase().includes(searchTerm.toLowerCase())
                )
              );
            }}
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '10px',
              borderTopRightRadius: '5px',
              borderBottomRightRadius: '5px',
              border: '1px solid black',
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>

    {/* Display filtered items */}
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {searchTerm && filteredItems.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredItems.map((item, index) => (
            <li key={index} style={{ margin: '10px 0', color: 'black' }}>
              {item}
            </li>
          ))}
        </ul>
      ) : searchTerm ? (
        <p style={{ color: 'black' }}>No items found.</p>
      ) : null}
    </div>

    {/* Footer */}
    <Footer />

{/* Custom animation */}
<style jsx>{`
        @keyframes rainbow {
          0% { color: #ffffff; } /* White */
          12.5% { color: #6e9aff; } /* Cornflower_Blue */
          25% { color: #989898; } /* battleship-grey */
          37.5% { color: #ed1515; } /* Red(CMYK) */
          50% { color: #22ff1f; } /* Green */
          62.5% { color: #dcdcdc; } /* platinum */
          75% { color: #1f40ff; } /* Palatinate_Blue */
          87.5% { color: #525252; } /* Davys-Gray */
          90% { color: #c80d0d; } /* Engineering_Orange */
          100% { color: #008b06; } /* India_Green */
        }

        .hover-rainbow:hover {
          animation: rainbow 5s infinite; /* Apply the animation */
        }
      `}</style>


  </div>
);

}