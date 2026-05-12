export let selectedStateGlobal = "";
export let selectedLgaGlobal = "";
export let selectedTownGlobal = "";
export let selectedAreaGlobal = "";
export let selectedHubGlobal = "";
export let isNoHubStateGlobal = false;
export let isGuestGlobal = false;
export let applicationModeGlobal = "";

export const setSelectedStateGlobal = (state) => {
  selectedStateGlobal = state;
};

export const setSelectedLgaGlobal = (lga) => {
  selectedLgaGlobal = lga;
};

export const setSelectedTownGlobal = (town) => {
  selectedTownGlobal = town;
};

export const setSelectedAreaGlobal = (area) => {
  selectedAreaGlobal = area;
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

export const setApplicationModeGlobal = (mode) => {
  applicationModeGlobal = mode;
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
    "Uyo"
  ],

  "Anambra": [
    "Onitsha"
  ],

  "Cross River": [
    "Calabar"
  ],

  "Delta": [
    "Asaba",
    "Warri"
  ],

  "Ekiti": [
    "Ado-Ekiti"
  ],

  "FCT (Abuja)": [
    "Kuje",
    "Kubwa",
    "Wuse",
    "Gwagwalada"
  ],

  "Kogi": [
    "Lokoja"
  ],

  "Kwara": [
    "Ilorin"
  ],

  "Lagos": [
    "Abule-Egba",
    "Ajegunle-Apapa",
    "Ayobo",
    "Elepe",
    "Ifako",
    "Igbelara",
    "Igbogbo",
    "Ikorodu",
    "Ikotun",
    "Iyana-Iba",
    "Ketu",
    "Lagos Island",
    "Mushin",
    "Egbeda",
    "Yaba",
    "Adamo",
    "Ikeja",
    "Agric"
  ],

  "Nasarawa": [
    "Nyanya"
  ],

  "Ogun": [
    "Abeokuta",
    "Sango",
    "Ijebu-Ode",
    "Ibafo",
    "Alagbole",
    "Sagamu",
    "Ifo",
    "Mowe"
  ],

  "Ondo": [
    "Akure",
    "Ondo Town",
    "Ore"
  ],

  "Osun": [
    "Osogbo",
    "Ile-Ife",
    "Ede",
    "Ilesa"
  ],

  "Oyo": [
    "Mokola",
    "Oyo Town",
    "Iwo Road",
    "Apata",
    "Ojoo",
    "Challenge",
    "Eleyele",
    "Gbagi",
    "Saki",
    "Bodija",
    "Ogbomosho"
  ],

  "Plateau": [
    "Jos"
  ],

  "Rivers": [
    "Portharcourt",
    "Ada-George"
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
