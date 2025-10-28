let defaultPeriods = [
  [
    { x: 0, y: 0, w: 3, h: 1, i: "0", name: "Ln0", num: 0, focus: false },
    { x: 3, y: 0, w: 3, h: 1, i: "1", name: "Lan1", num: 0, focus: false },
    { x: 6, y: 0, w: 3, h: 1, i: "2", name: "Lan2", num: 0, focus: false },
    { x: 0, y: 1, w: 3, h: 1, i: "3", name: "Lan3", num: 0, focus: false },
    { x: 3, y: 1, w: 3, h: 1, i: "4", name: "Lan4", num: 0, focus: false },
    { x: 6, y: 1, w: 3, h: 1, i: "5", name: "Lan5", num: 0, focus: false },
    { x: 0, y: 2, w: 2, h: 1, i: "6", name: "Lan6", num: 0, focus: false },
    { x: 2, y: 2, w: 4, h: 1, i: "7", name: "Lan7", num: 0, focus: false },
    { x: 0, y: 3, w: 3, h: 1, i: "8", name: "Lan8", num: 0, focus: false },
    { x: 3, y: 3, w: 3, h: 1, i: "9", name: "Lan9", num: 0, focus: false },
    { x: 6, y: 2, w: 3, h: 2, i: "10", name: "Lan10", num: 0, focus: false }
  ],
  [{ x: 0, y: 0, w: 2, h: 1, i: "0", name: "Ln0", num: 3, focus: false }, { x: 2, y: 0, w: 2, h: 1, i: "1", name: "Lan1", num: 4, focus: false }],
  [],
  [],
  [],
  []
];

// let a = JSON.parse(
//   '[[{"x":0,"y":0,"w":3,"h":1,"i":"0","name":"Ln0","num":0,"focus":false},{"x":3,"y":0,"w":3,"h":1,"i":"1","name":"Lan1","num":0,"focus":false},{"x":6,"y":0,"w":3,"h":1,"i":"2","name":"Lan2","num":0,"focus":false},{"x":0,"y":1,"w":3,"h":1,"i":"3","name":"Lan3","num":0,"focus":false},{"x":3,"y":1,"w":3,"h":1,"i":"4","name":"Lan4","num":0,"focus":false},{"x":6,"y":1,"w":3,"h":1,"i":"5","name":"Lan5","num":0,"focus":false},{"x":0,"y":2,"w":2,"h":1,"i":"6","name":"Lan6","num":0,"focus":false},{"x":2,"y":2,"w":4,"h":1,"i":"7","name":"Lan7","num":0,"focus":false},{"x":0,"y":3,"w":3,"h":1,"i":"8","name":"Lan8","num":0,"focus":false},{"x":3,"y":3,"w":3,"h":1,"i":"9","name":"Lan9","num":0,"focus":false},{"x":6,"y":2,"w":3,"h":2,"i":"10","name":"Lan10","num":0,"focus":false}],[{"x":0,"y":0,"w":2,"h":1,"i":"0","name":"Ln0","num":3,"focus":false},{"x":2,"y":0,"w":2,"h":1,"i":"1","name":"Lan1","num":4,"focus":false}],[],[],[],[]]'
// );
// console.log(a);
// localStorage.setItem("layout", JSON.stringify(layout)); //update classes to local storage
// layout = JSON.parse(localStorage.getItem("layout")); //pull data from local storage

let GridLayout = VueGridLayout.GridLayout;
let GridItem = VueGridLayout.GridItem;

let localSettings = JSON.parse(localStorage.getItem("localSettings"));
if (!localSettings) {
  console.log("No local settings found. Resetting to default settings.");
  localSettings = {
    draggable: true,
    resizable: false,
    verbose: false,
    isSettingsSeen: true,
    selectedIndex: 0
  };
} else {
  document.getElementById("language").selectedIndex = localSettings.selectedIndex;
}
document.getElementById("language").addEventListener("change", function () {
  p.saveToLocalSettings();
});
let local = JSON.parse(localStorage.getItem("allPeriods"));
if (!local) {
  console.log("No local period rosters found. Resetting to empty classes.");
  local = [[], [], [], [], [], []];
  document.getElementById("add").classList.add("blue");
  document.getElementById("first-time").innerHTML = "Click add to fill up your period.";
} else {
  localSettings.isSettingsSeen = false;
  // p.saveToLocalSettings;
}

