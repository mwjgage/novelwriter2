import React, { useState } from 'react';
import { Heart, BookOpen, User, Sparkles, Check, X, ChevronDown, ChevronRight } from 'lucide-react';

const RomanceNovelWriter = () => {
  const [selectedSubgenre, setSelectedSubgenre] = useState('');
  const [selectedEra, setSelectedEra] = useState('');
  const [selectedMaleTrope, setSelectedMaleTrope] = useState('');
  const [selectedFemaleTrope, setSelectedFemaleTrope] = useState('');
  const [selectedSecondaryCharacters, setSelectedSecondaryCharacters] = useState([]);
  const [secondaryComplete, setSecondaryComplete] = useState(false);
  const [selectedPlotTrope, setSelectedPlotTrope] = useState('');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState('');
  const [selectedLength, setSelectedLength] = useState('');
  const [plotApproved, setPlotApproved] = useState(false);
  const [chapterOutline, setChapterOutline] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [expandedScenes, setExpandedScenes] = useState({});
  const [generatedProse, setGeneratedProse] = useState({});
  const [generatingBeat, setGeneratingBeat] = useState(null);
  const [manuscriptText, setManuscriptText] = useState('');
  
  const topSubgenres = [
    { id: 'romantasy', name: 'Romantasy', description: 'Fantasy romance with magic and mythical creatures' },
    { id: 'contemporary', name: 'Contemporary Romance', description: 'Modern-day love stories' },
    { id: 'historical', name: 'Historical Romance', description: 'Romance set before 1950' },
    { id: 'dark-romance', name: 'Dark Romance', description: 'Intense stories with darker themes' },
    { id: 'billionaire', name: 'Billionaire Romance', description: 'Wealthy heroes and different worlds' },
    { id: 'small-town', name: 'Small Town Romance', description: 'Cozy community settings' },
    { id: 'sports', name: 'Sports Romance', description: 'Athletic heroes and heroines' },
    { id: 'paranormal', name: 'Paranormal Romance', description: 'Supernatural beings finding love' },
    { id: 'romantic-suspense', name: 'Romantic Suspense', description: 'Romance with mystery and danger' },
    { id: 'mafia', name: 'Mafia Romance', description: 'Dangerous underworld figures' }
  ];

  const historicalEras = [
    { id: 'regency', name: 'Regency Era', period: '1811-1820', description: 'Balls, dukes, and society scandals' },
    { id: 'victorian', name: 'Victorian Era', period: '1837-1901', description: 'Propriety and passion' },
    { id: 'medieval', name: 'Medieval Era', period: '5th-15th century', description: 'Knights and castles' },
    { id: 'wild-west', name: 'Wild West', period: '1865-1895', description: 'Cowboys and frontier' }
  ];

  const maleTropesByEra = {
    'regency': [
      { id: 'duke', name: 'The Rakish Duke', description: 'A wealthy, notorious libertine' },
      { id: 'war-hero', name: 'The War Hero', description: 'A decorated officer' },
      { id: 'viscount', name: 'The Charming Viscount', description: 'A witty nobleman' },
      { id: 'spy', name: 'The Secret Agent', description: 'A gentleman spy' }
    ],
    'victorian': [
      { id: 'industrialist', name: 'The Industrialist', description: 'A self-made factory owner' },
      { id: 'detective', name: 'The Detective', description: 'A brilliant investigator' },
      { id: 'doctor', name: 'The Doctor', description: 'A progressive physician' },
      { id: 'aristocrat', name: 'The Aristocrat', description: 'A gentleman with secrets' }
    ],
    'medieval': [
      { id: 'knight', name: 'The Noble Knight', description: 'A chivalrous warrior' },
      { id: 'dark-knight', name: 'The Dark Knight', description: 'A brooding warrior' },
      { id: 'lord', name: 'The Reluctant Lord', description: 'A nobleman in power' },
      { id: 'outlaw', name: 'The Charming Outlaw', description: 'A roguish bandit' }
    ],
    'wild-west': [
      { id: 'cowboy', name: 'The Cowboy', description: 'A lonesome drifter' },
      { id: 'sheriff', name: 'The Sheriff', description: 'A lawman' },
      { id: 'outlaw', name: 'The Outlaw', description: 'A reformed bandit' },
      { id: 'rancher', name: 'The Rancher', description: 'A landowner' }
    ]
  };

  const femaleTropesByEra = {
    'regency': [
      { id: 'debutante', name: 'The Debutante', description: 'Forced into marriage market' },
      { id: 'bluestocking', name: 'The Bluestocking', description: 'Loves books over balls' },
      { id: 'wallflower', name: 'The Wallflower', description: 'Overlooked with hidden depths' },
      { id: 'heiress', name: 'The Heiress', description: 'A wealthy woman' }
    ],
    'victorian': [
      { id: 'governess', name: 'The Governess', description: 'An educated worker' },
      { id: 'suffragette', name: 'The Suffragette', description: 'Fighting for votes' },
      { id: 'heiress', name: 'The Heiress', description: 'Controlled by relatives' },
      { id: 'nurse', name: 'The Nurse', description: 'New profession' }
    ],
    'medieval': [
      { id: 'lady', name: 'The Noble Lady', description: 'A highborn woman' },
      { id: 'warrior-maiden', name: 'The Warrior Maiden', description: 'Learned to fight' },
      { id: 'healer', name: 'The Village Healer', description: 'Wise woman' },
      { id: 'heiress', name: 'The Heiress', description: 'Lands make her a prize' }
    ],
    'wild-west': [
      { id: 'mail-order', name: 'The Mail-Order Bride', description: 'Traveling west' },
      { id: 'saloon-owner', name: 'The Saloon Owner', description: 'A businesswoman' },
      { id: 'ranchers-daughter', name: 'The Rancher Daughter', description: 'Can ride and shoot' },
      { id: 'schoolmarm', name: 'The Schoolmarm', description: 'Bringing education' }
    ]
  };

  const characterNamesByEra = {
    'regency': {
      male: { firstName: 'Sebastian', surname: 'Thornfield' },
      female: { firstName: 'Arabella', surname: 'Beaumont' }
    },
    'victorian': {
      male: { firstName: 'Edward', surname: 'Blackwood' },
      female: { firstName: 'Charlotte', surname: 'Sterling' }
    },
    'medieval': {
      male: { firstName: 'William', surname: 'de Montfort' },
      female: { firstName: 'Eleanor', surname: 'of Clare' }
    },
    'wild-west': {
      male: { firstName: 'Cole', surname: 'McCoy' },
      female: { firstName: 'Rose', surname: 'Sullivan' }
    }
  };

  const secondaryCharacterTropes = [
    { id: 'best-friend', name: 'The Loyal Best Friend', description: 'A confidant who offers advice and comic relief' },
    { id: 'rival', name: 'The Romantic Rival', description: 'Someone competing for affection' },
    { id: 'mentor', name: 'The Wise Mentor', description: 'An older character who guides the protagonist' },
    { id: 'villain', name: 'The Scheming Villain', description: 'An antagonist working against the couple' },
    { id: 'sibling', name: 'The Protective Sibling', description: 'A brother or sister with their own agenda' },
    { id: 'parent', name: 'The Overbearing Parent', description: 'A parent with strong opinions about the match' },
    { id: 'servant', name: 'The Observant Servant', description: 'A loyal servant who knows all the secrets' },
    { id: 'ex-lover', name: 'The Ex-Lover', description: 'A past flame who complicates things' },
    { id: 'matchmaker', name: 'The Meddling Matchmaker', description: 'Someone determined to bring the couple together' },
    { id: 'childhood-friend', name: 'The Childhood Friend', description: 'Someone from the protagonist\'s past' }
  ];

  const secondaryCharacterNamesByEra = {
    'regency': {
      'best-friend': { firstName: 'Penelope', surname: 'Ashworth' },
      'rival': { firstName: 'Lady Cordelia', surname: 'Fairfax' },
      'mentor': { firstName: 'Dowager Duchess', surname: 'Harrington' },
      'villain': { firstName: 'Lord Edmund', surname: 'Blackwell' },
      'sibling': { firstName: 'Frederick', surname: '' },
      'parent': { firstName: 'Lord Reginald', surname: '' },
      'servant': { firstName: 'Mrs. Pembroke', surname: '' },
      'ex-lover': { firstName: 'Lady Victoria', surname: 'Ashford' },
      'matchmaker': { firstName: 'Lady Beatrice', surname: 'Worthington' },
      'childhood-friend': { firstName: 'Henry', surname: 'Foxworth' }
    },
    'victorian': {
      'best-friend': { firstName: 'Margaret', surname: 'Hartley' },
      'rival': { firstName: 'Miss Adelaide', surname: 'Thornton' },
      'mentor': { firstName: 'Professor', surname: 'Whitmore' },
      'villain': { firstName: 'Mr. Cornelius', surname: 'Drake' },
      'sibling': { firstName: 'George', surname: '' },
      'parent': { firstName: 'Mrs. Beatrice', surname: '' },
      'servant': { firstName: 'Mr. Dawson', surname: '' },
      'ex-lover': { firstName: 'Miss Evangeline', surname: 'Cross' },
      'matchmaker': { firstName: 'Lady Prudence', surname: 'Ashbury' },
      'childhood-friend': { firstName: 'Thomas', surname: 'Winters' }
    },
    'medieval': {
      'best-friend': { firstName: 'Rowena', surname: 'of York' },
      'rival': { firstName: 'Lady Morgana', surname: 'le Fay' },
      'mentor': { firstName: 'Brother Ambrose', surname: '' },
      'villain': { firstName: 'Lord Cedric', surname: 'the Black' },
      'sibling': { firstName: 'Robert', surname: '' },
      'parent': { firstName: 'Lord Aldric', surname: '' },
      'servant': { firstName: 'Old Nell', surname: '' },
      'ex-lover': { firstName: 'Lady Giselle', surname: 'de Beaumont' },
      'matchmaker': { firstName: 'Abbess Catherine', surname: '' },
      'childhood-friend': { firstName: 'Geoffrey', surname: 'of Kent' }
    },
    'wild-west': {
      'best-friend': { firstName: 'Sarah Jane', surname: 'Mitchell' },
      'rival': { firstName: 'Miss Delilah', surname: 'Hart' },
      'mentor': { firstName: 'Doc', surname: 'Holliday' },
      'villain': { firstName: 'Silas', surname: 'Cane' },
      'sibling': { firstName: 'Jesse', surname: '' },
      'parent': { firstName: 'Pa', surname: '' },
      'servant': { firstName: 'Maggie', surname: '' },
      'ex-lover': { firstName: 'Annabelle', surname: 'Graves' },
      'matchmaker': { firstName: 'Mrs. Betsy', surname: 'Cooper' },
      'childhood-friend': { firstName: 'Jack', surname: 'Dawson' }
    }
  };

  const maleTropesBySubgenre = {
    'romantasy': [
      { id: 'fae-prince', name: 'The Fae Prince', description: 'An otherworldly royal bound by ancient rules' },
      { id: 'dragon-shifter', name: 'The Dragon Shifter', description: 'A warrior who commands fire and scale' },
      { id: 'shadow-mage', name: 'The Shadow Mage', description: 'A sorcerer wielding forbidden magic' },
      { id: 'immortal-guardian', name: 'The Immortal Guardian', description: 'A centuries-old protector sworn to a sacred duty' }
    ],
    'contemporary': [
      { id: 'grumpy-neighbor', name: 'The Grumpy Neighbor', description: 'Guards his solitude fiercely' },
      { id: 'single-dad', name: 'The Single Dad', description: 'A devoted father rebuilding his life' },
      { id: 'workaholic-ceo', name: 'The Workaholic CEO', description: 'Married to his company until she walks in' },
      { id: 'best-friends-brother', name: "The Best Friend's Brother", description: 'Off-limits and impossible to ignore' }
    ],
    'dark-romance': [
      { id: 'ruthless-captor', name: 'The Ruthless Captor', description: 'Takes what he wants, no apologies' },
      { id: 'vigilante', name: 'The Vigilante', description: 'Delivers his own brand of justice' },
      { id: 'morally-gray', name: 'The Morally Gray Anti-Hero', description: 'Neither good nor safe' },
      { id: 'possessive-protector', name: 'The Possessive Protector', description: 'Claims her as his to guard' }
    ],
    'billionaire': [
      { id: 'billionaire-ceo', name: 'The Billionaire CEO', description: 'Commands an empire and expects to be obeyed' },
      { id: 'secret-heir', name: 'The Secret Heir', description: 'Inherits a fortune he never wanted' },
      { id: 'self-made-tycoon', name: 'The Self-Made Tycoon', description: 'Built his wealth from nothing' },
      { id: 'reformed-playboy', name: 'The Reformed Playboy', description: 'Trading conquests for something real' }
    ],
    'small-town': [
      { id: 'hometown-sheriff', name: 'The Hometown Sheriff', description: 'Keeps the peace and hides his heart' },
      { id: 'returning-hero', name: 'The Returning Hero', description: 'Comes home changed by what he has seen' },
      { id: 'small-town-doctor', name: 'The Small-Town Doctor', description: 'Heals everyone but himself' },
      { id: 'reformed-bad-boy', name: 'The Reformed Bad Boy', description: 'Left his reputation behind, mostly' }
    ],
    'sports': [
      { id: 'star-quarterback', name: 'The Star Quarterback', description: 'Carries the team and the pressure' },
      { id: 'team-captain', name: 'The Team Captain', description: 'Leads on the ice and off' },
      { id: 'retired-athlete-coach', name: 'The Retired Athlete Turned Coach', description: 'Building the next generation after his own career ended' },
      { id: 'underdog-rookie', name: 'The Underdog Rookie', description: 'Fighting to prove he belongs' }
    ],
    'paranormal': [
      { id: 'alpha-werewolf', name: 'The Alpha Werewolf', description: 'Leads his pack with an iron will' },
      { id: 'ancient-vampire', name: 'The Ancient Vampire', description: 'Centuries of secrets behind his eyes' },
      { id: 'guardian-angel', name: 'The Guardian Angel', description: 'Sworn to protect her, forbidden to love her' },
      { id: 'cursed-immortal', name: 'The Cursed Immortal', description: 'Trapped by a curse only love can break' }
    ],
    'romantic-suspense': [
      { id: 'undercover-agent', name: 'The Undercover Agent', description: 'Living a lie to catch the truth' },
      { id: 'bodyguard', name: 'The Bodyguard', description: 'Sworn to protect her, tempted to want her' },
      { id: 'detective', name: 'The Detective', description: 'Chases the case that leads straight to her' },
      { id: 'ex-special-forces', name: 'The Ex-Special Forces Operative', description: 'Trained for war, unprepared for her' }
    ],
    'mafia': [
      { id: 'mafia-don', name: 'The Mafia Don', description: "Rules his family's empire without mercy" },
      { id: 'enforcer', name: 'The Enforcer', description: "Does the family's dirty work without question" },
      { id: 'reluctant-heir', name: 'The Reluctant Heir', description: 'Never wanted the throne he is forced to take' },
      { id: 'rival-family-son', name: "The Rival Family's Son", description: 'Loyalty and love are on a collision course' }
    ]
  };

  const femaleTropesBySubgenre = {
    'romantasy': [
      { id: 'chosen-one', name: 'The Chosen One', description: 'Marked by a prophecy she never asked for' },
      { id: 'rogue-witch', name: 'The Rogue Witch', description: "Untrained power she's desperate to control" },
      { id: 'exiled-princess', name: 'The Exiled Princess', description: 'Stripped of her throne, fighting to reclaim it' },
      { id: 'reluctant-oracle', name: 'The Reluctant Oracle', description: "Cursed with visions she can't escape" }
    ],
    'contemporary': [
      { id: 'career-driven', name: 'The Career-Driven Achiever', description: 'Climbing the ladder, no time for love' },
      { id: 'free-spirit', name: 'The Free Spirit', description: 'Lives by her own rules' },
      { id: 'girl-next-door', name: 'The Girl Next Door', description: 'Overlooked but unforgettable' },
      { id: 'runaway-bride', name: 'The Runaway Bride', description: 'Fled the altar to find herself' }
    ],
    'dark-romance': [
      { id: 'reluctant-captive', name: 'The Reluctant Captive', description: 'Trapped but never broken' },
      { id: 'broken-survivor', name: 'The Broken Survivor', description: 'Rebuilding herself from the wreckage' },
      { id: 'fierce-avenger', name: 'The Fierce Avenger', description: "Hunting the people who wronged her" },
      { id: 'innocent-pawn', name: 'The Innocent Pawn', description: "Caught in a game she didn't choose" }
    ],
    'billionaire': [
      { id: 'struggling-assistant', name: 'The Struggling Assistant', description: 'Working paycheck to paycheck for him' },
      { id: 'undercover-journalist', name: 'The Undercover Journalist', description: 'Chasing a story that gets personal' },
      { id: 'small-town-girl', name: 'The Small-Town Girl', description: 'Out of her depth in his world' },
      { id: 'ambitious-intern', name: 'The Ambitious Intern', description: 'Determined to prove she belongs' }
    ],
    'small-town': [
      { id: 'city-girl-home', name: 'The City Girl Coming Home', description: "Back where she swore she'd never return" },
      { id: 'bakery-owner', name: 'The Bakery Owner', description: 'Keeps the whole town fed and close-knit' },
      { id: 'schoolteacher', name: 'The Schoolteacher', description: "Shapes the town's future one class at a time" },
      { id: 'innkeeper', name: 'The Innkeeper', description: "Runs the heart of the town's hospitality" }
    ],
    'sports': [
      { id: 'sports-journalist', name: 'The Sports Journalist', description: "Covers the game she's not supposed to fall for" },
      { id: 'team-physician', name: 'The Team Physician', description: 'Keeps the athletes healthy and her guard up' },
      { id: 'athletes-sister', name: "The Athlete's Sister", description: 'Knows the game better than most players' },
      { id: 'rival-athlete', name: 'The Rival Athlete', description: 'Competes against him on principle' }
    ],
    'paranormal': [
      { id: 'newly-turned', name: 'The Newly Turned', description: 'Adjusting to powers she never wanted' },
      { id: 'awakening-witch', name: 'The Witch Awakening Her Powers', description: "Discovering a legacy she didn't know she had" },
      { id: 'human-in-between', name: 'The Human Caught In Between', description: 'Ordinary girl in an extraordinary world' },
      { id: 'huntress', name: 'The Huntress', description: 'Trained to kill his kind' }
    ],
    'romantic-suspense': [
      { id: 'witness-in-hiding', name: 'The Witness in Hiding', description: 'Running from what she saw' },
      { id: 'investigative-reporter', name: 'The Investigative Reporter', description: 'Digs for a story that puts her in danger' },
      { id: 'fbi-profiler', name: 'The FBI Profiler', description: 'Reads everyone but him' },
      { id: 'woman-with-secret-past', name: 'The Woman With a Secret Past', description: 'Reinvented herself to survive' }
    ],
    'mafia': [
      { id: 'dons-daughter', name: "The Don's Daughter", description: 'Raised in the family business, wants out' },
      { id: 'innocent-outsider', name: 'The Innocent Outsider', description: "Pulled into a world she doesn't understand" },
      { id: 'undercover-cop', name: 'The Undercover Cop', description: 'Getting close enough to bring him down' },
      { id: 'runaway-bride-to-be', name: 'The Runaway Bride-to-Be', description: 'Promised to one man, falling for another' }
    ]
  };

  const characterNamesBySubgenre = {
    'romantasy': {
      male: { firstName: 'Cassian', surname: 'Draven' },
      female: { firstName: 'Seraphine', surname: 'Ashwood' }
    },
    'contemporary': {
      male: { firstName: 'Jake', surname: 'Sullivan' },
      female: { firstName: 'Emma', surname: 'Reyes' }
    },
    'dark-romance': {
      male: { firstName: 'Damien', surname: 'Voss' },
      female: { firstName: 'Elena', surname: 'Cross' }
    },
    'billionaire': {
      male: { firstName: 'Alexander', surname: 'Sterling' },
      female: { firstName: 'Grace', surname: 'Bennett' }
    },
    'small-town': {
      male: { firstName: 'Cole', surname: 'Bennett' },
      female: { firstName: 'Maggie', surname: 'Reed' }
    },
    'sports': {
      male: { firstName: 'Tyler', surname: 'Brooks' },
      female: { firstName: 'Sydney', surname: 'Cole' }
    },
    'paranormal': {
      male: { firstName: 'Ronan', surname: 'Blackwood' },
      female: { firstName: 'Ivy', surname: 'Sorensen' }
    },
    'romantic-suspense': {
      male: { firstName: 'Marcus', surname: 'Kane' },
      female: { firstName: 'Olivia', surname: 'Hart' }
    },
    'mafia': {
      male: { firstName: 'Dante', surname: 'Moretti' },
      female: { firstName: 'Sofia', surname: 'Russo' }
    }
  };

  const secondaryCharacterNamesBySubgenre = {
    'romantasy': {
      'best-friend': { firstName: 'Briar', surname: 'Nightsong' },
      'rival': { firstName: 'Lady Isolde', surname: 'Thorne' },
      'mentor': { firstName: 'Master', surname: 'Alaric' },
      'villain': { firstName: 'Lord', surname: 'Malachai' },
      'sibling': { firstName: 'Finn', surname: '' },
      'parent': { firstName: 'Queen', surname: 'Maren' },
      'servant': { firstName: 'Old Pell', surname: '' },
      'ex-lover': { firstName: 'Lyra', surname: 'Duskwood' },
      'matchmaker': { firstName: 'Aunt', surname: 'Rosalind' },
      'childhood-friend': { firstName: 'Tobias', surname: 'Hale' }
    },
    'contemporary': {
      'best-friend': { firstName: 'Zoe', surname: 'Martinez' },
      'rival': { firstName: 'Ashley', surname: 'Kane' },
      'mentor': { firstName: 'Professor', surname: 'Lowe' },
      'villain': { firstName: 'Richard', surname: 'Voss' },
      'sibling': { firstName: 'Sam', surname: '' },
      'parent': { firstName: 'Linda', surname: '' },
      'servant': { firstName: 'Rosa', surname: '' },
      'ex-lover': { firstName: 'Vanessa', surname: 'Cole' },
      'matchmaker': { firstName: 'Aunt', surname: 'Carol' },
      'childhood-friend': { firstName: 'Danny', surname: 'Reyes' }
    },
    'dark-romance': {
      'best-friend': { firstName: 'Nadia', surname: 'Cross' },
      'rival': { firstName: 'Katya', surname: 'Ivanova' },
      'mentor': { firstName: 'Viktor', surname: 'Sorin' },
      'villain': { firstName: 'Adrian', surname: 'Vale' },
      'sibling': { firstName: 'Nikolai', surname: '' },
      'parent': { firstName: 'Bogdan', surname: '' },
      'servant': { firstName: 'Ilsa', surname: '' },
      'ex-lover': { firstName: 'Sabine', surname: 'Moreau' },
      'matchmaker': { firstName: 'Madame', surname: 'Duval' },
      'childhood-friend': { firstName: 'Luca', surname: 'Renard' }
    },
    'billionaire': {
      'best-friend': { firstName: 'Priya', surname: 'Anand' },
      'rival': { firstName: 'Vivian', surname: 'Ashcroft' },
      'mentor': { firstName: 'Richard', surname: 'Chen' },
      'villain': { firstName: 'Marcus', surname: 'Cole' },
      'sibling': { firstName: 'Nathaniel', surname: '' },
      'parent': { firstName: 'Eleanor', surname: 'Sterling' },
      'servant': { firstName: 'Mr.', surname: 'Higgins' },
      'ex-lover': { firstName: 'Bianca', surname: 'Wells' },
      'matchmaker': { firstName: 'Aunt', surname: 'Josephine' },
      'childhood-friend': { firstName: 'Owen', surname: 'Bennett' }
    },
    'small-town': {
      'best-friend': { firstName: 'Katie', surname: 'Brooks' },
      'rival': { firstName: 'Brianne', surname: 'Hutchins' },
      'mentor': { firstName: 'Doc', surname: 'Merritt' },
      'villain': { firstName: 'Frank', surname: 'Doyle' },
      'sibling': { firstName: 'Beth', surname: '' },
      'parent': { firstName: 'Carl', surname: '' },
      'servant': { firstName: 'Miss', surname: 'Patty' },
      'ex-lover': { firstName: 'Jenna', surname: 'Ford' },
      'matchmaker': { firstName: 'Mrs.', surname: 'Wren' },
      'childhood-friend': { firstName: 'Danny', surname: 'Reed' }
    },
    'sports': {
      'best-friend': { firstName: 'Marcus', surname: 'Lee' },
      'rival': { firstName: 'Jordan', surname: 'Vance' },
      'mentor': { firstName: 'Coach', surname: 'Riggins' },
      'villain': { firstName: 'Derek', surname: 'Holt' },
      'sibling': { firstName: 'Casey', surname: '' },
      'parent': { firstName: 'Coach', surname: 'Cole' },
      'servant': { firstName: 'Trainer', surname: 'Alvarez' },
      'ex-lover': { firstName: 'Nicole', surname: 'Hayes' },
      'matchmaker': { firstName: 'Aunt', surname: 'Ruth' },
      'childhood-friend': { firstName: 'Danny', surname: 'Cole' }
    },
    'paranormal': {
      'best-friend': { firstName: 'Wren', surname: 'Halloway' },
      'rival': { firstName: 'Selene', surname: 'Marlowe' },
      'mentor': { firstName: 'Elder', surname: 'Corvin' },
      'villain': { firstName: 'Malakai', surname: '' },
      'sibling': { firstName: 'Asher', surname: '' },
      'parent': { firstName: 'Elder', surname: 'Miriam' },
      'servant': { firstName: 'Old', surname: 'Thomas' },
      'ex-lover': { firstName: 'Seraphine', surname: 'Cole' },
      'matchmaker': { firstName: 'Aunt', surname: 'Odette' },
      'childhood-friend': { firstName: 'Gideon', surname: 'Marsh' }
    },
    'romantic-suspense': {
      'best-friend': { firstName: 'Rachel', surname: 'Kim' },
      'rival': { firstName: 'Agent', surname: 'Vance' },
      'mentor': { firstName: 'Captain', surname: 'Reyes' },
      'villain': { firstName: 'Viktor', surname: 'Sladek' },
      'sibling': { firstName: 'Danny', surname: '' },
      'parent': { firstName: 'Frank', surname: 'Hart' },
      'servant': { firstName: 'Ms.', surname: 'Delgado' },
      'ex-lover': { firstName: 'Claire', surname: 'Bennett' },
      'matchmaker': { firstName: 'Aunt', surname: 'Diane' },
      'childhood-friend': { firstName: 'Mike', surname: 'Sanders' }
    },
    'mafia': {
      'best-friend': { firstName: 'Isabella', surname: 'Conti' },
      'rival': { firstName: 'Vittoria', surname: 'Marchetti' },
      'mentor': { firstName: 'Uncle', surname: 'Salvatore' },
      'villain': { firstName: 'Nico', surname: 'Falcone' },
      'sibling': { firstName: 'Matteo', surname: '' },
      'parent': { firstName: 'Don', surname: 'Russo' },
      'servant': { firstName: 'Old', surname: 'Enzo' },
      'ex-lover': { firstName: 'Carmen', surname: 'Vitale' },
      'matchmaker': { firstName: 'Nonna', surname: 'Lucia' },
      'childhood-friend': { firstName: 'Gio', surname: 'Ricci' }
    }
  };

  const plotTropes = [
    { id: 'forced-proximity', name: 'Forced Proximity', description: 'Stuck together by circumstances' },
    { id: 'enemies-to-lovers', name: 'Enemies to Lovers', description: 'Hatred transforms to passion' },
    { id: 'second-chance', name: 'Second Chance', description: 'Lost love reunited' },
    { id: 'fake-relationship', name: 'Fake Relationship', description: 'Pretend becomes real' },
    { id: 'marriage-of-convenience', name: 'Marriage of Convenience', description: 'Practical arrangement turns romantic' },
    { id: 'forbidden-love', name: 'Forbidden Love', description: 'Love against all odds' },
    { id: 'friends-to-lovers', name: 'Friends to Lovers', description: 'Friendship deepens' },
    { id: 'grumpy-sunshine', name: 'Grumpy/Sunshine', description: 'Opposites attract' }
  ];

  const spiceLevels = [
    { id: 'sweet', name: 'Sweet', description: 'Kisses and emotional intimacy', icon: '💕' },
    { id: 'warm', name: 'Warm', description: 'Sensual with closed doors', icon: '🌸' },
    { id: 'hot', name: 'Hot', description: 'Open door romance', icon: '🔥' },
    { id: 'steamy', name: 'Steamy', description: 'Explicit and frequent', icon: '🌶️' },
    { id: 'scorching', name: 'Scorching', description: 'Very explicit throughout', icon: '🔥🔥' }
  ];

  const novelLengths = [
    { id: 'novella', name: 'Novella', description: '20,000-40,000 words', chapters: 8 },
    { id: 'category', name: 'Category Romance', description: '50,000-60,000 words', chapters: 12 },
    { id: 'standalone', name: 'Standalone Novel', description: '70,000-90,000 words', chapters: 20 },
    { id: 'series', name: 'Series Novel', description: '80,000-100,000 words', chapters: 25 }
  ];

  const toggleSecondaryCharacter = (id) => {
    if (selectedSecondaryCharacters.includes(id)) {
      setSelectedSecondaryCharacters(selectedSecondaryCharacters.filter(c => c !== id));
    } else if (selectedSecondaryCharacters.length < 5) {
      setSelectedSecondaryCharacters([...selectedSecondaryCharacters, id]);
    }
  };

  const toggleChapter = (chapterIndex) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterIndex]: !prev[chapterIndex]
    }));
  };

  const toggleScene = (chapterIndex, sceneIndex) => {
    const key = `${chapterIndex}-${sceneIndex}`;
    setExpandedScenes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const generateChapterOutline = () => {
    const lengthConfig = novelLengths.find(l => l.id === selectedLength);
    const totalChapters = lengthConfig.chapters;
    const totalWords = parseInt(lengthConfig.description.split('-')[0].replace(/,/g, ''));
    const avgWordsPerChapter = Math.floor(totalWords / totalChapters);
    
    const chapters = [];
    
    // Get character and setting details
    const femaleTrope = currentFemaleTropes.find(t => t.id === selectedFemaleTrope);
    const maleTrope = currentMaleTropes.find(t => t.id === selectedMaleTrope);
    const plotTrope = plotTropes.find(t => t.id === selectedPlotTrope);
    const eraName = currentEra ? currentEra.name : 'contemporary setting';
    const spiceLevel = spiceLevels.find(s => s.id === selectedSpiceLevel);
    
    // Build secondary character references
    const hasSecondary = (id) => selectedSecondaryCharacters.includes(id);
    const getSecondaryName = (id) => secondaryNames[id] || 'supporting character';
    
    // Beat 1: The Hook (Chapters 1-2)
    const hookBeats1 = [
      {
        beat: `Establish the ${eraName} with vivid sensory details and period-appropriate context`,
        prompt: `Write an opening paragraph that immerses the reader in the ${eraName}. Include specific sensory details: what the air smells like, what sounds are present, the quality of light, textures, and temperatures. Use period-appropriate vocabulary and references. Paint a vivid picture of the time and place - whether it's ${currentEra ? `the ${currentEra.period}` : 'the contemporary world'} - that makes the reader feel transported. Include 2-3 specific details unique to this era (clothing, transportation, social customs, technology level). Establish the tone that matches ${currentSubgenre.name}: ${currentSubgenre.description.toLowerCase()}.`
      },
      {
        beat: `Introduce ${heroineName} as ${femaleTrope.name.toLowerCase()} - show her as ${femaleTrope.description.toLowerCase()}`,
        prompt: `Introduce the heroine ${heroineName} ${currentEra ? characterNamesByEra[selectedEra].female.surname : ''} in a scene that immediately shows she is ${femaleTrope.name.toLowerCase()}. Show, don't tell - use her actions, dialogue, and internal thoughts to reveal she is ${femaleTrope.description.toLowerCase()}. What is she doing when we first meet her? Make it characteristic of her role as ${femaleTrope.name.toLowerCase()}. Include physical description woven naturally into action (not a list). Show her personality through specific behaviors. Reveal her voice through distinctive dialogue or internal monologue that reflects her education level and background appropriate to ${eraName}.`
      },
      {
        beat: `Reveal what ${heroineName} wants on the surface (external goal tied to her role as ${femaleTrope.name.toLowerCase()})`,
        prompt: `Through ${heroineName}'s thoughts, dialogue with another character, or actions, reveal her immediate external goal - what she believes she wants or needs right now. This goal should be specific and concrete, tied to her identity as ${femaleTrope.name.toLowerCase()} who is ${femaleTrope.description.toLowerCase()}. Make it something the reader can understand and track throughout the story. Show why this goal matters to her in the context of ${eraName}. What will happen if she doesn't achieve it? What's at stake? This is her surface-level want - not necessarily what she truly needs (that comes later).`
      },
      {
        beat: `Hint at what she really needs (internal growth) - the wound or limiting belief she'll overcome by the end`,
        prompt: `Subtly plant seeds of ${heroineName}'s deeper emotional need or wound. Don't state it directly - hint at it through a moment of vulnerability, a defensive reaction, an avoidance behavior, or a limiting belief she holds about herself or the world. This could be fear of vulnerability, belief she's unworthy of love, conviction she must always be in control, or another wound stemming from her past. Show a glimpse of the emotional armor she wears or the wall she's built. This internal obstacle is what will prevent her from achieving happiness until she grows. Make it subtle enough that the reader might not fully understand it yet, but clear enough to foreshadow her character arc.`
      },
      hasSecondary('parent') ? {
        beat: `Show ${getSecondaryName('parent')}'s expectations and how they create pressure or conflict for ${heroineName}`,
        prompt: `Introduce ${getSecondaryName('parent')} and establish their relationship with ${heroineName}. Through dialogue, a confrontation, or ${heroineName}'s thoughts about them, show what ${getSecondaryName('parent')} expects from her. These expectations should create pressure or conflict that ties into her external goal as ${femaleTrope.name.toLowerCase()}. Is ${getSecondaryName('parent')} pushing her toward a marriage? Demanding she behave a certain way? Controlling her choices? Show the dynamic between them - is there love underneath the conflict? Resentment? Obligation? Make ${getSecondaryName('parent')} feel like a real person with their own motivations (even if misguided) rather than a simple obstacle. The pressure from ${getSecondaryName('parent')} should complicate ${heroineName}'s situation.`
      } : null,
      hasSecondary('best-friend') ? {
        beat: `Introduce ${getSecondaryName('best-friend')} as ${heroineName}'s confidant who understands her world`,
        prompt: `Bring in ${getSecondaryName('best-friend')} through a scene with ${heroineName} where their closeness and history are evident. Show their friendship through natural banter, inside jokes, or the way they communicate without needing to explain everything. ${getSecondaryName('best-friend')} should serve as a sounding board - someone ${heroineName} can be honest with. Through their conversation, reveal more about ${heroineName}'s situation, feelings, and world. ${getSecondaryName('best-friend')} might voice truths ${heroineName} isn't ready to face, offer advice, provide comic relief, or give the reader information about ${heroineName}'s past. Make their friendship feel genuine and establish ${getSecondaryName('best-friend')} as someone who will matter in the story. Set them up to play their role as loyal confidant throughout.`
      } : null,
    ].filter(Boolean);
    
    const hookBeats2 = [
      {
        beat: `Show ${heroineName}'s ordinary world and daily routine in the ${eraName}`,
        prompt: `Write a scene showing ${heroineName}'s normal life - what a typical day looks like for ${femaleTrope.name.toLowerCase()} in ${eraName}. Include specific period-appropriate details about her daily activities, responsibilities, and routines. What does she do? Where does she go? Who does she interact with? Show both the pleasant and challenging aspects of her life. This ordinary world will soon be disrupted, so establish it clearly so readers understand what she's risking or leaving behind when the story truly begins. Make it feel authentic to ${eraName} and to her specific role as someone who is ${femaleTrope.description.toLowerCase()}. Include 3-4 concrete details that ground the reader in her world.`
      },
      {
        beat: `Present the inciting incident that will disrupt her status quo`,
        prompt: `Introduce the inciting incident - the event that kicks off the story and disrupts ${heroineName}'s ordinary world. This should be the catalyst that will eventually lead to her meeting ${heroName}. Is it a letter arriving? An unexpected visitor? A summons? A crisis? A decision forced upon her? A social event she must attend? Make it significant and specific. Show ${heroineName}'s reaction to this disruption. How does it threaten her goals or force her to act? Connect it to her role as ${femaleTrope.name.toLowerCase()} - how does this incident specifically affect someone in her position in ${eraName}? Create enough tension that the reader knows everything is about to change. Build anticipation for what comes next.`
      },
      {
        beat: `Foreshadow ${heroName}'s entrance through rumor, letter, or impending event`,
        prompt: `Without yet showing ${heroName}, create anticipation for his arrival. Have other characters mention him, let ${heroineName} hear rumors about ${maleTrope.name.toLowerCase()} who is ${maleTrope.description.toLowerCase()}, or show her receiving news that he's coming. Build intrigue - what does she hear about him? Is the gossip favorable or scandalous? Does she form an opinion about him before they meet? If this is ${plotTrope.name} (${plotTrope.description.toLowerCase()}), foreshadow that dynamic. Plant details that will gain irony or significance once they actually meet. Make the reader curious about this man who's about to enter her life. Create a sense of inevitability - their meeting is coming.`
      },
      hasSecondary('matchmaker') ? {
        beat: `${getSecondaryName('matchmaker')} begins plotting to bring the couple together`,
        prompt: `Introduce ${getSecondaryName('matchmaker')} as the meddling matchmaker who sees potential for ${heroineName} and ${heroName} (even before ${heroineName} does). Show ${getSecondaryName('matchmaker')} scheming, planning, or taking initial steps to engineer their meeting. What are their motivations? Are they well-meaning? Bored? Do they have their own reasons for wanting this match? Through their plotting, give the reader more information about either ${heroineName} or ${heroName}. ${getSecondaryName('matchmaker')}'s perspective should feel authentic to ${eraName} - how would someone in this time period go about matchmaking? Show their personality through their approach. Make their interference feel both potentially helpful and potentially disastrous.`
      } : null,
      hasSecondary('villain') ? {
        beat: `Plant the first seeds of ${getSecondaryName('villain')}'s schemes or opposition`,
        prompt: `Subtly introduce ${getSecondaryName('villain')} or hint at their machinations. They don't need to openly oppose ${heroineName} yet, but plant seeds of the conflict to come. Show them taking actions that will later matter, making plans, or reveal their motivations for wanting to prevent ${heroineName} and ${heroName} from being together. What do they want and why does a romance between the protagonists threaten it? Make them feel like a real person with understandable (even if not sympathetic) goals rather than simply "the bad guy." Create a sense of gathering storm. In ${eraName}, what power or leverage does ${getSecondaryName('villain')} have? Foreshadow the threat they'll pose.`
      } : null,
      {
        beat: `End with ${heroineName} on the cusp of change, unaware her life is about to transform`,
        prompt: `Write the final paragraph(s) of this scene showing ${heroineName} at a threshold moment. She's making a decision, heading somewhere, or preparing for an event - unaware that her life is about to completely change. Use dramatic irony: the reader should sense the significance of this moment even if ${heroineName} doesn't yet. Her thoughts might be on mundane concerns or her surface goals as ${femaleTrope.name.toLowerCase()}, not realizing she's about to meet someone who will transform everything. Create anticipation with your language - use foreshadowing, weather, or imagery that hints at change coming. End on a note that makes the reader eager to turn the page to see what happens next.`
      }
    ].filter(Boolean);
    
    const hookBeats3 = [
      {
        beat: `${heroineName} faces her first challenge or complication`,
        prompt: `Present an immediate challenge or complication that ${heroineName} must navigate. This should be related to the inciting incident and her goals as ${femaleTrope.name.toLowerCase()}. Show her actively dealing with a problem, making a difficult choice, or facing an obstacle. This challenge should require her to take action and reveal her character through how she responds. Does she face it head-on? Try to avoid it? Seek help? Attempt to control it? The challenge should be appropriate to ${eraName} and her position in society. Make it specific and concrete so the reader can visualize exactly what she's dealing with. Raise the stakes - show what happens if she fails.`
      },
      {
        beat: `Show how her identity as ${femaleTrope.name.toLowerCase()} shapes her response to difficulty`,
        prompt: `As ${heroineName} deals with this challenge, show how being ${femaleTrope.name.toLowerCase()} who is ${femaleTrope.description.toLowerCase()} specifically affects her options and choices. What can she do? What can't she do because of her role/position in ${eraName}? How do the constraints and expectations placed on ${femaleTrope.name.toLowerCase()} limit or enable her response? Show both her strengths in this role and the frustrations or limitations it creates. Let her internal thoughts reveal how she feels about these constraints. Does she accept them? Chafe against them? Work within or around them? This reveals character while also establishing the world's rules.`
      },
      {
        beat: `Demonstrate her coping mechanisms, strengths, and vulnerabilities`,
        prompt: `Through ${heroineName}'s actions and thoughts while facing this challenge, reveal her key personality traits, strengths, and vulnerabilities. What are her go-to strategies when under pressure? Is she analytical? Impulsive? Careful? Bold? Show both what she's good at and where she struggles. Reveal a specific strength that will matter later in the story. Also show a vulnerability or weakness that creates empathy - what does she fear? What makes her uncertain? Include a moment where she either succeeds through her strength or stumbles due to her weakness. Make her feel like a real, complex person the reader can root for, not a perfect heroine.`
      },
      {
        beat: `Create anticipation for the meet-cute that's coming`,
        prompt: `As this scene progresses, increase anticipation for ${heroineName} meeting ${heroName}. Maybe the solution to her current problem involves going somewhere she'll encounter him, or accepting help that will lead to their meeting, or attending an event where he'll be. Build the sense that something significant is approaching. ${heroineName} might be dreading it, looking forward to it, or unaware of its significance - but the reader should feel the anticipation. Use language and pacing that creates momentum toward that inevitable meeting. Perhaps reference ${heroName} or ${maleTrope.name.toLowerCase()} again through another character's mention.`
      },
      {
        beat: `End chapter with a hook that propels reader forward`,
        prompt: `End this opening chapter with a strong hook that makes it impossible for the reader to stop. This could be: ${heroineName} arriving at the location where she'll meet ${heroName}, a shocking revelation, a decision that will have major consequences, an unexpected twist, or a cliffhanger moment. The final line should create a question in the reader's mind that demands an answer. Use strong, evocative language. Consider ending mid-action or mid-thought to create urgency. The hook should connect to the plot while also creating emotional investment. Make the reader desperate to know what happens next. Consider ending just before a significant moment rather than after it.`
      }
    ].filter(Boolean);
    
    chapters.push({
      number: 1,
      title: 'The Hook - Part 1',
      beat: 'Beat 1: The Hook',
      percentage: '0-5%',
      wordCount: avgWordsPerChapter,
      scenes: [
        {
          title: 'Opening Image',
          wordCount: Math.floor(avgWordsPerChapter * 0.3),
          beats: hookBeats1
        },
        {
          title: 'Inciting Incident Setup',
          wordCount: Math.floor(avgWordsPerChapter * 0.4),
          beats: hookBeats2
        },
        {
          title: 'First Conflict',
          wordCount: Math.floor(avgWordsPerChapter * 0.3),
          beats: hookBeats3
        }
      ]
    });

    if (totalChapters > 8) {
      const hook2Beats1 = [
        {
          beat: `First glimpse of ${heroName} as ${maleTrope.name.toLowerCase()} - establish his world and status`,
          prompt: `Introduce the hero ${heroName} ${currentEra ? characterNamesByEra[selectedEra].male.surname : ''} in a scene that immediately establishes he is ${maleTrope.name.toLowerCase()}. Open with him in action - what is he doing that is characteristic of being ${maleTrope.description.toLowerCase()}? Show his world, his responsibilities, his status in ${eraName} society. Include physical description woven naturally into the scene (not a list). What does his appearance, dress, manner, and bearing tell us about him? Show his personality through actions and dialogue. Establish his competence and power in his sphere. Make him attractive but also complex - not perfect. Give him presence on the page. The reader should immediately understand why he's the hero.`
        },
        {
          beat: `Show ${heroName} is ${maleTrope.description.toLowerCase()}`,
          prompt: `Through a specific scene or interaction, demonstrate that ${heroName} is ${maleTrope.description.toLowerCase()}. Show, don't tell - use concrete actions, dialogue, and choices that reveal this core aspect of his character. How does being ${maleTrope.name.toLowerCase()} in ${eraName} shape his behavior and options? What privileges does it give him? What burdens? Include other characters' reactions to him that reinforce his status. Show both the appealing aspects of this role (confidence, capability, resources) and potentially troubling ones (arrogance, emotional unavailability, baggage). Make it clear why ${heroineName} will both be attracted to and challenged by this man.`
        },
        {
          beat: `Reveal his external goal or the problem/duty that drives him`,
          prompt: `Establish ${heroName}'s immediate external goal or the problem he's trying to solve. What does he want or need right now? This should be concrete and specific, tied to his role as ${maleTrope.name.toLowerCase()} in ${eraName}. Is it a business deal? A family obligation? A mission? A threat to handle? Political maneuvering? Show why this matters to him and what's at stake if he fails. This goal will eventually intersect with ${heroineName}'s story (and may even conflict with her goals given the ${plotTrope.name.toLowerCase()} dynamic). Make it important enough that he's fully focused on it - until meeting ${heroineName} disrupts everything.`
        },
        {
          beat: `Hint at his emotional wound, past trauma, or limiting belief that keeps him from true intimacy`,
          prompt: `Subtly reveal ${heroName}'s deeper emotional wound or baggage. Don't state it outright - hint through a defensive reaction, a moment where he shuts down emotionally, an avoidance behavior, a cynical comment about love/marriage/trust, or a glimpse of old pain. What past hurt or trauma has made ${maleTrope.name.toLowerCase()} build walls around his heart? Perhaps a betrayal, a loss, a childhood wound, or a failed relationship? Show the armor he wears or the belief he holds that will prevent him from being vulnerable until he grows. This wound should feel authentic to his background as ${maleTrope.description.toLowerCase()} in ${eraName}. Plant it subtly - foreshadowing his character arc.`
        },
        hasSecondary('ex-lover') ? {
          beat: `Reference to ${getSecondaryName('ex-lover')} or the past relationship that left scars`,
          prompt: `Include a reference to ${getSecondaryName('ex-lover')} - either through ${heroName}'s thoughts, another character mentioning them, or a brief flashback. Show that this past relationship left wounds that still affect ${heroName}. What happened? Was it betrayal? Loss? A mistake he made? Don't give the full story yet, but establish that ${getSecondaryName('ex-lover')} matters to ${heroName}'s emotional history. How does this past relationship connect to his current wound about intimacy or trust? Set up ${getSecondaryName('ex-lover')} to potentially reappear and complicate things with ${heroineName}. Make it clear this isn't fully resolved in his heart, even if it's in his past.`
        } : null,
        hasSecondary('sibling') ? {
          beat: `${getSecondaryName('sibling')}'s relationship with ${heroName} reveals his character`,
          prompt: `Include a scene or interaction between ${heroName} and ${getSecondaryName('sibling')} that reveals a different side of the hero. How does he behave with family? Is he protective? Distant? Playful? Duty-bound? Through their dynamic, show aspects of ${heroName}'s character he doesn't show the world. Does ${getSecondaryName('sibling')} know his secrets? Challenge him? Need his help? Create conflict? Their relationship should feel authentic to ${eraName} family dynamics. ${getSecondaryName('sibling')} might voice concerns about ${heroName}'s choices, tease him about his emotional walls, or need something from him that adds pressure. Establish ${getSecondaryName('sibling')} as someone who will matter in the story and whose approval may eventually matter regarding ${heroineName}.`
        } : null,
      ].filter(Boolean);
      
      const hook2Beats2 = [
        plotTrope.id === 'forced-proximity' ? {
          beat: `The circumstances that will trap ${heroineName} and ${heroName} together begin to form`,
          prompt: `Establish the forced proximity situation that will trap ${heroineName} and ${heroName} together. Is it a snowstorm? A broken carriage in ${eraName}? Being trapped in a location? A journey they must take together? A living situation? A work partnership? Show the circumstances forming - how does ${heroineName} end up in this situation she can't escape? Make it believable for ${eraName} and their roles as ${femaleTrope.name.toLowerCase()} and ${maleTrope.name.toLowerCase()}. Establish why they can't simply leave or avoid each other. Create the pressure cooker environment where they'll be forced into constant contact despite wanting to avoid it. Show both characters' reactions to realizing they're stuck together.`
        } : null,
        plotTrope.id === 'enemies-to-lovers' ? {
          beat: `${heroName} takes action that will put him in direct conflict with ${heroineName}`,
          prompt: `Show ${heroName} taking an action that directly opposes ${heroineName}'s goals or values. As ${maleTrope.name.toLowerCase()}, what is he doing that conflicts with her position as ${femaleTrope.name.toLowerCase()}? Is he buying property she needs? Supporting a political position she opposes? Aligned with her family's enemies? Making a business move that hurts her interests? Show him making this choice for reasons that make sense to him - he's not trying to hurt her specifically (he may not even know her yet), but the impact on her is real. Establish the fundamental opposition between them that will need to be overcome. In ${eraName}, what does this conflict mean? Make the opposition feel insurmountable.`
        } : null,
        plotTrope.id === 'second-chance' ? {
          beat: `${heroName} learns ${heroineName} has returned to his life after years apart`,
          prompt: `Show ${heroName} discovering that ${heroineName} is back in his life after years of separation. How does he find out? Who tells him? What's his immediate reaction - shock, anger, longing, panic, joy? Include a brief flashback or his memories of their past relationship - what did they mean to each other? What went wrong before? Why did they separate? Show his emotional reaction - the old feelings and wounds that resurface. In ${eraName}, what does her return mean for him as ${maleTrope.name.toLowerCase()}? Can he avoid her? Must he see her? Show both his desire to see her again and his fear of reopening old wounds. Make the reader feel the weight of their history.`
        } : null,
        plotTrope.id === 'fake-relationship' ? {
          beat: `${heroName} faces a problem that a fake relationship could solve`,
          prompt: `Establish the problem ${heroName} faces that a fake relationship could solve. As ${maleTrope.name.toLowerCase()} in ${eraName}, what pressure is he under? Does he need to appear settled to inherit? To avoid matchmaking? To secure a business deal? To protect his reputation? To deflect a persistent suitor? Show why this matters urgently - there's a deadline or consequence if he doesn't solve it. Make the problem specific and the stakes high enough that a fake relationship seems like a reasonable (if risky) solution. Show him considering his options and realizing he needs someone to play the part. Plant the seed that ${heroineName} might be that person.`
        } : null,
        plotTrope.id === 'marriage-of-convenience' ? {
          beat: `${heroName} realizes he needs a convenient marriage to solve his predicament`,
          prompt: `Show ${heroName} facing a situation where marriage is the solution to his problem. As ${maleTrope.name.toLowerCase()} in ${eraName}, what crisis makes marriage necessary? Inheritance terms? Political alliance? Family pressure? Business merger? Protection for someone? Avoiding scandal? Make it clear why love isn't part of the equation - this is purely practical. Show his logical reasoning about what he needs in a wife - someone who won't expect romance, who fills specific requirements, who understands the arrangement. Include his thoughts about why a love match is impossible or undesirable for him (connecting to his wound). Establish why ${heroineName} might fit his requirements for a convenient spouse.`
        } : null,
        plotTrope.id === 'forbidden-love' ? {
          beat: `Establish the rule, social barrier, or taboo that will make their love forbidden`,
          prompt: `Clearly establish the societal rule, family feud, class barrier, or taboo that will make a relationship between ${heroineName} and ${heroName} forbidden in ${eraName}. Is it a class difference? Warring families? Religious prohibition? Professional ethics? Existing betrothal? Political enemies? Age gap? Cultural barriers? Show why this prohibition exists and what the consequences would be for violating it - scandal, ruin, exile, disinheritance, danger? Make it feel real and weighty in the context of ${eraName} society. Show ${heroName} aware of this barrier as he's about to meet ${heroineName}. The reader should understand the stakes before the characters even fall in love.`
        } : null,
        {
          beat: `The meet-cute moment: ${heroineName} and ${heroName} encounter each other for the first time ${plotTrope.id === 'second-chance' ? '(or first time in years if second-chance)' : ''}`,
          prompt: `Write the pivotal first meeting between ${heroineName} and ${heroName}. Make it memorable and significant. Where does it happen? What are the circumstances? Show it from both perspectives if possible - what each notices about the other first. Include sensory details: what they see, hear, smell. Show immediate physical awareness - the chemistry between them should be palpable even if they don't like each other. ${plotTrope.id === 'second-chance' ? `Show the shock of seeing each other again, the rush of old feelings and old hurts. Do they look the same? Different? How has time changed them?` : `What are their first words to each other? Do they immediately clash or connect?`} Make this moment worthy of being THE meet-cute - romantic, charged with tension, unexpected, or all three. Use the ${plotTrope.name.toLowerCase()} dynamic to shape the encounter.`
        },
        {
          beat: `First impressions are formed - show immediate chemistry, tension, or conflict based on the ${plotTrope.name.toLowerCase()} dynamic`,
          prompt: `Show the immediate reactions and first impressions forming. ${heroineName} as ${femaleTrope.name.toLowerCase()} takes in ${heroName} as ${maleTrope.name.toLowerCase()} - what does she think? Is she attracted despite herself? Annoyed? Intimidated? Intrigued? Show her body's betraying reaction even if her mind disapproves. ${heroName}'s reaction to her - does she surprise him? Challenge him? Attract him? Irritate him? Include physical awareness - the pull between them that may conflict with their mental assessment. If this is ${plotTrope.name} (${plotTrope.description.toLowerCase()}), show how that dynamic plays out in their first moments. Create sparks on the page - whether from attraction, antagonism, or both. Make the reader feel the electricity between them.`
        },
        {
          beat: `Their contrasting personalities and worldviews clash or spark`,
          prompt: `Through dialogue and interaction, show how ${heroineName} and ${heroName} are different. As ${femaleTrope.name.toLowerCase()} versus ${maleTrope.name.toLowerCase()}, what contrasts emerge? Do they have different values? Approaches? Backgrounds? Priorities? Show them verbally sparring, disagreeing, or surprising each other with their perspectives. In ${eraName}, how do their different positions in society create friction or fascination? Let their distinct personalities shine through authentic dialogue - give each a unique voice. Show what makes them different but also hint at unexpected common ground. The contrast should create both conflict and intrigue. Make the reader see why they'll challenge each other throughout the story.`
        },
        hasSecondary('matchmaker') ? {
          beat: `${getSecondaryName('matchmaker')} observes or orchestrates this meeting with satisfaction`,
          prompt: `Include ${getSecondaryName('matchmaker')} witnessing this first meeting between ${heroineName} and ${heroName}. Did they arrange it? Are they watching from nearby? Show their satisfaction or scheming thoughts as they observe the sparks flying (whether positive or negative). What do they see that the couple doesn't yet recognize in themselves? Include ${getSecondaryName('matchmaker')}'s internal commentary on the encounter - their knowing assessment of the chemistry or their plans for pushing them together. In ${eraName}, how does someone in the matchmaker's position work? Show their meddling in a way that feels both meddlesome and potentially helpful. Establish them as a force that will keep pushing the couple together.`
        } : null,
        {
          beat: `Set up the central conflict that will keep them apart until they grow enough to be together`,
          prompt: `As this first encounter concludes, establish the central conflict or obstacle that will keep ${heroineName} and ${heroName} apart throughout most of the story. Is it external (societal rules, family opposition, conflicting goals in ${eraName}) or internal (fear, wounds, limiting beliefs) or both? Show both characters aware of why this can't work, even if they feel the pull toward each other. ${heroineName} as ${femaleTrope.name.toLowerCase()} has reasons this is impossible. ${heroName} as ${maleTrope.name.toLowerCase()} has his own barriers. Make the obstacle feel real and substantial - not something easily overcome. The reader should understand why these two will struggle and resist before eventually coming together. End with tension and anticipation - they're drawn to each other but can't act on it.`
        }
      ].filter(Boolean);
      
      chapters.push({
        number: 2,
        title: 'The Hook - Part 2',
        beat: 'Beat 1: The Hook',
        percentage: '5-10%',
        wordCount: avgWordsPerChapter,
        scenes: [
          {
            title: 'Hero\'s Introduction',
            wordCount: Math.floor(avgWordsPerChapter * 0.5),
            beats: hook2Beats1
          },
          {
            title: 'Worlds Collide',
            wordCount: Math.floor(avgWordsPerChapter * 0.5),
            beats: hook2Beats2
          }
        ]
      });
    }

    // Beat 2: The Meet Cute
    const meetCuteChapter = totalChapters > 8 ? 3 : 2;
    
    const meetCuteBeats1 = [
      {
        beat: `The pivotal first meeting (or reunion) between ${heroineName} and ${heroName}`,
        prompt: `Write the complete meet-cute scene between ${heroineName} and ${heroName}. Set the scene with specific location details in ${eraName} - where exactly are they? What's happening around them? Build to the moment they first see each other with sensory details. ${plotTrope.id === 'second-chance' ? `This is their first meeting in years - show the shock of recognition, the flood of memories, how time has changed them both. Include a brief flashback to their last parting.` : `This is their very first encounter.`} Describe the physical awareness - what each notices first about the other. Show the chemistry immediately, whether it manifests as attraction, antagonism, or both. Use specific dialogue that reveals personality. Make this moment feel significant and memorable - the beginning of everything. Include reactions from any bystanders. Make it worthy of being THE meet-cute scene readers will remember.`
      },
      plotTrope.id === 'enemies-to-lovers' ? {
        beat: `They clash immediately - ${heroineName} as ${femaleTrope.name.toLowerCase()} and ${heroName} as ${maleTrope.name.toLowerCase()} represent opposing values or goals`,
        prompt: `Show the immediate conflict erupting between ${heroineName} and ${heroName}. As ${femaleTrope.name.toLowerCase()} who is ${femaleTrope.description.toLowerCase()}, what does ${heroineName} believe or value that directly opposes ${heroName}'s position as ${maleTrope.name.toLowerCase()} who is ${maleTrope.description.toLowerCase()}? Write sharp, witty dialogue where they verbally spar. Show both making valid points from their perspectives - neither should be simply wrong. Include cutting remarks that reveal intelligence and passion on both sides. In ${eraName}, how does their opposition manifest? Show the frustration and anger, but also the grudging respect and undeniable attraction that neither wants to feel. Make readers see why they're enemies while also seeing the sparks flying between them.`
      } : null,
      plotTrope.id === 'forced-proximity' ? {
        beat: `Circumstances force them into close quarters against their wishes - establish the situation they can't escape`,
        prompt: `Write the scene where ${heroineName} and ${heroName} realize they're stuck together. Show the moment they discover the forced proximity situation - is it a storm, broken transport, assignment, living arrangement? In ${eraName}, what circumstances could believably trap ${femaleTrope.name.toLowerCase()} and ${maleTrope.name.toLowerCase()} together? Show both characters' dismay and attempts to find alternatives. Include the moment they accept there's no escape - they must endure each other's company. Show the physical space they'll share - is it cramped? Luxurious but intimate? Include their attempts to establish boundaries or ground rules. Make readers feel the pressure cooker tension of being unable to avoid someone you're drawn to but want to resist.`
      } : null,
      plotTrope.id === 'second-chance' ? {
        beat: `The pain and unresolved feelings from their past relationship surface immediately`,
        prompt: `Write the emotionally charged reunion between ${heroineName} and ${heroName} who were once together. Show the complicated mix of emotions - old love, old hurt, anger, longing, regret. Include specific references to their past relationship through dialogue or memory. What went wrong before? Who hurt whom? What was left unsaid? Show both trying to maintain dignity and distance while drowning in feelings. Include a specific memory that surfaces - a callback to their past happiness that makes the current pain sharper. In ${eraName}, what has their separation meant for each of them? Show that neither has truly moved on despite the years. Make readers ache for what was lost while hoping for what could be again.`
      } : null,
      plotTrope.id === 'fake-relationship' ? {
        beat: `They strike a mutually beneficial bargain to pretend to be in a relationship`,
        prompt: `Write the negotiation scene where ${heroineName} and ${heroName} agree to a fake relationship. Show how the proposition comes up - who suggests it first? Show ${heroineName} as ${femaleTrope.name.toLowerCase()} considering what she gains from this arrangement. Show ${heroName} as ${maleTrope.name.toLowerCase()} outlining what he needs. Include specific terms they agree to: how long? what must they do in public? what are the boundaries in private? Show both treating it as a business arrangement while awareness of attraction simmers beneath. In ${eraName}, what does a fake courtship/relationship look like? Include a moment where they must practice or prepare for the charade - an almost-kiss or embrace "for practice" that feels too real. Make readers see the danger of fake feelings becoming real.`
      } : null,
      plotTrope.id === 'marriage-of-convenience' ? {
        beat: `They agree to a practical marriage arrangement - outline the terms and what each gains`,
        prompt: `Write the proposal scene for the marriage of convenience. Show ${heroName} as ${maleTrope.name.toLowerCase()} laying out his logical reasons for marriage and what he offers ${heroineName}. Show ${heroineName} as ${femaleTrope.name.toLowerCase()} considering her limited options and what this marriage solves for her. Include explicit discussion of terms: separate bedrooms? expectations for an heir? how they'll appear in public? financial arrangements? Include the moment ${heroineName} accepts - what finally decides her? In ${eraName}, what does a marriage of convenience look like legally and socially? Show both trying to be businesslike while physical awareness creates tension. Include a moment where propriety requires they touch - a handshake to seal the deal that lasts too long. Make readers see the potential for this arrangement to become complicated.`
      } : null,
      plotTrope.id === 'forbidden-love' ? {
        beat: `The attraction is immediate but they're acutely aware of why they can't be together`,
        prompt: `Write the scene where ${heroineName} and ${heroName} feel immediate attraction while being painfully aware of the prohibition against it. Show the pull between them - electric, undeniable. Then show the moment one or both remember why this is impossible. In ${eraName}, what rule, barrier, or taboo separates ${femaleTrope.name.toLowerCase()} from ${maleTrope.name.toLowerCase()}? Include specific dialogue where they acknowledge the impossibility - "We can't" / "I know." Show the longing and the restraint. Perhaps they're watched by others who would disapprove. Show them fighting the attraction even as they can't stop looking at each other. Include a moment where they almost touch but pull back. Make readers feel the delicious agony of forbidden desire.`
      } : null,
      plotTrope.id === 'friends-to-lovers' ? {
        beat: `Something shifts in their established friendship - they see each other differently`,
        prompt: `Write the moment where ${heroineName} or ${heroName} suddenly sees their friend in a new light. They've known each other as friends - show their comfortable dynamic first. Then write the specific moment that changes everything: does ${heroineName} as ${femaleTrope.name.toLowerCase()} see ${heroName} as ${maleTrope.name.toLowerCase()} with fresh eyes? Is it his laugh? The way he looks at her? A protective gesture? Or does ${heroName} suddenly notice ${heroineName} is beautiful? Show the internal panic - this is my friend, I can't feel this way. Include awkwardness as they try to act normal while hyperaware of each other. In ${eraName}, what does this shift mean for their friendship? Show one trying to hide the new feelings while the other remains oblivious (for now). Make readers feel the sweet tension of realizing you're falling for your friend.`
      } : null,
      plotTrope.id === 'grumpy-sunshine' ? {
        beat: `${heroineName} or ${heroName} is the sunshine who challenges the grumpy one's defenses`,
        prompt: `Write the scene showing the grumpy/sunshine dynamic between ${heroineName} and ${heroName}. Identify which character is grumpy (likely ${maleTrope.name.toLowerCase()}) and which is sunshine (likely ${femaleTrope.name.toLowerCase()}). Show the sunshine character's relentless optimism, warmth, or chattiness encountering the grumpy one's walls, terseness, or cynicism. Include specific dialogue: sunshine asking questions, making jokes, or trying to connect while grumpy gives short answers or cutting remarks. Show sunshine undeterred, even amused by the grumpiness. Show grumpy secretly charmed despite themselves. In ${eraName}, how does this dynamic play out? Include a moment where grumpy almost smiles or sunshine gets a real reaction. Make readers see why these opposites work - sunshine draws grumpy out while grumpy grounds sunshine.`
      } : null,
      {
        beat: `Show undeniable chemistry through witty banter, heated arguments, or electric silences`,
        prompt: `Write an exchange between ${heroineName} and ${heroName} that crackles with chemistry. Whether through witty banter, passionate argument, or charged silence, show the electric connection between them. Write sharp, intelligent dialogue where each challenges the other. Include subtext - what they're really talking about beneath the surface conversation. Show physical reactions: racing pulse, awareness of closeness, inability to look away. In ${eraName}, how does propriety affect how they can interact? Do they maintain proper distance while eyes devour? Or does the setting allow closer contact? Show how ${femaleTrope.name.toLowerCase()} and ${maleTrope.name.toLowerCase()} are matched intellectually and temperamentally. Include a moment where one says something that genuinely surprises or impresses the other. Make readers feel the attraction radiating off the page.`
      },
      {
        beat: `Use dialogue and physical reactions to demonstrate attraction (even if they'd deny it)`,
        prompt: `Write the physical reactions and involuntary responses that betray ${heroineName}'s and ${heroName}'s attraction to each other. Show ${heroineName}'s breath catching, pulse racing, skin flushing when ${heroName} stands too close. Show ${heroName}'s jaw clenching, gaze lingering, hands fisting when ${heroineName} laughs or moves. Include the small gestures: leaning in unconsciously, pupils dilating, voices softening. Show awareness of scent, warmth, presence. If they touch - even accidentally - describe the jolt of electricity. Include internal thoughts denying what the body knows: "It's not attraction, it's just..." Show them each trying to maintain composure while hyperaware of the other. In ${eraName}, what physical contact is allowed or forbidden? Use that to heighten tension. Make readers feel the magnetic pull between them.`
      },
      hasSecondary('rival') ? {
        beat: `${getSecondaryName('rival')} appears and shows interest in ${heroName} or ${heroineName}, adding complication`,
        prompt: `Introduce ${getSecondaryName('rival')} who clearly has romantic interest in either ${heroName} or ${heroineName}. Show ${getSecondaryName('rival')} as attractive, charming, and appropriate in ways that highlight the obstacles facing our couple. In ${eraName}, ${getSecondaryName('rival')} might be the "perfect match" - right class, family approval, no scandal. Show them flirting with or pursuing the object of their affection. Show ${heroineName} or ${heroName} watching this interaction with unexpected jealousy they don't want to feel. Include ${getSecondaryName('rival')}'s perspective - make them likable enough that their interest creates real complication, not just annoyance. Show how their presence forces our couple to confront feelings they're trying to deny. Make readers worry - could the rival actually win?`
      } : null,
      {
        beat: `Create a memorable, charged moment that will echo throughout the story`,
        prompt: `Write THE moment from this meet-cute that will be referenced and remembered throughout the story. This should be specific and vivid: a particular exchange, a look, a near-kiss, an argument, a rescue, a dance, a touch. Make it unique to ${heroineName} as ${femaleTrope.name.toLowerCase()} and ${heroName} as ${maleTrope.name.toLowerCase()} in ${eraName}. Include sensory details that will trigger memory later: a specific scent, song, location, weather, time of day. Show both characters knowing this moment matters even if they don't want it to. Write it with enough detail and emotion that when it's referenced later, readers will immediately remember it. This is their moment - the beginning of their story. Make it feel inevitable and significant. End with neither able to stop thinking about it.`
      },
    ].filter(Boolean);
    
    const meetCuteBeats2 = [
      {
        beat: `${heroineName}'s internal reaction to meeting ${heroName} - thoughts she'd never voice aloud`,
        prompt: `Write ${heroineName}'s private thoughts immediately after meeting ${heroName}. Show her inner monologue - the honest reactions she'd never say aloud. Is she attracted despite her better judgment? Irritated at being affected? Confused by her response? Include specific things she noticed: his voice, hands, eyes, the way he moved. Show her analyzing the encounter - replay specific moments from her perspective. What did he say that bothers her? What did he do that impressed her despite herself? As ${femaleTrope.name.toLowerCase()} in ${eraName}, what does meeting ${maleTrope.name.toLowerCase()} mean for her? Include her talking herself through it: rational thoughts versus emotional reactions. Show the gap between what she tells herself she should feel versus what she actually feels. Make readers see the beginning of her internal conflict.`
      },
      {
        beat: `Show how she rationalizes her attraction or explains away her strong reaction`,
        prompt: `Write ${heroineName} explaining to herself why she responded so strongly to ${heroName}. Show her mental gymnastics: "It's not attraction, it's just surprise/anger/curiosity." Include her logical arguments for why ${heroName} as ${maleTrope.name.toLowerCase()} is wrong for her - list specific reasons tied to her goals as ${femaleTrope.name.toLowerCase()}. Show her convincing herself it was a one-time meeting, she'll never see him again (if applicable), or she can easily avoid him. In ${eraName}, what social/practical reasons make this attraction problematic? Include her perhaps confiding in ${hasSecondary('best-friend') ? getSecondaryName('best-friend') : 'a confidant'} with a dismissive tone that doesn't quite ring true. Show her trying to minimize the encounter while her thoughts keep circling back to it. Make readers see through her rationalizations to the truth she's denying.`
      },
      {
        beat: `Can't stop thinking about him despite all the reasons she should`,
        prompt: `Write ${heroineName} trying to focus on other things but finding ${heroName} invading her thoughts constantly. Show her in the middle of daily tasks in ${eraName} when a memory surfaces: something he said, the way he looked at her, his laugh. Show her irritation at herself for thinking about him. Include specific moments: she's reading but realizes she hasn't absorbed a word because she's replaying their conversation. She's at dinner but barely tastes the food. Someone speaks to her and she has to ask them to repeat it. Show her dreams featuring him. In one scene, show her catching herself wondering what he's doing right now, then scolding herself. If she has ${hasSecondary('best-friend') ? `${getSecondaryName('best-friend')}` : 'a friend'}, show them noticing her distraction. Make readers feel the obsessive quality of new attraction she's trying to fight.`
      },
      {
        beat: `Analyze what meeting him means for her goals as ${femaleTrope.name.toLowerCase()}`,
        prompt: `Write ${heroineName} thinking through the practical implications of ${heroName} entering her life. As ${femaleTrope.name.toLowerCase()} who is ${femaleTrope.description.toLowerCase()}, she has specific goals and plans. How does ${heroName} as ${maleTrope.name.toLowerCase()} threaten or complicate those plans? Be specific about her goals in ${eraName} and why getting involved with him would derail them. Is there a practical conflict of interest? Does he represent everything she's trying to avoid? Would caring about him cost her something she's worked for? Include her weighing options: she could pursue this attraction (but it would mean...) or she could focus on her goals (which requires...). Show her trying to be rational and strategic. Make the conflict concrete and real, not just emotional.`
      },
      hasSecondary('best-friend') ? {
        beat: `${getSecondaryName('best-friend')} notices ${heroineName}'s reaction and comments on it`,
        prompt: `Write a scene between ${heroineName} and ${getSecondaryName('best-friend')} where her confidant notices something is different. Show ${getSecondaryName('best-friend')} picking up on cues: ${heroineName} being distracted, mentioning ${heroName} casually (too casually), or trying not to mention him at all. Include ${getSecondaryName('best-friend')}'s knowing look or direct question: "Who was he?" or "You can't stop thinking about him, can you?" Show ${heroineName} trying to downplay it while ${getSecondaryName('best-friend')} sees right through her. In ${eraName}, how would friends discuss romantic prospects? Include advice or warnings from ${getSecondaryName('best-friend')} based on their knowledge of ${heroineName}'s history and goals. Show the friendship through their ease with each other. ${getSecondaryName('best-friend')} might voice what ${heroineName} won't admit: "You're already half in love with him." Make readers see ${heroineName} through her friend's more objective eyes.`
      } : null,
      currentEra ? {
        beat: `Reflect on what a relationship with ${heroName} would mean in the context of ${eraName} society`,
        prompt: `Write ${heroineName} thinking through the social implications of a relationship with ${heroName} in ${eraName}. Be specific about the societal rules, expectations, and consequences that apply. As ${femaleTrope.name.toLowerCase()}, what is her social position? As ${maleTrope.name.toLowerCase()}, what is his? How does society view such a match? Would there be scandal? Approval? Obstacles from family or community? Include specific consequences: loss of reputation, social advancement, family approval, inheritance, position. Show her knowledge of other women who made similar choices - what happened to them? In ${currentEra.name} during ${currentEra.period}, what were the real stakes for a woman pursuing or accepting the wrong man? Make the historical context feel real and weighty, not just decorative. Show that she understands exactly what she'd be risking.`
      } : null,
      {
        beat: `Establish why they can't be together - external obstacles (class, duty, family) and internal obstacles (fear, wounds)`,
        prompt: `Write ${heroineName} cataloging all the reasons why she and ${heroName} cannot be together. Create two lists in her mind: external obstacles and internal ones. EXTERNAL: In ${eraName}, what stands between ${femaleTrope.name.toLowerCase()} and ${maleTrope.name.toLowerCase()}? Class difference? Family feud? Existing commitments? Opposing goals? Professional ethics? Be specific with details that feel real to the setting. INTERNAL: What are ${heroineName}'s emotional wounds or fears that make intimacy scary? Past hurt? Fear of vulnerability? Belief she's unworthy? Need for control? Show her acknowledging both types of obstacles. Include her conclusion: even if she wanted this (which she tells herself she doesn't), it's impossible. Make each obstacle feel substantial enough that readers understand why they'll resist for most of the book. Create genuine barriers, not easily overcome.`
      },
      {
        beat: `End with anticipation of their next forced encounter`,
        prompt: `Write the final paragraph of this scene where ${heroineName} learns she will see ${heroName} again soon - and can't decide if she dreads or anticipates it. Show her receiving news: an invitation, a summons, information that he'll be at an event she must attend, or discovery that circumstances require continued interaction. Show her immediate visceral reaction: a flip of her stomach, a quickening pulse she tries to ignore. Include her trying to convince herself she's dreading it while her body betrays anticipation. Show her beginning to plan: what she'll wear, what she'll say, how she'll act cold/distant/unaffected. In ${eraName}, what does the setting of this next meeting mean? A ball? A business meeting? A family gathering? A forced journey together? End with her both counting down and trying not to count down to seeing him again. Make readers eager for that next encounter.`
      }
    ].filter(Boolean);
    
    chapters.push({
      number: meetCuteChapter,
      title: 'The Meet Cute',
      beat: 'Beat 2: The Meet Cute',
      percentage: '10%',
      wordCount: avgWordsPerChapter,
      scenes: [
        {
          title: 'The Encounter',
          wordCount: Math.floor(avgWordsPerChapter * 0.6),
          beats: meetCuteBeats1
        },
        {
          title: 'Immediate Aftermath',
          wordCount: Math.floor(avgWordsPerChapter * 0.4),
          beats: meetCuteBeats2
        }
      ]
    });

    // Beat 3: Resistance
    const resistanceStart = meetCuteChapter + 1;
    const resistanceChapters = Math.max(2, Math.floor(totalChapters * 0.15));
    for (let i = 0; i < resistanceChapters; i++) {
      const resistanceBeats1 = [
        `${heroineName} fights her growing attraction to ${heroName}`,
        `Show her internal conflict: drawn to him vs. all the reasons it's impossible`,
        `Her identity as ${femaleTrope.name.toLowerCase()} creates specific obstacles - she is ${femaleTrope.description.toLowerCase()}`,
        `${heroName} as ${maleTrope.name.toLowerCase()} has his own baggage and resistance`,
        currentEra ? `Social conventions of the ${eraName} make the relationship difficult or scandalous` : null,
        hasSecondary('parent') ? `${getSecondaryName('parent')} voices opposition or creates obstacles to the relationship` : null,
        hasSecondary('villain') ? `${getSecondaryName('villain')} actively works to keep them apart or create misunderstandings` : null,
        `Witty banter and verbal sparring mask deeper attraction`,
        `Small moments of unexpected connection that chip away at their defenses`
      ].filter(Boolean);
      
      const resistanceBeats2 = [
        plotTrope.id === 'forced-proximity' ? `The forced proximity situation continues - they can't escape each other` : null,
        plotTrope.id === 'enemies-to-lovers' ? `Their conflict escalates but they begin to respect each other's positions` : null,
        plotTrope.id === 'fake-relationship' ? `They must maintain their fake relationship in public, increasing intimacy` : null,
        plotTrope.id === 'marriage-of-convenience' ? `Married but keeping emotional distance - the proximity is challenging that` : null,
        plotTrope.id === 'forbidden-love' ? `They try to stay apart but fate keeps bringing them together` : null,
        `Circumstances force them to interact or work together`,
        `Reveal deeper layers of each character - show vulnerabilities beneath their armor`,
        `${heroineName} glimpses the man beneath ${heroName}'s facade as ${maleTrope.name.toLowerCase()}`,
        `${heroName} sees ${heroineName} as more than just ${femaleTrope.name.toLowerCase()}`,
        hasSecondary('childhood-friend') ? `${getSecondaryName('childhood-friend')} shares stories that give new perspective on the hero` : null,
        hasSecondary('rival') ? `${getSecondaryName('rival')}'s continued pursuit adds pressure and jealousy` : null,
        `Growing respect turns to reluctant admiration`
      ].filter(Boolean);
      
      const resistanceBeats3 = [
        `One or both physically retreat from getting too close`,
        `Remind themselves and each other of all the obstacles`,
        `${heroineName} lists the reasons why ${heroName} as ${maleTrope.name.toLowerCase()} is wrong for her`,
        `${heroName} tells himself why ${heroineName} as ${femaleTrope.name.toLowerCase()} doesn't fit his life`,
        hasSecondary('best-friend') ? `${getSecondaryName('best-friend')} sees through ${heroineName}'s protests and calls her out` : null,
        `But despite everything, they can't stop thinking about each other`,
        `Set up the next forced encounter`,
        i === resistanceChapters - 1 ? `End this section with a moment that makes continued resistance impossible` : `End chapter with unresolved tension`
      ].filter(Boolean);
      
      chapters.push({
        number: resistanceStart + i,
        title: `Resistance - Part ${i + 1}`,
        beat: 'Beat 3: The Resistance',
        percentage: '10-25%',
        wordCount: avgWordsPerChapter,
        scenes: [
          {
            title: 'Fighting the Attraction',
            wordCount: Math.floor(avgWordsPerChapter * 0.4),
            beats: resistanceBeats1
          },
          {
            title: 'Forced Interaction',
            wordCount: Math.floor(avgWordsPerChapter * 0.35),
            beats: resistanceBeats2
          },
          {
            title: 'Retreat and Reflection',
            wordCount: Math.floor(avgWordsPerChapter * 0.25),
            beats: resistanceBeats3
          }
        ]
      });
    }

    // Beat 4: The Acceptance
    const acceptanceChapter = resistanceStart + resistanceChapters;
    
    const acceptanceBeats1 = [
      `A major event forces perspective shift - danger, crisis, or moment of truth`,
      `${heroineName} sees ${heroName} in a completely new light - his actions as ${maleTrope.name.toLowerCase()} reveal his true character`,
      `${heroName} recognizes ${heroineName} is not just ${femaleTrope.name.toLowerCase()} but a complex woman worth knowing`,
      plotTrope.id === 'enemies-to-lovers' ? `Their opposition reveals shared values beneath surface differences` : null,
      plotTrope.id === 'second-chance' ? `They finally address the past hurt that tore them apart` : null,
      hasSecondary('mentor') ? `${getSecondaryName('mentor')} offers wisdom that helps one character see clearly` : null,
      `One or both show unexpected vulnerability - share a wound or fear`,
      `A moment of genuine understanding passes between them`,
      currentEra ? `They acknowledge the ${eraName} obstacles but decide attraction is worth exploring` : null,
      `Shift from "we can't" to "what if we tried?"`,
    ].filter(Boolean);
    
    const acceptanceBeats2 = [
      `They make a tentative agreement to give the relationship a chance`,
      plotTrope.id === 'fake-relationship' ? `The lines between fake and real begin to blur - they acknowledge real feelings developing` : null,
      plotTrope.id === 'marriage-of-convenience' ? `They agree to make their convenient marriage into a real partnership` : null,
      plotTrope.id === 'forbidden-love' ? `They decide their love is worth the risk of breaking taboos or rules` : null,
      `Lower defensive walls - allow themselves to be seen`,
      `First genuine emotional connection without pretense or armor`,
      `${heroineName} allows herself to hope despite her fears as ${femaleTrope.name.toLowerCase()}`,
      `${heroName} takes a risk on connection despite his wounds as ${maleTrope.name.toLowerCase()}`,
      hasSecondary('best-friend') ? `${getSecondaryName('best-friend')} celebrates ${heroineName}'s decision to be open to love` : null,
      hasSecondary('matchmaker') ? `${getSecondaryName('matchmaker')} is delighted to see their scheme working` : null,
      hasSecondary('ex-lover') ? `${getSecondaryName('ex-lover')} returns, testing this new tentative connection` : null,
      `Hope and possibility bloom - the beginning of something real`,
      `End with commitment to see where this leads`
    ].filter(Boolean);
    
    chapters.push({
      number: acceptanceChapter,
      title: 'The Acceptance',
      beat: 'Beat 4: The Acceptance',
      percentage: '25%',
      wordCount: avgWordsPerChapter,
      scenes: [
        {
          title: 'The Turning Point',
          wordCount: Math.floor(avgWordsPerChapter * 0.5),
          beats: acceptanceBeats1
        },
        {
          title: 'First Steps Together',
          wordCount: Math.floor(avgWordsPerChapter * 0.5),
          beats: acceptanceBeats2
        }
      ]
    });

    // Beat 5: The Deepening
    const deepeningStart = acceptanceChapter + 1;
    const deepeningChapters = Math.max(2, Math.floor(totalChapters * 0.15));
    for (let i = 0; i < deepeningChapters; i++) {
      const deepeningBeats1 = [
        `${heroineName} shares her backstory - how she became ${femaleTrope.name.toLowerCase()} who is ${femaleTrope.description.toLowerCase()}`,
        `${heroName} reveals his past - what made him ${maleTrope.name.toLowerCase()} and why he is ${maleTrope.description.toLowerCase()}`,
        hasSecondary('childhood-friend') ? `${getSecondaryName('childhood-friend')} fills in details about the hero's past that help heroine understand him` : null,
        `Reveal the specific wounds that make intimacy scary for each of them`,
        `Find unexpected common ground despite different backgrounds`,
        currentEra ? `Discuss their dreams and fears within the context of ${eraName} possibilities and limitations` : null,
        `Share secrets they've told no one else`,
        `Build genuine emotional intimacy through honest conversation`,
      ].filter(Boolean);
      
      const deepeningBeats2 = [
        `Physical attraction intensifies with emotional connection`,
        selectedSpiceLevel === 'sweet' ? `Stolen kisses, hand-holding, and tender moments build anticipation` : null,
        selectedSpiceLevel === 'warm' ? `Growing physical intimacy with tasteful passion, building heat` : null,
        selectedSpiceLevel === 'hot' ? `Physical encounters that show deepening connection, detailed but not explicit` : null,
        selectedSpiceLevel === 'steamy' || selectedSpiceLevel === 'scorching' ? `Explicit intimate scenes that reflect emotional deepening` : null,
        `${heroineName} and ${heroName} support each other's goals and dreams`,
        `Work together to solve problems - show them as a team`,
        `Small gestures of care and thoughtfulness`,
        hasSecondary('sibling') ? `${getSecondaryName('sibling')} observes how ${heroName} has changed since meeting ${heroineName}` : null,
        hasSecondary('servant') ? `${getSecondaryName('servant')} notices the growing bond and approves (or worries)` : null,
        `Each brings out the best in the other`,
      ].filter(Boolean);
      
      const deepeningBeats3 = [
        `First small conflict or misunderstanding arises`,
        `${heroineName}'s core wound/fear surfaces briefly`,
        `${heroName}'s baggage from being ${maleTrope.name.toLowerCase()} creates friction`,
        hasSecondary('villain') ? `${getSecondaryName('villain')} begins to move against them more actively` : null,
        hasSecondary('rival') ? `${getSecondaryName('rival')} makes one more play, testing their bond` : null,
        `Reminder that external obstacles (family, society, duty) haven't gone away`,
        currentEra ? `The constraints of ${eraName} society press in - what they're doing is risky` : null,
        `But they brush concerns aside, believing love will be enough`,
        i === deepeningChapters - 1 ? `Set up the commitment that's coming - they're ready to declare themselves` : `End with deepening trust and affection`
      ].filter(Boolean);
      
      chapters.push({
        number: deepeningStart + i,
        title: `The Deepening - Part ${i + 1}`,
        beat: 'Beat 5: The Deepening',
        percentage: '25-40%',
        wordCount: avgWordsPerChapter,
        scenes: [
          {
            title: 'Getting to Know You',
            wordCount: Math.floor(avgWordsPerChapter * 0.4),
            beats: deepeningBeats1
          },
          {
            title: 'Growing Closer',
            wordCount: Math.floor(avgWordsPerChapter * 0.35),
            beats: deepeningBeats2
          },
          {
            title: 'Warning Signs',
            wordCount: Math.floor(avgWordsPerChapter * 0.25),
            beats: deepeningBeats3
          }
        ]
      });
    }

    // Beat 6: The Commitment
    const commitmentChapter = deepeningStart + deepeningChapters;
    
    const commitmentBeats1 = [
      `${heroineName} and/or ${heroName} confess deep feelings - the L-word may or may not be spoken yet`,
      `They acknowledge this is real and serious, not just attraction`,
      `Make emotional promises to each other`,
      plotTrope.id === 'marriage-of-convenience' ? `Transform their convenient arrangement into a genuine commitment of the heart` : null,
      plotTrope.id === 'fake-relationship' ? `Admit the fake relationship has become entirely real - decide to make it official` : null,
      plotTrope.id === 'second-chance' ? `Explicitly commit to not making the same mistakes as before - this time will be different` : null,
      plotTrope.id === 'forbidden-love' ? `Declare their love is worth any price - they'll face the consequences together` : null,
      `${heroineName} as ${femaleTrope.name.toLowerCase()} takes a brave step outside her usual role`,
      `${heroName} as ${maleTrope.name.toLowerCase()} shows vulnerability he's never shown before`,
      hasSecondary('best-friend') ? `${getSecondaryName('best-friend')} celebrates this development with ${heroineName}` : null,
      hasSecondary('matchmaker') ? `${getSecondaryName('matchmaker')}'s satisfaction at bringing them together` : null,
      `A sense of "we're in this together no matter what"`,
    ].filter(Boolean);
    
    const commitmentBeats2 = [
      `Point of no return emotionally - there's no going back to being strangers`,
      `Physical and emotional milestone appropriate to ${spiceLevel.name.toLowerCase()} level:`,
      selectedSpiceLevel === 'sweet' ? `Deeply emotional first kiss or embrace that seals their commitment` : null,
      selectedSpiceLevel === 'warm' ? `First intimate night together (fade to black), marking new phase of relationship` : null,
      selectedSpiceLevel === 'hot' ? `First detailed intimate scene showing physical and emotional connection` : null,
      selectedSpiceLevel === 'steamy' ? `Explicit intimate scenes demonstrating depth of passion and commitment` : null,
      selectedSpiceLevel === 'scorching' ? `Very explicit scenes showing intense physical chemistry matching emotional intensity` : null,
      `The morning after or immediate aftermath - new closeness and tenderness`,
      hasSecondary('ex-lover') ? `${getSecondaryName('ex-lover')} witnesses their commitment, accepts defeat or plots interference` : null,
      `Make plans for a future together`,
      currentEra ? `Discuss how they'll navigate ${eraName} society as a couple` : null,
      `Transition from potential to actual - they are genuinely "together" now`,
      `End with them all-in on this relationship, believing they can overcome anything`,
    ].filter(Boolean);
    
    chapters.push({
      number: commitmentChapter,
      title: 'The Commitment',
      beat: 'Beat 6: The Commitment',
      percentage: '40-50%',
      wordCount: avgWordsPerChapter,
      scenes: [
        {
          title: 'The Declaration',
          wordCount: Math.floor(avgWordsPerChapter * 0.4),
          beats: commitmentBeats1
        },
        {
          title: 'Crossing the Threshold',
          wordCount: Math.floor(avgWordsPerChapter * 0.6),
          beats: commitmentBeats2
        }
      ]
    });

    // Beat 7: The Midpoint/First Intimacy
    const midpointChapter = commitmentChapter + 1;
    
    const midpointBeats1 = [
      `The major intimate milestone - appropriate to ${spiceLevel.name.toLowerCase()} level:`,
      selectedSpiceLevel === 'sweet' ? `A passionate, soul-deep first kiss that changes everything - description focuses on emotion and connection` : null,
      selectedSpiceLevel === 'warm' ? `First intimate encounter with bedroom door tactfully closed - focus on anticipation and emotional aftermath` : null,
      selectedSpiceLevel === 'hot' ? `Detailed first intimate scene showing physical passion and emotional connection - 2-3 such scenes in this chapter` : null,
      selectedSpiceLevel === 'steamy' ? `Multiple explicit intimate scenes demonstrating growing physical comfort and passion` : null,
      selectedSpiceLevel === 'scorching' ? `Very explicit, detailed intimate scenes with high heat level maintained throughout` : null,
      `${heroineName} lets herself be fully vulnerable with ${heroName}`,
      `${heroName} as ${maleTrope.name.toLowerCase()} shows a tenderness he's never shown anyone`,
      `Physical union reflects and deepens emotional bond`,
      `Both characters feel seen, known, and accepted completely`,
      currentEra ? `Navigate intimacy within ${eraName} context and constraints` : null,
    ].filter(Boolean);
    
    const midpointBeats2 = [
      `The blissful aftermath - lying together, talking, dreaming`,
      `Share even deeper secrets and vulnerabilities in this intimate space`,
      `Make promises about their future together`,
      `${heroineName} and ${heroName} feel complete in a way they never have before`,
      `Believe their love can overcome any obstacle`,
      hasSecondary('matchmaker') ? `${getSecondaryName('matchmaker')} observes their happiness with satisfaction` : null,
      hasSecondary('servant') ? `${getSecondaryName('servant')} notices the change in them and is pleased` : null,
      `Peak of happiness and connection - they are genuinely "together" now`,
      `Shift from potential lovers to actual lovers committed to each other`,
    ].filter(Boolean);
    
    const midpointBeats3 = [
      `Brief shadow crosses the happiness - a mention of the unresolved obstacle`,
      hasSecondary('villain') ? `${getSecondaryName('villain')} observes their happiness and plans to destroy it` : null,
      hasSecondary('ex-lover') ? `${getSecondaryName('ex-lover')} sees them together and reacts with jealousy or hurt` : null,
      `Foreshadow the crisis that's brewing`,
      plotTrope.id === 'forbidden-love' ? `Reminder that their love is still forbidden - discovery would be devastating` : null,
      currentEra ? `Hint at social pressures or family obligations that haven't gone away` : null,
      `The couple dismisses concerns, believing love conquers all`,
      `End with them confident and happy, unaware of the storm approaching`,
    ].filter(Boolean);
    
    chapters.push({
      number: midpointChapter,
      title: 'The Midpoint',
      beat: 'Beat 7: The Midpoint/First Intimacy',
      percentage: '50%',
      wordCount: avgWordsPerChapter,
      scenes: [
        {
          title: 'The Intimate Moment',
          wordCount: Math.floor(avgWordsPerChapter * 0.5),
          beats: midpointBeats1
        },
        {
          title: 'The Afterglow',
          wordCount: Math.floor(avgWordsPerChapter * 0.3),
          beats: midpointBeats2
        },
        {
          title: 'The Shadow',
          wordCount: Math.floor(avgWordsPerChapter * 0.2),
          beats: midpointBeats3
        }
      ]
    });

    // Beat 8: The Swoon
    const swoonStart = midpointChapter + 1;
    const swoonChapters = Math.max(2, Math.floor(totalChapters * 0.2));
    for (let i = 0; i < swoonChapters; i++) {
      const swoonBeats1 = [
        `The honeymoon phase - ${heroineName} and ${heroName} are deliriously happy together`,
        `Explore their relationship in the context of ${currentEra ? eraName : 'their world'}`,
        `Romantic dates, adventures, or quiet moments of domestic bliss`,
        selectedSpiceLevel === 'sweet' ? `Sweet romantic moments, tender kisses, and emotional intimacy` : null,
        selectedSpiceLevel === 'warm' ? `Sensual moments and growing physical comfort (tastefully done)` : null,
        selectedSpiceLevel === 'hot' || selectedSpiceLevel === 'steamy' || selectedSpiceLevel === 'scorching' ? `Regular intimate scenes appropriate to ${spiceLevel.name.toLowerCase()} level showing deepening physical connection` : null,
        `Show how ${heroineName} as ${femaleTrope.name.toLowerCase()} fits into ${heroName}'s world`,
        `Show how ${heroName} as ${maleTrope.name.toLowerCase()} supports ${heroineName}'s dreams`,
        hasSecondary('best-friend') ? `${getSecondaryName('best-friend')} celebrates ${heroineName}'s happiness` : null,
      ].filter(Boolean);
      
      const swoonBeats2 = [
        `Work together as a team to overcome a challenge`,
        `Support each other's goals and ambitions`,
        `${heroineName} helps ${heroName} with his problems or goals as ${maleTrope.name.toLowerCase()}`,
        `${heroName} champions ${heroineName} in pursuing what matters to her`,
        `Build genuine trust through actions, not just words`,
        `Share deeper secrets - the last walls come down`,
        hasSecondary('servant') ? `${getSecondaryName('servant')} observes their partnership with knowing approval` : null,
        hasSecondary('sibling') ? `${getSecondaryName('sibling')} sees how happy ${heroName} is and approves (or worries)` : null,
        `Each makes small sacrifices for the other's happiness`,
        `Show them as partners in life, not just lovers`,
      ].filter(Boolean);
      
      const swoonBeats3 = [
        `The gathering storm - unresolved conflicts begin to loom larger`,
        hasSecondary('villain') ? `${getSecondaryName('villain')} prepares their decisive attack` : null,
        hasSecondary('ex-lover') ? `${getSecondaryName('ex-lover')} makes one last play to interfere` : null,
        hasSecondary('parent') ? `${getSecondaryName('parent')}'s disapproval or expectations create pressure` : null,
        plotTrope.id === 'forbidden-love' ? `The risk of discovery grows - someone suspects their secret` : null,
        currentEra ? `Social pressures or family obligations press in harder` : null,
        `External obstacles haven't been resolved, just avoided`,
        `${heroName}'s core wound/fear begins to resurface`,
        `${heroineName} notices small warning signs but dismisses them`,
        i === swoonChapters - 1 ? `End with ominous foreshadowing - the crisis is about to hit` : `Plant seeds of the coming crisis`,
      ].filter(Boolean);
      
      chapters.push({
        number: swoonStart + i,
        title: `The Swoon - Part ${i + 1}`,
        beat: 'Beat 8: The Swoon',
        percentage: '50-75%',
        wordCount: avgWordsPerChapter,
        scenes: [
          {
            title: 'Honeymoon Phase',
            wordCount: Math.floor(avgWordsPerChapter * 0.4),
            beats: swoonBeats1
          },
          {
            title: 'Building Trust',
            wordCount: Math.floor(avgWordsPerChapter * 0.35),
            beats: swoonBeats2
          },
          {
            title: 'Gathering Storm',
            wordCount: Math.floor(avgWordsPerChapter * 0.25),
            beats: swoonBeats3
          }
        ]
      });
    }

    // Beat 9: The Black Moment
    const blackMomentChapter = swoonStart + swoonChapters;
    
    const blackMomentBeats1 = [
      `The devastating crisis erupts - this is the darkest moment`,
      hasSecondary('villain') ? `${getSecondaryName('villain')} strikes their decisive blow, revealing secrets or creating chaos` : null,
      hasSecondary('ex-lover') ? `${getSecondaryName('ex-lover')}'s interference reaches its peak, causing maximum damage` : null,
      plotTrope.id === 'secret-past' ? `${heroName}'s hidden past is revealed in the worst possible way` : null,
      plotTrope.id === 'forbidden-love' ? `Their forbidden relationship is discovered - social consequences are devastating` : null,
      plotTrope.id === 'enemies-to-lovers' ? `Old loyalties or conflicts force them to choose sides against each other` : null,
      plotTrope.id === 'second-chance' ? `The same issue that tore them apart before resurfaces - history repeating` : null,
      currentEra ? `${eraName} social pressures, family obligations, or class differences force a crisis` : null,
      hasSecondary('parent') ? `${getSecondaryName('parent')} forces an ultimatum - love or duty/family/position` : null,
      `A devastating secret is revealed or fundamental misunderstanding reaches its peak`,
      `External forces tear them apart when they're most vulnerable`,
    ].filter(Boolean);
    
    const blackMomentBeats2 = [
      `The confrontation - painful truths are spoken`,
      `${heroineName}'s deepest fear as ${femaleTrope.name.toLowerCase()} is realized`,
      `${heroName}'s core wound as ${maleTrope.name.toLowerCase()} is triggered - he reverts to old patterns`,
      `Hurtful words are exchanged in fear and pain`,
      `One or both say things they don't mean but can't take back`,
      `Trust that took months to build shatters in moments`,
      `Misunderstanding or miscommunication at its worst`,
      hasSecondary('best-friend') ? `${getSecondaryName('best-friend')} tries to mediate but can't fix this` : null,
      `Both characters' worst fears about love are seemingly confirmed`,
      `The relationship appears irreparably broken`,
    ].filter(Boolean);
    
    const blackMomentBeats3 = [
      `Physical or emotional separation - they part ways`,
      `${heroineName} returns to her old life as ${femaleTrope.name.toLowerCase()}, but it no longer fits`,
      `${heroName} retreats into his role as ${maleTrope.name.toLowerCase()}, miserable and alone`,
      `Grief and loss - mourning what they had`,
      `Each believes the other is better off without them`,
      `This is the darkest moment - it feels impossible they can overcome this`,
      hasSecondary('villain') ? `${getSecondaryName('villain')} seems to have won` : null,
      currentEra ? `In the context of ${eraName}, their separation seems final and insurmountable` : null,
      `Both are at their lowest point, broken and alone`,
      `End with seemingly no way to fix what's been destroyed`,
    ].filter(Boolean);
    
    chapters.push({
      number: blackMomentChapter,
      title: 'The Black Moment',
      beat: 'Beat 9: The Black Moment',
      percentage: '75%',
      wordCount: avgWordsPerChapter,
      scenes: [
        {
          title: 'The Crisis Erupts',
          wordCount: Math.floor(avgWordsPerChapter * 0.4),
          beats: blackMomentBeats1
        },
        {
          title: 'The Breaking Point',
          wordCount: Math.floor(avgWordsPerChapter * 0.35),
          beats: blackMomentBeats2
        },
        {
          title: 'The Separation',
          wordCount: Math.floor(avgWordsPerChapter * 0.25),
          beats: blackMomentBeats3
        }
      ]
    });

    // Beat 10: The Grovel
    const grovelStart = blackMomentChapter + 1;
    const grovelChapters = Math.max(1, Math.floor(totalChapters * 0.1));
    for (let i = 0; i < grovelChapters; i++) {
      const grovelBeats1 = [
        `${heroName} (or ${heroineName}) hits rock bottom and has an epiphany`,
        `Realizes the mistake and what's truly been lost`,
        `${heroName} as ${maleTrope.name.toLowerCase()} must face his deepest fear to win her back`,
        `${heroineName} as ${femaleTrope.name.toLowerCase()} must overcome her limiting belief`,
        hasSecondary('mentor') ? `${getSecondaryName('mentor')} offers crucial wisdom or tough love that sparks understanding` : null,
        hasSecondary('best-friend') ? `${getSecondaryName('best-friend')} helps the hero see what they need to do` : null,
        hasSecondary('childhood-friend') ? `${getSecondaryName('childhood-friend')} provides insight from the past that clarifies the present` : null,
        `Understanding dawns about what really matters`,
        `Decides to fight for love regardless of risk or cost`,
        `Preparation for the grand gesture begins`,
      ].filter(Boolean);
      
      const grovelBeats2 = [
        `The grand gesture - specific to their relationship and the ${plotTrope.name.toLowerCase()} dynamic:`,
        plotTrope.id === 'enemies-to-lovers' ? `${heroName} publicly chooses ${heroineName}'s side, abandoning his old allegiances` : null,
        plotTrope.id === 'forbidden-love' ? `Willing to defy social rules, family, or consequences to be together` : null,
        plotTrope.id === 'second-chance' ? `Proves he's genuinely changed by addressing the exact issue that broke them before` : null,
        plotTrope.id === 'marriage-of-convenience' ? `Declares his love publicly, transforming convenience into devotion` : null,
        currentEra ? `The gesture is meaningful within ${eraName} context - a true sacrifice or brave declaration for that time` : null,
        `${heroName} shows complete vulnerability - no pride, no armor, just raw honesty`,
        `Addresses the core issue that drove them apart head-on`,
        `Proves through actions (not just words) that change is real`,
        hasSecondary('matchmaker') ? `${getSecondaryName('matchmaker')} may help orchestrate or witnesses the gesture with satisfaction` : null,
        hasSecondary('sibling') ? `${getSecondaryName('sibling')} supports the gesture, showing character growth` : null,
        `A speech or action that demonstrates understanding of what went wrong`,
        `Makes it clear he can't live without her, won't give up`,
      ].filter(Boolean);
      
      const grovelBeats3 = [
        `${heroineName} witnesses the gesture - her internal struggle`,
        `Weighing trust against fear of being hurt again`,
        `Sees that ${heroName} truly has changed, faced his demons`,
        `Recognizes her own part in what went wrong`,
        `${heroineName} must also grow - overcome her fear as ${femaleTrope.name.toLowerCase()}`,
        hasSecondary('best-friend') ? `${getSecondaryName('best-friend')} encourages ${heroineName} to take the leap of faith` : null,
        `Realizes she's also been running from intimacy and must be brave`,
        `Decision point - does she dare to trust again?`,
        `The moment hangs in balance - will she accept his gesture?`,
        i === grovelChapters - 1 ? `She makes the choice - decides to take the leap of faith` : `Build to the final decision`,
      ].filter(Boolean);
      
      chapters.push({
        number: grovelStart + i,
        title: `The Grovel - Part ${i + 1}`,
        beat: 'Beat 10: The Grovel/Grand Gesture',
        percentage: '80-85%',
        wordCount: avgWordsPerChapter,
        scenes: [
          {
            title: 'The Realization',
            wordCount: Math.floor(avgWordsPerChapter * 0.3),
            beats: grovelBeats1
          },
          {
            title: 'The Grand Gesture',
            wordCount: Math.floor(avgWordsPerChapter * 0.5),
            beats: grovelBeats2
          },
          {
            title: 'The Response',
            wordCount: Math.floor(avgWordsPerChapter * 0.2),
            beats: grovelBeats3
          }
        ]
      });
    }

    // Beat 11: The HEA
    const heaStart = grovelStart + grovelChapters;
    const heaChapters = totalChapters - heaStart + 1;
    for (let i = 0; i < heaChapters; i++) {
      const heaBeats1 = [
        `${heroineName} and ${heroName} come back together - the reunion`,
        `Honest, vulnerable conversation where both take responsibility`,
        `${heroName} as ${maleTrope.name.toLowerCase()} acknowledges how he hurt her and why`,
        `${heroineName} as ${femaleTrope.name.toLowerCase()} shares her own fears and part in the conflict`,
        `Forgiveness and genuine understanding`,
        `Healing begins - both have grown through the pain`,
        `Commitment to their future together, wiser and stronger`,
        selectedSpiceLevel !== 'sweet' ? `Intimate reunion scene appropriate to ${spiceLevel.name.toLowerCase()} level` : `Tender, emotional reunion with kissing and embraces`,
        `Promise to communicate better, be vulnerable, face challenges together`,
        `"I love you" declarations that land differently now - deeper, earned`,
      ].filter(Boolean);
      
      const heaBeats2 = [
        `Resolution of all external conflicts and obstacles:`,
        hasSecondary('villain') ? `${getSecondaryName('villain')} is defeated, exposed, or rendered powerless` : null,
        hasSecondary('rival') ? `${getSecondaryName('rival')} accepts defeat gracefully or finds their own happiness` : null,
        hasSecondary('parent') ? `${getSecondaryName('parent')} gives their blessing or is reconciled with the couple` : null,
        hasSecondary('sibling') ? `${getSecondaryName('sibling')} celebrates their happiness and offers support` : null,
        hasSecondary('ex-lover') ? `${getSecondaryName('ex-lover')} exits the story, accepting it's truly over` : null,
        hasSecondary('matchmaker') ? `${getSecondaryName('matchmaker')} takes credit for bringing them together` : null,
        hasSecondary('best-friend') ? `${getSecondaryName('best-friend')} celebrates with ${heroineName}, thrilled to see her happy` : null,
        plotTrope.id === 'forbidden-love' ? `The forbidden aspect is resolved - acceptance, rule changes, or brave defiance` : null,
        currentEra ? `Show how their union will work within ${eraName} society - what they'll face and how they'll manage it together` : null,
        `Tie up all remaining plot threads and subplots`,
        `Show both characters have genuinely grown and changed`,
      ].filter(Boolean);
      
      const heaBeats3 = [
        `The final romantic scene - affirming their love and future:`,
        selectedLength === 'series' ? `Wedding, proposal, or commitment with hints about next book's couple` : null,
        `Wedding ceremony in ${currentEra ? eraName : 'their world'} that celebrates their journey`,
        `Final intimate scene appropriate to ${spiceLevel.name.toLowerCase()} level`,
        `Conversation about their future - children, home, dreams they'll pursue together`,
        `Callback to the opening - show how far they've come`,
        `${heroineName} is no longer constrained by being ${femaleTrope.name.toLowerCase()} - she's grown beyond that identity`,
        `${heroName} has healed from his wounds as ${maleTrope.name.toLowerCase()} and found peace`,
        `Vision of their life together - specific and hopeful`,
        `The final image: them together, happy, committed, facing the future as partners`,
        `Satisfying emotional closure that matches ${currentSubgenre.name} expectations`,
        `End with a sense of "forever" - they've earned their happily ever after`,
        `Target word count for full novel: ${novelLengths.find(l => l.id === selectedLength)?.description}`,
      ].filter(Boolean);
      
      chapters.push({
        number: heaStart + i,
        title: `The Happily Ever After - Part ${i + 1}`,
        beat: 'Beat 11: The Happily Ever After',
        percentage: '85-100%',
        wordCount: avgWordsPerChapter,
        scenes: [
          {
            title: 'The Reunion',
            wordCount: Math.floor(avgWordsPerChapter * 0.4),
            beats: heaBeats1
          },
          {
            title: 'Resolution of Conflicts',
            wordCount: Math.floor(avgWordsPerChapter * 0.3),
            beats: heaBeats2
          },
          {
            title: 'The Forever Promise',
            wordCount: Math.floor(avgWordsPerChapter * 0.3),
            beats: heaBeats3
          }
        ]
      });
    }

    setChapterOutline(chapters);
  };

  const currentSubgenre = topSubgenres.find(s => s.id === selectedSubgenre);
  const currentEra = selectedSubgenre === 'historical' ? historicalEras.find(e => e.id === selectedEra) : null;
  const currentMaleTropes = selectedSubgenre === 'historical'
    ? (selectedEra ? maleTropesByEra[selectedEra] : [])
    : (selectedSubgenre ? maleTropesBySubgenre[selectedSubgenre] || [] : []);
  const currentFemaleTropes = selectedSubgenre === 'historical'
    ? (selectedEra ? femaleTropesByEra[selectedEra] : [])
    : (selectedSubgenre ? femaleTropesBySubgenre[selectedSubgenre] || [] : []);

  const currentCharacterNames = selectedSubgenre === 'historical'
    ? (selectedEra ? characterNamesByEra[selectedEra] : null)
    : (selectedSubgenre ? characterNamesBySubgenre[selectedSubgenre] : null);

  const heroName = currentCharacterNames
    ? `${currentCharacterNames.male.firstName} ${currentCharacterNames.male.surname}`
    : 'Hero';
  const heroineName = currentCharacterNames
    ? `${currentCharacterNames.female.firstName} ${currentCharacterNames.female.surname}`
    : 'Heroine';

  const currentSecondaryCharacterNames = selectedSubgenre === 'historical'
    ? (selectedEra ? secondaryCharacterNamesByEra[selectedEra] : null)
    : (selectedSubgenre ? secondaryCharacterNamesBySubgenre[selectedSubgenre] : null);

  const secondaryNames = currentSecondaryCharacterNames
    ? selectedSecondaryCharacters.reduce((acc, charId) => {
        const char = currentSecondaryCharacterNames[charId];
        acc[charId] = char.surname
          ? `${char.firstName} ${char.surname}`
          : char.firstName;
        return acc;
      }, {})
    : {};

  const generateBeatProse = async (chapterIndex, sceneIndex, beatIndex, beat, targetWordCount) => {
    const beatKey = `${chapterIndex}-${sceneIndex}-${beatIndex}`;
    setGeneratingBeat(beatKey);

    try {
      const prompt = typeof beat === 'object' ? beat.prompt : beat;
      const beatTitle = typeof beat === 'object' ? beat.beat : beat;
      
      // Calculate word count range (target +/- 10%)
      const minWords = Math.floor(targetWordCount * 0.9);
      const maxWords = Math.floor(targetWordCount * 1.1);

      const promptText = `You are a professional romance novelist writing a scene for a ${currentSubgenre?.name || 'romance'} novel${currentEra ? ` set in the ${currentEra.name}` : ''}.

SCENE BEAT: ${beatTitle}

TARGET WORD COUNT: ${targetWordCount} words (minimum ${minWords}, maximum ${maxWords})

WRITING INSTRUCTIONS:
${prompt}

CRITICAL REQUIREMENTS:
1. Write engaging, publishable prose in the romance genre
2. Use vivid sensory details and strong emotional beats
3. Include realistic dialogue with proper formatting
4. Show don't tell - demonstrate through action and reaction
5. Match the ${spiceLevels.find(s => s.id === selectedSpiceLevel)?.name.toLowerCase() || 'sweet'} spice level appropriately
6. Stay in close third-person POV
7. Meet the target word count of ${targetWordCount} words

Write the prose now, ensuring it's between ${minWords} and ${maxWords} words:`;

      const response = await fetch("/api/generate-prose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptText })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate prose');
      }

      setGeneratedProse(prev => ({
        ...prev,
        [beatKey]: data.text
      }));
    } catch (error) {
      console.error("Error generating prose:", error);
      setGeneratedProse(prev => ({
        ...prev,
        [beatKey]: `Error generating prose: ${error.message}. Please try again.`
      }));
    } finally {
      setGeneratingBeat(null);
    }
  };

  const copyProseToClipboard = (prose) => {
    navigator.clipboard.writeText(prose);
  };

  const exportChapterProse = (chapterIndex) => {
    const chapter = chapterOutline[chapterIndex];
    let fullChapterText = `CHAPTER ${chapter.number}: ${chapter.title}\n`;
    fullChapterText += `${chapter.beat} (${chapter.percentage})\n`;
    fullChapterText += `${'='.repeat(60)}\n\n`;

    chapter.scenes.forEach((scene, sceneIndex) => {
      fullChapterText += `SCENE ${sceneIndex + 1}: ${scene.title}\n`;
      fullChapterText += `${'-'.repeat(40)}\n\n`;

      scene.beats.forEach((beat, beatIndex) => {
        const beatKey = `${chapterIndex}-${sceneIndex}-${beatIndex}`;
        const prose = generatedProse[beatKey];
        
        if (prose) {
          const beatTitle = typeof beat === 'object' ? beat.beat : beat;
          fullChapterText += `[Beat ${beatIndex + 1}: ${beatTitle}]\n\n`;
          fullChapterText += `${prose}\n\n`;
          fullChapterText += `${'~'.repeat(40)}\n\n`;
        }
      });
    });

    return fullChapterText;
  };

  const exportAllProse = () => {
    let fullNovelText = `${currentSubgenre?.name.toUpperCase() || 'ROMANCE'}${currentEra ? ` - ${currentEra.name}` : ''}\n`;
    fullNovelText += `${heroName} & ${heroineName}\n`;
    fullNovelText += `${'='.repeat(60)}\n\n`;

    chapterOutline.forEach((chapter, chapterIndex) => {
      const chapterText = exportChapterProse(chapterIndex);
      if (chapterText.includes('[Beat')) {
        fullNovelText += chapterText + '\n\n';
      }
    });

    return fullNovelText;
  };

  const downloadProse = (text, filename) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const addProseToManuscript = (chapterIndex, sceneIndex, beatIndex) => {
    const chapter = chapterOutline[chapterIndex];
    const scene = chapter.scenes[sceneIndex];
    const beat = scene.beats[beatIndex];
    const beatKey = `${chapterIndex}-${sceneIndex}-${beatIndex}`;
    const prose = generatedProse[beatKey];

    if (!prose) return;

    const beatTitle = typeof beat === 'object' ? beat.beat : beat;
    
    // Format the prose with headers
    const formattedAddition = `

${'='.repeat(80)}
CHAPTER ${chapter.number}: ${chapter.title}
Scene ${sceneIndex + 1}: ${scene.title}
Beat ${beatIndex + 1}: ${beatTitle}
${'='.repeat(80)}

${prose}

`;

    // Append to manuscript (no auto-download)
    setManuscriptText(prev => prev + formattedAddition);
  };

  const checkIfInManuscript = (chapterIndex, sceneIndex, beatIndex) => {
    const chapter = chapterOutline[chapterIndex];
    const scene = chapter.scenes[sceneIndex];
    const beat = scene.beats[beatIndex];
    const beatTitle = typeof beat === 'object' ? beat.beat : beat;
    
    // Check if this beat's title appears in the manuscript
    return manuscriptText.includes(`Beat ${beatIndex + 1}: ${beatTitle}`);
  };

  const generateAllBeatsInChapter = async (chapterIndex) => {
    const chapter = chapterOutline[chapterIndex];
    
    for (let sceneIndex = 0; sceneIndex < chapter.scenes.length; sceneIndex++) {
      const scene = chapter.scenes[sceneIndex];
      const beatWordCount = Math.floor(scene.wordCount / scene.beats.length);
      
      for (let beatIndex = 0; beatIndex < scene.beats.length; beatIndex++) {
        const beat = scene.beats[beatIndex];
        const beatKey = `${chapterIndex}-${sceneIndex}-${beatIndex}`;
        
        if (generatedProse[beatKey]) continue;
        
        await generateBeatProse(chapterIndex, sceneIndex, beatIndex, beat, beatWordCount);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="text-pink-500 mr-3" size={48} />
            <h1 className="text-5xl font-bold text-gray-800">Romance Novel Plotter</h1>
            <Heart className="text-pink-500 ml-3" size={48} />
          </div>
          <p className="text-xl text-gray-600">Create your perfect romance novel outline using proven story beats</p>
        </div>

        {!selectedSubgenre && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="text-pink-500 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">Step 1: Choose Your Subgenre</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topSubgenres.map(subgenre => (
                <button
                  key={subgenre.id}
                  onClick={() => setSelectedSubgenre(subgenre.id)}
                  className="p-6 border-2 border-pink-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all text-left"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{subgenre.name}</h3>
                  <p className="text-gray-600">{subgenre.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedSubgenre === 'historical' && !selectedEra && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Sparkles className="text-pink-500 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">Step 2: Choose Your Historical Era</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {historicalEras.map(era => (
                <button
                  key={era.id}
                  onClick={() => setSelectedEra(era.id)}
                  className="p-6 border-2 border-purple-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{era.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{era.period}</p>
                  <p className="text-gray-600">{era.description}</p>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => setSelectedSubgenre('')}
                className="text-pink-500 hover:text-pink-700 font-semibold"
              >
                ← Back to Subgenres
              </button>
            </div>
          </div>
        )}

        {((selectedSubgenre === 'historical' && selectedEra) || (selectedSubgenre !== 'historical' && selectedSubgenre)) && !selectedMaleTrope && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <User className="text-pink-500 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedSubgenre === 'historical' ? 'Step 3: Choose Your Hero Trope' : 'Step 2: Choose Your Hero Trope'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentMaleTropes.map(trope => (
                <button
                  key={trope.id}
                  onClick={() => setSelectedMaleTrope(trope.id)}
                  className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{trope.name}</h3>
                  <p className="text-gray-600">{trope.description}</p>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => selectedSubgenre === 'historical' ? setSelectedEra('') : setSelectedSubgenre('')}
                className="text-pink-500 hover:text-pink-700 font-semibold"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {selectedMaleTrope && !selectedFemaleTrope && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <User className="text-pink-500 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedSubgenre === 'historical' ? 'Step 4: Choose Your Heroine Trope' : 'Step 3: Choose Your Heroine Trope'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentFemaleTropes.map(trope => (
                <button
                  key={trope.id}
                  onClick={() => setSelectedFemaleTrope(trope.id)}
                  className="p-6 border-2 border-rose-200 rounded-xl hover:border-rose-500 hover:bg-rose-50 transition-all text-left"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{trope.name}</h3>
                  <p className="text-gray-600">{trope.description}</p>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => setSelectedMaleTrope('')}
                className="text-pink-500 hover:text-pink-700 font-semibold"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {selectedFemaleTrope && !secondaryComplete && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <User className="text-pink-500 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedSubgenre === 'historical' ? 'Step 5: Choose Secondary Characters (0-5)' : 'Step 4: Choose Secondary Characters (0-5)'}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">Select up to 5 secondary character tropes to enrich your story</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {secondaryCharacterTropes.map(trope => (
                <button
                  key={trope.id}
                  onClick={() => toggleSecondaryCharacter(trope.id)}
                  className={`p-6 border-2 rounded-xl transition-all text-left ${
                    selectedSecondaryCharacters.includes(trope.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                  } ${selectedSecondaryCharacters.length >= 5 && !selectedSecondaryCharacters.includes(trope.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={selectedSecondaryCharacters.length >= 5 && !selectedSecondaryCharacters.includes(trope.id)}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{trope.name}</h3>
                  <p className="text-gray-600">{trope.description}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setSelectedFemaleTrope('')}
                className="text-pink-500 hover:text-pink-700 font-semibold"
              >
                ← Back
              </button>
              <button
                onClick={() => setSecondaryComplete(true)}
                className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition-colors font-bold"
              >
                Continue ({selectedSecondaryCharacters.length} selected)
              </button>
            </div>
          </div>
        )}

        {secondaryComplete && !selectedPlotTrope && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Heart className="text-pink-500 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedSubgenre === 'historical' ? 'Step 6: Choose Your Plot Trope' : 'Step 5: Choose Your Plot Trope'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plotTropes.map(trope => (
                <button
                  key={trope.id}
                  onClick={() => setSelectedPlotTrope(trope.id)}
                  className="p-6 border-2 border-pink-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all text-left"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{trope.name}</h3>
                  <p className="text-gray-600">{trope.description}</p>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => setSecondaryComplete(false)}
                className="text-pink-500 hover:text-pink-700 font-semibold"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {selectedPlotTrope && !selectedSpiceLevel && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Sparkles className="text-pink-500 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedSubgenre === 'historical' ? 'Step 7: Choose Your Spice Level' : 'Step 6: Choose Your Spice Level'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {spiceLevels.map(level => (
                <button
                  key={level.id}
                  onClick={() => setSelectedSpiceLevel(level.id)}
                  className="p-6 border-2 border-red-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all text-center"
                >
                  <div className="text-4xl mb-3">{level.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{level.name}</h3>
                  <p className="text-gray-600">{level.description}</p>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => setSelectedPlotTrope('')}
                className="text-pink-500 hover:text-pink-700 font-semibold"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {selectedSpiceLevel && !selectedLength && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="text-pink-500 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedSubgenre === 'historical' ? 'Step 8: Choose Your Novel Length' : 'Step 7: Choose Your Novel Length'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {novelLengths.map(length => (
                <button
                  key={length.id}
                  onClick={() => setSelectedLength(length.id)}
                  className="p-6 border-2 border-purple-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{length.name}</h3>
                  <p className="text-gray-600">{length.description}</p>
                  <p className="text-sm text-gray-500 mt-2">{length.chapters} chapters</p>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => setSelectedSpiceLevel('')}
                className="text-pink-500 hover:text-pink-700 font-semibold"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {selectedLength && !plotApproved && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Plot Outline</h2>
              <p className="text-xl text-gray-600">
                {currentSubgenre.name}
                {currentEra && ` - ${currentEra.name}`}
              </p>
              <p className="text-lg text-gray-500 mt-2">
                {heroName} & {heroineName}
              </p>
            </div>

            <div className="mb-8 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Story Summary</h3>
              <p className="text-gray-700 leading-relaxed">
                A {spiceLevels.find(s => s.id === selectedSpiceLevel)?.name.toLowerCase()} {currentSubgenre.name.toLowerCase()} 
                {currentEra && ` set in the ${currentEra.name}`} featuring {plotTropes.find(t => t.id === selectedPlotTrope)?.name.toLowerCase()}.
                {' '}{heroineName} ({currentFemaleTropes.find(t => t.id === selectedFemaleTrope)?.name}) meets {heroName} ({currentMaleTropes.find(t => t.id === selectedMaleTrope)?.name}) 
                and their journey unfolds across {novelLengths.find(l => l.id === selectedLength)?.chapters} chapters 
                ({novelLengths.find(l => l.id === selectedLength)?.description}).
              </p>
              {selectedSecondaryCharacters.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-bold text-gray-800 mb-2">Supporting Cast:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedSecondaryCharacters.map(charId => {
                      const char = secondaryCharacterTropes.find(t => t.id === charId);
                      return (
                        <li key={charId}>
                          {secondaryNames[charId]} - {char.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">The 11 Romance Beats</h3>
              
              <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Beat 1: The Hook (0-10%)</h4>
                <p className="text-gray-700 mb-2">
                  Introduce {heroineName} in her world. Show what she wants, what she needs (though she may not know it yet), 
                  and hint at the wound or belief that will need to heal for her happily ever after.
                </p>
                <p className="text-gray-700">
                  As {currentFemaleTropes.find(t => t.id === selectedFemaleTrope)?.name.toLowerCase()}, 
                  she is {currentFemaleTropes.find(t => t.id === selectedFemaleTrope)?.description.toLowerCase()}. 
                  {currentEra && ` In the ${currentEra.name}, her options and obstacles are shaped by social conventions.`}
                  {selectedSecondaryCharacters.includes('best-friend') && ` Her confidant ${secondaryNames['best-friend']} provides support and perspective.`}
                  {selectedSecondaryCharacters.includes('parent') && ` ${secondaryNames.parent} has expectations that create pressure.`}
                  End this section with the inciting incident that will change everything.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Beat 2: The Meet Cute (10%)</h4>
                <p className="text-gray-700 mb-2">
                  {heroineName} and {heroName} meet in a memorable, significant way. First impressions are made—and they're often wrong.
                </p>
                <p className="text-gray-700">
                  {heroName}, as {currentMaleTropes.find(t => t.id === selectedMaleTrope)?.name.toLowerCase()}, 
                  is {currentMaleTropes.find(t => t.id === selectedMaleTrope)?.description.toLowerCase()}. 
                  The chemistry is immediate, whether it manifests as attraction, antagonism, or both. 
                  {plotTropes.find(t => t.id === selectedPlotTrope)?.id === 'enemies-to-lovers' && ' They clash immediately, each representing what the other dislikes most.'}
                  {plotTropes.find(t => t.id === selectedPlotTrope)?.id === 'forced-proximity' && ' Circumstances trap them together against their will.'}
                  {plotTropes.find(t => t.id === selectedPlotTrope)?.id === 'fake-relationship' && ' They strike a bargain that benefits them both—in theory.'}
                  {plotTropes.find(t => t.id === selectedPlotTrope)?.id === 'second-chance' && ' They reunite after years apart, old feelings and hurts resurface.'}
                  {selectedSecondaryCharacters.includes('matchmaker') && ` ${secondaryNames.matchmaker} orchestrates or observes this meeting with satisfaction.`}
                </p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-50 p-4 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Beat 3: The Resistance (10-25%)</h4>
                <p className="text-gray-700 mb-2">
                  Both characters have excellent reasons why they can't or shouldn't be together. 
                  They resist the growing attraction while being forced into proximity.
                </p>
                <p className="text-gray-700">
                  Internal obstacles: {heroineName}'s fears or wounds vs {heroName}'s baggage. 
                  External obstacles: social class differences, family expectations, existing commitments, or {currentEra && `the rigid rules of ${currentEra.name} society`}.
                  {selectedSecondaryCharacters.includes('rival') && ` ${secondaryNames.rival} competes for one character's affection, complicating matters.`}
                  {selectedSecondaryCharacters.includes('villain') && ` ${secondaryNames.villain} actively works to keep them apart.`}
                  Yet despite their resistance, they're drawn together again and again. Banter, tension, and undeniable chemistry build.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Beat 4: The Acceptance (25%)</h4>
                <p className="text-gray-700 mb-2">
                  A pivotal moment where one or both characters acknowledge that fighting the attraction is futile. 
                  They decide to explore the possibility of "us."
                </p>
                <p className="text-gray-700">
                  This might be after {heroName} shows unexpected vulnerability, or {heroineName} sees past his facade to his true character. 
                  A moment of danger, kindness, or honesty shifts their perspective. They agree to give this a chance, even if cautiously.
                  {selectedSecondaryCharacters.includes('mentor') && ` ${secondaryNames.mentor} may offer wisdom that helps one character see clearly.`}
                  The energy shifts from resistance to exploration.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Beat 5: The Deepening (25-40%)</h4>
                <p className="text-gray-700 mb-2">
                  They get to know each other on a deeper level. Walls come down. Secrets are shared. The relationship intensifies emotionally.
                </p>
                <p className="text-gray-700">
                  Show them learning each other's backstories, vulnerabilities, dreams, and fears. Include tender moments, intellectual connection, 
                  and growing physical attraction appropriate to your {spiceLevels.find(s => s.id === selectedSpiceLevel)?.name.toLowerCase()} level.
                  {selectedSecondaryCharacters.includes('childhood-friend') && ` ${secondaryNames['childhood-friend']} shares insights about the hero's past that help the heroine understand him.`}
                  {selectedSecondaryCharacters.includes('sibling') && ` ${secondaryNames.sibling} sees the relationship developing and has opinions.`}
                  But don't resolve the core conflict yet—hint at the deeper wounds that still need healing.
                </p>
              </div>

              <div className="border-l-4 border-pink-500 pl-4 bg-pink-50 p-4 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Beat 6: The Commitment (40-50%)</h4>
                <p className="text-gray-700 mb-2">
                  They make an emotional commitment to each other, even if they haven't said "I love you" yet. 
                  This is the "we're in this together" moment.
                </p>
                <p className="text-gray-700">
                  One or both confess deep feelings. They make promises or plans. There's a sense of "this is real" and "we can make this work."
                  {plotTropes.find(t => t.id === selectedPlotTrope)?.id === 'marriage-of-convenience' && ' What started as a practical arrangement has become genuine.'}
                  {plotTropes.find(t => t.id === selectedPlotTrope)?.id === 'fake-relationship' && ' The fake relationship has transformed into real emotions.'}
                  Include appropriate intimacy for your spice level. This is the point of no return emotionally.
                  {selectedSecondaryCharacters.includes('ex-lover') && ` ${secondaryNames['ex-lover']} returns, testing this new commitment.`}
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Beat 7: The Midpoint/First Intimacy (50%)</h4>
                <p className="text-gray-700 mb-2">
                  {heroineName} and {heroName} acknowledge their feelings and give in to their attraction. This is the emotional and 
                  {selectedSpiceLevel !== 'sweet' && ' physical'} turning point.
                </p>
                <p className="text-gray-700">
                  {selectedSpiceLevel === 'sweet' && 'A passionate first kiss or heartfelt confession of feelings marks this moment. The romance becomes undeniable.'}
                  {selectedSpiceLevel === 'warm' && 'They share their first kiss and intimate moments, though the bedroom door closes tactfully. The emotional connection deepens.'}
                  {selectedSpiceLevel === 'hot' && 'Their first intimate encounter is detailed enough to show the passion and connection. 2-3 scenes develop their physical relationship.'}
                  {selectedSpiceLevel === 'steamy' && 'Multiple explicit scenes show their growing passion. The physical intimacy reflects and deepens their emotional bond.'}
                  {selectedSpiceLevel === 'scorching' && 'Very explicit scenes throughout demonstrate their intense physical chemistry. The heat level stays high as their relationship evolves.'}
                  {' '}They shift from potential to actual lovers. They are "together" now, though obstacles remain.
                  {selectedSecondaryCharacters.includes('matchmaker') && ` ${secondaryNames?.matchmaker} is delighted to see progress.`}
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 p-4 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Beat 8: The Swoon (50-75%)</h4>
                <p className="text-gray-700 mb-2">
                  The honeymoon phase. {heroineName} and {heroName} explore their relationship, deepen their bond, and work as a team. 
                  This is the happiest section before the darkness.
                </p>
                <p className="text-gray-700">
                  They learn each other's secrets, support each other's goals, and build genuine trust. Include romantic and intimate moments appropriate to the 
                  {spiceLevels.find(s => s.id === selectedSpiceLevel)?.name.toLowerCase()} level. Show them navigating the challenges of the {currentEra ? currentEra.name : 'modern world'} together.
                  {selectedSecondaryCharacters.includes('servant') && ` ${secondaryNames?.servant} observes their happiness with knowing eyes.`}
                  {selectedSecondaryCharacters.includes('best-friend') && ` ${secondaryNames?.['best-friend']} rejoices in seeing them happy.`}
                  But plant seeds of the coming crisis. Unresolved conflicts, approaching deadlines, or gathering threats loom in the background.
                  {selectedSecondaryCharacters.includes('villain') && ` ${secondaryNames?.villain} prepares their attack.`}
                </p>
              </div>

              <div className="border-l-4 border-rose-500 pl-4 bg-rose-50 p-4 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Beat 9: The Black Moment (75%)</h4>
                <p className="text-gray-700 mb-2">
                  Everything falls apart. This is the darkest moment when it seems impossible that {heroineName} and {heroName} can overcome their obstacles.
                </p>
                <p className="text-gray-700">
                  <strong>The crisis:</strong> A devastating secret is revealed, a fundamental misunderstanding reaches its peak, or external forces tear them apart. 
                  {selectedSecondaryCharacters.includes('villain') && ` ${secondaryNames?.villain} strikes their decisive blow.`}
                  {selectedSecondaryCharacters.includes('ex-lover') && ` ${secondaryNames?.['ex-lover']}'s interference creates maximum damage.`}
                  {selectedSecondaryCharacters.includes('parent') && ` ${secondaryNames?.parent} may force an ultimatum.`}
                  The relationship appears doomed. One or both make a painful sacrifice or face a devastating truth about themselves. 
                  {currentEra && `In the context of the ${currentEra.name}, social pressures, family obligations, or external dangers may force them apart.`}
                  This moment should feel genuinely insurmountable within the {plotTropes.find(t => t.id === selectedPlotTrope)?.name.toLowerCase()} framework.
                </p>
              </div>

              <div className="border-l-4 border-teal-500 pl-4 bg-teal-50 p-4 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Beat 10: The Grovel/Grand Gesture (80-85%)</h4>
                <p className="text-gray-700 mb-2">
                  One character (usually {heroName} as {currentMaleTropes.find(t => t.id === selectedMaleTrope)?.name.toLowerCase()}) 
                  realizes their mistake and fights to win back the other.
                </p>
                <p className="text-gray-700">
                  This requires vulnerability, sacrifice, and a grand gesture that proves their love is real and worth fighting for. They must address the core issue 
                  that drove them apart—whether it's fear of vulnerability, miscommunication, conflicting values, or external pressures. 
                  {selectedSecondaryCharacters.includes('mentor') && ` ${secondaryNames?.mentor} may offer crucial wisdom.`}
                  {selectedSecondaryCharacters.includes('best-friend') && ` ${secondaryNames?.['best-friend']} helps orchestrate or encourages the gesture.`}
                  {selectedSecondaryCharacters.includes('childhood-friend') && ` ${secondaryNames?.['childhood-friend']} provides key insight from the past.`}
                  The gesture should be specific to their relationship and meaningful within the context of the {currentEra ? currentEra.name : 'setting'}.
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4 bg-emerald-50 p-4 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Beat 11: The Happily Ever After (85-100%)</h4>
                <p className="text-gray-700 mb-2">
                  {heroineName} and {heroName} reunite and commit to their future together. All plot threads are resolved satisfyingly.
                </p>
                <p className="text-gray-700">
                  <strong>Resolution includes:</strong> Both characters have grown and changed through their journey. They've overcome their internal obstacles 
                  and external conflicts. Show how their union will work within the constraints and opportunities of the {currentEra ? currentEra.name : 'setting'}.
                  {selectedSecondaryCharacters.includes('villain') && ` ${secondaryNames?.villain} is defeated or rendered powerless.`}
                  {selectedSecondaryCharacters.includes('rival') && ` ${secondaryNames?.rival} accepts defeat gracefully or finds their own happiness.`}
                  {selectedSecondaryCharacters.includes('parent') && ` ${secondaryNames?.parent} gives their blessing or is reconciled with the couple.`}
                  {selectedSecondaryCharacters.includes('sibling') && ` ${secondaryNames?.sibling} celebrates their happiness.`}
                  End with a final scene that affirms their love and shows their life together beginning—whether that's a wedding, a promise, or simply 
                  a quiet moment that says "forever." The tone should match the {currentSubgenre.name.toLowerCase()} genre expectations. 
                  {selectedLength === 'series' && ' Plant seeds for the next book in the series while providing satisfaction for this couple.'}
                  Target approximately {novelLengths.find(l => l.id === selectedLength)?.description.split('-')[0].trim()} for this {novelLengths.find(l => l.id === selectedLength)?.name.toLowerCase()}.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Review Your Plot Outline</h3>
              <p className="text-gray-700 mb-4">
                Does this plot outline work for your story? Once you approve it, we'll generate a detailed chapter-by-chapter outline 
                with scenes and beats for each chapter.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setPlotApproved(true);
                    generateChapterOutline();
                  }}
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  Approve & Generate Chapter Outline
                </button>
                <button
                  onClick={() => setSelectedLength('')}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <X size={20} />
                  Revise Choices
                </button>
              </div>
            </div>
          </div>
        )}

        {plotApproved && chapterOutline && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Floating Manuscript Panel */}
            {manuscriptText && (
              <div className="fixed bottom-6 right-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-4 max-w-sm z-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">📖 Your Manuscript</h3>
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">
                    {manuscriptText.split(/\s+/).filter(w => w.length > 0).length.toLocaleString()} words
                  </span>
                </div>
                <p className="text-sm mb-3 opacity-90">
                  {manuscriptText.split('\n\n').filter(line => line.includes('Beat')).length} sections added
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(manuscriptText);
                    alert('Manuscript copied to clipboard! Paste it into a text editor and save as a .txt file.');
                  }}
                  className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-bold mb-2"
                >
                  📋 Copy Full Manuscript
                </button>
                <button
                  onClick={() => {
                    const modal = document.getElementById('manuscript-modal');
                    if (modal) modal.style.display = 'flex';
                  }}
                  className="w-full bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors font-semibold text-sm"
                >
                  👁️ View Full Text
                </button>
              </div>
            )}

            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Detailed Chapter Outline</h2>
              <p className="text-xl text-gray-600">
                {chapterOutline.length} Chapters • {novelLengths.find(l => l.id === selectedLength)?.description}
              </p>
              
              {/* Progress Summary */}
              {Object.keys(generatedProse).length > 0 && (
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">📊 Generation Progress</h3>
                  <div className="flex gap-6 justify-center text-sm flex-wrap">
                    <div>
                      <span className="font-semibold">Beats Generated:</span>{' '}
                      <span className="text-purple-700">{Object.keys(generatedProse).length}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Total Words Generated:</span>{' '}
                      <span className="text-purple-700">
                        {Object.values(generatedProse)
                          .reduce((sum, prose) => sum + prose.split(/\s+/).filter(w => w.length > 0).length, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Manuscript Words:</span>{' '}
                      <span className="text-purple-700">
                        {manuscriptText.split(/\s+/).filter(w => w.length > 0).length.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {manuscriptText && (
                    <div className="mt-3 text-center">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(manuscriptText);
                          alert('Manuscript copied to clipboard! Open a text editor (like Notepad), paste (Ctrl+V), and save the file.');
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-bold text-base shadow-lg"
                      >
                        📋 Copy Full Manuscript to Clipboard
                      </button>
                      <p className="text-xs text-gray-600 mt-2">Click to copy, then paste into a text editor and save as .txt</p>
                    </div>
                  )}
                </div>
              )}
              
              {Object.keys(generatedProse).length === 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    💡 <span className="font-semibold">How it works:</span> Generate prose for any beat, then click 
                    "➕ Add to Manuscript" to add it to your growing novel. Once you've added your scenes, 
                    click "📋 Copy Full Manuscript" to copy the text, then paste into a text editor and save!
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {chapterOutline.map((chapter, chapterIndex) => {
                // Check if this chapter has any generated prose
                const hasGeneratedProse = chapter.scenes.some((scene, sceneIndex) => 
                  scene.beats.some((beat, beatIndex) => 
                    generatedProse[`${chapterIndex}-${sceneIndex}-${beatIndex}`]
                  )
                );

                return (
                  <div key={chapterIndex} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleChapter(chapterIndex)}
                      className="w-full p-6 bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {expandedChapters[chapterIndex] ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                          <div className="text-left">
                            <h3 className="text-xl font-bold text-gray-800">Chapter {chapter.number}: {chapter.title}</h3>
                            <p className="text-sm text-gray-600">{chapter.beat} • {chapter.percentage} • ~{chapter.wordCount.toLocaleString()} words</p>
                          </div>
                        </div>
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          {!hasGeneratedProse && (
                            <button
                              onClick={() => generateAllBeatsInChapter(chapterIndex)}
                              disabled={generatingBeat !== null}
                              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-semibold disabled:bg-gray-400"
                            >
                              ⚡ Generate All
                            </button>
                          )}
                          {hasGeneratedProse && (
                            <button
                              onClick={() => {
                                const chapterText = exportChapterProse(chapterIndex);
                                downloadProse(chapterText, `Chapter_${chapter.number}_${chapter.title.replace(/\s+/g, '_')}.txt`);
                              }}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
                            >
                              💾 Export
                            </button>
                          )}
                        </div>
                      </div>
                    </button>

                  {expandedChapters[chapterIndex] && (
                    <div className="p-6 bg-white space-y-4">
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">Chapter Summary</h4>
                        <p className="text-gray-700">
                          This chapter is part of {chapter.beat}, occurring at approximately {chapter.percentage} through the story.
                          Target word count: ~{chapter.wordCount.toLocaleString()} words across {chapter.scenes.length} scenes.
                        </p>
                      </div>

                      {chapter.scenes.map((scene, sceneIndex) => (
                        <div key={sceneIndex} className="border-l-4 border-pink-500 pl-4">
                          <button
                            onClick={() => toggleScene(chapterIndex, sceneIndex)}
                            className="w-full text-left p-4 bg-pink-50 hover:bg-pink-100 rounded-r-lg transition-colors flex items-center justify-between"
                          >
                            <div>
                              <h5 className="font-bold text-gray-800 flex items-center gap-2">
                                {expandedScenes[`${chapterIndex}-${sceneIndex}`] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                Scene {sceneIndex + 1}: {scene.title}
                              </h5>
                              <p className="text-sm text-gray-600 ml-7">~{scene.wordCount.toLocaleString()} words • {scene.beats.length} beats</p>
                            </div>
                          </button>

                          {expandedScenes[`${chapterIndex}-${sceneIndex}`] && (
                            <div className="mt-2 ml-4 p-4 bg-white rounded-lg border border-pink-200">
                              <h6 className="font-bold text-gray-800 mb-3">Scene Beats & Writing Prompts:</h6>
                              <div className="space-y-4">
                                {scene.beats.map((beat, beatIndex) => {
                                  const beatKey = `${chapterIndex}-${sceneIndex}-${beatIndex}`;
                                  const isGenerating = generatingBeat === beatKey;
                                  const hasProse = generatedProse[beatKey];
                                  // Calculate target word count for this beat
                                  const beatWordCount = Math.floor(scene.wordCount / scene.beats.length);
                                  
                                  return (
                                    <div key={beatIndex} className="border-l-2 border-purple-300 pl-3 py-2">
                                      <div className="flex items-start gap-2 mb-2">
                                        <span className="text-pink-500 font-bold flex-shrink-0">Beat {beatIndex + 1}:</span>
                                        <span className="text-gray-800 font-semibold flex-1">
                                          {typeof beat === 'object' ? beat.beat : beat}
                                        </span>
                                      </div>
                                      {typeof beat === 'object' && beat.prompt && (
                                        <div className="ml-7 mt-2 space-y-3">
                                          <div className="p-3 bg-purple-50 rounded border border-purple-200">
                                            <p className="text-sm font-semibold text-purple-900 mb-2">AI Writing Prompt:</p>
                                            <p className="text-sm text-gray-700 leading-relaxed italic">
                                              {beat.prompt}
                                            </p>
                                          </div>
                                          
                                          <div className="flex items-center gap-3">
                                            <button
                                              onClick={() => generateBeatProse(chapterIndex, sceneIndex, beatIndex, beat, beatWordCount)}
                                              disabled={isGenerating}
                                              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                                                isGenerating
                                                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                                              }`}
                                            >
                                              {isGenerating ? (
                                                <span className="flex items-center gap-2">
                                                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                  </svg>
                                                  Generating...
                                                </span>
                                              ) : hasProse ? (
                                                '🔄 Regenerate Prose'
                                              ) : (
                                                '✨ Generate Prose'
                                              )}
                                            </button>
                                            <span className="text-sm text-gray-600">
                                              Target: ~{beatWordCount.toLocaleString()} words
                                            </span>
                                          </div>

                                          {hasProse && (
                                            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
                                              <div className="flex items-center justify-between mb-3">
                                                <h6 className="font-bold text-green-900">Generated Prose:</h6>
                                                <div className="flex gap-2">
                                                  <button
                                                    onClick={() => copyProseToClipboard(hasProse)}
                                                    className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                                  >
                                                    📋 Copy
                                                  </button>
                                                  {!checkIfInManuscript(chapterIndex, sceneIndex, beatIndex) ? (
                                                    <button
                                                      onClick={() => addProseToManuscript(chapterIndex, sceneIndex, beatIndex)}
                                                      className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
                                                    >
                                                      ➕ Add to Manuscript
                                                    </button>
                                                  ) : (
                                                    <span className="text-sm px-3 py-1 bg-green-600 text-white rounded flex items-center gap-1">
                                                      ✓ Added to Manuscript
                                                    </span>
                                                  )}
                                                </div>
                                              </div>
                                              <div className="prose prose-sm max-w-none">
                                                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
                                                  {hasProse}
                                                </p>
                                              </div>
                                              <div className="mt-3 text-sm text-gray-600 italic">
                                                Word count: {hasProse.split(/\s+/).filter(w => w.length > 0).length} words
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            </div>

            <div className="mt-8 p-6 bg-green-50 border-2 border-green-300 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Your Outline is Ready!</h3>
              <p className="text-gray-700 mb-4">
                You now have a complete chapter-by-chapter outline with scenes and beats for your {novelLengths.find(l => l.id === selectedLength)?.description} romance novel.
                Click "Generate Prose" on individual beats to have AI write the scenes, or use this as your roadmap to write your story!
              </p>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => {
                    const allProse = exportAllProse();
                    if (allProse.includes('[Beat')) {
                      downloadProse(allProse, `${heroName.replace(/\s+/g, '_')}_and_${heroineName.replace(/\s+/g, '_')}_Novel.txt`);
                    } else {
                      alert('No prose has been generated yet. Generate some beats first!');
                    }
                  }}
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-bold"
                >
                  📥 Export All Generated Prose
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-bold"
                >
                  🖨️ Print Outline
                </button>
                <button
                  onClick={() => {
                    setSelectedSubgenre('');
                    setSelectedEra('');
                    setSelectedMaleTrope('');
                    setSelectedFemaleTrope('');
                    setSelectedSecondaryCharacters([]);
                    setSecondaryComplete(false);
                    setSelectedPlotTrope('');
                    setSelectedSpiceLevel('');
                    setSelectedLength('');
                    setPlotApproved(false);
                    setChapterOutline(null);
                    setExpandedChapters({});
                    setExpandedScenes({});
                    setGeneratedProse({});
                    setGeneratingBeat(null);
                    setManuscriptText('');
                  }}
                  className="flex-1 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-bold"
                >
                  ✨ Create Another Novel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manuscript Viewer Modal */}
        {manuscriptText && (
          <div
            id="manuscript-modal"
            style={{ display: 'none' }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target.id === 'manuscript-modal') {
                e.target.style.display = 'none';
              }
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">📖 Full Manuscript</h2>
                <button
                  onClick={() => {
                    const modal = document.getElementById('manuscript-modal');
                    if (modal) modal.style.display = 'none';
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="mb-4 flex gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(manuscriptText);
                      alert('Manuscript copied to clipboard!');
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    📋 Copy All Text
                  </button>
                  <button
                    onClick={() => {
                      const textarea = document.getElementById('manuscript-textarea');
                      if (textarea) {
                        textarea.select();
                        document.execCommand('copy');
                        alert('Manuscript copied!');
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Select All & Copy
                  </button>
                </div>
                
                <textarea
                  id="manuscript-textarea"
                  readOnly
                  value={manuscriptText}
                  className="w-full h-96 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm"
                  style={{ fontFamily: 'monospace' }}
                />
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">💡 To save this file:</span>
                  </p>
                  <ol className="text-sm text-gray-700 mt-2 ml-4 list-decimal">
                    <li>Click "Copy All Text" or "Select All & Copy"</li>
                    <li>Open Notepad (Windows) or TextEdit (Mac)</li>
                    <li>Paste the text (Ctrl+V or Cmd+V)</li>
                    <li>Save as: <code className="bg-gray-200 px-1 rounded">{heroName.replace(/\s+/g, '_')}_{heroineName.replace(/\s+/g, '_')}_Manuscript.txt</code></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RomanceNovelWriter;
