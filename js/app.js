/* ====================================================
RESETS
=====================================================*/


/* ====================================================
MENU
=====================================================*/
// Selectors
const genMedNumButton = document.querySelector(".button_genMedNum");
const genPassButton = document.querySelector(".button_genPass");
const genTestPatButton = document.querySelector(".button_genTestPat");
const medAppComponent = document.querySelector(".med-app");
const passComponent = document.querySelector(".pass-app");
const testPatComponent = document.querySelector(".test-pat-app");

// Event Listeners
genMedNumButton.addEventListener("click", displayGenMedNumApp);
genPassButton.addEventListener("click", displayPassApp);
genTestPatButton.addEventListener("click", displayTestPatApp);

// Event Handlers
function displayGenMedNumApp() {
  resetPassApp();
  resetGenTestPatApp();
  medAppComponent.style.display = "block";
  genMedNumButton.classList.add("menu__button--active");
  genPassButton.classList.remove("menu__button--active");
  genTestPatButton.classList.remove("menu__button--active");
}

function displayPassApp() {
  resetGenMedApp();
  resetGenTestPatApp();
  genMedNumButton.classList.remove("menu__button--active");
  passComponent.style.display = "block";
  genPassButton.classList.add("menu__button--active");
  genTestPatButton.classList.remove("menu__button--active");
}

function displayTestPatApp() {
  resetGenMedApp();
  resetPassApp();
  genMedNumButton.classList.remove("menu__button--active");
  genPassButton.classList.remove("menu__button--active");
  testPatComponent.style.display = "block";
  genTestPatButton.classList.add("menu__button--active");
}

  
  
/* ====================================================
GENERATE MEDICARE NUMBERS APP
=====================================================*/
// Selectors
const medAppQuantity = document.querySelector(".app__qty-selection-input");
const medAppGenerateButton = document.querySelector(
  ".app__qty-selection-generate"
);
const medAppDataContainer = document.querySelector(".med-app__data");

// Event Listeners
medAppGenerateButton.addEventListener("click", generateMedicareNumbers);
    
// Event Handlers
function generateMedicareNumbers() {
  medAppDataContainer.innerHTML = "";
  const quantity = medAppQuantity.value;
  if (quantity < 1 || quantity > 100) {
    window.alert("JS ERROR: The number has to be between 1 and 100. Try again.");
    medAppQuantity.value = "";
    medAppDataContainer.style.display = "none";
    return;
  }
  medAppDataContainer.style.display = "block";
  for (let index = 0; index < quantity; index++) {
    const newP = document.createElement("p");
    const node = document.createTextNode(
      index + 1 + ") " + randomMedicareNumber()
      );
      newP.appendChild(node);
      newP.className = "med-app__data-string";
      medAppDataContainer.appendChild(newP);
  }  
}

// Functions
function randomMedicareNumber() {
  let sum = Math.floor(Math.random() * 5) + 2;
  const weights = [1, 3, 7, 9, 1, 3, 7, 9];
  let num = [sum];
  for (let i = 0; i < 7; i++) {
    let n = Math.floor(Math.random() * 10);
    sum += n * weights[i + 1];
    num.push(n);
  }
  num.push(sum % 10);
  return num.join("") + "1-1";
}

function resetGenMedApp() {
  medAppComponent.style.display = "none";
  medAppDataContainer.style.display = "none";
  medAppDataContainer.innerHTML = "";
  medAppQuantity.value = "";
}



/* ====================================================
GENERATE PASSWORD APP
=====================================================*/
//Data
const smallCapsArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const capsArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const numbersArray = ["0","1","2","3","4","5","6","7","8","9"];
const specialArray = ["~","`","!","@","#","$","%","^","&","*","(",")","-","+","=","[","{","]","}",";",":",",","<",".",">","?"];
let passwordArray = [];

// Selectors
const numCharacters = document.querySelector(".pass-app__qty-selection-input");
const passAppGenerateButton = document.querySelector(
  ".pass-app__qty-selection-generate");
