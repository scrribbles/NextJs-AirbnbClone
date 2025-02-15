"use client";
import { ChevronDown, DollarSign, Globe, GlobeIcon, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import Language from './language/language';
import { useModalContext } from "@/app/utilities/context";

const newState = [
  "Popular",
  "Arts & Culture",
  "Outdoors",
  "Mountains",
  "Beach",
  "Unique stays",
  "Categories",
  "Things to do",
  "Travel tips & inspiration",
  "Airbnb-friendly apartments",
];

const Popular = [
  {
    name: "Canmore",
    desc: "Pet-friendly rentals",
  },
  {
    name: "Benalmádena",
    desc: "Beach house rentals",
  },
  {
    name: "Marbella",
    desc: "Beach house rentals",
  },
  {
    name: "Mijas",
    desc: "House rentals",
  },
  {
    name: "Prescott",
    desc: "Cabin rentals",
  },
  {
    name: "Scottsdale",
    desc: "House rentals",
  },
  {
    name: "Tucson",
    desc: "House rentals",
  },
  {
    name: "Jasper",
    desc: "Cabin rentals",
  },
  {
    name: "Mountain View",
    desc: "Pet-friendly rentals",
  },
  {
    name: "Devonport",
    desc: "Cottage rentals",
  },
  {
    name: "Mallacoota",
    desc: "Pet-friendly rentals",
  },
  {
    name: "Ibiza",
    desc: "Vacation rentals",
  },
  {
    name: "Anaheim",
    desc: "Family-friendly rentals",
  },
  {
    name: "Monterey",
    desc: "Cabin rentals",
  },
  {
    name: "Paso Robles",
    desc: "Cottage rentals",
  },
  {
    name: "Santa Barbara",
    desc: "Apartment rentals",
  },
  {
    name: "Sonoma",
    desc: "Cottage rentals",
  },
  {
    name: "La Serena",
    desc: "Beachfront rentals",
  },
  {
    name: "Dubai",
    desc: "Villa rentals",
  },
  {
    name: "Birmingham",
    desc: "Cottage rentals",
  },
  {
    name: "Brighton",
    desc: "Apartment rentals",
  },
  {
    name: "Bude",
    desc: "Vacation rentals",
  },
  {
    name: "Newcastle upon Tyne",
    desc: "Vacation rentals",
  },
  {
    name: "Padstow",
    desc: "House rentals",
  },
  {
    name: "South West England",
    desc: "Cabin rentals",
  },
  {
    name: "Whitby",
    desc: "Cottage rentals",
  },
  {
    name: "Fort Myers",
    desc: "Beach condo rentals",
  },
  {
    name: "Jacksonville",
    desc: "Mansion rentals",
  },
  {
    name: "Kissimmee",
    desc: "House rentals",
  },

  {
    name: "Longboat Key",
    desc: "Beachfront rentals",
  },

  {
    name: "Orlando",
    desc: "Pet-friendly rentals",
  },

  {
    name: "St Petersburg",
    desc: "House rentals",
  },

  {
    name: "St. Augustine",
    desc: "Beach house rentals",
  },

  {
    name: "The Villages",
    desc: "Pet-friendly rentals",
  },

  {
    name: "Dahlonega",
    desc: "Cabin rentals",
  },

  {
    name: "Crete",
    desc: "Cottage rentals",
  },

  {
    name: "Mykonos",
    desc: "Apartment rentals",
  },

  {
    name: "Santorini",
    desc: "Beach house rentals",
  },

  {
    name: "O‘ahu",
    desc: "Beachfront rentals",
  },

  {
    name: "Capri",
    desc: "House rentals",
  },

  {
    name: "Bar Harbor",
    desc: "Cottage rentals",
  },
  {
    name: "Mackinac Island",
    desc: "Cottage rentals",
  },
  {
    name: "St. Joseph",
    desc: "Condo rentals",
  },
  {
    name: "Larsmont",
    desc: "Vacation rentals",
  },
  {
    name: "Las Vegas",
    desc: "Vacation rentals",
  },
  {
    name: "Madrid",
    desc: "Vacation rentals",
  },
  {
    name: "Santa Fe",
    desc: "Ski-in/ski-out rentals",
  },
  {
    name: "Bermagui",
    desc: "Beach house rentals",
  },

  {
    name: "Evans Head",
    desc: "Vacation rentals",
  },

  {
    name: "Sawtell",
    desc: "Beach house rentals",
  },

  {
    name: "Young",
    desc: "Vacation rentals",
  },

  {
    name: "Ocracoke",
    desc: "House rentals",
  },

  {
    name: "Florence",
    desc: "Cabin rentals",
  },

  {
    name: "Lakeside",
    desc: "Lakehouse rentals",
  },

  {
    name: "Lincoln City",
    desc: "Vacation rentals",
  },

  {
    name: "Paphos",
    desc: "Vacation rentals",
  },

  {
    name: "Maleny",
    desc: "Vacation rentals",
  },

  {
    name: "Stanthorpe",
    desc: "Pet-friendly rentals",
  },
  {
    name: "Newport",
    desc: "Condo rentals",
  },

  {
    name: "Glasgow",
    desc: "Cottage rentals",
  },

  {
    name: "Scottish Highlands",
    desc: "Vacation rentals",
  },

  {
    name: "St Andrews",
    desc: "Apartment rentals",
  },

  {
    name: "McLaren Vale",
    desc: "House rentals",
  },

  {
    name: "Wallaroo",
    desc: "Beachfront rentals",
  },
  {
    name: "Charleston",
    desc: "Pet-friendly rentals",
  },
  {
    name: "Hvar",
    desc: "House rentals",
  },
  {
    name: "Saint John",
    desc: "Vacation rentals",
  },
  {
    name: "Chattanooga",
    desc: "Vacation rentals",
  },
  {
    name: "Concan",
    desc: "Rentals with pools",
  },
  {
    name: "Fredericksburg",
    desc: "House rentals",
  },
  {
    name: "New Braunfels",
    desc: "Apartment rentals",
  },
  {
    name: "Rockport",
    desc: "Beachfront rentals",
  },

  {
    name: "Waco",
    desc: "Apartment rentals",
  },

  {
    name: "Forest of Dean District",
    desc: "Vacation rentals",
  },

  {
    name: "Jersey",
    desc: "Apartment rentals",
  },
  {
    name: "Lyme Regis",
    desc: "Chalet rentals",
  },
  {
    name: "Manchester",
    desc: "House rentals",
  },
  {
    name: "Seaview",
    desc: "Vacation rentals",
  },
  {
    name: "Southwold",
    desc: "Vacation rentals",
  },
  {
    name: "Staithes",
    desc: "Cottage rentals",
  },
  {
    name: "Wells-next-the-Sea",
    desc: "House rentals",
  },
  {
    name: "St. George",
    desc: "Condo rentals",
  },
  {
    name: "Benidorm",
    desc: "Vacation rentals",
  },
  {
    name: "Barwon Heads",
    desc: "Pet-friendly rentals",
  },

  {
    name: "Castlemaine",
    desc: "Vacation rentals",
  },
  {
    name: "Healesville",
    desc: "Cottage rentals",
  },
  {
    name: "Marysville",
    desc: "Cottage rentals",
  },
  {
    name: "Sorrento",
    desc: "Beach house rentals",
  },
  {
    name: "Chincoteague",
    desc: "Rentals with pools",
  },
  {
    name: "Williamsburg",
    desc: "Vacation rentals",
  },
  {
    name: "Hay-on-Wye",
    desc: "Cottage rentals",
  },
  {
    name: "Llandudno",
    desc: "Cottage rentals",
  },
  {
    name: "Tenby",
    desc: "Beach house rentals",
  },
];

const Art = [
  {
    name: "Phoenix",
    desc: "Condo rentals",
  },
  {
    name: "Hot Springs",
    desc: "Lakehouse rentals",
  },
  {
    name: "Los Angeles",
    desc: "Villa rentals",
  },
  {
    name: "San Diego",
    desc: "Condo rentals",
  },

  {
    name: "San Francisco",
    desc: "Vacation rentals",
  },

  {
    name: "Barcelona",
    desc: "Vacation rentals",
  },
  {
    name: "Prague",
    desc: "Vacation rentals",
  },

  {
    name: "Washington",
    desc: "Apartment rentals",
  },

  {
    name: "Keswick",
    desc: "Apartment rentals",
  },

  {
    name: "London",
    desc: "Beachfront rentals",
  },

  {
    name: "Scarborough",
    desc: "Vacation rentals",
  },
  {
    name: "Sherwood Forest",
    desc: "Cottage rentals",
  },
  {
    name: "York",
    desc: "Pet-friendly rentals",
  },
  {
    name: "Paris",
    desc: "Villa rentals",
  },
  {
    name: "Rhodes",
    desc: "Apartment rentals",
  },
  {
    name: "Nashville",
    desc: "Vacation rentals",
  },
  {
    name: "Dublin",
    desc: "Cottage rentals",
  },
  {
    name: "Florence",
    desc: "Apartment rentals",
  },
  {
    name: "Rome",
    desc: "Apartment rentals",
  },
  {
    name: "Lisbon",
    desc: "Apartment rentals",
  },
  {
    name: "Grand Isle",
    desc: "Condo rentals",
  },
  {
    name: "New Orleans",
    desc: "House rentals",
  },
  {
    name: "Martha's Vineyard",
    desc: "Vacation rentals",
  },
  {
    name: "South Haven",
    desc: "Rentals with pools",
  },
  {
    name: "Duluth",
    desc: "Apartment rentals",
  },
  {
    name: "Amsterdam",
    desc: "Pet-friendly rentals",
  },
  {
    name: "New York",
    desc: "Vacation rentals",
  },
  {
    name: "Nice",
    desc: "Apartment rentals",
  },
  {
    name: "Inverness",
    desc: "Cabin rentals",
  },
  {
    name: "Málaga",
    desc: "Rentals with pools",
  },
  {
    name: "Valencia",
    desc: "Chalet rentals",
  },
  {
    name: "Split",
    desc: "House rentals",
  },
  {
    name: "Nashville",
    desc: "Lakehouse rentals",
  },
  {
    name: "Austin",
    desc: "Cottage rentals",
  },
  {
    name: "Houston",
    desc: "Vacation rentals",
  },
  {
    name: "Dartmouth",
    desc: "Cottage rentals",
  },
  {
    name: "Edinburgh",
    desc: "Apartment rentals",
  },
  {
    name: "Liverpool",
    desc: "House rentals",
  },
  {
    name: "St Ives",
    desc: "Beach house rentals",
  },
  {
    name: "Lake Powell",
    desc: "Vacation rentals",
  },
  {
    name: "Lake Anna",
    desc: "House rentals",
  },
  {
    name: "Leavenworth",
    desc: "Cabin rentals",
  },

  {
    name: "Seattle",
    desc: "Vacation rentals",
  },
];

const Outdoors = [
  {
    "name": "Lake Martin",
    "desc": "Lakehouse rentals"
  },
  
{
    "name": "Banff",
    "desc": "Apartment rentals"
  },
  
{
    "name": "Nerja",
    "desc": "House rentals"
  },
  
{
    "name": "Greer",
    "desc": "Cabin rentals"
  },
  
{
    "name": "Lake Havasu City",
    "desc": "House rentals"
  },  {
    "name": "Lake Powell",
    "desc": "Vacation rentals"
  },
  
{
    "name": "North Rim",
    "desc": "Vacation rentals"
  },
{
    "name": "Payson",
    "desc": "Vacation rentals"
  },
{
    "name": "Pinetop-Lakeside",
    "desc": "Cabin rentals"
  },
{
    "name": "Red Rock",
    "desc": "Cabin rentals"  
  },{
    "name": "Dinner Plain",
    "desc": "Pet-friendly rentals"
  },
{
    "name": "Streaky Bay",
    "desc": "Vacation rentals"
  },
{
    "name": "Emerald Lake",
    "desc": "Cabin rentals"
  },
{
    "name": "Vancouver Island",
    "desc": "Cabin rentals"
  },
{
    "name": "Victoria",
    "desc": "Apartment rentals"
  },
{
    "name": "Idyllwild-Pine Cove",
    "desc": "Cabin rentals"
  },
{
    "name": "Mammoth Lakes",
    "desc": "Vacation rentals"
  },
{
    "name": "Palm Desert",
    "desc": "House rentals"
  },{
    "name": "Shaver Lake",
    "desc": "Vacation rentals"
  },
{
    "name": "South Lake Tahoe",
    "desc": "Vacation rentals"
  },
{
    "name": "Cultus Lake",
    "desc": "Cottage rentals"
  },{
    "name": "Georgian Bay",
    "desc": "Vacation rentals"
  },
{
    "name": "Manitoulin Island",
    "desc": "Cottage rentals"
  },
{
    "name": "Ottawa River",
    "desc": "Cottage rentals"
  },
{
    "name": "The Blue Mountains",
    "desc": "Vacation rentals"
  },{
    "name": "West Kelowna",
    "desc": "Beachfront rentals"
  },{
    "name": "Gran Canaria",
    "desc": "Pet-friendly rentals"
  },{
    "name": "Lanzarote",
    "desc": "Rentals with pools"
  },{
    "name": "Castle Hill",
    "desc": "Vacation rentals"
  },{
    "name": "Aspen",
    "desc": "Apartment rentals"
  },{
    "name": "Colorado Springs",
    "desc": "Vacation rentals"
  },{
    "name": "Denver",
    "desc": "Vacation rentals"
  },{
    "name": "Durango",
    "desc": "Condo rentals"
  },{
    "name": "Estes Park",
    "desc": "Condo rentals"
  },{
    "name": "Grand Lake",
    "desc": "Vacation rentals"
  },  {
    "name": "Keystone",
    "desc": "House rentals"
  },  {
    "name": "Vail",
    "desc": "Pet-friendly rentals"
  },
  {
    "name": "Winter Park",
    "desc": "Cabin rentals"
  },
  {
    "name": "Salcombe",
    "desc": "Apartment rentals"
  },
  {
    "name": "Swanage",
    "desc": "Apartment rentals"
  },
  {
    "name": "Cape Coral",
    "desc": "Vacation rentals"
  },
  {
    "name": "Blue Ridge",
    "desc": "Condo rentals"
  },
  {
    "name": "Jekyll Island",
    "desc": "Condo rentals"
  },
  {
    "name": "Lake Lanier",
    "desc": "Lakehouse rentals"
  },
  {
    "name": "Corfu",
    "desc": "House rentals"
  },
 {
    "name": "McCall",
    "desc": "Pet-friendly rentals"
  },
 {
    "name": "Clear Lake",
    "desc": "Condo rentals"
  },
 {
    "name": "Lough Eske",
    "desc": "Vacation rentals"
  },

 {
    "name": "Lake Cumberland",
    "desc": "Pet-friendly rentals"
  },
 {
    "name": "Portland",
    "desc": "Apartment rentals"
  },
 {
    "name": "South Portland",
    "desc": "Vacation rentals"
  },
 {
    "name": "Deep Creek Lake",
    "desc": "Apartment rentals"
  },
 {
    "name": "Lake Michigan Beach",
    "desc": "Lakehouse rentals"
  },

 {
    "name": "Lakeside",
    "desc": "Vacation rentals"
  },

 {
    "name": "Torch Lake",
    "desc": "Beachfront rentals"
  },
  {
    "name": "Traverse City",
    "desc": "Condo rentals"
  }, {
    "name": "Upper Peninsula of Michigan",
    "desc": "Vacation rentals"
  },
 {
    "name": "Branson",
    "desc": "Rentals with pools"
  },
 {
    "name": "Lake of the Ozarks",
    "desc": "Vacation rentals"
  },
 {
    "name": "Big Sky",
    "desc": "House rentals"
  },
 {
    "name": "West Yellowstone",
    "desc": "Cabin rentals"
  },
 {
    "name": "Mount Charleston",
    "desc": "Vacation rentals"
  },
 {
    "name": "Cloudcroft",
    "desc": "House rentals"
  },
 {
    "name": "Red River",
    "desc": "Cabin rentals"
  },
 {
    "name": "Bellingen",
    "desc": "Cabin rentals"
  },
 {
    "name": "Brunswick Heads",
    "desc": "Pet-friendly rentals"
  },
 {
    "name": "Adirondack Mountains",
    "desc": "Vacation rentals"
  },
 {
    "name": "Lake Placid",
    "desc": "Cottage rentals"
  },
 {
    "name": "Niagara Falls",
    "desc": "Cabin rentals"
  }, {
    "name": "Bald Head Island",
    "desc": "Beachfront rentals"
  },
 {
    "name": "Bryson City",
    "desc": "Cabin rentals"
  }, {
    "name": "Emerald Isle",
    "desc": "Beach house rentals"
  }, {
    "name": "Lake Gaston",
    "desc": "Pet-friendly rentals"
  }, {
    "name": "Lake Lure",
    "desc": "Vacation rentals"
  }, {
    "name": "Lake Norman of Catawba",
    "desc": "Vacation rentals"
  }, {
    "name": "Mount Airy",
    "desc": "Cabin rentals"
  }, {
    "name": "Oak Island",
    "desc": "Beachfront rentals"
  }, {
    "name": "Geneva-on-the-Lake",
    "desc": "Vacation rentals"
  }, {
    "name": "Medicine Park",
    "desc": "Vacation rentals"
  }, {
    "name": "Turner Falls",
    "desc": "Cabin rentals"
  }, {
    "name": "Muskoka Lakes",
    "desc": "Vacation rentals"
  }, {
    "name": "Tobermory",
    "desc": "House rentals"
  }, {
    "name": "Bend",
    "desc": "House rentals"
  }, {
    "name": "Crater Lake",
    "desc": "Pet-friendly rentals"
  }, {
    "name": "Northern Oregon Coast Range",
    "desc": "Vacation rentals"
  }, {
    "name": "Sunriver",
    "desc": "Vacation rentals"
  }
, {
    "name": "Lake Harmony",
    "desc": "Vacation rentals"
  }

, {
    "name": "Mount Pocono",
    "desc": "House rentals"
  }

, {
    "name": "Mont-Tremblant",
    "desc": "Ski-in/ski-out rentals"
  }

, {
    "name": "Aviemore",
    "desc": "Apartment rentals"
  }

, {
    "name": "Isle of Mull",
    "desc": "Cottage rentals"
  }

, {
    "name": "Robe",
    "desc": "Vacation rentals"
  }

, {
    "name": "Mountain Rest",
    "desc": "Cabin rentals"
  }

, {
    "name": "St Helens",
    "desc": "Vacation rentals"
  }

, {
    "name": "United States",
    "desc": "Vacation rentals"
  }

, {
    "name": "Canyon Lake",
    "desc": "House rentals"
  },
{
    "name": "Lake Austin",
    "desc": "House rentals"
  },
{
    "name": "Lake Buchanan",
    "desc": "Lakehouse rentals"
  },
{
    "name": "Betws-y-Coed",
    "desc": "Vacation rentals"
  },
{
    "name": "Filey",
    "desc": "Condo rentals"
  },
{
    "name": "Fort William",
    "desc": "Chalet rentals"
  },
{
    "name": "Loch Lomond",
    "desc": "Vacation rentals"
  },
{
    "name": "Port Isaac",
    "desc": "Apartment rentals"
  },
{
    "name": "Moab",
    "desc": "Condo rentals"
  },
{
    "name": "Mount Zion",
    "desc": "Vacation rentals"
  },
{
    "name": "Moraira",
    "desc": "Vacation rentals"
  },
{
    "name": "Inverloch",
    "desc": "Vacation rentals"
  },
{
    "name": "Metung",
    "desc": "Vacation rentals"
  },
{
    "name": "Mount Buller",
    "desc": "Vacation rentals"
  },
{
    "name": "Port Campbell",
    "desc": "Cottage rentals"
  },
{
    "name": "Wilsons Promontory",
    "desc": "Vacation rentals"
  },
{
    "name": "Shenandoah",
    "desc": "Cottage rentals"
  },
{
    "name": "Smith Mountain Lake",
    "desc": "Vacation rentals"
  },
{
    "name": "Snowdon",
    "desc": "Cottage rentals"
  },
{
    "name": "Lake Chelan",
    "desc": "Vacation rentals"
  },
{
    "name": "Lake Crescent",
    "desc": "Vacation rentals"
  },
{
    "name": "Lake Quinault",
    "desc": "Cabin rentals"
  },
{
    "name": "Quinault",
    "desc": "Vacation rentals"
  },
{
    "name": "Skamania",
    "desc": "Vacation rentals"
  },
{
    "name": "Snowshoe",
    "desc": "Vacation rentals"
  },
{
    "name": "Lake Geneva",
    "desc": "Rentals with pools"
  },
{
    "name": "Wisconsin Dells",
    "desc": "Vacation rentals"
  },
{
    "name": "United States",
    "desc": "Vacation rentals"
  }
]

const Mountains = [
  {
    "name": "Mentone",
    "desc": "Cottage rentals"
  },
{
    "name": "Sedona",
    "desc": "Cottage rentals"
  },
{
    "name": "Helen",
    "desc": "Cabin rentals"
  },
{
    "name": "Pine Mountain",
    "desc": "Vacation rentals"
  },
{
    "name": "Stone Mountain",
    "desc": "Cabin rentals"
  },
{
    "name": "Island Park",
    "desc": "House rentals"
  },
{
    "name": "Blue Mountains",
    "desc": "Cottage rentals"
  },
{
    "name": "Asheville",
    "desc": "Cabin rentals"
  },
{
    "name": "Blowing Rock",
    "desc": "Cabin rentals"
  }
,
{
    "name": "Boone",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Hochatown",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Pigeon Forge",
    "desc": "Vacation rentals"
  },
{
    "name": "Townsend",
    "desc": "Vacation rentals"
  },
{
    "name": "Wears Valley",
    "desc": "Vacation rentals"
  },
{
    "name": "Cabins",
    "desc": "Vacation rentals"
  }
]

const Beach = [
  {
    "name": "Dauphin Island",
    "desc": "Villa rentals"
  },
{
    "name": "Fort Morgan",
    "desc": "Vacation rentals"
  },
{
    "name": "Gulf Shores",
    "desc": "Vacation rentals"
  },
{
    "name": "Bruny Island",
    "desc": "Vacation rentals"
  },
{
    "name": "Crescent Head",
    "desc": "House rentals"
  },
{
    "name": "Gerringong",
    "desc": "Vacation rentals"

  },
{
    "name": "Hamilton Island",
    "desc": "Apartment rentals"
  }
,
{
    "name": "Lancelin",
    "desc": "Vacation rentals"
  },
{
    "name": "Melbourne Beach",
    "desc": "Beach condo rentals"
  },
{
    "name": "Moonta Bay",
    "desc": "Beachfront rentals"
  }
,
{
    "name": "Ocean Grove",
    "desc": "Beach house rentals"
  },
{
    "name": "Majorca",
    "desc": "Beachfront rentals"
  },
{
    "name": "Big Sur",
    "desc": "House rentals"
  }
,
{
    "name": "Bodega Bay",
    "desc": "Vacation rentals"
  },
{
    "name": "Cambria",
    "desc": "Pet-friendly rentals"
  },
{
    "name": "Cayucos",
    "desc": "Vacation rentals"
  },
{
    "name": "Huntington Beach",
    "desc": "House rentals"
  }
,
{
    "name": "la Jolla Shores Beach",
    "desc": "Vacation rentals"
  },
{
    "name": "Laguna Beach",
    "desc": "Beachfront rentals"
  },
{
    "name": "Long Beach",
    "desc": "Pet-friendly rentals"
  },
{
    "name": "Malibu",
    "desc": "Beachfront rentals"
  }
,
{
    "name": "Mission Beach",
    "desc": "Beachfront rentals"
  },
{
    "name": "Newport Beach",
    "desc": "Bungalow rentals"
  },
{
    "name": "Oceanside",
    "desc": "Beachfront rentals"
  },
{
    "name": "Palm Springs",
    "desc": "Villa rentals"
  },
{
    "name": "Pismo Beach",
    "desc": "Cabin rentals"
  },
{
    "name": "Santa Cruz",
    "desc": "House rentals"
  },
{
    "name": "Santa Monica",
    "desc": "Beach house rentals"
  }
,
{
    "name": "Sea Ranch",
    "desc": "Condo rentals"
  },
{
    "name": "Playa Blanca",
    "desc": "Vacation rentals"
  },
{
    "name": "Fuerteventura",
    "desc": "Vacation rentals"
  },
{
    "name": "Puerto del Carmen",
    "desc": "Villa rentals"
  },
{
    "name": "Tenerife",
    "desc": "Bungalow rentals"
  },
{
    "name": "Ayia Napa",
    "desc": "Villa rentals"
  },
{
    "name": "Bethany Beach",
    "desc": "Beach condo rentals"
  }
,
{
    "name": "Dewey Beach",
    "desc": "Rentals with pools"
  },
{
    "name": "Blackpool",
    "desc": "Cottage rentals"
  },
{
    "name": "Isle of Wight",
    "desc": "House rentals"
  },
{
    "name": "Newquay",
    "desc": "Beachfront rentals"
  },
{
    "name": "Weymouth",
    "desc": "Apartment rentals"
  }
,
{
    "name": "Albufeira",
    "desc": "Villa rentals"
  },
{
    "name": "Alys Beach",
    "desc": "Pet-friendly rentals"
  },
{
    "name": "Anna Maria Island",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Boca Grande",
    "desc": "Vacation rentals"
  },
{
    "name": "Bradenton",
    "desc": "Pet-friendly rentals"
  }
,
{
    "name": "Cape San Blas",
    "desc": "House rentals"
  },
{
    "name": "Captiva",
    "desc": "Vacation rentals"
  },
{
    "name": "Clearwater Beach",
    "desc": "Rentals with pools"
  }
,
{
    "name": "Cocoa Beach",
    "desc": "Beachfront renta"
  },
{
    "name": "Daytona Beach",
    "desc": "Pet-friendly rentals"
  }
,
{
    "name": "Destin",
    "desc": "Bungalow rentals"
  },
{
    "name": "Englewood",
    "desc": "House rentals"
  },
{
    "name": "Fort Lauderdale",
    "desc": "Condo rentals"
  }
,
{
    "name": "Fort Myers Beach",
    "desc": "Beach house rentals"
  },
{
    "name": "Fort Walton Beach",
    "desc": "Beach condo rentals"
  }
,
{
    "name": "Grayton Beach",
    "desc": "House rentals"
  },
{
    "name": "Gulf of Mexico",
    "desc": "Vacation rentals"
  },
{
    "name": "Indian Rocks Beach",
    "desc": "Condo rentals"
  }
,
{
    "name": "Islamorada",
    "desc": "Pet-friendly rentals"
  },
{
    "name": "Jacksonville Beach",
    "desc": "Beach condo rentals"
  }
,
{
    "name": "Key Largo",
    "desc": "Condo rentals"
  },
{
    "name": "Madeira Beach",
    "desc": "Cottage rentals"
  },
{
    "name": "Marathon",
    "desc": "Condo rentals"
  },
{
    "name": "Marco Island",
    "desc": "Condo rentals"
  }
,
{
    "name": "Mexico Beach",
    "desc": "Pet-friendly rentals"
  },
{
    "name": "Miami Beach",
    "desc": "Vacation rentals"
  },
{
    "name": "Miami",
    "desc": "Cottage rentals"
  }
,
{
    "name": "Miramar Beach",
    "desc": "Beach condo rentals"
  },
{
    "name": "Naples",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Navarre Beach",
    "desc": "Beachfront rentals"
  },
{
    "name": "New Smyrna Beach",
    "desc": "House rentals"
  },
{
    "name": "Okaloosa Island",
    "desc": "Beach condo rentals"
  },
{
    "name": "Panama City Beach",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Pensacola Beach",
    "desc": "Cabin rentals"
  },
{
    "name": "Perdido Key",
    "desc": "Vacation rentals"
  },
{
    "name": "Rosemary Beach",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Saint George Island",
    "desc": "Condo rentals"
  },
{
    "name": "Santa Rosa Beach",
    "desc": "Beachfront rentals"
  }
,
{
    "name": "Sarasota",
    "desc": "House rentals"
  },
{
    "name": "Seagrove Beach",
    "desc": "Beach condo rentals"
  },
{
    "name": "Seaside",
    "desc": "Pet-friendly rentals"
  },
{
    "name": "South Beach",
    "desc": "Beachfront rentals"
  }
,
{
    "name": "St. Augustine Beach",
    "desc": "Beach condo rentals"
  },
{
    "name": "St. Pete Beach",
    "desc": "Condo rentals"
  },
{
    "name": "Tampa",
    "desc": "Apartment rentals"
  }
,
{
    "name": "West Palm Beach",
    "desc": "Apartment rentals"
  },
{
    "name": "Bora-Bora",
    "desc": "Bungalow rentals"
  }
,
{
    "name": "Tybee Island",
    "desc": "Rentals with pools"
  },
{
    "name": "Honolulu",
    "desc": "Villa rentals"
  },
{
    "name": "Kailua-Kona",
    "desc": "Apartment rentals"
  },
{
    "name": "Kapalua",
    "desc": "Apartment rentals"
  }
,
{
    "name": "Kauai",
    "desc": "House rentals"
  },
{
    "name": "Kihei",
    "desc": "Cottage rentals"
  },
{
    "name": "Ko Olina Beach",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Maui",
    "desc": "Villa rentals"
  },
{
    "name": "Topsail Island",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Old Orchard Beach",
    "desc": "Beach house rentals"
  },
{
    "name": "Wells",
    "desc": "Vacation rentals"
  },
{
    "name": "Cape Cod",
    "desc": "Pet-friendly rentals"
  },
{
    "name": "Nantucket",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Biloxi",
    "desc": "Beach condo rentals"
  },
{
    "name": "Avalon",
    "desc": "Vacation rentals"
  },
{
    "name": "Jersey Shore",
    "desc": "Beach house rentals"
  }
,
{
    "name": "North Wildwood",
    "desc": "Beachfront rentals"
  },
{
    "name": "Ocean City",
    "desc": "Pet-friendly rentals"
  }
,
{
    "name": "Sea Isle City",
    "desc": "Beach condo rentals"
  },
{
    "name": "Stone Harbor",
    "desc": "Rentals with pools"
  },
{
    "name": "Hyams Beach",
    "desc": "Beach house rentals"
  },
{
    "name": "Fire Island",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Montauk",
    "desc": "Cottage rentals"
  },
{
    "name": "Ocean Beach",
    "desc": "House rentals"
  },
{
    "name": "Atlantic Beach",
    "desc": "Condo rentals"
  }
,
{
    "name": "Carolina Beach",
    "desc": "Vacation rentals"
  },
{
    "name": "Corolla",
    "desc": "Beachfront rentals"
  }
,,
{
    "name": "Holden Beach",
    "desc": "Pet-friendly rentals"
  },
{
    "name": "Kitty Hawk",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Kure Beach",
    "desc": "Condo rentals"
  },
{
    "name": "Nags Head",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Ocean Isle Beach",
    "desc": "Beach condo rentals"
  },
{
    "name": "Sunset Beach",
    "desc": "Pet-friendly rentals"
  },
{
    "name": "Surf City",
    "desc": "Vacation rentals"
  },
{
    "name": "Wilmington",
    "desc": "Condo rentals"
  }
,
{
    "name": "Wrightsville Beach",
    "desc": "Beachfront rentals"
  },
{
    "name": "Sauble Beach",
    "desc": "House rentals"
  },
{
    "name": "Wasaga Beach",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Cannon Beach",
    "desc": "Vacation rentals"
  },
{
    "name": "Seaside",
    "desc": "Condo rentals"
  }
,,
{
    "name": "Carvoeiro",
    "desc": "Villa rentals"
  },
{
    "name": "Gold Coast",
    "desc": "Villa rentals"
  }
,
{
    "name": "Moreton Island",
    "desc": "Vacation rentals"
  },
{
    "name": "Block Island",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Puerto Peñasco",
    "desc": "Vacation rentals"
  },
{
    "name": "Charleston Oceanfront Villas",
    "desc": "Vacation rentals"
  },
{
    "name": "Edisto Beach",
    "desc": "Beachfront rentals"
  },
{
    "name": "Folly Beach",
    "desc": "Condo rentals"
  }
,
{
    "name": "Fripp Island",
    "desc": "Vacation rentals"
  },
{
    "name": "Isle of Palms",
    "desc": "Beachfront rentals"
  },
{
    "name": "Kiawah Island",
    "desc": "Beach house rentals"
  }
,
{
    "name": "Myrtle Beach",
    "desc": "Beachfront rentals"
  },
{
    "name": "Pawleys Island",
    "desc": "Beach house rentals"
  }
,,
{
    "name": "Seabrook Island",
    "desc": "Vacation rentals"
  },
{
    "name": "Sullivan's Island",
    "desc": "Pet-friendly rentals"
  }
,
{
    "name": "Surfside Beach",
    "desc": "Beach condo rentals"
  },
{
    "name": "Alicante",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Costa Adeje",
    "desc": "Villa rentals"
  },
{
    "name": "Costa del Sol Occidental",
    "desc": "Vacation rentals"
  },
{
    "name": "Fuengirola",
    "desc": "Vacation rentals"
  },
{
    "name": "Los Cristianos",
    "desc": "Apartment rentals"
  }
,
{
    "name": "Corpus Christi",
    "desc": "Cabin rentals"
  },
{
    "name": "Port Aransas",
    "desc": "Vacation rentals"
  },
{
    "name": "South Padre Island",
    "desc": "Condo rentals"
  }
,
{
    "name": "Surfside Beach",
    "desc": "Beachfront rentals"
  },
{
    "name": "Bournemouth",
    "desc": "Apartment rentals"
  }
,,
{
    "name": "New Quay",
    "desc": "Vacation rentals"
  },
{
    "name": "Anglesea",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Abersoch",
    "desc": "Pet-friendly rentals"
  },
{
    "name": "Seabrook",
    "desc": "Vacation rentals"
  }
,
{
    "name": "Jurien Bay",
    "desc": "Pet-friendly rentals"
  }
]

const Unique_stays = [
  {
    "name": "Cabins",
    "desc": "United States"
  },
{
    "name": "Treehouses",
    "desc": "United States"
  },
{
    "name": "Glamping",
    "desc": "United States"
  }
,
{
    "name": "Tiny Houses",
    "desc": "United States"
  },
{
    "name": "Beach Houses",
    "desc": "United States"
  },
{
    "name": "Campers and RVs",
    "desc": "United States"
  }
,
{
    "name": "Lakehouses",
    "desc": "United States"
  },
{
    "name": "Yurt Rentals",
    "desc": "United States"
  }
,
{
    "name": "Yurt Rentals",
    "desc": "United Kingdom"
  },
{
    "name": "Castle Rentals",
    "desc": "United States"
  },
{
    "name": "Houseboats",
    "desc": "United States"
  },
{
    "name": "Holiday Caravans",
    "desc": "United Kingdom"
  },
{
    "name": "Private Island Rentals",
    "desc": "United States"
  },
{
    "name": "Farm Houses",
    "desc": "United States"
  }
,
{
    "name": "Farm Cottages",
    "desc": "United Kingdom"
  },
{
    "name": "Cabin Rentals",
    "desc": "Australia"
  },
{
    "name": "Luxury Cabins",
    "desc": "United Kingdom"
  }
,
{
    "name": "Luxury Cabins",
    "desc": "United States"
  },
{
    "name": "Holiday Chalets",
    "desc": "United Kingdom"
  }
,
{
    "name": "Cottage Rentals",
    "desc": "United States"
  },
{
    "name": "Holiday Cottages",
    "desc": "United Kingdom"
  },
{
    "name": "Mansion Rentals",
    "desc": "United States"
  },{
    "name": "Villa Rentals",
    "desc": "United Kingdom"
  },
{
    "name": "Holiday Bungalows",
    "desc": "United Kingdom"
  },
{
    "name": "Bungalow Rentals",
    "desc": "United States"
  }
,
{
    "name": "Condo Rentals",
    "desc": "United States"
  },
{
    "name": "Holiday Apartments",
    "desc": "Australia"
  },
{
    "name": "Holiday Houses",
    "desc": "United States"
  }
,
{
    "name": "Holiday Houses",
    "desc": "United Kingdom"
  },
{
    "name": "Private Holiday Rentals",
    "desc": "United Kingdom"
  }
,
{
    "name": "Big House Rentals",
    "desc": "United States"
  },
{
    "name": "Big Cottages",
    "desc": "Australia"
  },
{
    "name": "Large Villas",
    "desc": "United Kingdom"
  },
{
    "name": "House Rentals with a Pool",
    "desc": "United States"
  }
,
{
    "name": "Cabin Rentals with a Pool",
    "desc": "United States"
  },
{
    "name": "Villas with a Pool",
    "desc": "United Kingdom"
  }
,
{
    "name": "Apartments with a Hot Tub",
    "desc": "United States"
  },
{
    "name": "Holiday Cottages with a Hot Tub",
    "desc": "United Kingdom"
  },
{
    "name": "Beach Cabins",
    "desc": "United States"
  },
{
    "name": "Beach Condos",
    "desc": "United States"
  }
,
{
    "name": "Beachfront Rentals",
    "desc": "United States"
  },
{
    "name": "Beach Houses",
    "desc": "United Kingdom"
  }
,
{
    "name": "Beach Villas",
    "desc": "United Kingdom"
  },
{
    "name": "Coastal Cottages",
    "desc": "United Kingdom"
  },
{
    "name": "Pet-Friendly Vacation Rentals",
    "desc": "United States"
  },
{
    "name": "Pet-Friendly Beach Rentals",
    "desc": "United States"
  }
,
{
    "name": "Pet-Friendly Cabin Rentals",
    "desc": "United States"
  },
{
    "name": "Dog-Friendly Cottages",
    "desc": "United Kingdom"
  }
,
{
    "name": "Luxury Dog-Friendly Cottages",
    "desc": "United Kingdom"
  }
]

const Categories = [
  {
    "name": "Amazing pools"
  },
{
    "name": "Arctic"
    
  },
{
    "name": "Camping"
    
  }
,
{
    "name": "Campers"
    
  },
{
    "name": "Castles"
    
  }
,
{
    "name": "Containers"
  },
{
    "name": "Countryside"
  },
{
    "name": "Design"
  },
{
    "name": "Earth homes"
  }
,
{
    "name": "Farms"
  },
{
    "name": "National parks"
  }
,
{
    "name": "Vineyards"
  },
{
    "name": "OMG!"
  },
{
    "name": "Tiny homes"
  },
{
    "name": "Towers"
  }
,
{
    "name": "Windmills"
  },
{
    "name": "Luxe"
  }
]

const footerDetails = [Popular, Art , Outdoors, Mountains,Beach, Unique_stays,Categories];

const Footer = () => {
  const [step, setStep] = useState(0);
  const [newList, setNewList] = useState(footerDetails[step]);
  const [showMore, setShowMore] = useState(false);

  const { openModal } = useModalContext();

  useEffect(() => {
    if (showMore) {
      setNewList(footerDetails[step]);
    } else {
      setNewList(footerDetails[step].slice(0, 17));
    }
  }, [step, showMore]);

  const handleClick = (index) => {
    console.log(index);
    setStep(index);
  };
  return (
    <footer className="bg-[#f7f7f7] w-full px-8 ">
      <section className="max-w-[150rem] mx-auto px-6 pt-10">
        <h3 className="font-medium text-[25px] pb-6">
          Inspiration for future getaways
        </h3>
        <div className="flex gap-5 items-center border-b pb-3 border-slate-300 ">
          {newState.map((d, index) => {
            return (
              <button key={index} onClick={() => handleClick(index)}>
                <p
                  className={`${
                    step === index
                      ? " text-black font-semibold"
                      : "text-gray-500 "
                  }`}
                >
                  {d}
                </p>
                <div
                  className={`${
                    step === index
                      ? "border-b-2 border-black relative top-3 text-black"
                      : ""
                  }`}
                ></div>
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-6 gap-4 py-8 text-sm">
          {newList?.map((d, index) => {
            const {name,desc} = d
            return (
              <div key={index}>
                <div className="">
                  <h4 className="text-[12px] text-black font-semibold">{name}</h4>
               {desc ?    <p className="text-gray-400 text-[12px] ">{desc}</p> : <p className="pt-2 "></p> }
                </div>
              </div>
            );
          })}
          {showMore ? (
            ""
          ) : (
            <p
              role="button"
              className="flex items-center gap-1 font-bold hover:underline"
              onClick={() => setShowMore(true)}
            >
              Show more <ChevronDown size={16} />
            </p>
          )}
        </div>
        <div className="border-t"></div>
        <article className="flex gap-[15rem] py-8 text-sm">
          <div>
          <h2 className="font-bold">Support</h2>
            <ul className="grid gap-2 pt-2 text-gray-900 text-[15px] cursor-pointer">
              <li className="hover:underline">Help Center</li>
              <li className="hover:underline">AirCover</li>
              <li className="hover:underline">Anti-discrimination</li>
              <li className="hover:underline">Disability support</li>
              <li className="hover:underline">Cancellation options</li>
              <li className="hover:underline">Report neighborhood concern</li>
            </ul>
          </div>
          <div>
          <h2 className="font-bold">Hosting</h2>
            <ul className="grid gap-2 pt-2 text-gray-900 text-[15px] cursor-pointer">
              <li className="hover:underline">Airbnb your home</li>
              <li className="hover:underline">AirCover for Hosts</li>
              <li className="hover:underline">Hosting resources</li>
              <li className="hover:underline">Community forum</li>
              <li className="hover:underline">Hosting responsibly</li>
              <li className="hover:underline">Airbnb-friendly apartments</li>
              <li className="hover:underline">Join a free Hosting class</li>
              <li className="hover:underline">Find a co‑host</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold">Airbnb</h2>
            <ul className="grid gap-2 pt-2 text-gray-900 text-[15px] cursor-pointer ">
              <li className="hover:underline">Newsroom</li>
              <li className="hover:underline">New features</li>
              <li className="hover:underline">Careers</li>
              <li className="hover:underline">Investors</li>
              <li className="hover:underline">Gift cards</li>
              <li className="hover:underline">Airbnb.org emergency stays</li>
            </ul>
          </div>
        </article>
        <div className="border-b"></div>
        <section className="py-4 text-sm flex justify-between">
        <div className="flex gap-1">
          <h2>©</h2>
          <h2>2025 Airbnb, Inc.</h2>
          <ul className="flex gap-2 items-center">
          &#x2022;  <li className="hover:underline text-gray-700 cursor-pointer">Terms</li>
            &#x2022; <li className="hover:underline text-gray-700 cursor-pointer"> Sitemap</li>
            &#x2022; <li className="hover:underline text-gray-700 cursor-pointer">  Privacy</li>
            &#x2022; <li className="flex items-center gap-1 hover:underline text-gray-700 cursor-pointer">  Your Privacy Choices <span>
            <svg width="26" height="12" fill="none"><rect x="0.5" y="0.5" width="25" height="11" rx="5.5" fill="#fff"></rect><path d="M14 1h7a5 5 0 010 10H11l3-10z" fill="#06F"></path><path d="M4.5 6.5l1.774 1.774a.25.25 0 00.39-.049L9.5 3.5" stroke="#06F" strokeLinecap="round"></path><path d="M16.5 3.5L19 6m0 0l2.5 2.5M19 6l2.5-2.5M19 6l-2.5 2.5" stroke="#fff" strokeLinecap="round"></path><rect x="0.5" y="0.5" width="25" height="11" rx="5.5" stroke="#06F"></rect></svg></span></li>
          </ul>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1.5" onClick={()=>openModal(<Language/>)}>
          <GlobeIcon size={16}/>
          <span className="hover:underline cursor-pointer text-black tetxt-sm font-semibold">
          English (US)
          </span>
          </div>
          <div className="flex items-center gap-1.5">
          <DollarSign size={15}/>
          <span className="hover:underline cursor-pointer text-black tetxt-sm font-semibold">
          USD
          </span>
          </div>
          <ul className="flex gap-2">
            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></li>
            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></li>
            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></li>
          </ul>
        </div>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