let p = new Vue({
  el: "#periods",
  components: {
    GridLayout,
    GridItem
  },
  data: {
    allPeriods: local,
    layout: local[0],
    index: local[0].length.toString(),
    period: 1,
    draggable: localSettings.draggable,
    resizable: localSettings.resizable,
    verbose: localSettings.verbose,
    isSettingsSeen: localSettings.isSettingsSeen
  },
  methods: {
    // importInConvertionFromOldJSON: function() {
    //   var files = document.getElementById("selectFiles").files;
    //   if (files.length <= 0) {
    //     return false;
    //   }
    //   var fr = new FileReader();
    //   fr.onload = e => {
    //     var result = JSON.parse(JSON.parse(e.target.result));
    //     //convert from old system
    //     let converted = [[], [], [], [], [], []];
    //     for (j = 0; j < result.length; ++j) {
    //       for (i = 0, len = result[j].length; i < len; ++i) {
    //         converted[j].push({
    //           i: i.toString(),
    //           x: (i % 3) * 3,
    //           y: 0,
    //           h: 1,
    //           w: 3,
    //           num: result[j][i].picked,
    //           name: result[j][i].firstName
    //         });
    //       }
    //     }
    //     localStorage.setItem("allPeriods", JSON.stringify(converted));
    //     location.reload();
    //   };
    //   fr.readAsText(files.item(0));
    // },
    importIn: function () {
      var files = document.getElementById("selectFiles").files;
      if (files.length <= 0) {
        return false;
      }
      var fr = new FileReader();
      fr.onload = e => {
        var result = JSON.parse(JSON.parse(e.target.result)); //not sure why 2 parses are needed, but they are
        console.log(result);
        localStorage.setItem("allPeriods", JSON.stringify(result));
        location.reload();
      };
      fr.readAsText(files.item(0));
    },
    exportOut: function () {
      let dataStr = JSON.stringify(localStorage.getItem("allPeriods"));
      let dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      let linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", "data.json");
      linkElement.click();
    },
    movedEvent: function (i, newX, newY) {
      this.saveToLocal();
    },
    resizedEvent: function (i, newX, newY) {
      this.saveToLocal();
    },
    undoLastedCalled: function () {
      for (let i = 0, len = this.layout.length; i < len; ++i) {
        if (this.layout[i].focus) {
          this.layout[i].focus = false;
          this.layout[i].num--;
          document.getElementById("speech").innerHTML = "";
          this.saveToLocal();
        }
      }
    },
    reset: function () {
      if (prompt("To reset all names in all periods type yes", "no") === "yes") {
        this.allPeriods = defaultPeriods;
        this.layout = this.allPeriods[this.period - 1];
        this.saveToLocal();
      }
    },
    voice: function () {
      try {
        recognition.start();
      } catch (err) {
        console.error('Error starting recognition:', err);
        statusDiv.textContent = `Failed to start: ${err.message}`;
        statusDiv.className = 'error';
      }
    },
    resetCount: function () {
      if (prompt("To reset all counts for only this period type yes", "no") === "yes") {
        for (let i = 0, len = this.layout.length; i < len; ++i) {
          this.layout[i].num = 0;
        }
        this.saveToLocal();
      }
    },
    tidy: function () {
      // for (let i = 0, len = this.layout.length; i < len; ++i) {
      //   this.layout[i].x = (i % 4) * 3;
      //   this.layout[i].y = 0;
      //   // this.layout[i].w = 3;
      //   this.layout[i].i = i.toString();
      // }
      this.shrink();
      const columns = 12;
      let w = 0;
      for (let i = 0, len = this.layout.length; i < len; ++i) {
        this.layout[i].y = Math.floor((w + this.layout[i].w - 1) / columns);
        this.layout[i].x = w % columns;

        w += this.layout[i].w;
        this.layout[i].i = i.toString();
      }

      this.saveToLocal();
      location.reload();
    },
    shrink: function () {
      var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
      var context = canvas.getContext("2d");
      function getTextWidth(text, font) {
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width;
      }
      for (let i = 0, len = this.layout.length; i < len; ++i) {
        this.layout[i].h = 1;
        this.layout[i].w = Math.min(12, Math.ceil((getTextWidth(this.layout[i].name, "12px Roboto") + 35) / 57));
      }

      this.saveToLocal();
    },
    saveToLocal: function () {
      this.allPeriods[this.period - 1] = this.layout;
      localStorage.setItem("allPeriods", JSON.stringify(this.allPeriods)); //update classes to local storage
    },
    saveToLocalSettings: function () {
      const localSettings = {
        draggable: this.draggable,
        resizable: this.resizable,
        verbose: this.verbose,
        isSettingsSeen: this.isSettingsSeen,
        selectedIndex: document.getElementById("language").selectedIndex
      };
      localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update classes to local storage
    },
    showSettings: function () {
      if (this.isSettingsSeen) {
        this.isSettingsSeen = false;
      } else {
        this.isSettingsSeen = true;
      }
      this.saveToLocalSettings();
    },
    nextPeriod: function () {
      this.unFocusAll();
      this.saveToLocal();
      if (this.period > this.allPeriods.length - 1) {
        this.period = 1;
      } else {
        this.period++;
      }
      this.layout = this.allPeriods[this.period - 1];
    },
    unFocusAll: function () {
      for (let i = 0, len = this.layout.length; i < len; ++i) {
        this.layout[i].focus = false;
      }
    },
    removeItem: function (item) {
      let removeName = prompt("enter name of student to remove", this.layout[0].name);
      for (let i = 0, len = this.layout.length; i < len; ++i) {
        if (this.layout[i].name === removeName) {
          this.layout.splice(i, 1);
          this.index--;
          this.reIndex();
          this.unFocusAll();
          this.saveToLocal();
          console.log(removeName + " removed");
          break;
        }
      }
      // document.body.style.userSelect = "auto";
      // document.body.style.userSelect = "none";
    },
    reIndex: function () {
      for (let j = 0, len = this.layout.length; j < len; ++j) {
        // console.log(this.layout[j].i);
        this.layout[j].i = j.toString();
      }
    },
    addItem: function () {
      this.unFocusAll();
      let name = prompt("name");
      if (name) {
        this.index++;
        let item = {
          x: 0,
          y: 0,
          w: 3,
          h: 1,
          i: this.index.toString(),
          name: name,
          num: 0
        };
        this.layout.push(item);
        this.saveToLocal();
      }
    },
    prePickedIndex: null,
    callRandom: function () {
      this.unFocusAll();
      let say = "";
      let pool = [];
      let totalCalled = 0;
      this.layout.forEach(function (element) {
        totalCalled += element.num;
      });
      const AVGCALLED = totalCalled / this.layout.length;
      for (let i = 0, len = this.layout.length; i < len; ++i) {
        if (this.layout[i].num > AVGCALLED) {
          pool.push(i);
        } else {
          for (let j = 0; j < 4; ++j) {
            pool.push(i);
          }
        }
      }
      let PICK = pool[Math.floor(Math.random() * pool.length)];
      if (p.prePickedIndex !== null) PICK = p.prePickedIndex
      p.prePickedIndex = null

      const callOn = this.layout[PICK];
      callOn.focus = true;
      callOn.num++;

      if (this.verbose) {
        const countryList = [
          "Afghanistan",
          "Albania",
          "Algeria",
          "American Samoa",
          "Andorra",
          "Angola",
          "Anguilla",
          "Antarctica",
          "Antigua and Barbuda",
          "Argentina",
          "Armenia",
          "Aruba",
          "Australia",
          "Austria",
          "Azerbaijan",
          "Bahamas (the)",
          "Bahrain",
          "Bangladesh",
          "Barbados",
          "Belarus",
          "Belgium",
          "Belize",
          "Benin",
          "Bermuda",
          "Bhutan",
          "Bolivia (Plurinational State of)",
          "Bonaire, Sint Eustatius and Saba",
          "Bosnia and Herzegovina",
          "Botswana",
          "Bouvet Island",
          "Brazil",
          "British Indian Ocean Territory (the)",
          "Brunei Darussalam",
          "Bulgaria",
          "Burkina Faso",
          "Burundi",
          "Cabo Verde",
          "Cambodia",
          "Cameroon",
          "Canada",
          "Cayman Islands (the)",
          "Central African Republic (the)",
          "Chad",
          "Chile",
          "China",
          "Christmas Island",
          "Cocos (Keeling) Islands (the)",
          "Colombia",
          "Comoros (the)",
          "Congo (the Democratic Republic of the)",
          "Congo (the)",
          "Cook Islands (the)",
          "Costa Rica",
          "Croatia",
          "Cuba",
          "Curaçao",
          "Cyprus",
          "Czechia",
          "Côte d'Ivoire",
          "Denmark",
          "Djibouti",
          "Dominica",
          "Dominican Republic (the)",
          "Ecuador",
          "Egypt",
          "El Salvador",
          "Equatorial Guinea",
          "Eritrea",
          "Estonia",
          "Eswatini",
          "Ethiopia",
          "Falkland Islands (the) [Malvinas]",
          "Faroe Islands (the)",
          "Fiji",
          "Finland",
          "France",
          "French Guiana",
          "French Polynesia",
          "French Southern Territories (the)",
          "Gabon",
          "Gambia (the)",
          "Georgia",
          "Germany",
          "Ghana",
          "Gibraltar",
          "Greece",
          "Greenland",
          "Grenada",
          "Guadeloupe",
          "Guam",
          "Guatemala",
          "Guernsey",
          "Guinea",
          "Guinea-Bissau",
          "Guyana",
          "Haiti",
          "Heard Island and McDonald Islands",
          "Holy See (the)",
          "Honduras",
          "Hong Kong",
          "Hungary",
          "Iceland",
          "India",
          "Indonesia",
          "Iran (Islamic Republic of)",
          "Iraq",
          "Ireland",
          "Isle of Man",
          "Israel",
          "Italy",
          "Jamaica",
          "Japan",
          "Jersey",
          "Jordan",
          "Kazakhstan",
          "Kenya",
          "Kiribati",
          "Korea (the Democratic People's Republic of)",
          "Korea (the Republic of)",
          "Kuwait",
          "Kyrgyzstan",
          "Lao People's Democratic Republic (the)",
          "Latvia",
          "Lebanon",
          "Lesotho",
          "Liberia",
          "Libya",
          "Liechtenstein",
          "Lithuania",
          "Luxembourg",
          "Macao",
          "Madagascar",
          "Malawi",
          "Malaysia",
          "Maldives",
          "Mali",
          "Malta",
          "Marshall Islands (the)",
          "Martinique",
          "Mauritania",
          "Mauritius",
          "Mayotte",
          "Mexico",
          "Micronesia (Federated States of)",
          "Moldova (the Republic of)",
          "Monaco",
          "Mongolia",
          "Montenegro",
          "Montserrat",
          "Morocco",
          "Mozambique",
          "Myanmar",
          "Namibia",
          "Nauru",
          "Nepal",
          "Netherlands (the)",
          "New Caledonia",
          "New Zealand",
          "Nicaragua",
          "Niger (the)",
          "Nigeria",
          "Niue",
          "Norfolk Island",
          "Northern Mariana Islands (the)",
          "Norway",
          "Oman",
          "Pakistan",
          "Palau",
          "Palestine, State of",
          "Panama",
          "Papua New Guinea",
          "Paraguay",
          "Peru",
          "Philippines (the)",
          "Pitcairn",
          "Poland",
          "Portugal",
          "Puerto Rico",
          "Qatar",
          "Republic of North Macedonia",
          "Romania",
          "Russian Federation (the)",
          "Rwanda",
          "Réunion",
          "Saint Barthélemy",
          "Saint Helena, Ascension and Tristan da Cunha",
          "Saint Kitts and Nevis",
          "Saint Lucia",
          "Saint Martin (French part)",
          "Saint Pierre and Miquelon",
          "Saint Vincent and the Grenadines",
          "Samoa",
          "San Marino",
          "Sao Tome and Principe",
          "Saudi Arabia",
          "Senegal",
          "Serbia",
          "Seychelles",
          "Sierra Leone",
          "Singapore",
          "Sint Maarten (Dutch part)",
          "Slovakia",
          "Slovenia",
          "Solomon Islands",
          "Somalia",
          "South Africa",
          "South Georgia and the South Sandwich Islands",
          "South Sudan",
          "Spain",
          "Sri Lanka",
          "Sudan (the)",
          "Suriname",
          "Svalbard and Jan Mayen",
          "Sweden",
          "Switzerland",
          "Syrian Arab Republic",
          "Taiwan",
          "Tajikistan",
          "Tanzania, United Republic of",
          "Thailand",
          "Timor-Leste",
          "Togo",
          "Tokelau",
          "Tonga",
          "Trinidad and Tobago",
          "Tunisia",
          "Turkey",
          "Turkmenistan",
          "Turks and Caicos Islands (the)",
          "Tuvalu",
          "Uganda",
          "Ukraine",
          "United Arab Emirates (the)",
          "United Kingdom of Great Britain and Northern Ireland (the)",
          "United States Minor Outlying Islands (the)",
          "United States of America (the)",
          "Uruguay",
          "Uzbekistan",
          "Vanuatu",
          "Venezuela (Bolivarian Republic of)",
          "Viet Nam",
          "Virgin Islands (British)",
          "Virgin Islands (U.S.)",
          "Wallis and Futuna",
          "Western Sahara",
          "Yemen",
          "Zambia",
          "Zimbabwe",
          "Åland Islands"
        ];
        const emotions = [
          'scared',
          'happy',
          'sad',
          'angry',
          'nervous',
          'annoyed',
          'worried about answering this question',
          'depressed :(',
          'embarassed',
          'perplexed',
          'confused',
          'loving',
          'delighted',
          'amused',
          'optimistic',
          'fed up',
          'irritated',
          'dejected',
          'delighted',
          'indecisive',
          'unique',
          'empowered',
          'bold',
          'goofy',
          'creative',
          'focused',
          'lost',
          'renewed',
          'vibrant',
          'energized',
          'healthy',
          'bored'

        ];
        const senses = [
          "looks like",
          "smells like",
          "sounds like",
        ]
        const animals = [
          "baboon",
          "badger",
          "bandicoot",
          "barnacle",
          "barn owl",
          "barracuda",
          "basilisk",
          "basset hound",
          "bat",
          "beagle",
          "bear",
          "bearded dragon",
          "beaver",
          "bedbug",
          "bee",
          "beetle",
          "beta fish",
          "bighorned sheep",
          "bighorn sheep",
          "bigmouth bass",
          "billygoat",
          "bird",
          "bird of paradise",
          "bison",
          "black bear",
          "black bird",
          "black buck",
          "black fish",
          "black fly",
          "blackfooted ferret",
          "black lab",
          "black rhino",
          "blackwidow spider",
          "blowfish",
          "bluebird",
          "bluejay",
          "ram",
          "rat",
          "rattlesnake",
          "raven",
          "redtailed hawk",
          "reindeer",
          "reptile",
          "rhesusmonkey",
          "rhino",
          "rhinoceros",
          "ringworm",
          "roach",
          "roadrunner",
          "robin",
          "rodent",
          "roller",
          "rook",
          "rooster",
          "rottweiler",
          "sable",
          "salamander",
          "salmon",
          "saltwater crocodile",
          "sanddollar",
          "sandpiper",
          "sardine",
          "sawfish",
          "scallop",
          "scarab",
          "scorpion",
          "seagull",
          "seahorse",
          "seal",
          "seamonkey",
          "serpent",
          "shark",
          "sheep",
          "shihtzu",
          "shrew",
          "shrimp",
          "sidewinder",
          "silk worm",
          "silver fish",
          "skunk",
          "skylark",
          "sloth",
          "snail",
          "snake",
          "snipe",
          "snow leopard",
          "snowy owl",
          "song bird",
          "sora",
          "sow",
          "sparrow",
          "sphinx",
          "spider",
          "spider monkey",
          "sponge",
          "springbok",
          "squid",
          "squirrel",
          "stag",
          "stag beetle",
          "stallion",
          "starfish",
          "starling",
          "stegosaurus",
          "stingray",
          "stork",
          "sunfish",
          "swallow",
          "swan",
          "swordfish",
          "tadpole",
          "tapeworm",
          "tapir",
          "tarantula",
          "tasmanian devil",
          "tench",
          "termite",
          "terrapin",
          "terrier",
          "thoroughbred",
          "thrasher",
          "thrush",
          "thunder bird",
          "tick",
          "tiger",
          "tiger shark",
          "toad",
          "tortoise",
          "toucan",
          "T-rex",
          "triceratops",
          "trout",
          "tuna",
          "turkey",
          "turtle",
          "unicorn",
          "vampire bat",
          "velociraptor",
          "vole",
          "vulture",
          "walking stick",
          "wallaby",
          "walrus",
          "warbler",
          "warthog",
          "wasp",
          "water buffalo",
          "water bug",
          "water moccasin",
          "weasel",
          "weevil",
          "whale",
          "white rhino",
          "whooping crane",
          "wild cat",
          "wildebeest",
          "wolf",
          "wolf spider",
          "wolverine",
          "wombat",
          "woodchuck",
          "woodpecker",
          "worm",
          "wren",
          "yak",
          "yeti",
          "zebra"
        ];
        const celebrity = [
          "The Rock",
          'Tom Cruise',
          'Kim Kardashian',
          'Beyoncé',
          'Ryan Reynolds',
          'Kanye',
          'Ed Sheeran',
          'Cristiano Ronaldo',
          'Neymar',
          "Lebron James",
          'Ariana Grande',
          'Gordon Ramsey',
          "J.Lo",
          'Rihanna',
          "Lady Gaga",
          "Drake"
        ]
        var d = new Date();
        var time = {
          min: d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes(),
          hour: d.getHours() % 12,
          noon: d.getHours() > 12 ? "PM" : "AM",
          day: d.getDay(),
          dayname: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        };
        const thing = [
          "is a spooky ghost",
          "is asleep",
          "is my favorite",
          "is a wittle pupper",
          "is a spy",
          "is a robot",
          " ... eats poop",
          " ... needs a long nap",
          "... answer in 20 seconds or this program will delete you",
          " I wish I could always pick you.",
          "is having a good day.",
          "needs a high five!",
          "and I love cheese!",
          "is in charge for the next 30 seconds",
          "is super cool"
        ];
        const oh = ["oh", "hey", "what?", "oh wow"];
        const great = ["good news", "good news everyone", "great", "wow!", "amazing! ", "fantastic", "superb", "excellent", "magnificent"];
        const nextTo = PICK === this.layout.length - 1 ? this.layout[0].name : this.layout[PICK + 1].name; //name of another student

        const n = this.layout[PICK].name; //focus student's name
        const sayThis = [
          `${n} is morbing`,
          `${n} tell me about the rabbits`,
          `${n} I know where you live`,
          `${n} was born July of 2006`,
          `${n}'s social security number 478-67-9163`,
          `${n} do you know da way?`,
          `${n} solos Goku in a fight`,
          `${n} October 5th 2036 5:48 pm be there or be square`,
          `${n} is the heir to all the denny's in` + countryList[Math.floor(Math.random() * countryList.length)],
          `${n} know's Mr. Landgreen's big secret`,
          `${n} what did you do to get banned from` + countryList[Math.floor(Math.random() * countryList.length)] + `?`,
          `${n} was kidnapped by a` + animals[Math.floor(Math.random() * animals.length)] + `from` + countryList[Math.floor(Math.random() * countryList.length)],
          `${n} do you know a place Where the grass is really greener? Where it's Warm, wet n' wild and where, there must be something in the water`,
          `${n} why? Just why?`,
          `${n} Did you know that the ratio of sheep to people in New Zealand is 6 to 1`,
          `${n} stayed up all night watching top 10 best among us imposter plays of 2022`,
          `${n} I challenge you to a duel!!! Meet me at Tombstone, Arizona on October 7th at 4:36 am. canon Yugioh Cards only`,
          `${n} did you know that 85.9% of Nevada is owned by the government and that 95.8% of Alaska is owned by the government`,
          `${n} You are looking mad goofy today. Like how does someone look that goofy`,
          `${n} knows that the fox says`,
          `${n} doesn't like le epic troll face`,
          `${n} do you have 6 fingers on your right hand?`,
          `Le oui oui oui oui baguette ${n}`,
          `${n} and ${nextTo} play Rock paper scissors.`,
          `${n} secretly visits Ohio.`,
          `${n} has a stain on their shirt.`,
          `${n}'s shoes are untied.'`,
          `${n} thinks Chick-fil-A sucks.`,
          `¿Habla usted español ${n}?`,
          `What's crackalackin, ${n}?`,
          `What's your favorite bug, ${n}?`,
          `What's 91 divided by 13, ${n}?`,
          `Do you like snakes, ${n}? `,
          `What color snake would look the best, ${n}?`,
          `${n}, name an s-tier food.`,
          `${n}, what's the best fast food chain? (Chick-fil-A and In-N-Out aren't options.)`,
          `${n}, what's a talent you have?`,
          `${n} ` + senses[Math.floor(Math.random() * senses.length)] + " " + celebrity[Math.floor(Math.random() * celebrity.length)],
          `${n} is feeling ` + emotions[Math.floor(Math.random() * emotions.length)],
          `${n} has committed multiple atrocities in ` + countryList[Math.floor(Math.random() * countryList.length)],
          `${n} secretly loves fidget spinners`,
          `Everyone make eye contact with ${n} for 5 seconds.`,
          `${n} is the type of student to remind the teacher to collect the homework.`,
          `I'm thinking of a name that starts with the letter ${n[0]}... It's ${n}`,
          `The name’s ${n}... James ${n}.`,
          `${n} doesn't look like they're paying attention.`,
          `I know what you did ${n}. You can't hide it forever.`,
          `I think ${n} will get this right!`,
          `${n} has great hair today… So I choose ${n}.`,
          n + " go!",
          oh[Math.floor(Math.random() * oh.length)] + " " + n + " ... hi!",
          "This " + animals[Math.floor(Math.random() * animals.length)] + " thinks " + n + " is really cool.",
          n + " tell me your favorite color.",
          n + " has a pet " + animals[Math.floor(Math.random() * animals.length)],
          oh[Math.floor(Math.random() * oh.length)] + ", The time is " + time.hour + ":" + time.min + " " + time.noon + ", also I pick " + n,
          n + " " + thing[Math.floor(Math.random() * thing.length)],
          n + " " + thing[Math.floor(Math.random() * thing.length)] + " ... just kidding!",
          n + " " + thing[Math.floor(Math.random() * thing.length)],
          n + " " + thing[Math.floor(Math.random() * thing.length)],
          n + " " + thing[Math.floor(Math.random() * thing.length)],
          great[Math.floor(Math.random() * great.length)] + " ... " + n + " " + thing[Math.floor(Math.random() * thing.length)],
          n + " ... " + n + " " + n + " " + n + "? " + n + "! " + n + "? ",
          n + " " + n + " " + n + " " + n + " " + n,
          "Who looks like a " + animals[Math.floor(Math.random() * animals.length)] + "? ... it's " + n,
          great[Math.floor(Math.random() * great.length)] + " ... " + n + " eats poop",
          n + " ... is a " + animals[Math.floor(Math.random() * animals.length)],
          great[Math.floor(Math.random() * great.length)] + " ... " + n + " is a " + animals[Math.floor(Math.random() * animals.length)],
          oh[Math.floor(Math.random() * oh.length)] + ", is it " + time.dayname[time.day] + "? if it is I pick " + n,
          great[Math.floor(Math.random() * great.length)] + " ... " + n + " smells",
          n + " ... is friends with a " + animals[Math.floor(Math.random() * animals.length)],
          n + " smells like a " + animals[Math.floor(Math.random() * animals.length)],
          n + "'s favorite animal is a " + animals[Math.floor(Math.random() * animals.length)],
          n + " ... is literally a " + animals[Math.floor(Math.random() * animals.length)],
          n + "asaurus... rex",
          nextTo + ", is not who I pick ... I pick ... " + n,
          "I don't want to call on " + nextTo + ", so I pick ... " + n + " ... instead.",
          n + " ... has been called on " + (callOn.num - 1) + " times and this time makes " + callOn.num,
          n + " thinks " + nextTo + " is annoying",
          n + " ... hey " + n + " ... " + n + " ... hey ... hello " + n + " ... " + n,
          "I choose you ... " + n,
          //below are all AI generated gemini 2.5 pro
          `${n}, what's the airspeed velocity of an unladen swallow?`,
          `${n} has been chosen by the Sorting Hat for Gryffindor!`,
          `${n} just won a lifetime supply of rubber ducks.`,
          `Is ${n} secretly a superhero? The world may never know.`,
          `${n}, if you were a flavor of ice cream, what would you be?`,
          `Breaking news: ${n} has discovered a new species of ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'creature') + `.`,
          `${n} is now fluent in ` + ['Klingon', 'Elvish', 'Dothraki', 'Morse Code'][Math.floor(Math.random() * 4)] + `.`,
          `The prophecy spoke of ${n}.`,
          `${n}, can you teach us all how to Dougie?`,
          `I saw ${n} practicing their acceptance speech for a Nobel Prize.`,
          `${n} once arm-wrestled a ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'bear') + ` and won.`,
          `If ${n} had a theme song, what would it be?`,
          `${n} is suspected of masterminding the great crayon heist of '23.`,
          `The oracle has spoken... and it picked ${n}!`,
          `${n}, what's your spirit animal? (Besides a ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'unicorn') + `)`,
          `Legend says ${n} can communicate with squirrels.`,
          `${n} is considering a career as a professional ` + ['cloud watcher', 'bubble wrap popper', 'toast artist'][Math.floor(Math.random() * 3)] + `.`,
          `Has anyone seen ${n}'s pet rock? It's gone missing.`,
          `${n}, what's the weirdest dream you've ever had?`,
          `I bet ${n} knows the secret ingredient in Krabby Patties.`,
          `${n} is on a quest to find the legendary Golden Spatula.`,
          `If ${n} wrote a book, the title would be "The Adventures of a Super ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'Llama') + `".`,
          `${n}, what's your go-to dance move?`,
          `Sources say ${n} is training for the Olympics in competitive napping.`,
          `${n} has a secret talent for yodeling.`,
          `The fate of the universe rests on ${n}'s next answer.`,
          `${n}, if you could have any superpower, what would it be?`,
          `I heard ${n} can solve a Rubik's Cube in under 30 seconds.`,
          `${n} is the unofficial mayor of ` + ['Candyland', 'Whoville', 'Atlantis'][Math.floor(Math.random() * 3)] + `.`,
          `What if ${n} is actually an alien from ` + ['Mars', 'Jupiter', 'Planet Zorg'][Math.floor(Math.random() * 3)] + `?`,
          `${n}, what's the most embarrassing song on your playlist?`,
          `${n} once found a map leading to a hidden treasure in ` + (typeof countryList !== 'undefined' ? countryList[Math.floor(Math.random() * countryList.length)] : 'a mysterious land') + `.`,
          `The spotlight is on ${n}!`,
          `${n}, if you were a vegetable, you'd be a cute-cumber.`,
          `I have a good feeling about ${n} for this one.`,
          `${n} is about to drop some serious knowledge.`,
          `Let's hear it for ${n}!`,
          `${n}, what's your favorite dinosaur?`,
          `Could ${n} be the next ` + (typeof celebrity !== 'undefined' ? celebrity[Math.floor(Math.random() * celebrity.length)] : 'superstar') + `?`,
          `${n} seems to be pondering the mysteries of the universe.`,
          `The council has decided... ${n} is the chosen one.`,
          `${n}, what's the silliest thing you've ever done?`,
          `I predict ${n} will have an amazing answer.`,
          `${n} looks like they know the answer to the ultimate question of life, the universe, and everything.`,
          `If ${n} was a cartoon character, who would they be?`,
          `${n} has the heart of a champion and the roar of a ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'lion') + `!`,
          `The ancient scrolls foretold of ${n}'s wisdom.`,
          `${n}, what's your favorite type of cheese?`,
          `I'm betting ${n} can explain quantum physics to a ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'goldfish') + `.`,
          `${n} has been officially dubbed "The Pun Master".`,
          `If ${n} were a tree, what kind of tree would they be?`,
          `${n}, what's the best way to eat a cookie?`,
          `The legendary ${n} graces us with their presence!`,
          `I heard ${n} is secretly a world-class chef specializing in ` + ['gourmet popcorn', 'artisanal toast', 'designer ice cubes'][Math.floor(Math.random() * 3)] + `.`,
          `${n}, what's your favorite mythical creature?`,
          `The stars have aligned for ${n}.`,
          `${n} is radiating pure genius right now.`,
          `If ${n} could travel anywhere in time, where would they go?`,
          `${n} is the keeper of ancient secrets and lost ` + ['socks', 'TV remotes', 'phone chargers'][Math.floor(Math.random() * 3)] + `.`,
          `What would ${n} do for a Klondike bar?`,
          `${n}, what's your favorite board game?`,
          `I sense a disturbance in the Force... it's ${n} about to speak.`,
          `${n} has the power to make a ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'grumpy cat') + ` laugh.`,
          `If ${n} designed a new planet, what would it be like?`,
          `${n}, what's the most interesting fact you know?`,
          `The one, the only, ${n}!`,
          `${n} is rumored to have a collection of rare ` + ['bottle caps', 'rubber bands', 'dust bunnies'][Math.floor(Math.random() * 3)] + `.`,
          `What's ${n}'s hidden talent? Singing opera? Juggling chainsaws?`,
          `${n}, if you could talk to animals, which animal would you talk to first?`,
          `The great ${n} is about to enlighten us.`,
          `${n} once taught a ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'badger') + ` to play chess in ` + (typeof countryList !== 'undefined' ? countryList[Math.floor(Math.random() * countryList.length)] : 'Antarctica') + `.`,
          `If ${n} starred in a movie, what would the genre be?`,
          `${n}, what's your favorite way to waste time?`,
          `All hail ${n}, conqueror of difficult questions!`,
          `${n} knows the secret handshake of the International Society of ` + ['Pancake Flippers', 'Sock Sorters', 'Cloud Sculptors'][Math.floor(Math.random() * 3)] + `.`,
          `If ${n} had a robot sidekick, what would it be called?`,
          `${n}, what's the weirdest food combination you enjoy?`,
          `The moment we've all been waiting for: ${n} speaks!`,
          `${n} is on a first-name basis with ` + (typeof celebrity !== 'undefined' ? celebrity[Math.floor(Math.random() * celebrity.length)] : 'a famous person') + `.`,
          `If ${n} could invent something, what would it be?`,
          `${n}, what's your favorite meme of all time?`,
          `The legendary tales of ${n}'s adventures are told in hushed whispers.`,
          `${n} is probably thinking about ` + ['quantum entanglement', 'the meaning of life', 'what\'s for lunch'][Math.floor(Math.random() * 3)] + `.`,
          `If ${n} were a wizard, what would their signature spell be?`,
          `${n}, what's the best piece of advice you've ever received?`,
          `The crowd goes wild for ${n}!`,
          `${n} once won a staring contest against a statue.`,
          `If ${n} could meet any historical figure, who would it be?`,
          `${n}, what's your favorite conspiracy theory (for laughs)?`,
          `The spirit of inquiry is strong with ${n}.`,
          `${n} could probably convince a ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'stubborn mule') + ` to become vegetarian.`,
          `If ${n} wrote an autobiography, the first chapter would be titled: "It All Started With a ` + ['Mysterious Map', 'Talking Squirrel', 'Radioactive Sandwich'][Math.floor(Math.random() * 3)] + `".`,
          `${n}, what's a word that makes you giggle?`,
          `The universe has chosen ${n} for this momentous task.`,
          `${n} is rumored to be able to speak ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'dolphin') + `-ish.`,
          `If ${n} had a catchphrase, it would be "` + ['Zoinks!', 'Cowabunga!', 'By Jove!', 'Great Scott!'][Math.floor(Math.random() * 4)] + `"`,
          `${n}, what's the most useless talent you have?`,
          `Prepare yourselves for the wisdom of ${n}.`,
          `${n} once outsmarted a sphinx.`,
          `If ${n} were a day of the week, they'd be Funday!`,
          `${n}, what's your favorite way to eat potatoes?`,
          `The legendary ${n} is about to share some pearls of wisdom.`,
          `I hear ${n} is training to be a professional ` + ['thumb wrestler', 'air guitarist', 'extreme cheese sculptor'][Math.floor(Math.random() * 3)] + `.`,
          `${n}, what's the most ridiculous thing you've ever bought?`,
          `The aura of awesomeness around ${n} is palpable.`,
          `${n}, if you could rename any color, what would you choose?`,
          `Has ${n} ever considered a career in stand-up comedy?`,
          `${n} is the chosen one to pull the sword from the stone. Or answer this question.`,
          `My spidey senses tell me ${n} has something brilliant to say.`,
          `${n}, what's your favorite sound?`,
          `If ${n} was an emoji, which one would they be? 🤔✨🎉`,
          `${n} has been selected by the randomizer of destiny!`,
          `Let's give a round of applause for our next contestant, ${n}!`,
          `${n}, if you were an element, which one would you be and why?`,
          `Time to put on your thinking cap, ${n}! This one's a thinker.`,
          `${n} has been nominated to explain the theory of relativity in 10 words or less. Go!`,
          `I've calculated the probability, and ${n} is next!`,
          `${n}, what's your favorite scientific discovery?`,
          `The lab coat of destiny has chosen ${n}!`,
          `If ${n} could ask Isaac Newton one question, what would it be?`,
          `${n}, what's more exciting: space exploration or deep sea exploration?`,
          `The algorithm has spoken: ${n}, you're up!`,
          `${n} is about to unleash some brainpower!`,
          `If ${n} discovered a new planet, what would you name it?`,
          `Let's see if ${n} can crack this code!`,
          `${n}, what's the coolest science experiment you've ever done or seen?`,
          `The data points to ${n}!`,
          `If ${n} could have a science-themed superpower, what would it be? (e.g., photosynthesis, super speed based on kinetic energy)`,
          `${n}, what scientific mystery do you hope is solved in your lifetime?`,
          `The quantum realm has selected ${n}!`,
          `${n}, if you could shrink down to the size of an atom, what would you explore first?`,
          `Our resident genius, ${n}, will now take the floor.`,
          `If ${n} were a famous scientist, who would you be? Marie Curie? Albert Einstein? ` + (typeof celebrity !== 'undefined' ? celebrity[Math.floor(Math.random() * celebrity.length)] : 'Bill Nye') + `?`,
          `${n}, what's your hypothesis on this?`,
          `The forces of nature have selected ${n}!`,
          `If ${n} could invent a new law of physics, what would it be?`,
          `${n}, what's the most mind-bending science fact you know?`,
          `My calculations indicate ${n} is the optimal choice.`,
          `${n}, if you could time travel to witness one scientific event, what would it be?`,
          `The cosmic rays have aligned to pick ${n}!`,
          `If ${n} had a laboratory, what would be its primary focus of research?`,
          `${n}, what's a common science misconception that bugs you?`,
          `The selection matrix has outputted: ${n}!`,
          `${n}, if you could bring one extinct ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'dinosaur') + ` back to life, which would it be? (And where would you keep it?)`,
          `The petri dish of fate has cultured ${n}'s name!`,
          `If ${n} could design a robot assistant for science class, what would it do?`,
          `${n}, what's your favorite part of the scientific method?`,
          `The random number generator (my brain) picks ${n}!`,
          `${n}, if you could have dinner with any scientist, living or dead, who would it be?`,
          `The gravitational pull of this question is drawing in ${n}!`,
          `If ${n} were to write a science fiction story, what would it be about?`,
          `${n}, what's a piece of technology you can't live without and why (scientifically speaking)?`,
          `The microscope is focused on ${n}!`,
          `${n}, what's more fascinating: the human brain or the universe?`,
          `The elements have combined to choose ${n}! (Hopefully not explosively!)`,
          `If ${n} could solve one of the world's biggest problems using science, what would it be?`,
          `${n}, what's your favorite science joke? (Keep it clean!)`,
          `The Bunsen burner of fate is lit for ${n}!`,
          `${n}, if you could visit any ecosystem, which one would you choose?`,
          `The tectonic plates have shifted, and ${n} is at the epicenter!`,
          `If ${n} were a molecule, what would your structure be? Complex and fascinating, no doubt!`,
          `${n}, what's a science concept you found challenging but rewarding to understand?`,
          `The double helix has unwound to reveal... ${n}!`,
          `${n}, if you could have a "science sidekick" animal, like a super-smart ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'octopus') + `, what would it be?`,
          `The variables have been calculated, and the solution is ${n}!`,
          `If ${n} could add a new sense to humans, what would it be? (e.g., echolocation, sensing magnetic fields)`,
          `${n}, what's the most beautiful thing in nature, from a scientific perspective?`,
          `The light spectrum has focused on ${n}!`,
          `${n}, if you were an astronaut heading to Mars, what one personal item would you bring?`,
          `The chain reaction has led to ${n}!`,
          `If ${n} could create a new, sustainable energy source, what would it be based on?`,
          `${n}, what's a scientific "what if" that blows your mind?`,
          `The bio-luminescence is shining on ${n}!`,
          `${n}, if you could genetically engineer a new type of plant, what features would it have?`,
          `The sound waves are resonating with ${n}'s name!`,
          `If ${n} could observe any natural phenomenon up close (safely!), what would it be? (e.g., aurora borealis, volcanic eruption)`,
          `${n}, what's a science documentary or book that you'd recommend?`,
          `The magnetic field has pulled in ${n}!`,
          `${n}, if you could design a mission to explore Europa's oceans, what's the first thing you'd look for?`,
          `The catalyst for this reaction is... ${n}!`,
          `If ${n} could make one part of the human body work more efficiently, what would it be?`,
          `${n}, what's your favorite constellation and the story behind it?`,
          `The fossil record indicates it's ${n}'s turn!`,
          `${n}, if you could have a conversation with an AI, what would you ask it?`,
          `The ecosystem has selected its next speaker: ${n}!`,
          `If ${n} could invent a device to communicate with ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'dolphins') + `, what would be the first question?`,
          `${n}, what's a scientific principle you see in action every day?`,
          `The half-life of waiting is over, it's ${n}!`,
          `${n}, if you could experience zero gravity, what's the first thing you'd do?`,
          `The scientific community eagerly awaits the input of ${n}.`,
          `If ${n} could build a futuristic city, what sustainable technologies would it feature?`,
          `${n}, what's a simple experiment that demonstrates a cool science concept?`,
          `The pendulum has swung towards ${n}!`,
          `${n}, if you could solve a major environmental challenge, which one would you tackle first?`,
          `The code of life (DNA) has selected ${n}!`,
          `If ${n} were to design a new scientific instrument, what would it measure or observe?`,
          `${n}, what's a science-related career that you find interesting?`,
          `The energy levels are peaking for ${n}!`,
          `${n}, if you could witness the formation of a star, what would you hope to see?`,
          `The scientific method points to ${n} as the next investigator.`,
          `If ${n} could create a new hybrid ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'animal') + `, what two animals would you combine?`,
          `${n}, what's a scientific advancement you're most excited about for the future?`,
          `The research indicates that ${n} is up!`,
          `${n}, if you could have any robotic enhancement, what would it be?`,
          `The laws of physics demand that ${n} answers next!`,
          `If ${n} could explore the deepest trench in the ocean, what do you think you'd find?`,
          `${n}, what's a scientific question that has no answer (yet)?`,
          `The experimental results are in: it's ${n}!`,
          `${n}, if you could design a new exhibit for a science museum, what would it be?`,
          `The cosmic microwave background radiation whispers... ${n}.`,
          `If ${n} could make one scientific breakthrough, what would you want it to be?`,
          `${n}, what's the most amazing adaptation an ` + (typeof animals !== 'undefined' ? animals[Math.floor(Math.random() * animals.length)] : 'organism') + ` has?`,
          `The simulation has run, and ${n} is the outcome!`,
          `${n}, if you could create a perfectly balanced terrarium, what would you put inside?`,
          `The periodic table has an empty spot for ${n}'s answer!`,
          `If ${n} could travel to any other galaxy, which one would you pick?`,
          `${n}, what's a piece of "science fiction" that you think could become science fact?`,
          `The critical moment has arrived for ${n}!`,
          `${n}, if you could give a TED Talk on any science topic, what would it be?`,
          `The data stream is pointing to ${n}.`,
          `If ${n} had to explain photosynthesis to a first grader, how would you do it?`,
          `${n}, what's the weirdest or most wonderful fact about the human body you know?`,
          `The quantum entanglement has linked us to ${n}!`,
          `${n}, if you could bio-engineer a plant to glow in the dark, what color would it be?`,
          `The scientific consensus is... ${n} is next!`,
          `If ${n} could ask ` + (typeof celebrity !== 'undefined' ? celebrity[Math.floor(Math.random() * celebrity.length)] : 'a famous inventor') + ` one question about their process, what would it be?`,
          `${n}, what's a natural phenomenon that you find both beautiful and terrifying?`,
          `The final frontier of this question awaits ${n}!`
        ];
        say = sayThis[Math.floor(Math.random() * sayThis.length)]; //pick a random array index to say
        // say = sayThis[0]; //says the first command in array for testing
      } else {
        //non verbose mode
        say = this.layout[PICK].name;
      }
      speech(say);
      document.getElementById("speech").innerHTML = say;
      this.saveToLocal();
    }
  }
});
p.unFocusAll(); //clear all after load
function speech(say) {
  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    utterance.rate = 1; // 0.1 to 10
    //utterance.pitch = 0.8; //0 to 2
    //utterance.text = 'Hello World';
    // utterance.lang = "en-GB";
    utterance.lang = document.getElementById("language").value; //'en-GB';
    //http://stackoverflow.com/questions/14257598/what-are-language-codes-for-voice-recognition-languages-in-chromes-implementati
    //working on mac: de-DE  en-GB  fr-FR  en-US  es-ES
    // var voices = speechSynthesis.getVoices();
    //   for(var i = 0; i < voices.length; i++ ) {
    //     console.log("Voice " + i.toString() + ' ' + voices[i].name + ' ' + voices[i].uri);
    //   }
    speechSynthesis.speak(utterance);
  }
}