const passAppDataContainer = document.querySelector(".pass-app__data");
const smallCapsCheck = document.querySelector("#smallCaps");
const capsCheck = document.querySelector("#caps");
const numbersCheck = document.querySelector("#numbers");
const specialCheck = document.querySelector("#special");

// Event Listeners
passAppGenerateButton.addEventListener("click", generatePassword);

// Event Handlers
function generatePassword() {
  passAppDataContainer.innerHTML = "";
  if(validateCheckboxes() === false) {
    window.alert("JS ERROR: You need to select at least one character type to include in your password. Try again.");
    passAppDataContainer.style.display = "none";
    return;
  }
  const characters = numCharacters.value;
  if (characters < 1 || characters > 32) {
    window.alert("JS ERROR: The number of characters has to be between 1 and 32. Try again.");
    numCharacters.value = "";
    passAppDataContainer.style.display = "none";
    return;
  }
  passAppDataContainer.style.display = "block";
  assemblePasswordArray();
  let password = "";
  for (let index = 0; index < characters; index++) {
    password += passwordArray[getRandomInteger(1,passwordArray.length)];
  }
  const newP = document.createElement("p");
  const node = document.createTextNode(password);
  newP.appendChild(node);
  newP.className = "pass-app__data-string";
  passAppDataContainer.appendChild(newP);
  passwordArray = [];
}

