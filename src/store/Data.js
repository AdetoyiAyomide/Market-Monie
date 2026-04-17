export let selectedStateGlobal = "";
export let selectedHubGlobal = "";
export let isNoHubStateGlobal = false;
export let isGuestGlobal = false;

export const setSelectedStateGlobal = (state) => {
  selectedStateGlobal = state;
};

export const setSelectedHubGlobal = (hub) => {
  selectedHubGlobal = hub;
};

export const setNoHubStateGlobal = (status) => {
  isNoHubStateGlobal = status;
};

export const setIsGuestGlobal = (status) => {
  isGuestGlobal = status;
};

// location dataset
export const locations = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT (Abuja)"
].sort();


// address dataset
export const branchAddresses = {
  "Akwa Ibom": [
    "173, Udo Umana Street, Uyo Akwa Ibom."
  ],

  "Anambra": [
    "65, Citymart Plaza opposite St John the Baptist, Main Market, Onitsha"
  ],

  "Cross River": [
    "62 Marian Road Beside Crispy Chicken, Calabar, Cross River State"
  ],

  "Delta": [
    "16 DLA Road Opposite Sunrise Plaza, Asaba Delta State.",
    "23 Deco Road, Warri Delta State"
  ],

  "Ekiti": [
    "Olufunmilola Plaza, 49 Waterworks Road, Ado Ekiti"
  ],

  "FCT (Abuja)": [
    "Shop B13 AA Plaza, Pasali, Kuje",
    "Shop 8 Oyes Plaza Opposite Dutse Market, Dutse Kubwa",
    "3rd Floor Novare Mall, Dalaba Street, Wuse Zone 5",
    "Suite 21A Deo Plaza Opposite Fadama Market, Gwagwalada"
  ],

  "Kogi": [
    "Shop 23 Kuburat Plaza, Murtala Mohammed Way, Lokoja"
  ],

  "Kwara": [
    "2 Otunola Adebayo Street, Taiwo, Ilorin"
  ],

  "Lagos": [
    "43 Ekoro Road, Pipeline Junction, Abule Egba",
    "5 MBA Street, Ajegunle",
    "31 Market Road, Maigida, Ayobo",
    "Firston Hospital Compound, Elepe",
    "4 Julius Kadiri Street, Ifako",
    "7 Bamgboye Street, Igbe Laara, Ikorodu",
    "59 Awolowo Way, Igbogbo",
    "7 Olorunjuwon Street, Benson, Ikorodu",
    "10 Tanimowo Street, Ologunfe Bus Stop, Ikotun",
    "10B Olojo Drive Mile 10 Bus Stop, Ojo",
    "26 Ikosi Road, Ikosi Ketu",
    "44 Alli Street, Lagos Island",
    "60 Coker Street, Mushin",
    "4 Akowojo Road, Egbeda",
    "8 Agunbiade Street, Yaba",
    "Akewukanwo Street, Adamo, Ikorodu",
    "9 Folawewo Street, Allen Avenue, Ikeja"
  ],

  "Nasarawa": [
    "Afiz Plaza Sharp Corner U-Turn, Mararaba"
  ],

  "Ogun": [
    "62 Tinubu Street, Abeokuta",
    "6 Abdul Lasisi Street, Otta",
    "Talbot Road, Ijebu-Ode",
    "Peace Paradise Plaza, Ibafo",
    "Baba Dada Bus Stop, Alagole",
    "GRA Road, Sabo Sagamu",
    "Old Ayede Road, Ifo",
    "Opic Road, Mowe"
  ],

  "Ondo": [
    "Opposite Emmax Complex, Arakale, Akure",
    "Oke Aluko Street, Ondo Town",
    "Onisere Junction, Ore"
  ],

  "Osun": [
    "Inside Igbona Market, Osogbo",
    "38 Aderemi Road, Ile-Ife",
    "Bepo Junction, Ede",
    "Oke Esho Street, Ilesa"
  ],

  "Oyo": [
    "146 Adekunle Fajuyi Street, Mokola Ibadan",
    "Owode Junction, Oyo",
    "Army Barracks Road, Iwo Road Ibadan",
    "Abalamu Apata, Ibadan",
    "Ojoo Central Mosque Area, Ibadan",
    "Ajeigbe Ringroad Ibadan",
    "Eleyele Ologuneru Road, Ibadan",
    "Airport Road, Ibadan",
    "Sango Area, Saki",
    "Bodija Area, Ibadan",
    "Apake Area, Ogbomoso"
  ],

  "Plateau": [
    "29B Bethel Dominion Plaza, Tafawa Balewa Street, Jos"
  ],

  "Rivers": [
    "80 Aba Road, Port Harcourt",
    "Ada George Roundabout, Port Harcourt"
  ]
};

export const banks = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Globus Bank",
  "Guarantee Trust Bank (GTBank)",
  "Heritage Bank",
  "Keystone Bank",
  "Optimus Bank",
  "Parallex Bank",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank Nigeria",
  "Sterling Bank",
  "SunTrust Bank",
  "Titan Trust Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",

  // Fintech / microfinance / payment banks
  "Opay",
  "Moniepoint Microfinance Bank",
  "PalmPay",
  "Kuda Bank",
  "VFD Microfinance Bank",
];