let isRandomDisabled = false
let recognition
document.addEventListener('DOMContentLoaded', () => {
  // Check for browser support

  // Feature detection for SpeechRecognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // Elements
  // const startButton = document.getElementById('voice');

  // Create speech recognition instance
  recognition = new SpeechRecognition();

  // Configure recognition
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.continuous = true;
  recognition.maxAlternatives = 1;



  recognition.addEventListener('result', (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      const words = transcript.trim().split(/\s+/);
      const lastWord = words[words.length - 1].toLowerCase()
      // .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "").replace(/\s+/g, "")
      // console.log(lastWord)
      for (let i = 0, len = p.layout.length; i < len; ++i) {
        const nameWords = p.layout[i].name.trim().split(/\s+/)
        const firstName = nameWords[0].toLowerCase().replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "").replace(/\s+/g, "")
        if (lastWord === firstName) {
          console.log('found Name: ' + firstName)
          p.prePickedIndex = i
          break
        }
      }

      if (!isRandomDisabled && lastWord === "random") {
        console.log(lastWord)
        p.callRandom()

        //prevent multiple triggers, cool down period
        isRandomDisabled = true
        setTimeout(() => {
          isRandomDisabled = false
        }, 4000);
        break
      }
    }


  });

  recognition.addEventListener('error', (event) => {
    console.error('Speech recognition error:', event.error);
  });

  //   recognition.addEventListener('end', () => {
  //   // Auto-restart if not manually stopped
  //   // if (isListening) {
  //     recognition.start();
  //   // }
  // });

  // recognition.addEventListener('end', () => {
  //   statusDiv.textContent = 'Recognition stopped.';
  //   statusDiv.className = '';
  //   startButton.disabled = false;
  //   stopButton.disabled = true;
  // });

  // Button event handlers
  // startButton.addEventListener('click', () => {

  // });

  // stopButton.addEventListener('click', () => {
  //   recognition.stop();
  // });
});