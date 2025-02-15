"use client";

import { Switch } from "@/components/ui/switch";
import { Languages } from 'lucide-react';

const languages = [
  {
  "code": "en" ,
  "lang": "English"
  },
  {
    "code": "fr",
    "lang":"French"
  },
  {
    "code":"es",
    "lang": "Spanish"
  },
  {
    "code":"de",
    "lang":"German"
  },{
    "code":"it",
    "lang":"Italian"
  },
  {
    "code": "zh",
    "lang": "Chinese"
  },{
    "code":"ja",
    "lang": "Japanese"
  },{
    "code":"hi",
    "lang": "Hindi"
  },
  {
    "code":"ru",
    "lang": "Russian"
  },{
    "code":"ar",
    "lang":"Arabic"
  }]


const Language = () => {
  return (
    <section className="flex flex-col gap-6 space-y-4 ">

<div className="bg-gray-300/20 flex items-center justify-between px-4 py-4 rounded-lg">
<div>
<h5 className="flex gap-2 font-semibold text-base pb-1">Translation <span><Languages width={18} strokeWidth={1.9}/></span></h5>
<p className="text-[12px] text-gray-400">Automatically translate descriptions and reviews to English.</p>
</div>

<Switch id="lanuages"  />
</div>
<div>
  <h3 className="font-medium">Choose a language and region</h3>
  <div className="grid grid-cols-4 gap-5 mt-4  ">
{languages.map((e,index)=>{
   
    return <div key={index} >
      <p className="bg-slate-200 w-28 rounded-lg h-14 text-center">{e.lang}</p>
    </div>
    })}
  </div>
</div>
    </section>
  )
};

export default Language;
