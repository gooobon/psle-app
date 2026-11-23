"use client";
// Type-to-filter combobox for Singapore primary schools (WAI-ARIA combobox + listbox pattern).
// Keyboard: ArrowDown/Up move, Enter picks, Escape closes. Touch: 16px input (no iOS zoom), 44px rows. Only a listed school can be picked.
import React, { useState, useRef, useId, useMemo } from "react";
import { SG_PRIMARY_SCHOOLS } from "@/data/schools/sgPrimarySchools";

const MAX_SHOWN = 60;

export default function SchoolCombobox({ value, onChange, schools = SG_PRIMARY_SCHOOLS, border = "#CBD5E1" }) {
  const [text, setText] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const listRef = useRef(null);
  const q = text.trim().toLowerCase();
  const shown = useMemo(() => {
    const all = q && q !== (value || "").toLowerCase() ? schools.filter((s) => s.toLowerCase().includes(q)) : schools;
    return all.slice(0, MAX_SHOWN);
  }, [q, schools, value]);

  function pick(s) { setText(s); onChange(s); setOpen(false); }
  function scrollTo(i) { const el = listRef.current && listRef.current.children[i]; if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" }); }
  function onKey(e) {
    if (e.key === "ArrowDown") { e.preventDefault(); if (!open) { setOpen(true); return; } const n = Math.min(active + 1, shown.length - 1); setActive(n); scrollTo(n); }
    else if (e.key === "ArrowUp") { e.preventDefault(); const n = Math.max(active - 1, 0); setActive(n); scrollTo(n); }
    else if (e.key === "Enter" && open && shown[active]) { e.preventDefault(); pick(shown[active]); }
    else if (e.key === "Escape") setOpen(false);
  }
  return (
    <div style={{ position: "relative", marginBottom: 8 }}>
      <input
        data-testid="school-combobox" role="combobox" aria-expanded={open} aria-controls={listId} aria-autocomplete="list"
        aria-activedescendant={open && shown[active] ? `${listId}-${active}` : undefined} aria-label="School"
        placeholder="School (type to search)" value={text} autoComplete="off" autoCapitalize="none" enterKeyHint="done"
        onChange={(e) => { setText(e.target.value); setOpen(true); setActive(0); if (!e.target.value) onChange(""); }}
        onFocus={() => setOpen(true)} onKeyDown={onKey}
        onBlur={() => { setOpen(false); setText(value || ""); }} // only a picked school counts; typed text that is not picked is dropped
        style={{ width: "100%", boxSizing: "border-box", padding: "9px 10px", borderRadius: 8, border: `1px solid ${border}`, fontSize: 16 }}
      />
      {open && (
        <ul id={listId} role="listbox" ref={listRef} style={{ position: "absolute", zIndex: 20, left: 0, right: 0, top: "100%", margin: "2px 0 0", padding: 0, listStyle: "none", maxHeight: 240, overflowY: "auto", background: "#fff", border: `1px solid ${border}`, borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,.12)" }}>
          {shown.length === 0 && <li style={{ padding: "12px 10px", fontSize: 13, color: "#64748B" }}>No school found</li>}
          {shown.map((s, i) => (
            <li key={s} id={`${listId}-${i}`} role="option" aria-selected={i === active} data-testid="school-option"
              onMouseDown={(e) => { e.preventDefault(); pick(s); }} onTouchStart={() => setActive(i)} onMouseEnter={() => setActive(i)}
              style={{ padding: "12px 10px", minHeight: 20, fontSize: 14, cursor: "pointer", background: i === active ? "#EDE9FE" : "#fff", fontWeight: s === value ? 800 : 500 }}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