// Functions
function assemblePasswordArray() {
  if (smallCapsCheck.checked) {
    smallCapsArray.forEach(element => {
      passwordArray.push(element);
    });
  }
  if (capsCheck.checked) {
    capsArray.forEach(element => {
      passwordArray.push(element);
    });
  }
  if (numbersCheck.checked) {
    numbersArray.forEach(element => {
      passwordArray.push(element);
    });
  }
  if (specialCheck.checked) {
    specialArray.forEach(element => {
      passwordArray.push(element);
    });
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function validateCheckboxes () {
  if (
    smallCapsCheck.checked === false &&
    capsCheck.checked === false &&
    numbersCheck.checked === false &&
    specialCheck.checked === false
  ) {
    return false;
  }
}

function resetPassApp() {
  passComponent.style.display = "none";
  passAppDataContainer.style.display = "none";
  passAppDataContainer.innerHTML = "";
  numCharacters.value = "";
  resetCheckboxes();
}

function resetCheckboxes() {
  smallCapsCheck.checked = true;
  capsCheck.checked = true;
  numbersCheck.checked = true;
  specialCheck.checked = true;
}



/* ====================================================
GENERATE PATIENT APP
=====================================================*/
//Data
const maleNames = ["Aaron", "Abe", "Abraham", "Adam", "Adler", "Adley", "Aedus", "Aiden", "Alan", "Albern", "Alexander", "Alfred", "Alvin", "Ambrose", "Amery", "Amos", "Andrew", "Angus", "Ansel", "Ariel", "Arnold", "Arthur", "Arvel", "Aryeh", "Asher", "Atwood", "Aubrey", "Austin", "Axel", "Azriel", "Baird", "Barclay", "Barin", "Barnaby", "Barnett", "Baruch", "Beau", "Benedict", "Benjamin", "Benton", "Berel", "Berwin", "Blake", "Boone", "Boris", "Brendan", "Caleb", "Calev", "Cameron", "Cayden", "Cedric", "Chanan", "Chaniel", "Cody", "Colin", "Colm", "Connor", "Conrad", "Conway", "Cormac", "Corwin", "Craig", "Crispin", "Daniel", "Darragh", "Dietrich", "Doron", "Dylan", "Ehud", "Eilad", "Eli", "Eliyahu", "Emanuel", "Emory", "Ethan", "Ewan", "Ezekiel", "Ezra", "Finn", "Frederick", "Gabriel", "Gad", "Garrett", "Gavriel", "Gideon", "Gil", "Grayson", "Harding", "Harvey", "Helmer", "Hirsch", "Hunter", "Indivar", "Isaiah", "Ivor", "Jack", "Jacob", "Jasper", "Jordan", "Joss", "Judah", "Jude", "Jules", "Justin", "Kalman", "Karamat", "Kasey", "Kasper", "Keane", "Kelly", "Kendal", "Kenzie", "Killian", "Kirk", "Kwan", "Leon", "Leonard", "Levi", "Liam", "Logan", "Lorcan", "Lowell", "Maddox", "Magnar", "Magnus", "Malachi", "Malcolm", "Marcus", "Marlon", "Matthew", "Max", "Maximus", "Medad", "Meir", "Melville", "Mendel", "Mica", "Micha", "Milo", "Morgan", "Moshe", "Murray", "Nathaniel", "Neal", "Neron", "Niall", "Nicholas", "Nika", "Nissim", "Noach", "Noah", "Noam", "Norris", "Olaf", "Oliver", "Orson", "Oscar", "Oswald", "Oswin", "Otis", "Ovadia", "Owen", "Padraig", "Phillip", "Phoenix", "Quentin", "Rafael", "Randolph", "Reese", "Reggie", "Remo", "Reuben", "Roderick", "Roman", "Ronan", "Rory", "Ryan", "Saul", "Sebastian", "Selig", "Seth", "Shaun", "Solomon", "Stephen", "Takeo", "Takeshi", "Thomas", "Tiger", "Timothy", "Tobias", "Uriel", "Valdus", "Velvel", "William", "Wyatt", "Yona", "Yoram", "Zachary", "Zane", "Zev"];
const countMaleNames = maleNames.length;
const femaleNames = ["Abby", "Ada", "Adele", "Agnes", "Alexa", "Amelia", "Angel", "Aurora", "Bambi", "Beatrice", "Blair", "Blake", "Bonita", "Brooke", "Bryony", "Buffy", "Cadence", "Callie", "Candy", "Cat", "Cece", "Celia", "Chanel", "Charis", "Charlize", "Chastity", "Clarise", "Daisy", "Dana", "Daphne", "Darcy", "Dede", "Delilah", "Delores", "Elina", "Eliza", "Ella", "Emelda", "Emmaline", "Erin", "Esme", "Evelyn", "Faith", "Felicity", "Fern", "Fleur", "Flora", "Florence", "Francesca", "Frankie", "Freya", "Gabriel", "Gaynor", "Gia", "Gillian", "Ginger", "Grace", "Gretchen", "Harmony", "Harper", "Harriet", "Hazel", "Heather", "Hester", "Hope", "Hyacinth", "Ida", "Imogen", "India", "Ines", "Isobel", "Ivy", "Jade", "Jamie", "Jasmine", "Jessa", "Juno", "Kara", "Karly", "Kayla", "Keira", "Kimberly", "Kora", "Kristen", "Kylie", "Lacey", "Laila", "Lara", "Laurie", "Lena", "Lenore", "Lexi", "Lilith", "Lilly", "Lola", "Mackenzie", "Macy", "Maddie", "Malory", "Margot", "Masie", "Meadow", "Melody", "Morgan", "Nala", "Nancy", "Naomi", "Nell", "Nora", "Octavia", "Olivia", "Opal", "Paige", "Patience", "Payton", "Peace", "Pearl", "Penny", "Phoenix", "Piper", "Pixie", "Poppy", "Primrose", "Prue", "Queenie", "Quinn", "Raine", "Ramona", "Raven", "Raya", "Regina", "Renata", "Renee", "River", "Rosa", "Rosemary", "Roxy", "Ruby", "Saffron", "Sahara", "Saige", "Samantha", "Sara", "Sasha", "Scarlett", "Selena", "September", "Serena", "Shelby", "Skye", "Sophia", "Star", "Suki", "Tabitha", "Tamsin", "Tara", "Tatum", "Taylor", "Teagan", "Tessa", "Tia", "Tori", "Trinity", "Trixy", "Uma", "Ursula", "Veda", "Velma", "Venus", "Vera", "Verity", "Veronica", "Violet", "Virginia", "Wallis", "Willa", "Willow", "Winona", "Winter", "Xandra", "Xena", "Xia", "Yazmin", "Yelena", "Yolanda", "Yvette", "Yvonne", "Zada", "Zaheera", "Zali", "Zara", "Zaya", "Zelda", "Zelina", "Zeva", "Zoe", "Zola", "Zora", "Zula", "Zuri"];
const countFemaleNames = femaleNames.length;
const familyNames = ["Abbott", "Adam", "Adams", "Adamson", "Aitken", "Alexander", "Ali", "Allan", "Allen", "Allison", "Amos", "Andersen", "Anderson", "Andrew", "Andrews", "Angus", "Anthony", "Archer", "Armstrong", "Arnold", "Arthur", "Ashton", "Atkins", "Atkinson", "Austin", "Avery", "Bailey", "Bain", "Baird", "Baker", "Baldwin", "Ball", "Ballard", "Banks", "Barber", "Barclay", "Barker", "Barlow", "Barnes", "Barnett", "Barr", "Barrett", "Barry", "Bartlett", "Barton", "Bassett", "Bateman", "Bates", "Baxter", "Beard", "Beasley", "Beattie", "Beaumont", "Beck", "Beer", "Bell", "Bennett", "Benson", "Bentley", "Berry", "Best", "Betts", "Beveridge", "Birch", "Bird", "Bishop", "Black", "Blackburn", "Blair", "Blake", "Bloomfield", "Bolton", "Bond", "Booth", "Borg", "Bourke", "Bourne", "Bowden", "Bowen", "Bowman", "Boyce", "Boyd", "Boyle", "Bradford", "Bradley", "Bradshaw", "Brady", "Brand", "Bray", "Breen", "Brennan", "Brewer", "Briggs", "Bright", "Brook", "Brooks", "Brown", "Browne", "Browning", "Bruce", "Bryan", "Bryant", "Buchanan", "Buckley", "Bull", "Burgess", "Burke", "Burnett", "Burns", "Burrows", "Burt", "Burton", "Bush", "Butcher", "Butler", "Byrne", "Byrnes", "Cahill", "Cain", "Cairns", "Caldwell", "Callaghan", "Cameron", "Camilleri", "Campbell", "Cannon", "Carey", "Carmichael", "Carmody", "Carpenter", "Carr", "Carroll", "Carson", "Carter", "Cartwright", "Casey", "Cassidy", "Castle", "Cavanagh", "Chalmers", "Chamberlain", "Chambers", "Chan", "Chandler", "Chang", "Chapman", "Charles", "Charlton", "Chen", "Cheng", "Cheung", "Chong", "Christensen", "Christian", "Christie", "Chung", "Clancy", "Clark", "Clarke", "Clayton", "Cleary", "Clements", "Clifford", "Clifton", "Close", "Coates", "Cochrane", "Coffey", "Cohen", "Cole", "Coleman", "Coles", "Collier", "Collins", "Condon", "Connell", "Connolly", "Connor", "Conroy", "Conway", "Cook", "Cooke", "Cooper", "Corbett", "Corcoran", "Cornish", "Costello", "Cousins", "Cowan", "Cox", "Craig", "Crane", "Crawford", "Croft", "Crook", "Cross", "Crouch", "Crowe", "Crowley", "Cullen", "Cumming", "Cummings", "Cummins", "Cunningham", "Curran", "Currie", "Curtis", "Dale", "Daley", "Dalton", "Daly", "Daniel", "Daniels", "Davey", "David", "Davidson", "Davies", "Davis", "Davison", "Dawes", "Dawson", "Day", "de Silva", "Dean", "Delaney", "Dempsey", "Dennis", "Dent", "Devine", "Dick", "Dickinson", "Dickson", "Dillon", "Dixon", "Dobson", "Dodd", "Dodds", "Doherty", "Donald", "Donaldson", "Donnelly", "Donovan", "Douglas", "Dowling", "Downes", "Doyle", "Drake", "Draper", "Drew", "Drummond", "Duff", "Duffy", "Duggan", "Duncan", "Dunlop", "Dunn", "Dunne", "Dunstan", "Dwyer", "Dyer", "Dyson", "Eaton", "Eddy", "Edmonds", "Edwards", "Egan", "Eldridge", "Elliott", "Ellis", "Emery", "English", "Evans", "Everett", "Farmer", "Farrell", "Farrugia", "Faulkner", "Fenton", "Ferguson", "Fernandez", "Fernando", "Ferris", "Field", "Finch", "Findlay", "Finlay", "Finn", "Firth", "Fischer", "Fisher", "FitzGerald", "FitzPatrick", "Flanagan", "Fleming", "Fletcher", "Flynn", "Fogarty", "Foley", "Forbes", "Ford", "Forrest", "Forster", "Forsyth", "Foster", "Fowler", "Fox", "Francis", "Franklin", "Fraser", "Freeman", "French", "Frost", "Fry", "Fuller", "Fulton", "Gale", "Galea", "Gallagher", "Gardiner", "Gardner", "Garner", "Garrett", "Gates", "Gee", "George", "Gibbons", "Gibbs", "Gibson", "Gilbert", "Giles", "Gill", "Gillespie", "Gillies", "Gilmore", "Gilmour", "Gleeson", "Glover", "Goddard", "Godfrey", "Golding", "Goldsmith", "Goodman", "Goodwin", "Gordon", "Gorman", "Gough", "Gould", "Grace", "Graham", "Grant", "Gray", "Green", "Greenwood", "Gregory", "Greig", "Grey", "Griffin", "Griffiths", "Grigg", "Groves", "Gunn", "Guy", "Hackett", "Haines", "Hale", "Hall", "Hallam", "Halliday", "Hamilton", "Hammond", "Hancock", "Hanley", "Hanna", "Hansen", "Hanson", "Harding", "Hardy", "Hargreaves", "Harper", "Harrington", "Harris", "Harrison", "Hart", "Hartley", "Harvey", "Harwood", "Hawkins", "Hay", "Hayden", "Hayes", "Haynes", "Hayward", "Head", "Healey", "Healy", "Heath", "Heffernan", "Henderson", "Hennessy", "Henry", "Herbert", "Hetherington", "Hewitt", "Hickey", "Hicks", "Higgins", "Hill", "Hillier", "Hills", "Hilton", "Ho", "Hoare", "Hobbs", "Hobson", "Hocking", "Hodge", "Hodges", "Hodgson", "Hoffman", "Hoffmann", "Hogan", "Hogg", "Holden", "Holland", "Holloway", "Holmes", "Holt", "Hood", "Hooper", "Hope", "Hopkins", "Horne", "Horton", "Hosking", "Houghton", "Howard", "Howarth", "Howe", "Howell", "Huang", "Hudson", "Hughes", "Hull", "Humphrey", "Humphreys", "Humphries", "Hunt", "Hunter", "Hurley", "Hurst", "Hutchinson", "Hutchison", "Hutton", "Huynh", "Hyde", "Hyland", "Inglis", "Ingram", "Ireland", "Irvine", "Irving", "Irwin", "Jackson", "Jacobs", "James", "Jamieson", "Jansen", "Jarrett", "Jarvis", "Jeffery", "Jeffrey", "Jenkins", "Jennings", "Jensen", "John", "Johns", "Johnson", "Johnston", "Johnstone", "Jolly", "Jones", "Jordan", "Jorgensen", "Joseph", "Joyce", "Judd", "Kane", "Kaur", "Kavanagh", "Kay", "Keane", "Kearney", "Keating", "Keen", "Keenan", "Kelly", "Kemp", "Kendall", "Kennedy", "Kenny", "Kent", "Keogh", "Kerr", "Khan", "Kidd", "Kim", "King", "Kingston", "Kirby", "Kirk", "Knight", "Knowles", "Knox", "Koch", "Kruger", "Kumar", "Lacey", "Lai", "Lake", "Lam", "Lamb", "Lambert", "Lancaster", "Lane", "Lang", "Langford", "Larkin", "Larsen", "Lau", "Law", "Lawler", "Lawrence", "Lawson", "Le", "Leach", "Leahy", "Lee", "Lees", "Leonard", "Leong", "Leslie", "Lester", "Leung", "Lewis", "Li", "Lim", "Lin", "Lindsay", "Little", "Liu", "Lloyd", "Lock", "Lockwood", "Logan", "Long", "Lord", "Love", "Lovell", "Low", "Lowe", "Lu", "Lucas", "Luke", "Lynch", "Lyon", "Lyons", "Ma", "MacDonald", "MacFarlane", "MacKay", "MacKenzie", "MacKie", "MacLean", "MacLeod", "MacPherson", "Madden", "Maguire", "Maher", "Mahoney", "Mahony", "Malcolm", "Malone", "Maloney", "Mann", "Manning", "Mansfield", "Marks", "Marriott", "Marsh", "Marshall", "Martin", "Mason", "Masters", "Matheson", "Mathews", "Matthews", "Maxwell", "May", "Maynard", "McArthur", "McBride", "McCabe", "McCallum", "McCann", "McCarthy", "McConnell", "McCormack", "McCormick", "McCulloch", "McDermott", "McDonald", "McDonnell", "McDougall", "McFarlane", "McGowan", "McGrath", "McGregor", "McGuire", "McInerney", "McInnes", "McIntosh", "McIntyre", "McKay", "McKenna", "McKenzie", "McKinnon", "McLachlan", "McLaren", "McLaughlin", "McLean", "McLennan", "McLeod", "McMahon", "McMillan", "McNamara", "McNeill", "McPhee", "McPherson", "McRae", "Mead", "Mercer", "Meredith", "Meyer", "Michael", "Middleton", "Miles", "Millar", "Millard", "Miller", "Mills", "Milne", "Mitchell", "Molloy", "Moloney", "Monaghan", "Montgomery", "Moody", "Moon", "Mooney", "Moore", "Moran", "Morgan", "Morley", "Morris", "Morrison", "Morrissey", "Morrow", "Mortimer", "Morton", "Moss", "Moyle", "Muir", "Muller", "Mullins", "Munro", "Murdoch", "Murphy", "Murray", "Myers", "Nash", "Neal", "Neale", "Neil", "Neilson", "Nelson", "Neville", "Newell", "Newman", "Newton", "Ng", "Nguyen", "Nicholas", "Nicholls", "Nichols", "Nicholson", "Nicol", "Nielsen", "Nixon", "Noble", "Nolan", "Noonan", "Norman", "Norris", "North", "Norton", "Nugent", "Nunn", "Oakley", "Oates", "Obrien", "O'Brien", "O'Callaghan", "O'Connell", "O'Connor", "O'Donnell", "O'Halloran", "O'Keefe", "O'Keeffe", "O'Leary", "Oliver", "Olsen", "O'Neill", "Ong", "O'Reilly", "O'Rourke", "Orr", "Osborne", "O'Shea", "O'Sullivan", "Owen", "Owens", "Page", "Palmer", "Park", "Parker", "Parkes", "Parkinson", "Parry", "Parsons", "Partridge", "Pascoe", "Patel", "Paterson", "Paton", "Patterson", "Paul", "Payne", "Peacock", "Pearce", "Pearson", "Penny", "Perera", "Perkins", "Perry", "Peter", "Peters", "Petersen", "Peterson", "Pham", "Phillips", "Pickering", "Pike", "Piper", "Pitt", "Pollard", "Pollock", "Poole", "Pope", "Porter", "Potter", "Potts", "Powell", "Power", "Pratt", "Preston", "Price", "Prior", "Pritchard", "Purcell", "Quinn", "Radford", "Rae", "Ralph", "Ramsay", "Randall", "Rankin", "Ray", "Raymond", "Rayner", "Read", "Reardon", "Reed", "Rees", "Reeves", "Regan", "Reid", "Reilly", "Reynolds", "Rhodes", "Rice", "Richards", "Richardson", "Richmond", "Richter", "Ridley", "Rigby", "Riley", "Ritchie", "Roach", "Robb", "Roberts", "Robertson", "Robins", "Robinson", "Robson", "Roche", "Rodgers", "Rogers", "Rose", "Ross", "Rowe", "Rowland", "Rowley", "Russell", "Russo", "Rutherford", "Ryan", "Salmon", "Salter", "Sampson", "Sanders", "Sanderson", "Saunders", "Savage", "Sawyer", "Schmidt", "Schneider", "Schofield", "Schultz", "Schulz", "Scott", "Searle", "Seymour", "Shah", "Shannon", "Sharma", "Sharp", "Sharpe", "Shaw", "Sheehan", "Shepherd", "Sheppard", "Sheridan", "Shields", "Short", "Sim", "Simmonds", "Simmons", "Simon", "Simpson", "Sims", "Sinclair", "Singh", "Skinner", "Slade", "Slater", "Slattery", "Sloan", "Small", "Smart", "Smith", "Smyth", "Spence", "Spencer", "Stacey", "Stafford", "Stanley", "Stanton", "Steel", "Steele", "Stephen", "Stephens", "Stephenson", "Stevens", "Stevenson", "Stewart", "Stokes", "Stone", "Street", "Stringer", "Stuart", "Stubbs", "Sullivan", "Summers", "Sun", "Sutherland", "Sutton", "Swan", "Sweeney", "Sykes", "Symons", "Tait", "Talbot", "Tan", "Tang", "Tanner", "Taylor", "Terry", "Thomas", "Thompson", "Thomson", "Thorne", "Thornton", "Thorpe", "Tobin", "Todd", "Tomlinson", "Tonkin", "Townsend", "Tran", "Truong", "Tucker", "Turnbull", "Turner", "Tyler", "Vaughan", "Vella", "Vickers", "Vincent", "Wade", "Wagner", "Walker", "Wall", "Wallace", "Waller", "Wallis", "Walsh", "Walter", "Walters", "Walton", "Wang", "Ward", "Ware", "Warner", "Warren", "Waters", "Watkins", "Watson", "Watt", "Watts", "Weaver", "Webb", "Webber", "Weber", "Webster", "Weeks", "Weir", "Welch", "Wells", "Welsh", "West", "Weston", "Wheatley", "Wheeler", "Whelan", "White", "Whitehead", "Whiting", "Whittaker", "Whyte", "Wicks", "Wild", "Wilkins", "Wilkinson", "Williams", "Williamson", "Willis", "Wills", "Wilson", "Winter", "Wise", "Wiseman", "Withers", "Wong", "Wood", "Woods", "Woodward", "Woolley", "Wright", "Wu", "Wyatt", "Xu", "Yang", "Yates", "Young", "Yu", "Zhang", "Zhao", "Zhou", "Zhu"
];
const countFamilyNames = familyNames.length;


// Selectors
const testPatAppQuantity = document.querySelector(".test-pat-app__qty-selection-input");
const testPatAppGenerateButton = document.querySelector(
  ".test-pat-app__qty-selection-generate"
);
const testPatAppDataContainer = document.querySelector(".test-pat-app__data");
const testPatAppDataTitle = document.querySelector('.test-pat-app__data-string-title');

// Event Listeners
testPatAppGenerateButton.addEventListener("click", generateTestPatients);
    
// Event Handlers
function generateTestPatients() {
  testPatAppDataContainer.innerHTML = "";
  const quantity = testPatAppQuantity.value;
  if (quantity < 1 || quantity > 100) {
    window.alert("JS ERROR: The number has to be between 1 and 100. Try again.");
    testPatAppQuantity.value = "";
    testPatAppDataContainer.style.display = "none";
    return;
  }
  testPatAppDataContainer.style.display = "block";
  addTitle();
  for (let i = 0; i < quantity; i++) {
    addTestPatient(i);
  }


}

// Functions
function addTitle() {
  const titleP = document.createElement("p");
  titleP.appendChild(createNumberTitle());
  titleP.appendChild(createNameTitle());
  titleP.appendChild(createSurnameTitle());
  titleP.appendChild(createDOBTitle());
  titleP.appendChild(createMedicareTitle());
  testPatAppDataContainer.appendChild(titleP);
}

function addTestPatient(i) {
  const dataP = document.createElement("p");
  dataP.appendChild(createNumberData(i));
  dataP.appendChild(createNameData());
  dataP.appendChild(createSurnameData());

  // titleP.appendChild(createDOBTitle());
  // titleP.appendChild(createMedicareTitle());
  testPatAppDataContainer.appendChild(dataP);
}

function createNumberTitle() {
  const numberTitleSpan = document.createElement("span");
  const node = document.createTextNode("#");
  numberTitleSpan.appendChild(node);
  numberTitleSpan.classList.add('title-span');
  return numberTitleSpan;
}

function createNumberData(i) {
  const numberDataSpan = document.createElement("span");
  const node = document.createTextNode(i + 1 + ")");
  numberDataSpan.appendChild(node);
  numberDataSpan.classList.add('title-span');
  return numberDataSpan;
}

function createNameTitle() {
  const nameTitleSpan = document.createElement("span");
  const node = document.createTextNode("First Name");
  nameTitleSpan.appendChild(node);
  nameTitleSpan.classList.add('title-span');
  return nameTitleSpan;
}

function createNameData() {
  const nameDataSpan = document.createElement("span");
  const node = document.createTextNode(getRandomName());
  nameDataSpan.appendChild(node);
  nameDataSpan.classList.add('title-span');
  return nameDataSpan;
}

function getRandomName() {
  let name = "";
  const gender = Math.floor(Math.random() * 2) + 1;
  let nameIndex = -1;
  if (gender === 1) {
    name = "(M) " + maleNames[Math.floor(Math.random() * countMaleNames)];
  } else if (gender === 2) {
    name = "(F) " + femaleNames[Math.floor(Math.random() * countFemaleNames)];
  }
  return name;
}

function getGender() {
  let gender = 5;
  gender = Math.floor(Math.random() * 2) + 1;
  return gender;
}

function createSurnameTitle() {
  const surnameTitleSpan = document.createElement("span");
  const node = document.createTextNode("Family Name");
  surnameTitleSpan.appendChild(node);
  surnameTitleSpan.classList.add('title-span');
  return surnameTitleSpan;
}

function createSurnameData() {
  const surnameDataSpan = document.createElement("span");
  const node = document.createTextNode(getRandomSurname());
  surnameDataSpan.appendChild(node);
  surnameDataSpan.classList.add('title-span');
  return surnameDataSpan;
}

function getRandomSurname() {
  let surname = "";
  surname = familyNames[Math.floor(Math.random() * countFamilyNames)];
  return surname;
}

function createDOBTitle() {
  const DOBTitleSpan = document.createElement("span");
  const node = document.createTextNode("Date of Birth");
  DOBTitleSpan.appendChild(node);
  DOBTitleSpan.classList.add('title-span');
  return DOBTitleSpan;
}

function createMedicareTitle() {
  const medicareTitleSpan = document.createElement("span");
  const node = document.createTextNode("Medicare Number");
  medicareTitleSpan.appendChild(node);
  medicareTitleSpan.classList.add('title-span');
  return medicareTitleSpan;
}



function resetGenTestPatApp() {
  testPatComponent.style.display = "none";
  testPatAppDataContainer.style.display = "none";
  testPatAppDataContainer.innerHTML = "";
  testPatAppQuantity.value = "";
}