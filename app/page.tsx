"use client";
import {motion,AnimatePresence} from "framer-motion";
import {useMemo,useState} from "react";

type Round={input:string,output:string,formula:string};
function digits(s:string){return s.replace(/\D/g,"")}
function calculate(a:string,b:string){
 const x=digits(a),y=digits(b); if(x.length!==8||y.length!==8)return null;
 const first=Array.from({length:8},(_,i)=>Number(x[i])+Number(y[i])).join("");
 const rounds:Round[]=[{input:`${x} + ${y}`,output:first,formula:Array.from({length:8},(_,i)=>`${x[i]}+${y[i]}`).join("  ")}];
 let cur=first;
 while(cur.length>2){
   const vals:number[]=[]; const forms:string[]=[];
   for(let i=0,j=cur.length-1;i<=j;i++,j--){
     if(i===j){vals.push(Number(cur[i]));forms.push(cur[i]);}
     else {vals.push(Number(cur[i])+Number(cur[j]));forms.push(`${cur[i]}+${cur[j]}`)}
   }
   const out=vals.join(""); rounds.push({input:cur,output:out,formula:forms.join("  ")}); cur=out;
 }
 const n=Math.min(99,Math.max(0,Number(cur))); return {score:n,rounds};
}
function fmt(v:string){return v.split("-").reverse().join(".")}
export default function Home(){
 const [d1,setD1]=useState(""); const [d2,setD2]=useState(""); const [result,setResult]=useState<ReturnType<typeof calculate>>(null); const [busy,setBusy]=useState(false); const [sound,setSound]=useState(false);
 const can=useMemo(()=>d1&&d2,[d1,d2]);
 const run=()=>{if(!can)return;setBusy(true);setTimeout(()=>{setResult(calculate(d1,d2));setBusy(false);document.getElementById("result")?.scrollIntoView({behavior:"smooth",block:"center"})},700)};
 const reset=()=>{setD1("");setD2("");setResult(null)};
 const share=async()=>{if(!result)return; const txt=`❤️ Love Sync\n${fmt(d1)} + ${fmt(d2)} = ${result.score}% Love Score`; if(navigator.share) await navigator.share({title:"Love Sync",text:txt}); else await navigator.clipboard.writeText(txt)};
 return <main className="min-h-screen overflow-hidden grid-bg">
  <div className="fixed inset-0 pointer-events-none"><div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-pink-500/20 blur-[120px]"/><div className="absolute top-[55%] -left-40 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]"/></div>
  <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><div className="font-black tracking-tight text-xl">LOVE<span className="text-pink-400">SYNC</span> <span className="text-white/50">❤️</span></div><button onClick={()=>setSound(!sound)} className="glass rounded-full px-4 py-2 text-sm text-white/80">{sound?"🔊 Sound on":"🔇 Sound off"}</button></nav>
  <section className="relative mx-auto max-w-6xl px-5 pb-16 pt-10 text-center md:pt-20"><motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}}><div className="mb-5 text-5xl heart md:text-7xl">💗</div><p className="mb-3 text-xs font-bold uppercase tracking-[.35em] text-pink-300">The Love Sync Algorithm</p><h1 className="text-5xl font-black tracking-[-.04em] md:text-8xl">Two Birth Dates.<br/><span className="bg-gradient-to-r from-pink-300 via-white to-violet-300 bg-clip-text text-transparent">One Love Score.</span></h1><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 md:text-lg">A playful calculation that combines two dates, then repeatedly adds opposite-end digits until one final two-digit score remains.</p></motion.div></section>
  <section className="relative mx-auto max-w-4xl px-5"><div className="glass glow rounded-[2rem] p-5 md:p-8"><div className="grid gap-5 md:grid-cols-2"><DateBox label="YOUR DATE OF BIRTH" value={d1} onChange={setD1}/><DateBox label="PARTNER'S DATE OF BIRTH" value={d2} onChange={setD2}/></div><button disabled={!can||busy} onClick={run} className="mt-7 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-4 text-lg font-black shadow-[0_12px_45px_rgba(255,79,154,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40">{busy?"CALCULATING...":"CALCULATE LOVE ❤️"}</button><p className="mt-3 text-center text-xs text-white/35">Dates are used only in your browser for this calculation.</p></div></section>
  <AnimatePresence>{result&&<motion.section id="result" initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="relative mx-auto max-w-5xl px-5 py-20"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[.35em] text-pink-300">Your Love Sync Result</p><div className="relative mx-auto my-6 flex h-64 w-64 items-center justify-center rounded-full border border-pink-300/20 bg-pink-500/5 shadow-[0_0_100px_rgba(255,79,154,.18)]"><div className="absolute inset-5 rounded-full border border-white/10"/><div><div className="text-8xl font-black tracking-[-.06em]">{result.score}</div><div className="text-sm font-bold tracking-[.3em] text-pink-300">PERCENT</div></div></div><h2 className="text-3xl font-black">{result.score>=80?"A strong Love Sync 💞":result.score>=60?"A sweet Love Sync 💕":"A playful Love Sync 💗"}</h2><p className="mx-auto mt-3 max-w-xl text-white/50">This score is generated by the Love Sync formula — it is entertainment, not a scientific measure of relationship compatibility.</p><div className="mt-7 flex justify-center gap-3"><button onClick={share} className="rounded-full bg-white px-6 py-3 font-bold text-black">Share result</button><button onClick={reset} className="glass rounded-full px-6 py-3 font-bold">Try again</button></div></div><div className="mt-16"><h3 className="mb-5 text-center text-xl font-black">Calculation Journey</h3><div className="space-y-3">{result.rounds.map((r,i)=><motion.div key={i} initial={{opacity:0,x:-15}} animate={{opacity:1,x:0}} transition={{delay:i*.12}} className="glass rounded-2xl p-5"><div className="flex items-center justify-between gap-4"><span className="text-xs font-bold uppercase tracking-widest text-white/40">Step {i+1}</span><span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs text-pink-200">PLUS</span></div><div className="mt-3 break-all font-mono text-sm text-white/55">{r.formula}</div><div className="mt-3 text-2xl font-black tracking-widest">{r.output}</div></motion.div>)}</div></div></motion.section>}</AnimatePresence>
  <section className="relative mx-auto max-w-5xl px-5 pb-20"><div className="grid gap-4 md:grid-cols-3"><Info icon="➕" title="Plus, not multiply" text="Every calculation uses addition only."/><Info icon="↔️" title="Opposite ends" text="After the first round, the first and last digits are paired, then the next pair inward."/><Info icon="🔢" title="Keep 18 as 18" text="A two-digit result such as 18 stays intact. It is never split into 1 + 8."/></div></section>
  <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-white/35">© 2026 Love Sync · Created & Developed by Thushanthan Srikumar · Built as a playful digital experience · Not a scientific compatibility test</footer>
 </main>
}
function DateBox({label,value,onChange}:{label:string,value:string,onChange:(v:string)=>void}){return <label className="block text-left"><span className="mb-2 block text-xs font-bold tracking-[.18em] text-white/45">{label}</span><input aria-label={label} type="date" value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-lg font-bold text-white outline-none focus:border-pink-400/60"/></label>}
function Info({icon,title,text}:{icon:string,title:string,text:string}){return <div className="glass rounded-2xl p-5"><div className="text-2xl">{icon}</div><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-white/45">{text}</p></div>}
