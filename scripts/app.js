/* ============================================================
   data.js — Mock data store and state management
   ============================================================ */

const TetherData = (() => {
  // ----- State --------------------------------------------------
  const state = {
    currentUser: {
      id: 'usr-001',
      name: 'Dr. Sarah Ahmed',
      role: 'Discharge Coordinator',
      initials: 'SA',
      gmc: 'GMC7654321',
      trust: 'Royal Free Hospital NHS Trust',
    },
    patients: [],
    handovers: [],
    notifications: [],
  };

  // ----- Mock patients ------------------------------------------
  const MOCK_PATIENTS = [
    {
      id: 'pt-001',
      nhsNumber: '943 476 5421',
      name: 'Margaret Thornton',
      dob: '1948-03-12',
      age: 77,
      gender: 'Female',
      address: '14 Hawthorn Close, Manchester, M14 6QR',
      gp: { name: 'Dr. Paul Whitfield', practice: 'Mossley Hill Surgery', odsCode: 'Y12345' },
      ward: 'Cardiology Ward 4B',
      consultant: 'Prof. J. Hargreaves',
      admissionDate: '2026-03-28',
      expectedDischarge: '2026-04-06',
      diagnosis: 'NSTEMI with PCI',
      status: 'pending',
      alerts: ['Penicillin allergy', 'Falls risk'],
      medications: [
        { name: 'Aspirin 75mg', dose: '75mg OD', route: 'Oral', changed: false },
        { name: 'Ticagrelor', dose: '90mg BD', route: 'Oral', changed: true, changeNote: 'New post-PCI' },
        { name: 'Atorvastatin', dose: '80mg ON', route: 'Oral', changed: true, changeNote: 'Dose increased from 40mg' },
        { name: 'Ramipril', dose: '5mg OD', route: 'Oral', changed: false },
        { name: 'Bisoprolol', dose: '2.5mg OD', route: 'Oral', changed: true, changeNote: 'Newly started' },
      ],
      followUp: [
        { type: 'Cardiology OPA', date: '2026-04-20', urgency: 'routine' },
        { type: 'Cardiac Rehab referral', date: null, urgency: 'routine' },
        { type: 'Echo in 6 weeks', date: null, urgency: 'routine' },
      ],
    },
    {
      id: 'pt-002',
      nhsNumber: '512 834 9901',
      name: 'Derek Osei-Bonsu',
      dob: '1955-11-22',
      age: 70,
      gender: 'Male',
      address: '7 Elm Street, Birmingham, B29 5TS',
      gp: { name: 'Dr. Fatima Nkosi', practice: 'Selly Oak Health Centre', odsCode: 'Y98765' },
      ward: 'Respiratory Ward 2A',
      consultant: 'Dr. E. Crawford',
      admissionDate: '2026-03-30',
      expectedDischarge: '2026-04-05',
      diagnosis: 'COPD exacerbation',
      status: 'draft',
      alerts: ['Oxygen-dependent at home'],
      medications: [
        { name: 'Salbutamol inhaler', dose: '200mcg PRN', route: 'Inhaled', changed: false },
        { name: 'Tiotropium', dose: '18mcg OD', route: 'Inhaled', changed: false },
        { name: 'Prednisolone', dose: '30mg OD', route: 'Oral', changed: true, changeNote: '5-day course — stop 09/04' },
        { name: 'Doxycycline', dose: '200mg stat then 100mg OD', route: 'Oral', changed: true, changeNote: '7-day course' },
      ],
      followUp: [
        { type: 'Respiratory clinic', date: '2026-04-28', urgency: 'urgent' },
        { type: 'Pulmonary rehab referral', date: null, urgency: 'routine' },
      ],
    },
    {
      id: 'pt-003',
      nhsNumber: '761 234 0087',
      name: 'Phyllis Kamara',
      dob: '1962-07-04',
      age: 63,
      gender: 'Female',
      address: '22 Birch Lane, Leeds, LS8 3HW',
      gp: { name: 'Dr. Anita Sharma', practice: 'Chapel Allerton Medical Centre', odsCode: 'Y11223' },
      ward: 'Orthopaedics Ward 6C',
      consultant: 'Mr. D. Fischer',
      admissionDate: '2026-03-29',
      expectedDischarge: '2026-04-07',
      diagnosis: 'Right total hip replacement',
      status: 'sent',
      alerts: ['Warfarin — INR monitoring required'],
      medications: [
        { name: 'Warfarin', dose: 'As per INR', route: 'Oral', changed: true, changeNote: 'Restarted — INR check in 2 days' },
        { name: 'Enoxaparin', dose: '40mg OD', route: 'SC', changed: true, changeNote: 'Bridge until INR therapeutic' },
        { name: 'Tramadol', dose: '50mg QDS PRN', route: 'Oral', changed: true, changeNote: 'Short term — wean over 2 weeks' },
        { name: 'Paracetamol', dose: '1g QDS', route: 'Oral', changed: false },
      ],
      followUp: [
        { type: 'Orthopaedic wound check', date: '2026-04-14', urgency: 'routine' },
        { type: 'INR clinic', date: '2026-04-06', urgency: 'urgent' },
        { type: 'Physiotherapy', date: '2026-04-10', urgency: 'routine' },
      ],
    },
  ];

  // ----- Initialise -------------------------------------------
  function init() {
    state.patients = MOCK_PATIENTS;
  }

  // ----- Getters ----------------------------------------------
  function getPatients() { return state.patients; }
  function getPatient(id) { return state.patients.find(p => p.id === id) || null; }
  function getCurrentUser() { return state.currentUser; }

  function getStatusLabel(status) {
    return { pending: 'Pending', draft: 'Draft', sent: 'Sent', acknowledged: 'Acknowledged' }[status] || status;
  }

  function getStatusBadgeClass(status) {
    return { pending: 'badge--warning', draft: 'badge--grey', sent: 'badge--teal', acknowledged: 'badge--success' }[status] || 'badge--grey';
  }

  function addPatient(patient) { state.patients.push(patient); return patient; }
  function updatePatientStatus(id, status) {
    const p = state.patients.find(p => p.id === id);
    if (p) p.status = status;
  }
  function markFollowUpDone(patientId, taskIndex) {
    const p = state.patients.find(p => p.id === patientId);
    if (p && p.followUp[taskIndex]) p.followUp[taskIndex].done = true;
  }
  return { init, getPatients, getPatient, getCurrentUser, getStatusLabel, getStatusBadgeClass, addPatient, updatePatientStatus, markFollowUpDone };
})();
/* ============================================================
   fhir.js — FHIR R4 utilities and document generation
   ============================================================ */

const TetherFHIR = (() => {

  // ----- Build a FHIR R4 Discharge Summary Composition ------
  function buildDischargeSummary(patient) {
    const now = new Date().toISOString();
    return {
      resourceType: 'Bundle',
      id: `bundle-${patient.id}-${Date.now()}`,
      type: 'document',
      timestamp: now,
      entry: [
        {
          resource: {
            resourceType: 'Composition',
            id: `comp-${patient.id}`,
            status: 'final',
            type: {
              coding: [{
                system: 'http://snomed.info/sct',
                code: '373942005',
                display: 'Discharge summary',
              }],
            },
            subject: { reference: `Patient/${patient.id}`, display: patient.name },
            date: now,
            title: `Discharge Summary — ${patient.name}`,
            section: [
              _section('Reason for Admission', patient.diagnosis),
              _section('Diagnoses', patient.diagnosis),
              _section('Medications', _medicationsText(patient.medications)),
              _section('Follow-up', _followUpText(patient.followUp)),
              _section('Alerts', patient.alerts.join('; ')),
            ],
          },
        },
        _patientResource(patient),
      ],
    };
  }

  // ----- Build a FHIR Patient resource -----------------------
  function _patientResource(patient) {
    return {
      resource: {
        resourceType: 'Patient',
        id: patient.id,
        identifier: [{
          system: 'https://fhir.nhs.uk/Id/nhs-number',
          value: patient.nhsNumber.replace(/\s/g, ''),
        }],
        name: [{ use: 'official', text: patient.name }],
        birthDate: patient.dob,
        gender: patient.gender.toLowerCase(),
        address: [{ text: patient.address, use: 'home' }],
        generalPractitioner: [{
          display: `${patient.gp.name} — ${patient.gp.practice}`,
        }],
      },
    };
  }

  // ----- Build a CDA-style structured text section -----------
  function _section(title, text) {
    return {
      title,
      text: { status: 'generated', div: `<div xmlns="http://www.w3.org/1999/xhtml">${text}</div>` },
    };
  }

  function _medicationsText(meds) {
    return meds.map(m => {
      const change = m.changed ? ` [CHANGED: ${m.changeNote}]` : '';
      return `${m.name} ${m.dose} ${m.route}${change}`;
    }).join('<br/>');
  }

  function _followUpText(followUp) {
    return followUp.map(f => {
      const date = f.date ? ` — ${f.date}` : ' — date TBC';
      return `${f.type}${date} (${f.urgency})`;
    }).join('<br/>');
  }

  // ----- Validate NHS Number (Modulus 11) --------------------
  function validateNHSNumber(raw) {
    const digits = raw.replace(/\D/g, '');
    if (digits.length !== 10) return false;
    const weights = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = weights.reduce((acc, w, i) => acc + w * parseInt(digits[i], 10), 0);
    const remainder = sum % 11;
    const checkDigit = remainder === 0 ? 0 : 11 - remainder;
    if (checkDigit === 10) return false;
    return checkDigit === parseInt(digits[9], 10);
  }

  // ----- Format NHS Number for display -----------------------
  function formatNHSNumber(raw) {
    const d = raw.replace(/\D/g, '');
    if (d.length !== 10) return raw;
    return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  }

  // ----- Serialise bundle to JSON string ---------------------
  function serialise(bundle) {
    return JSON.stringify(bundle, null, 2);
  }

  return { buildDischargeSummary, validateNHSNumber, formatNHSNumber, serialise };
})();
/* ============================================================
   ai.js — Tether AI module (proxies to server.js → Claude API)
   ============================================================ */

const TetherAI = (() => {
  const PROXY = 'http://localhost:3001/api/ai';

  // ── System prompts ────────────────────────────────────────
  const SYS_DISCHARGE = `You are a clinical documentation assistant for NHS hospital discharge. Write a structured, concise discharge summary in professional UK clinical language. Include: diagnosis, summary of admission, medication changes with reasons, pending investigations with named owners, and GP actions required. Use British English. Never invent clinical details not provided. Format clearly with labelled sections.`;

  const SYS_RISK = `You are a clinical risk summariser for an NHS hospital discharge coordination system called Tether. Given the current patient data, identify the top risks, flag any safety-critical items, and produce a brief 3-5 sentence briefing a senior clinician can read in under 30 seconds. Use clear, direct language. Prioritise patient safety.`;

  const SYS_GP_TASKS = `You are a clinical decision support tool. Based on the diagnosis and clinical summary provided, suggest 3-5 specific follow-up tasks for the patient's GP. Each task should include: what to do, when to do it, and why it matters. Use UK clinical standards. Output as a numbered list only — no preamble.`;

  const SYS_MED_CHANGES = `You are a clinical pharmacist assistant for NHS discharge documentation. Given a diagnosis and clinical summary, suggest 3-5 typical medication changes required at discharge for this condition. For each, output exactly one line in pipe-separated format: DRUG_NAME | change_type | DOSE_AND_ROUTE | REASON. Use change types: started, stopped, dose-changed, or continued. Use UK BNF drug names. Output the list only — no preamble, no numbering.`;

  // ── Core helpers ──────────────────────────────────────────
  async function _post({ systemPrompt, prompt, feature }) {
    const res = await fetch(PROXY, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ systemPrompt, prompt, feature, stream: false }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.content?.[0]?.text || '';
  }

  async function* _stream({ systemPrompt, prompt, feature }) {
    const res = await fetch(PROXY, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ systemPrompt, prompt, feature, stream: true }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    let   buffer  = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') return;
        try {
          const parsed = JSON.parse(payload);
          if (parsed.error) throw new Error(parsed.error);
          if (parsed.text)  yield parsed.text;
        } catch (e) {
          if (e.message !== 'Unexpected end of JSON input') throw e;
        }
      }
    }
  }

  // ── Feature A: stream a discharge draft ───────────────────
  async function* streamDischargeDraft({ name, nhs, diagnosis, events, medications, pendingResults }) {
    const prompt = [
      `Patient: ${name}, NHS: ${nhs}`,
      `Diagnosis: ${diagnosis}`,
      `\nKey events during admission:\n${events}`,
      `\nMedication changes:\n${medications || 'None stated'}`,
      `\nPending results:\n${pendingResults || 'None stated'}`,
    ].join('\n');
    yield* _stream({ systemPrompt: SYS_DISCHARGE, prompt, feature: 'discharge-writer' });
  }

  // ── Feature B: risk intelligence briefing ─────────────────
  async function generateRiskInsight(patients, pendingResults) {
    const pts = patients.map(p =>
      `- ${p.name} (${p.diagnosis}, status: ${p.status}, alerts: ${p.alerts.join(', ') || 'none'})`
    ).join('\n');
    const unowned = pendingResults.filter(r => !r.owned).map(r =>
      `- ${r.test} for ${r.patient} (${r.urgency}${r.safety_critical ? ', SAFETY-CRITICAL' : ''})`
    ).join('\n');
    const prompt = `Current patients:\n${pts}\n\nUnowned pending results:\n${unowned || 'None'}\n\nProvide the briefing now.`;
    return _post({ systemPrompt: SYS_RISK, prompt, feature: 'risk-intelligence' });
  }

  // ── Feature C: GP task suggestions ────────────────────────
  async function suggestGPTasks({ diagnosis, summary }) {
    const prompt = `Diagnosis: ${diagnosis}\n\nClinical summary:\n${summary}`;
    return _post({ systemPrompt: SYS_GP_TASKS, prompt, feature: 'task-suggester' });
  }

  // ── Feature D: Medication change suggestions ──────────────
  async function suggestMedChanges({ diagnosis, summary }) {
    const prompt = `Diagnosis: ${diagnosis}\n\nClinical summary:\n${summary}`;
    return _post({ systemPrompt: SYS_MED_CHANGES, prompt, feature: 'task-suggester' });
  }

  return { streamDischargeDraft, generateRiskInsight, suggestGPTasks, suggestMedChanges };
})();
/* ============================================================
   toast.js — Toast notification component
   ============================================================ */

const TetherToast = (() => {
  let root;

  function init() {
    root = document.getElementById('toast-root');
  }

  /**
   * Show a toast notification.
   * @param {string} message
   * @param {'info'|'success'|'error'|'warning'} [type='info']
   * @param {number} [duration=4000] ms
   */
  function show(message, type = 'info', duration = 4000) {
    if (!root) return;

    const toast = document.createElement('div');
    toast.className = `toast${type !== 'info' ? ` toast--${type}` : ''}`;

    const icon = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' }[type] || 'ℹ';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

    root.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 320);
    }, duration);
  }

  const success = (msg, dur) => show(msg, 'success', dur);
  const error   = (msg, dur) => show(msg, 'error',   dur);
  const warning = (msg, dur) => show(msg, 'warning', dur);
  const info    = (msg, dur) => show(msg, 'info',    dur);

  return { init, show, success, error, warning, info };
})();
/* ============================================================
   modal.js — Accessible modal dialog component
   ============================================================ */

const TetherModal = (() => {
  let root;

  function init() {
    root = document.getElementById('modal-root');
  }

  /**
   * Open a modal dialog.
   * @param {object} opts
   * @param {string}   opts.title
   * @param {string|HTMLElement} opts.body   - HTML string or element
   * @param {Array<{label, className, onClick}>} [opts.actions]
   * @param {function} [opts.onClose]
   */
  function open({ title, body, actions = [], onClose } = {}) {
    close(); // ensure only one modal open

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const actionsHTML = actions.map((a, i) =>
      `<button class="btn ${a.className || 'btn--secondary'}" data-action="${i}">${a.label}</button>`
    ).join('');

    overlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__header">
          <h2 class="modal__title" id="modal-title">${title}</h2>
          <button class="modal__close" aria-label="Close">&times;</button>
        </div>
        <div class="modal__body"></div>
        ${actions.length ? `<div class="modal__footer">${actionsHTML}</div>` : ''}
      </div>`;

    // Inject body (string or element)
    const bodyEl = overlay.querySelector('.modal__body');
    if (typeof body === 'string') bodyEl.innerHTML = body;
    else if (body instanceof HTMLElement) bodyEl.appendChild(body);

    // Close handlers
    const dismiss = () => { close(); onClose?.(); };
    overlay.querySelector('.modal__close').addEventListener('click', dismiss);
    overlay.addEventListener('click', e => { if (e.target === overlay) dismiss(); });

    // Action buttons
    actions.forEach((a, i) => {
      overlay.querySelector(`[data-action="${i}"]`).addEventListener('click', () => a.onClick?.(dismiss));
    });

    // Keyboard Esc
    const onKey = e => { if (e.key === 'Escape') { dismiss(); document.removeEventListener('keydown', onKey); } };
    document.addEventListener('keydown', onKey);

    root.appendChild(overlay);
    // Focus trap — focus first focusable element
    const focusable = overlay.querySelectorAll('button, input, select, textarea');
    if (focusable.length) focusable[0].focus();
  }

  function close() {
    root.innerHTML = '';
  }

  return { init, open, close };
})();
/* ============================================================
   tabs.js — Tab bar component with badge support + mobile scroll
   ============================================================ */

const TetherTabs = (() => {

  /**
   * @param {HTMLElement} container
   * @param {Array<{
   *   id: string,
   *   label: string,
   *   badge?: number|null,
   *   urgent?: boolean,
   *   isAction?: boolean,
   *   render: (el: HTMLElement) => void
   * }>} tabDefs
   * @param {{ defaultTab?: string, sticky?: boolean }} opts
   */
  function render(container, tabDefs, opts = {}) {
    const { defaultTab, sticky = false } = opts;
    const activeId = defaultTab || tabDefs[0]?.id;

    // ── Tab bar ──────────────────────────────────────────────
    const barWrap = document.createElement('div');
    barWrap.className = 'tabs-bar-wrap' + (sticky ? ' tabs-bar-wrap--sticky' : '');

    const bar = document.createElement('div');
    bar.className = 'tabs-bar';
    bar.setAttribute('role', 'tablist');
    bar.setAttribute('aria-label', 'Main sections');

    tabDefs.forEach(t => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = [
        'tab',
        t.id === activeId ? 'tab--active' : '',
        t.isAction        ? 'tab--action'  : '',
      ].filter(Boolean).join(' ');

      btn.dataset.tab = t.id;
      btn.id = `tab-btn-${t.id}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', t.id === activeId ? 'true' : 'false');
      btn.setAttribute('aria-controls', `tab-panel-${t.id}`);

      const badgeHtml = (t.badge != null)
        ? `<span class="tab-badge${t.urgent ? ' tab-badge--urgent' : ''}" aria-label="${t.badge} items${t.urgent ? ', urgent' : ''}">${t.badge}</span>`
        : '';

      btn.innerHTML = `<span class="tab-label">${t.label}</span>${badgeHtml}`;
      bar.appendChild(btn);
    });

    barWrap.appendChild(bar);

    // ── Panels ───────────────────────────────────────────────
    const panelsEl = document.createElement('div');
    panelsEl.className = 'tab-panels';

    tabDefs.forEach(t => {
      const panel = document.createElement('div');
      panel.className = 'tab-panel' + (t.id === activeId ? ' tab-panel--active' : '');
      panel.id = `tab-panel-${t.id}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `tab-btn-${t.id}`);
      panel.setAttribute('tabindex', '0');
      t.render(panel);
      panelsEl.appendChild(panel);
    });

    // ── Click wiring ─────────────────────────────────────────
    bar.addEventListener('click', e => {
      const btn = e.target.closest('[data-tab]');
      if (!btn) return;
      const id = btn.dataset.tab;

      bar.querySelectorAll('.tab').forEach(el => {
        const on = el.dataset.tab === id;
        el.classList.toggle('tab--active', on);
        el.setAttribute('aria-selected', on ? 'true' : 'false');
      });

      panelsEl.querySelectorAll('.tab-panel').forEach(el => {
        el.classList.toggle('tab-panel--active', el.id === `tab-panel-${id}`);
      });
    });

    // ── Keyboard arrow navigation ────────────────────────────
    bar.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      const tabs = [...bar.querySelectorAll('.tab')];
      const idx  = tabs.indexOf(document.activeElement);
      let next = idx;
      if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
      if (e.key === 'ArrowLeft')  next = (idx - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home')       next = 0;
      if (e.key === 'End')        next = tabs.length - 1;
      tabs[next].focus();
      tabs[next].click();
      e.preventDefault();
    });

    container.appendChild(barWrap);
    container.appendChild(panelsEl);
  }

  return { render };
})();
/* ============================================================
   nav.js — Primary navigation + secondary status bar
   ============================================================ */

const TetherNav = (() => {

  // Inline stethoscope mark — teal on transparent (sits on navy nav bg)
  const ICON = `
    <svg width="34" height="34" viewBox="0 0 48 52" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
      <circle cx="9"  cy="19" r="3" stroke="#00C2A8" stroke-width="2"   fill="none"/>
      <circle cx="39" cy="19" r="3" stroke="#00C2A8" stroke-width="2"   fill="none"/>
      <line x1="12"  y1="19" x2="24" y2="22" stroke="#00C2A8" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="36"  y1="19" x2="24" y2="22" stroke="#00C2A8" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="24"  y1="22" x2="24" y2="46" stroke="#00C2A8" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="24"  y1="38" x2="33" y2="33" stroke="#00C2A8" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M33,35 C30.5,33 30,31 31.2,30.2 C32,29.8 33,31 33,31 C33,31 34,29.8 34.8,30.2 C36,31 35.5,33 33,35 Z" stroke="#00C2A8" stroke-width="2" stroke-linejoin="round" fill="none"/>
    </svg>`;

  // SVG icon helpers
  const ICON_BELL = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
  const ICON_SETTINGS = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
  const ICON_SIGNOUT = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`;
  const ICON_CAL = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
  const ICON_SPARK = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C2A8" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

  // ----- Helpers -----------------------------------------------
  function _formatDate() {
    return new Date().toLocaleDateString('en-GB', {
      weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  function _getShift() {
    const h = new Date().getHours();
    return h >= 7 && h < 20
      ? { label: 'Day Shift',   cls: 'day'   }
      : { label: 'Night Shift', cls: 'night' };
  }

  function _getStats() {
    const patients = TetherData.getPatients();
    const active  = patients.filter(p => p.status !== 'acknowledged').length;
    const urgent  = patients.filter(p => p.alerts && p.alerts.length > 0).length;
    return { active, urgent };
  }

  function _defaultSummary() {
    const patients = TetherData.getPatients();
    const pending  = patients.filter(p => p.status === 'pending').length;
    const flagged  = patients.filter(p => p.alerts && p.alerts.length > 0).length;
    return `${pending} patient${pending !== 1 ? 's' : ''} require action today — ${flagged} safety flag${flagged !== 1 ? 's' : ''} require review`;
  }

  // ----- Render ------------------------------------------------
  function render(root) {
    const user  = TetherData.getCurrentUser();
    const stats = _getStats();
    const shift = _getShift();

    root.innerHTML = `
      <!-- ══ PRIMARY NAV ══════════════════════════════════════ -->
      <nav class="nav" role="banner" aria-label="Main navigation">

        <!-- LEFT: brand -->
        <a class="nav__brand" href="#"
           onclick="TetherApp.navigate('dashboard'); return false;"
           aria-label="Tether — go to dashboard">
          ${ICON}
          <div class="nav__brand-text">
            <span class="nav__wordmark">TETHER</span>
            <span class="nav__tagline">Clinical Handover Intelligence</span>
          </div>
        </a>

        <!-- CENTRE: live status pill -->
        <div class="nav__centre" role="status" aria-live="polite" aria-label="System status">
          <div class="nav__status-pill">
            <span class="nav__pulse-dot" id="nav-sync-dot" title="All systems synced"></span>
            <span class="nav__stat">
              <strong id="nav-active-count">${stats.active}</strong>
              <span>active</span>
            </span>
            <span class="nav__stat-sep" aria-hidden="true"></span>
            <span class="nav__stat nav__stat--urgent">
              <strong id="nav-urgent-count">${stats.urgent}</strong>
              <span>urgent</span>
            </span>
            <span class="nav__stat-sep" aria-hidden="true"></span>
            <span class="nav__stat nav__stat--sync" id="nav-sync-label">Synced</span>
          </div>
        </div>

        <!-- RIGHT: user + actions -->
        <div class="nav__right">
          <div class="nav__user-block">
            <span class="nav__user-name">${user.name}</span>
            <span class="nav__trust-name">${user.trust}</span>
          </div>

          <div class="nav__avatar" aria-hidden="true">${user.initials}</div>

          <button class="nav__icon-btn" id="nav-bell"
                  aria-label="Notifications (3 unread)" title="Notifications">
            ${ICON_BELL}
            <span class="nav__badge" id="nav-badge" aria-label="3 notifications">3</span>
          </button>

          <button class="nav__icon-btn"
                  aria-label="Settings" title="Settings"
                  onclick="TetherApp.navigate('settings'); return false;">
            ${ICON_SETTINGS}
          </button>

          <button class="nav__icon-btn nav__icon-btn--signout"
                  aria-label="Sign out" title="Sign out">
            ${ICON_SIGNOUT}
          </button>
          <button class="nav__hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-drawer">&#9776;</button>
        </div>
      </nav>

      <!-- ══ SECONDARY STATUS BAR ═════════════════════════════ -->
      <div class="nav-sub" role="complementary" aria-label="Shift status">
        <span class="nav-sub__date">
          ${ICON_CAL}
          ${_formatDate()}
        </span>
        <span class="nav-sub__sep" aria-hidden="true"></span>
        <span class="nav-sub__shift nav-sub__shift--${shift.cls}"
              aria-label="Current shift: ${shift.label}">
          ${shift.label}
        </span>
        <span class="nav-sub__sep" aria-hidden="true"></span>
        <span class="nav-sub__ai" id="nav-ai-summary" aria-live="polite">
          ${ICON_SPARK}
          <span id="nav-ai-text">Waiting for data sync…</span>
        </span>
      </div>
      <div class="nav-drawer" id="nav-drawer" role="dialog" aria-label="Mobile navigation menu">
        <div class="nav-drawer__status">
          <span class="nav-drawer__pill nav-drawer__pill--urgent" id="nd-urgent">${stats.urgent} urgent</span>
          <span class="nav-drawer__pill" id="nd-active">${stats.active} active</span>
          <span class="nav-drawer__pill nav-drawer__pill--sync">&#10003; Synced</span>
        </div>
        <div class="nav-drawer__user">
          <strong>${user.name}</strong>${user.role} · ${user.trust}
        </div>
        <button class="nav-drawer__link" onclick="TetherApp.navigate('dashboard'); window.navCloseDrawer();">&#128200; Live Dashboard</button>
        <button class="nav-drawer__link" onclick="TetherApp.navigate('transitions'); window.navCloseDrawer();">&#128203; All Transitions</button>
        <button class="nav-drawer__link" onclick="TetherApp.navigate('discharge'); window.navCloseDrawer();">&#128196; Discharge Summaries</button>
        <button class="nav-drawer__link" onclick="TetherApp.navigate('pending'); window.navCloseDrawer();">&#128202; Pending Results</button>
        <button class="nav-drawer__link" onclick="TetherApp.navigate('tasks'); window.navCloseDrawer();">&#9989; Task Tracker</button>
        <button class="nav-drawer__link" onclick="TetherApp.navigate('settings'); window.navCloseDrawer();">&#9881; Settings</button>
        <button class="nav-drawer__link nav-drawer__link--danger">&#8594; Sign Out</button>
      </div>`;

    _setupHamburger();
    // Populate default summary from mock data
    updateAISummary(_defaultSummary());
  }

  function _setupHamburger() {
    const btn    = document.getElementById('nav-hamburger');
    const drawer = document.getElementById('nav-drawer');
    if (!btn || !drawer) return;
    btn.addEventListener('click', () => {
      const open = drawer.classList.toggle('nav-drawer--open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', e => {
      if (!drawer.contains(e.target) && e.target !== btn) {
        drawer.classList.remove('nav-drawer--open');
        btn.setAttribute('aria-expanded', 'false');
      }
    }, true);
  }

  window.navCloseDrawer = function() {
    const drawer = document.getElementById('nav-drawer');
    const btn    = document.getElementById('nav-hamburger');
    if (drawer) drawer.classList.remove('nav-drawer--open');
    if (btn)    btn.setAttribute('aria-expanded', 'false');
  };

  // ----- Public API --------------------------------------------
  function updateAISummary(text) {
    const el = document.getElementById('nav-ai-text');
    if (el) el.textContent = text;
  }

  function updateStats() {
    const s = _getStats();
    const a = document.getElementById('nav-active-count');
    const u = document.getElementById('nav-urgent-count');
    if (a) a.textContent = s.active;
    if (u) u.textContent = s.urgent;
    const ndU = document.getElementById('nd-urgent');
    const ndA = document.getElementById('nd-active');
    if (ndU) ndU.textContent = `${s.urgent} urgent`;
    if (ndA) ndA.textContent = `${s.active} active`;
  }

  function setBadgeCount(n) {
    const el = document.getElementById('nav-badge');
    if (!el) return;
    el.textContent = n;
    el.style.display = n > 0 ? 'flex' : 'none';
  }

  function setSyncState(synced) {
    const dot   = document.getElementById('nav-sync-dot');
    const label = document.getElementById('nav-sync-label');
    if (!dot || !label) return;
    if (synced) {
      dot.classList.remove('nav__pulse-dot--error');
      label.textContent = 'Synced';
      label.style.color = '';
    } else {
      dot.classList.add('nav__pulse-dot--error');
      label.textContent = 'Offline';
      label.style.color = 'var(--tether-alert)';
    }
  }

  return { render, updateAISummary, updateStats, setBadgeCount, setSyncState };
})();
/* ============================================================
   views.js — All 7 tab view stubs
   ============================================================ */

const TetherViews = (() => {

  // ── Mock pending results (extend data.js in later step) ──
  const PENDING_RESULTS = [
    { id:'r1', patient:'Margaret Thornton', nhs:'943 476 5421', test:'Troponin (serial 6h)',  by:'Prof. J. Hargreaves', date:'2026-04-04', urgency:'urgent',  safety_critical:true,  owned:false, owner:null,             note:'Serial troponin post-PCI — not yet reviewed' },
    { id:'r2', patient:'Derek Osei-Bonsu',  nhs:'512 834 9901', test:'Arterial blood gas',    by:'Dr. E. Crawford',    date:'2026-04-04', urgency:'urgent',  safety_critical:true,  owned:false, owner:null,             note:'Post-nebuliser ABG required before discharge' },
    { id:'r3', patient:'Phyllis Kamara',    nhs:'761 234 0087', test:'INR check',             by:'Mr. D. Fischer',     date:'2026-04-06', urgency:'routine', safety_critical:false, owned:true,  owner:'Mr. D. Fischer', note:'Warfarin bridge — target INR 2.0–3.0' },
    { id:'r4', patient:'Phyllis Kamara',    nhs:'761 234 0087', test:'FBC / post-op bloods',  by:'Mr. D. Fischer',     date:'2026-04-06', urgency:'routine', safety_critical:false, owned:true,  owner:'Mr. D. Fischer', note:'Day 6 post-op baseline bloods' },
  ];

  let _nsAutoSaveTimer = null;

  // ── Helpers ─────────────────────────────────────────────────
  function statusBadge(status) {
    return `<span class="badge ${TetherData.getStatusBadgeClass(status)}">${TetherData.getStatusLabel(status)}</span>`;
  }

  function urgencyBadge(u) {
    return u === 'urgent'
      ? `<span class="badge badge--alert">Urgent</span>`
      : `<span class="badge badge--muted">Routine</span>`;
  }

  // ══════════════════════════════════════════════════════════
  // 1. LIVE DASHBOARD
  // ══════════════════════════════════════════════════════════
  function _defaultInsight(patients) {
    const pending = patients.filter(p => p.status === 'pending').length;
    const flagged = patients.filter(p => p.alerts && p.alerts.length > 0).length;
    const sent    = patients.filter(p => p.status === 'sent').length;
    return `Shift overview — ${patients.length} active transitions on caseload.\n\n${pending} patient${pending!==1?'s':''} require discharge summary action today. ${flagged} active safety flag${flagged!==1?'s':''} require review before handover. ${sent} summary${sent!==1?' summaries are':' is'} transmitted and awaiting GP acknowledgement.\n\nClick "Generate Insight" for an AI-generated clinical briefing.`;
  }

  function openPatientModal(id) {
    const p = TetherData.getPatient(id);
    if (!p) return;
    document.getElementById('pm-overlay')?.remove();

    const user = TetherData.getCurrentUser();

    let riskClass, riskLabel;
    if (p.alerts.length > 0 && p.status === 'pending') {
      riskClass = 'pm-risk-badge--critical'; riskLabel = 'Critical';
    } else if (p.status === 'sent' || p.status === 'acknowledged') {
      riskClass = 'pm-risk-badge--safe'; riskLabel = 'Safe';
    } else {
      riskClass = 'pm-risk-badge--atrisk'; riskLabel = 'At Risk';
    }

    const ptResults = PENDING_RESULTS.filter(r => r.patient === p.name);

    const tlItems = [
      { type: 'admission', date: p.admissionDate, label: 'Admission', note: `${p.ward} — ${p.consultant}` },
      ...p.medications.filter(m => m.changed).map(m => ({
        type: 'event', date: p.admissionDate, label: `Medication change: ${m.name}`, note: m.changeNote,
      })),
      ...p.followUp.map(f => ({
        type: f.date && new Date(f.date) <= new Date() ? 'event' : 'discharge',
        date: f.date || 'TBC', label: f.type,
        note: f.urgency === 'urgent' ? 'Urgent follow-up' : 'Routine follow-up',
      })),
      { type: 'discharge', date: p.expectedDischarge, label: 'Expected Discharge', note: '' },
    ];

    const fhirData = JSON.stringify({
      resourceType: 'Patient',
      id: p.id,
      identifier: [{ system: 'https://fhir.nhs.uk/Id/nhs-number', value: p.nhsNumber.replace(/\s/g,'') }],
      name: [{ family: p.name.split(' ').slice(1).join(' '), given: [p.name.split(' ')[0]] }],
      birthDate: p.dob,
      gender: p.gender.toLowerCase(),
      address: [{ text: p.address }],
      generalPractitioner: [{ display: `${p.gp.name} — ${p.gp.practice} (${p.gp.odsCode})` }],
    }, null, 2);

    const TAB_LABELS = { info:'Patient Info', diagnosis:'Diagnosis', medications:'Medications',
      results:'Pending Results', gptasks:'GP Tasks', timeline:'Timeline',
      discharge:'Discharge Status', fhir:'FHIR Data', ainotes:'AI Notes' };

    const html = `
<div class="pm-overlay" id="pm-overlay">
  <div class="pm-modal" role="dialog" aria-modal="true" aria-label="${p.name} — Patient Details">
    <div class="pm-header">
      <div class="pm-header__left">
        <div class="pm-name">${p.name}</div>
        <div class="pm-nhs">NHS: ${p.nhsNumber} &nbsp;&middot;&nbsp; ${p.age}y ${p.gender}</div>
        <div class="pm-trust">${user.trust}</div>
      </div>
      <div class="pm-header__right">
        <span class="pm-risk-badge ${riskClass}">${riskLabel}</span>
        <button class="pm-close" onclick="document.getElementById('pm-overlay')?.remove()" aria-label="Close">&times;</button>
      </div>
    </div>
    <div class="pm-tabs" id="pm-tabs">
      ${Object.keys(TAB_LABELS).map((t,i) =>
        `<button class="pm-tab${i===0?' pm-tab--active':''}" data-tab="${t}" onclick="pmSwitchTab('${t}')">${TAB_LABELS[t]}</button>`
      ).join('')}
    </div>
    <div class="pm-body">

      <!-- 1. Patient Info -->
      <div class="pm-panel pm-panel--active" data-panel="info">
        <div class="pm-info-grid">
          <div class="pm-info-item"><div class="pm-info-item__label">Date of Birth</div><div class="pm-info-item__value">${p.dob}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">Age / Gender</div><div class="pm-info-item__value">${p.age} years &middot; ${p.gender}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">Address</div><div class="pm-info-item__value">${p.address}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">NHS Number</div><div class="pm-info-item__value" style="font-family:'IBM Plex Mono',monospace">${p.nhsNumber}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">GP</div><div class="pm-info-item__value">${p.gp.name}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">GP Practice</div><div class="pm-info-item__value">${p.gp.practice}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">ODS Code</div><div class="pm-info-item__value" style="font-family:'IBM Plex Mono',monospace">${p.gp.odsCode}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">Ward</div><div class="pm-info-item__value">${p.ward}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">Consultant</div><div class="pm-info-item__value">${p.consultant}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">Trust</div><div class="pm-info-item__value">${user.trust}</div></div>
        </div>
      </div>

      <!-- 2. Diagnosis -->
      <div class="pm-panel" data-panel="diagnosis">
        <div class="section-label" style="margin-bottom:10px">Primary Diagnosis</div>
        <div style="font-size:1.1rem;font-weight:600;margin-bottom:18px">${p.diagnosis}</div>
        ${p.alerts.length ? `
          <div class="section-label" style="margin-bottom:8px">Active Alerts</div>
          <div class="alert alert--alert">
            ${p.alerts.map(a => `<div style="padding:3px 0;display:flex;gap:8px;align-items:center"><span style="color:var(--tether-alert)">&#9888;</span><span>${a}</span></div>`).join('')}
          </div>` : '<p class="text-sm text-muted">No active alerts.</p>'}
      </div>

      <!-- 3. Medications -->
      <div class="pm-panel" data-panel="medications">
        <div class="section-label" style="margin-bottom:12px">Medication List</div>
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:0.83rem">
            <thead>
              <tr style="background:var(--tether-bg)">
                <th style="text-align:left;padding:7px 10px;border-bottom:1px solid var(--tether-border)">Medication</th>
                <th style="text-align:left;padding:7px 10px;border-bottom:1px solid var(--tether-border)">Dose &amp; Route</th>
                <th style="text-align:left;padding:7px 10px;border-bottom:1px solid var(--tether-border)">Change Note</th>
              </tr>
            </thead>
            <tbody>
              ${p.medications.map(m => `
                <tr style="${m.changed ? 'background:rgba(245,166,35,0.06)' : ''}">
                  <td style="padding:7px 10px;border-bottom:1px solid var(--tether-border);font-weight:${m.changed?600:400}">
                    ${m.name}${m.changed ? ' <span class="badge badge--warn" style="font-size:0.62rem;padding:1px 6px;vertical-align:middle">Changed</span>' : ''}
                  </td>
                  <td style="padding:7px 10px;border-bottom:1px solid var(--tether-border)">${m.dose} &middot; ${m.route}</td>
                  <td style="padding:7px 10px;border-bottom:1px solid var(--tether-border);color:var(--text-muted);font-size:0.78rem">${m.changeNote || '&mdash;'}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- 4. Pending Results -->
      <div class="pm-panel" data-panel="results">
        <div class="section-label" style="margin-bottom:12px">Pending Results</div>
        ${ptResults.length ? ptResults.map(r => `
          <div class="result-card ${r.safety_critical ? 'result-card--critical' : r.owned ? 'result-card--owned' : ''}">
            <div class="result-card__head">
              <div>
                <div style="font-weight:600;font-size:0.85rem">${r.test}${r.safety_critical ? ' <span class="badge badge--flash" style="font-size:0.62rem">Safety Critical</span>' : ''}</div>
                <div class="text-xs text-muted">${r.by} &middot; ${r.date}</div>
              </div>
              ${r.owned ? `<span class="badge badge--safe">Owned &mdash; ${r.owner}</span>` : '<span class="badge badge--alert">Unowned</span>'}
            </div>
            ${r.note ? `<div class="text-xs text-muted" style="margin-top:5px">${r.note}</div>` : ''}
          </div>`).join('') : '<p class="text-sm text-muted">No pending results for this patient.</p>'}
      </div>

      <!-- 5. GP Tasks -->
      <div class="pm-panel" data-panel="gptasks">
        <div class="section-label" style="margin-bottom:12px">Follow-up Plan for GP</div>
        ${p.followUp.map((f,i) => `
          <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--tether-border)">
            <span style="font-weight:700;color:var(--tether-accent);min-width:20px;font-size:0.82rem">${i+1}.</span>
            <div style="flex:1">
              <div style="font-size:0.88rem;font-weight:600">${f.type}</div>
              ${f.date ? `<div class="text-xs text-muted">By ${f.date}</div>` : ''}
            </div>
            ${f.urgency === 'urgent'
              ? '<span class="badge badge--alert" style="flex-shrink:0">Urgent</span>'
              : '<span class="badge badge--muted" style="flex-shrink:0">Routine</span>'}
          </div>`).join('')}
      </div>

      <!-- 6. Timeline -->
      <div class="pm-panel" data-panel="timeline">
        <div class="section-label" style="margin-bottom:16px">Clinical Timeline</div>
        <div class="pm-timeline">
          ${tlItems.map(ev => `
            <div class="pm-tl-item pm-tl-item--${ev.type}">
              <div class="pm-tl-item__date">${ev.date}</div>
              <div class="pm-tl-item__label">${ev.label}</div>
              ${ev.note ? `<div class="pm-tl-item__note">${ev.note}</div>` : ''}
            </div>`).join('')}
        </div>
      </div>

      <!-- 7. Discharge Status -->
      <div class="pm-panel" data-panel="discharge">
        <div class="section-label" style="margin-bottom:12px">Discharge Status</div>
        <div class="pm-info-grid" style="margin-bottom:20px">
          <div class="pm-info-item"><div class="pm-info-item__label">Status</div><div class="pm-info-item__value">${statusBadge(p.status)}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">Admission</div><div class="pm-info-item__value">${p.admissionDate}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">Expected Discharge</div><div class="pm-info-item__value" style="font-weight:700">${p.expectedDischarge}</div></div>
          <div class="pm-info-item"><div class="pm-info-item__label">Consultant</div><div class="pm-info-item__value">${p.consultant}</div></div>
        </div>
        ${p.alerts.length ? `
          <div class="alert alert--warn">
            <strong style="display:block;margin-bottom:5px">Active safety flags — review before discharge</strong>
            ${p.alerts.map(a => `<div style="padding:2px 0">&#9888; ${a}</div>`).join('')}
          </div>` : ''}
      </div>

      <!-- 8. FHIR Data -->
      <div class="pm-panel" data-panel="fhir">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <div class="section-label" style="margin-bottom:0">FHIR R4 Patient Resource</div>
          <button class="btn btn--ghost btn--sm" onclick="navigator.clipboard?.writeText(document.getElementById('pm-fhir-text').textContent).then(()=>TetherToast.success('FHIR JSON copied'))">Copy JSON</button>
        </div>
        <pre class="pm-fhir-code" id="pm-fhir-text">${fhirData.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
      </div>

      <!-- 9. AI Notes -->
      <div class="pm-panel" data-panel="ainotes">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <div class="section-label" style="margin-bottom:0">AI Discharge Summary Draft</div>
          <button class="btn btn--ghost btn--sm" id="pm-ai-gen-btn" onclick="pmGenerateAINotes('${id}')">&#10022; Generate</button>
          <button class="btn btn--ghost btn--sm" onclick="navigator.clipboard?.writeText(document.getElementById('pm-ai-notes').value).then(()=>TetherToast.success('Copied'))">Copy</button>
        </div>
        <textarea class="pm-ai-textarea" id="pm-ai-notes" placeholder="Click \u201cGenerate\u201d to draft a discharge summary with AI, or type notes here\u2026"></textarea>
      </div>

    </div><!-- /pm-body -->
    <div class="pm-footer">
      <button class="btn btn--primary btn--sm" onclick="TetherToast.success('GP acknowledgement recorded for ${p.name.replace(/'/g,"\\'")}')">Acknowledge GP</button>
      <button class="btn btn--secondary btn--sm" onclick="TetherToast.info('Pushing to GP system via MESH\u2026')">Push to GP System</button>
      <button class="btn btn--ghost btn--sm" onclick="window.print()">Print</button>
      <button class="btn btn--ghost btn--sm" onclick="TetherToast.info('PDF download \u2014 requires server-side rendering')">Download PDF</button>
      <div class="pm-footer__spacer"></div>
      <button class="btn btn--ghost btn--sm" onclick="document.getElementById('pm-overlay')?.remove()">Close</button>
    </div>
  </div><!-- /pm-modal -->
</div>`;

    document.body.insertAdjacentHTML('beforeend', html);

    window.pmSwitchTab = function(tab) {
      document.querySelectorAll('#pm-overlay .pm-tab').forEach(t =>
        t.classList.toggle('pm-tab--active', t.dataset.tab === tab));
      document.querySelectorAll('#pm-overlay .pm-panel').forEach(panel =>
        panel.classList.toggle('pm-panel--active', panel.dataset.panel === tab));
    };

    document.getElementById('pm-overlay').addEventListener('click', function(e) {
      if (e.target === this) this.remove();
    });

    window.pmGenerateAINotes = async function(patientId) {
      const patient = TetherData.getPatient(patientId);
      if (!patient) return;
      const ta  = document.getElementById('pm-ai-notes');
      const btn = document.getElementById('pm-ai-gen-btn');
      if (!ta || !btn) return;
      ta.value = '';
      btn.disabled = true;
      btn.innerHTML = '<span class="ai-spinner ai-spinner--dark"></span> Generating\u2026';
      try {
        const events = patient.medications.filter(m => m.changed)
          .map(m => `${m.name}: ${m.changeNote}`).join('\n') || 'No significant medication changes';
        const meds = patient.medications.map(m => `${m.name} ${m.dose} ${m.route}`).join(', ');
        const ptRes = PENDING_RESULTS.filter(r => r.patient === patient.name).map(r => r.test).join(', ') || 'None';
        for await (const chunk of TetherAI.streamDischargeDraft({
          name: patient.name, nhs: patient.nhsNumber,
          diagnosis: patient.diagnosis, events, medications: meds, pendingResults: ptRes,
        })) {
          ta.value += chunk;
          ta.scrollTop = ta.scrollHeight;
        }
      } catch (err) {
        ta.value = 'Error generating summary: ' + err.message;
        TetherToast.error('AI generation failed');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '&#10022; Regenerate';
      }
    };
  }

  function renderLiveDashboard(el) {
    const patients          = TetherData.getPatients();
    const urgentPatients    = patients.filter(p => p.alerts.length > 0 && p.status === 'pending');
    const awaitPatients     = patients.filter(p => p.status === 'sent');
    const completedPatients = patients.filter(p => p.status === 'acknowledged');

    function riskDot(p) {
      if (p.alerts.length > 0 && p.status === 'pending')
        return `<span class="risk-dot risk-dot--red" title="High risk — urgent action required"></span>`;
      if (p.status === 'sent' || p.status === 'acknowledged')
        return `<span class="risk-dot risk-dot--green" title="Low risk"></span>`;
      return `<span class="risk-dot risk-dot--amber" title="Medium risk — action pending"></span>`;
    }

    el.innerHTML = `
      <!-- KPI Strip -->
      <div class="kpi-row" style="margin-bottom:20px">
        <div class="kpi-card kpi-card--teal">
          <div class="kpi-card__value">${patients.length}</div>
          <div class="kpi-card__label">Active Transitions</div>
          <div class="kpi-card__trend kpi-card__trend--up">↑ 1 since yesterday</div>
        </div>
        <div class="kpi-card kpi-card--alert">
          <div class="kpi-card__value kpi-card__value--pulse">${urgentPatients.length}</div>
          <div class="kpi-card__label">Urgent Actions</div>
          <div class="kpi-card__trend kpi-card__trend--down">⚠ Requires immediate review</div>
        </div>
        <div class="kpi-card kpi-card--warn">
          <div class="kpi-card__value">${awaitPatients.length}</div>
          <div class="kpi-card__label">Awaiting GP Acknowledgement</div>
          <div class="kpi-card__trend kpi-card__trend--flat">→ No change today</div>
        </div>
        <div class="kpi-card kpi-card--safe">
          <div class="kpi-card__value">${completedPatients.length}</div>
          <div class="kpi-card__label">Completed This Week</div>
          <div class="kpi-card__trend kpi-card__trend--up">↑ On track</div>
        </div>
      </div>

      <!-- AI Insight Panel -->
      <div class="ai-panel" style="margin-bottom:20px">
        <div class="ai-panel__header">
          <div class="ai-panel__icon">✦</div>
          <div>
            <div class="ai-panel__title">Tether Intelligence</div>
            <div class="ai-panel__subtitle">AI-generated shift overview · refreshes on each FHIR sync</div>
          </div>
          <button id="dash-insight-btn"
                  style="margin-left:auto;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.20);color:#fff;padding:6px 14px;border-radius:6px;font-family:inherit;font-size:0.8rem;font-weight:600;cursor:pointer;white-space:nowrap;"
                  onclick="dashGenerateInsight()">
            Generate Insight
          </button>
        </div>
        <div class="ai-panel__output" id="dash-ai-output">${_defaultInsight(patients)}</div>
      </div>

      <!-- Two-column body -->
      <div class="dashboard-body">

        <!-- LEFT: live transitions table -->
        <div class="card">
          <div class="card__header">
            <h2 class="card__title">Live Transitions</h2>
            <span class="badge badge--muted">${patients.length} active</span>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr>
                <th style="width:32px">Risk</th>
                <th>Patient</th><th>NHS No.</th><th>GP Practice</th>
                <th>Exp. Discharge</th><th>Summary Status</th>
              </tr></thead>
              <tbody>${patients.map(p => `
                <tr onclick="dashOpenPatient('${p.id}')">
                  <td style="text-align:center">${riskDot(p)}</td>
                  <td>
                    <div class="font-bold" style="font-size:0.875rem">${p.name}</div>
                    <div class="text-xs text-muted">${p.ward}</div>
                  </td>
                  <td class="font-mono text-sm">${p.nhsNumber}</td>
                  <td>
                    <div class="text-sm">${p.gp.name}</div>
                    <div class="text-xs text-muted">${p.gp.practice}</div>
                  </td>
                  <td class="text-sm">${p.expectedDischarge}</td>
                  <td>${statusBadge(p.status)}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- RIGHT: sidebar panels -->
        <div class="dashboard-sidebar flex flex-col gap-4">

          <!-- Urgent Actions -->
          <div class="card" style="padding:0;overflow:hidden">
            <div class="sidebar-panel__head sidebar-panel__head--urgent">
              ⚠ Urgent Actions
              <span class="tab-badge tab-badge--urgent" style="margin-left:auto">${urgentPatients.length}</span>
            </div>
            <div class="sidebar-panel__body">
              ${urgentPatients.length
                ? urgentPatients.map(p => `
                    <div class="sidebar-item">
                      <span class="risk-dot risk-dot--red" style="margin-top:3px;flex-shrink:0"></span>
                      <div>
                        <div class="sidebar-item__name">${p.name}</div>
                        <div class="sidebar-item__detail">${p.alerts[0]}${p.alerts.length > 1 ? ` +${p.alerts.length-1} more` : ''}</div>
                      </div>
                    </div>`).join('')
                : `<p class="text-sm text-muted" style="padding:4px 0">No urgent actions</p>`}
            </div>
          </div>

          <!-- Awaiting Acknowledgement -->
          <div class="card" style="padding:0;overflow:hidden">
            <div class="sidebar-panel__head sidebar-panel__head--amber">
              ◷ Awaiting Acknowledgement
              <span style="margin-left:auto;background:rgba(245,166,35,0.15);color:#A66200;font-size:0.68rem;font-weight:700;padding:1px 7px;border-radius:99px">${awaitPatients.length}</span>
            </div>
            <div class="sidebar-panel__body">
              ${awaitPatients.length
                ? awaitPatients.map(p => `
                    <div class="sidebar-item">
                      <span class="risk-dot risk-dot--amber" style="margin-top:3px;flex-shrink:0"></span>
                      <div>
                        <div class="sidebar-item__name">${p.name}</div>
                        <div class="sidebar-item__detail">Sent · awaiting ${p.gp.practice}</div>
                      </div>
                    </div>`).join('')
                : `<p class="text-sm text-muted" style="padding:4px 0">All summaries acknowledged</p>`}
            </div>
          </div>

          <!-- Recently Completed -->
          <div class="card" style="padding:0;overflow:hidden" id="sidebar-completed-panel">
            <div class="sidebar-panel__head sidebar-panel__head--sync">
              ✓ Recently Completed
              <span style="margin-left:auto;background:rgba(0,135,90,0.15);color:var(--tether-safe);font-size:0.68rem;font-weight:700;padding:1px 7px;border-radius:99px">${completedPatients.length}</span>
            </div>
            <div class="sidebar-panel__body">
              ${completedPatients.length
                ? completedPatients.map(p => `
                    <div class="sidebar-item">
                      <span class="risk-dot risk-dot--green" style="margin-top:3px;flex-shrink:0"></span>
                      <div>
                        <div class="sidebar-item__name">${p.name}</div>
                        <div class="sidebar-item__detail">${p.diagnosis} · GP acknowledged</div>
                      </div>
                    </div>`).join('')
                : `<p class="text-sm text-muted" style="padding:4px 0">No completions yet this week</p>`}
            </div>
          </div>

          <!-- Sync Status -->
          <div class="card" style="padding:0;overflow:hidden">
            <div class="sidebar-panel__head sidebar-panel__head--sync">
              ⟳ Sync Status
            </div>
            <div class="sidebar-panel__body">
              <div class="sync-info-list" style="gap:6px">
                <div class="sync-row" style="padding-bottom:6px">
                  <span class="text-muted" style="font-size:0.78rem">Last FHIR pull</span>
                  <span class="text-sm">Today, 08:47</span>
                </div>
                <div class="sync-row" style="padding-bottom:6px">
                  <span class="text-muted" style="font-size:0.78rem">Records</span>
                  <span class="text-sm">${patients.length} patients synced</span>
                </div>
                <div class="sync-row" style="border:none;padding-bottom:0">
                  <span class="text-muted" style="font-size:0.78rem">Status</span>
                  <span class="badge badge--safe" style="font-size:0.68rem">● Live</span>
                </div>
              </div>
              <button class="btn btn--ghost btn--sm w-full" style="margin-top:10px"
                      onclick="TetherToast.info('Sync initiated…')">
                Re-sync FHIR
              </button>
            </div>
          </div>

        </div><!-- /sidebar -->
      </div><!-- /dashboard-body -->`;

    // Patient row click → full-screen patient modal
    window.dashOpenPatient = function(id) { openPatientModal(id); };

    // AI insight button
    window.dashGenerateInsight = async function() {
      const btn = document.getElementById('dash-insight-btn');
      const out = document.getElementById('dash-ai-output');
      if (!btn || !out) return;
      btn.disabled = true;
      btn.innerHTML = '<span class="ai-spinner"></span>Generating\u2026';
      out.style.opacity = '0.5';
      try {
        const text = await TetherAI.generateRiskInsight(TetherData.getPatients(), PENDING_RESULTS);
        out.style.opacity = '';
        out.textContent = text;
        const ts = document.createElement('div');
        ts.style.cssText = 'margin-top:10px;font-size:0.72rem;opacity:0.45;font-family:var(--font-mono)';
        ts.textContent = `Generated ${new Date().toLocaleTimeString('en-GB')}`;
        out.appendChild(ts);
      } catch {
        out.style.opacity = '';
        out.textContent = _defaultInsight(TetherData.getPatients());
        TetherToast.warning('AI proxy offline \u2014 showing local summary');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Generate Insight';
      }
    };
  }

  // ══════════════════════════════════════════════════════════
  // 2. DISCHARGE SUMMARIES
  // ══════════════════════════════════════════════════════════
  function renderDischargeSummaries(el) {
    const patients = TetherData.getPatients();

    function timeSinceSent(p) {
      if (p.status !== 'sent' && p.status !== 'acknowledged') return '&mdash;';
      const diffH = Math.floor((new Date() - new Date(p.expectedDischarge)) / 3600000);
      if (diffH < 0)  return 'Sent today';
      if (diffH < 24) return `${diffH}h ago`;
      return `${Math.floor(diffH / 24)}d ago`;
    }

    function rowClass(s) {
      return { pending:'summary-row--pending', draft:'summary-row--draft', sent:'summary-row--sent', acknowledged:'summary-row--acknowledged' }[s] || '';
    }

    function statusCell(p) {
      if (p.status === 'pending')
        return `<div class="flex items-center gap-2"><span class="pulse-dot"></span>${statusBadge(p.status)}</div>`;
      return statusBadge(p.status);
    }

    el.innerHTML = `
      <div class="card">
        <div class="card__header">
          <h2 class="card__title">Discharge Summaries</h2>
          <div class="flex gap-2 items-center">
            <span class="badge badge--muted">${patients.length} total</span>
            <button class="btn btn--sm btn--navy" onclick="dsBulkRemind()">Bulk Remind</button>
          </div>
        </div>

        <!-- Filter row -->
        <div class="filter-row mb-4" id="ds-filter-row">
          <button class="filter-btn filter-btn--active" data-filter="all"         onclick="dsFilter('all')">All <span style="opacity:0.6;font-weight:400">${patients.length}</span></button>
          <button class="filter-btn"                    data-filter="pending"      onclick="dsFilter('pending')">Pending <span style="opacity:0.6;font-weight:400">${patients.filter(p=>p.status==='pending').length}</span></button>
          <button class="filter-btn"                    data-filter="draft"        onclick="dsFilter('draft')">Draft <span style="opacity:0.6;font-weight:400">${patients.filter(p=>p.status==='draft').length}</span></button>
          <button class="filter-btn"                    data-filter="sent"         onclick="dsFilter('sent')">Sent <span style="opacity:0.6;font-weight:400">${patients.filter(p=>p.status==='sent').length}</span></button>
          <button class="filter-btn"                    data-filter="acknowledged" onclick="dsFilter('acknowledged')">Acknowledged <span style="opacity:0.6;font-weight:400">${patients.filter(p=>p.status==='acknowledged').length}</span></button>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Patient</th>
              <th>Discharge Date</th>
              <th>Ward</th>
              <th>Consultant</th>
              <th>GP Practice</th>
              <th>Status</th>
              <th>Time Since Sent</th>
              <th></th>
            </tr></thead>
            <tbody id="ds-table-body">
              ${patients.map(p => `
                <tr class="summary-row ${rowClass(p.status)}" data-status="${p.status}">
                  <td>
                    <div class="font-bold" style="font-size:0.875rem">${p.name}</div>
                    <div class="text-xs font-mono text-muted">${p.nhsNumber}</div>
                  </td>
                  <td class="text-sm">${p.expectedDischarge}</td>
                  <td class="text-sm">${p.ward}</td>
                  <td class="text-sm">${p.consultant}</td>
                  <td>
                    <div class="text-sm">${p.gp.name}</div>
                    <div class="text-xs text-muted">${p.gp.practice}</div>
                  </td>
                  <td>${statusCell(p)}</td>
                  <td class="text-sm text-muted">${timeSinceSent(p)}</td>
                  <td><button class="btn btn--sm btn--primary" onclick="dsOpenPatient('${p.id}')">View</button></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;

    window.dsBulkRemind = function() {
      const n = TetherData.getPatients().filter(p => p.status === 'sent').length;
      if (n === 0) { TetherToast.warning('No summaries currently awaiting acknowledgement'); return; }
      TetherToast.success(`Reminder sent to ${n} GP practice${n !== 1 ? 's' : ''}`);
    };

    window.dsFilter = function(filter) {
      document.querySelectorAll('#ds-filter-row .filter-btn').forEach(btn =>
        btn.classList.toggle('filter-btn--active', btn.dataset.filter === filter)
      );
      document.querySelectorAll('#ds-table-body .summary-row').forEach(row => {
        row.style.display = (filter === 'all' || row.dataset.status === filter) ? '' : 'none';
      });
    };

    window.dsOpenPatient = function(id) { openPatientModal(id); };
  }

  // ══════════════════════════════════════════════════════════
  // 3. PENDING RESULTS
  // ══════════════════════════════════════════════════════════
  function renderPendingResults(el) {
    function ownerBadge(r) {
      if (r.owned) return `<span class="badge badge--safe">Owned &mdash; ${r.owner}</span>`;
      return `<span class="badge badge--alert">Unowned</span>`;
    }

    function cardClass(r) {
      if (r.safety_critical) return 'result-card result-card--critical';
      if (r.owned) return 'result-card result-card--owned';
      return 'result-card';
    }

    function renderCard(r) {
      return `
        <div class="${cardClass(r)}" id="rc-${r.id}">
          <div class="result-card__head">
            <div class="flex items-center gap-2" style="flex-wrap:wrap">
              ${r.safety_critical ? `<span class="badge badge--alert badge--flash">Safety-Critical</span>` : ''}
              <span class="result-card__test-name">${r.test}</span>
            </div>
            <div id="rc-owner-${r.id}">${ownerBadge(r)}</div>
          </div>
          <div class="result-card__meta">
            <div><strong>Patient</strong> ${r.patient} <span class="font-mono" style="font-size:0.78rem">${r.nhs}</span></div>
            <div><strong>Ordered by</strong> ${r.by}</div>
            <div><strong>Date</strong> ${r.date}</div>
            <div>${urgencyBadge(r.urgency)}</div>
          </div>
          <div class="result-card__note">${r.note}</div>
          <div class="result-card__actions" id="rc-actions-${r.id}">
            ${r.owned
              ? `<button class="btn btn--sm btn--secondary">Review</button>`
              : `<button class="btn btn--sm btn--primary" onclick="prAssign('${r.id}','Hospital Team')">Assign to Hospital</button>
                 <button class="btn btn--sm btn--navy"    onclick="prAssign('${r.id}','GP Practice')">Assign to GP</button>
                 ${r.safety_critical ? `<button class="btn btn--sm btn--danger" onclick="prEscalate('${r.id}')">Escalate</button>` : ''}`
            }
          </div>
        </div>`;
    }

    el.innerHTML = `
      <div class="alert alert--alert mb-4" style="display:flex;gap:10px;align-items:center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="flex-shrink:0">
          <path d="M10 2L18 17H2L10 2Z" stroke="#E5342A" stroke-width="1.8" stroke-linejoin="round" fill="none"/>
          <line x1="10" y1="8" x2="10" y2="12" stroke="#E5342A" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="10" cy="14.5" r="0.8" fill="#E5342A"/>
        </svg>
        <div>
          <strong>Unowned results are a patient safety risk.</strong>
          Every result must have a named owner before handover.
        </div>
      </div>
      <div id="pr-results-list">
        ${PENDING_RESULTS.map(r => renderCard(r)).join('')}
      </div>`;

    window.prAssign = function(id, assignee) {
      const r = PENDING_RESULTS.find(r => r.id === id);
      if (!r) return;
      r.owned = true;
      r.owner = assignee;
      const card = document.getElementById('rc-' + id);
      if (card) {
        card.className = cardClass(r);
        document.getElementById('rc-owner-' + id).innerHTML = ownerBadge(r);
        document.getElementById('rc-actions-' + id).innerHTML = `<button class="btn btn--sm btn--secondary">Review</button>`;
      }
      TetherToast.success(`Result assigned to ${assignee}`);
      TetherViews.refreshBadges();
    };

    window.prEscalate = function(id) {
      const r = PENDING_RESULTS.find(r => r.id === id);
      if (!r) return;
      TetherModal.open({
        title: 'Escalate Safety-Critical Result',
        body: `
          <div class="alert alert--alert" style="margin-bottom:14px">
            <strong>&#9888; Safety-Critical</strong> — this action will notify the on-call clinical lead immediately.
          </div>
          <p class="text-sm" style="margin-bottom:8px">You are escalating:</p>
          <div style="background:var(--tether-surface);border-radius:6px;padding:10px 12px;margin-bottom:14px">
            <div class="font-bold text-sm">${r.test}</div>
            <div class="text-xs text-muted">${r.patient} &middot; ${r.nhs}</div>
            <div class="text-xs text-muted" style="margin-top:4px">${r.note}</div>
          </div>
          <p class="text-sm text-muted">On-call clinical lead will be bleeped at <strong>2241</strong>. This action is logged and auditable.</p>`,
        actions: [
          { label: 'Confirm Escalation', className: 'btn--danger', onClick: d => {
            TetherToast.warning(`Result escalated to clinical lead \u2014 bleep 2241`);
            d();
          }},
          { label: 'Cancel', className: 'btn--secondary', onClick: d => d() },
        ],
      });
    };
  }

  // ══════════════════════════════════════════════════════════
  // 4. TASK TRACKER
  // ══════════════════════════════════════════════════════════
  function renderTaskTracker(el) {
    const patients     = TetherData.getPatients();
    const allTasks     = patients.flatMap(p => p.followUp.map((f,i) => ({ ...f, patientName:p.name, patientId:p.id, taskIdx:i })));
    const pendingTasks = allTasks.filter(t => !t.done);
    const urgentTasks  = pendingTasks.filter(t => t.urgency === 'urgent');

    el.innerHTML = `
      <div class="card">
        <div class="card__header">
          <h2 class="card__title">Task Tracker</h2>
          <div class="flex gap-2">
            <span class="badge badge--alert">${urgentTasks.length} urgent</span>
            <span class="badge badge--muted">${pendingTasks.length} pending</span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Task</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${allTasks
                .sort((a,b) => (a.done?1:-1) - (b.done?1:-1) || (a.urgency==='urgent'?-1:1))
                .map(t => `
                  <tr style="${t.done?'opacity:0.45':''}">
                    <td class="font-bold text-sm">${t.patientName}</td>
                    <td class="text-sm">${t.type}</td>
                    <td class="text-sm">${t.date || '<span class="text-muted">TBC</span>'}</td>
                    <td>${t.done?'<span class="badge badge--success">Done</span>':urgencyBadge(t.urgency)}</td>
                    <td>${t.done?'<span class="badge badge--success">Complete</span>':'<span class="badge badge--warn">Pending</span>'}</td>
                    <td>${t.done?'<span class="text-muted text-sm">✓</span>':`<button class="btn btn--sm btn--primary" onclick="ttMarkDone('${t.patientId}',${t.taskIdx})">Mark done</button>`}</td>
                  </tr>
                `).join('')}
            </tbody>
          </table>
        </div>
      </div>`;

    window.ttMarkDone = function(patientId, taskIdx) {
      TetherData.markFollowUpDone(patientId, taskIdx);
      const pt = TetherData.getPatient(patientId);
      if (pt && pt.followUp.every(f => f.done)) {
        TetherData.updatePatientStatus(patientId, 'acknowledged');
        TetherToast.success(`${pt.name} \u2014 all tasks complete. Moved to Completed.`);
      } else {
        TetherToast.success('Task marked complete');
      }
      TetherViews.refreshBadges();
      renderTaskTracker(el);
    };
  }

  // ══════════════════════════════════════════════════════════
  // 5. MEDICATION RECONCILIATION
  // ══════════════════════════════════════════════════════════
  function renderMedReconciliation(el) {
    const patients = TetherData.getPatients();
    const rows = patients.flatMap(p =>
      p.medications.filter(m => m.changed).map(m => ({ ...m, patient: p }))
    );
    const allergyFlag = p => p.alerts.some(a => a.toLowerCase().includes('allerg'));

    el.innerHTML = `
      <div class="alert alert--warn mb-4">
        <strong>Reconciliation required</strong> — ${rows.length} medication changes across ${patients.length} patients. Verify each change before GP transmission.
      </div>
      <div class="card">
        <div class="card__header">
          <h2 class="card__title">Medication Changes on Discharge</h2>
          <span class="badge badge--warn">${rows.length} changes</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Medication</th>
                <th>Dose · Route</th>
                <th>Change type</th>
                <th>Note / Rationale</th>
                <th>Safety check</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(r => `
                <tr>
                  <td>
                    <div class="font-bold text-sm">${r.patient.name}</div>
                    <div class="text-xs text-muted">${r.patient.ward}</div>
                  </td>
                  <td class="font-bold text-sm">${r.name}</td>
                  <td class="font-mono text-sm">${r.dose} · ${r.route}</td>
                  <td><span class="badge badge--warn">Changed</span></td>
                  <td class="text-sm text-muted">${r.changeNote}</td>
                  <td>
                    ${allergyFlag(r.patient)
                      ? `<span class="badge badge--alert">⚠ Allergy flag</span>`
                      : `<span class="badge badge--safe">Clear</span>`}
                  </td>
                  <td>
                    <button class="btn btn--sm btn--primary">Confirm</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════
  // 6. HOSPITAL SYNC
  // ══════════════════════════════════════════════════════════
  function renderHospitalSync(el) {
    const FHIR_MOCK = {
      patient: {
        id: 'pt-fhir-001', nhsNumber: '847 291 3305', name: 'Arthur Pemberton',
        dob: '1952-06-18', age: 73, gender: 'Male',
        address: '42 Pilgrimage Street, London, SE1 4PQ',
        gp: { name: 'Dr. James Fairweather', practice: 'Bermondsey Medical Practice', odsCode: 'Y88765' },
        ward: 'Neurology Ward 3A', consultant: 'Dr. K. Okonkwo',
        admissionDate: '2026-04-01', expectedDischarge: '2026-04-08',
        diagnosis: 'Ischaemic stroke, right MCA territory', status: 'pending',
        alerts: ['Anticoagulation review required', 'Safe oral diet — swallow assessment complete'],
        medications: [
          { name: 'Aspirin',      dose: '300mg OD', route: 'Oral', changed: false },
          { name: 'Clopidogrel',  dose: '75mg OD',  route: 'Oral', changed: true,  changeNote: 'New — dual antiplatelet post-stroke' },
          { name: 'Atorvastatin', dose: '80mg ON',  route: 'Oral', changed: true,  changeNote: 'New — high-intensity statin' },
          { name: 'Lisinopril',   dose: '10mg OD',  route: 'Oral', changed: true,  changeNote: 'New — risk factor modification' },
          { name: 'Omeprazole',   dose: '20mg OD',  route: 'Oral', changed: false },
        ],
        followUp: [
          { type: 'TIA/Stroke clinic',       date: '2026-04-21', urgency: 'urgent'  },
          { type: 'Physiotherapy review',    date: '2026-04-12', urgency: 'routine' },
          { type: 'OT home assessment',      date: null,         urgency: 'routine' },
          { type: 'Cardiac monitoring (7d)', date: null,         urgency: 'routine' },
        ],
      },
      summary: {
        hospital: "St. Thomas' NHS Foundation Trust",
        date: '2026-04-05',
        narrative: 'Mr Pemberton was admitted on 01/04/2026 following sudden onset of left-sided arm and facial weakness with expressive dysphasia. CT head confirmed no haemorrhage. MRI brain confirmed acute ischaemic infarct in the right MCA territory. Dual antiplatelet therapy commenced. High-intensity statin and ACE inhibitor initiated for risk factor modification. Formal swallow assessment completed — safe oral diet. Physiotherapy commenced with good initial progress. Medically optimised for discharge with community follow-up arranged.',
        followUp: [
          { num: 1, label: 'TIA/Stroke clinic',           date: '2026-04-21', urgency: 'urgent'  },
          { num: 2, label: 'Physiotherapy review',        date: '2026-04-12', urgency: 'routine' },
          { num: 3, label: 'OT home assessment',          date: 'TBC',        urgency: 'routine' },
          { num: 4, label: 'Cardiac monitoring (Holter)', date: 'TBC',        urgency: 'routine' },
        ],
      },
      medications: [
        { name: 'Aspirin',      dose: '300mg OD', route: 'Oral', status: 'continued' },
        { name: 'Clopidogrel',  dose: '75mg OD',  route: 'Oral', status: 'new'       },
        { name: 'Atorvastatin', dose: '80mg ON',  route: 'Oral', status: 'new'       },
        { name: 'Lisinopril',   dose: '10mg OD',  route: 'Oral', status: 'new'       },
        { name: 'Omeprazole',   dose: '20mg OD',  route: 'Oral', status: 'continued' },
      ],
      results: [
        { test: 'MRI Brain',       value: 'Right MCA ischaemic infarct',      date: '2026-04-02', status: 'reported' },
        { test: 'Echocardiogram',  value: 'EF 52%, no intracardiac thrombus', date: '2026-04-03', status: 'normal'   },
        { test: 'Carotid Doppler', value: 'No significant stenosis',          date: '2026-04-04', status: 'normal'   },
        { test: 'HbA1c',           value: '54 mmol/mol (ref <42)',            date: '2026-04-01', status: 'elevated' },
        { test: 'LDL cholesterol', value: '4.1 mmol/L (ref <2.0)',            date: '2026-04-01', status: 'elevated' },
      ],
    };

    function _statusBadge(s) {
      if (s === 'new')      return '<span class="badge badge--warn" style="font-size:0.65rem;flex-shrink:0">New</span>';
      if (s === 'normal')   return '<span class="badge badge--safe" style="font-size:0.65rem">Normal</span>';
      if (s === 'elevated') return '<span class="badge badge--alert" style="font-size:0.65rem">Elevated</span>';
      if (s === 'reported') return '<span class="badge badge--muted" style="font-size:0.65rem">Reported</span>';
      return '<span class="badge badge--muted" style="font-size:0.65rem">Continued</span>';
    }

    function _renderEmpty() {
      return `<div class="hs-empty">
        <div class="hs-empty__icon">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00C2A8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
            <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
          </svg>
        </div>
        <div class="hs-empty__title">Connect to Hospital System</div>
        <p class="hs-empty__sub">Pull structured clinical data directly from the hospital FHIR R4 endpoint. Medications, results, and discharge summaries are imported automatically — no manual transcription.</p>
        <button class="btn btn--primary" id="hs-sync-btn" onclick="hsSyncNow()">Sync Now</button>
      </div>`;
    }

    function _renderSynced() {
      const now = new Date();
      const ts = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                 + ', ' + now.toLocaleDateString('en-GB');
      return `
      <div class="hs-identity-card">
        <div class="hs-identity-card__main">
          <div class="hs-identity-card__name">${FHIR_MOCK.patient.name}</div>
          <div class="hs-identity-card__meta">
            NHS: ${FHIR_MOCK.patient.nhsNumber} &nbsp;&middot;&nbsp;
            DOB: ${FHIR_MOCK.patient.dob} &nbsp;&middot;&nbsp;
            ${FHIR_MOCK.patient.age}y ${FHIR_MOCK.patient.gender}
          </div>
        </div>
        <div class="hs-identity-card__right">
          <span class="badge badge--safe">&bull; Synced</span>
          <div class="hs-identity-card__source">${FHIR_MOCK.summary.hospital}</div>
          <div class="hs-identity-card__ts">Synced ${ts}</div>
        </div>
      </div>

      <div class="hs-cards-row">
        <div class="hs-clinical-card">
          <div class="hs-clinical-card__title">Discharge Summary</div>
          <div class="hs-clinical-card__source">${FHIR_MOCK.summary.hospital} &middot; ${FHIR_MOCK.summary.date}</div>
          <p class="hs-narrative">${FHIR_MOCK.summary.narrative}</p>
          <div class="hs-followup-label">Follow-up Plan</div>
          ${FHIR_MOCK.summary.followUp.map(f => `
            <div class="hs-followup-step">
              <span class="hs-followup-step__num">${f.num}.</span>
              <div>
                <div class="hs-followup-step__label">${f.label}${f.urgency === 'urgent' ? ' <span style="color:var(--tether-alert);font-size:0.7rem;font-weight:700">Urgent</span>' : ''}</div>
                <div class="hs-followup-step__date">${f.date}</div>
              </div>
            </div>`).join('')}
        </div>

        <div class="hs-clinical-card">
          <div class="hs-clinical-card__title">Active Medications</div>
          <div class="hs-clinical-card__source">${FHIR_MOCK.medications.length} medications on discharge</div>
          ${FHIR_MOCK.medications.map(m => `
            <div class="hs-med-row">
              <div style="flex:1">
                <div class="hs-med-row__name">${m.name}</div>
                <div class="hs-med-row__dose">${m.dose} &middot; ${m.route}</div>
              </div>
              ${_statusBadge(m.status)}
            </div>`).join('')}
        </div>

        <div class="hs-clinical-card">
          <div class="hs-clinical-card__title">Diagnostic Results</div>
          <div class="hs-clinical-card__source">${FHIR_MOCK.results.length} results from admission</div>
          ${FHIR_MOCK.results.map(r => `
            <div class="hs-result-row">
              <div class="hs-result-row__head">
                <span class="hs-result-row__test">${r.test}</span>
                ${_statusBadge(r.status)}
              </div>
              <div class="hs-result-row__body">${r.value} &middot; ${r.date}</div>
            </div>`).join('')}
        </div>
      </div>

      <div style="margin-top:20px;display:flex;justify-content:flex-end;gap:10px;align-items:center">
        <span class="text-sm text-muted">Review complete? Save this patient to your Tether caseload.</span>
        <button class="btn btn--primary" id="hs-save-btn" onclick="hsSaveToTether()">Save to Tether</button>
      </div>`;
    }

    el.innerHTML = _renderEmpty();

    window.hsSyncNow = function() {
      const btn = document.getElementById('hs-sync-btn');
      if (!btn) return;
      btn.disabled = true;
      btn.innerHTML = '<span class="ai-spinner"></span> Syncing\u2026';
      setTimeout(() => {
        const panel = document.getElementById('tab-panel-hospital-sync');
        if (panel) panel.innerHTML = _renderSynced();
      }, 1600);
    };

    window.hsSaveToTether = function() {
      const btn = document.getElementById('hs-save-btn');
      if (btn) { btn.disabled = true; btn.textContent = 'Saving\u2026'; }
      if (!TetherData.getPatient(FHIR_MOCK.patient.id)) {
        TetherData.addPatient(FHIR_MOCK.patient);
      }
      TetherToast.success(`${FHIR_MOCK.patient.name} added to Tether \u2014 now visible in Live Dashboard`);
      setTimeout(() => TetherApp.navigate('dashboard'), 800);
    };
  }

  // ══════════════════════════════════════════════════════════
  // 7. NEW SUMMARY
  // ══════════════════════════════════════════════════════════
  function renderNewSummary(el) {
    if (_nsAutoSaveTimer) { clearInterval(_nsAutoSaveTimer); _nsAutoSaveTimer = null; }

    el.innerHTML = `
      <div class="compose">

        <!-- ── Progress indicator ─────────────────────── -->
        <div class="compose-progress" id="ns-progress"></div>

        <!-- ── Section 1: Patient Details ────────────── -->
        <div class="compose-section" id="ns-sec-1">
          <div class="compose-section__header">
            <div>
              <div class="compose-section__title">1 &mdash; Patient Details</div>
              <div class="compose-section__subtitle">Core patient identifiers and ward information</div>
            </div>
          </div>
          <div class="compose-section__body">
            <div class="form-row">
              <div class="form-group">
                <label>NHS Number</label>
                <input id="ns-nhs" type="text" placeholder="000 000 0000" maxlength="12"
                       oninput="this.value=this.value.replace(/[^0-9 ]/g,'');nsUpdateProgress()">
              </div>
              <div class="form-group">
                <label>Patient Name</label>
                <input id="ns-name" type="text" placeholder="Full name" oninput="nsUpdateProgress()">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Date of Birth</label>
                <input id="ns-dob" type="date">
              </div>
              <div class="form-group">
                <label>Ward</label>
                <select id="ns-ward" onchange="nsUpdateProgress()">
                  <option value="">&#8212; Select ward &#8212;</option>
                  <option>Cardiology Ward 4B</option>
                  <option>Respiratory Ward 2A</option>
                  <option>Orthopaedics Ward 6C</option>
                  <option>General Medicine</option>
                  <option>Surgery</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Consultant</label>
                <input id="ns-consultant" type="text" placeholder="e.g. Dr. J. Hargreaves">
              </div>
              <div class="form-group">
                <label>Date Admitted</label>
                <input id="ns-admitted" type="date">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Date Discharged</label>
                <input id="ns-discharged" type="date">
              </div>
              <div class="form-group">
                <label>GP Practice</label>
                <input id="ns-gp-practice" type="text" placeholder="Practice name" oninput="nsUpdateProgress()">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>GP System</label>
                <select id="ns-gp-system">
                  <option value="">&#8212; Select system &#8212;</option>
                  <option value="EMIS">EMIS Web</option>
                  <option value="SystmOne">SystmOne</option>
                  <option value="Vision">Vision</option>
                </select>
              </div>
              <div class="form-group"><!-- spacer --></div>
            </div>
          </div>
        </div>

        <!-- ── Section 2: Diagnosis & Summary ─────────── -->
        <div class="compose-section" id="ns-sec-2">
          <div class="compose-section__header">
            <div>
              <div class="compose-section__title">2 &mdash; Diagnosis &amp; Summary</div>
              <div class="compose-section__subtitle">Primary diagnosis and narrative clinical summary</div>
            </div>
          </div>
          <div class="compose-section__body">
            <div class="form-row">
              <div class="form-group">
                <label>Primary Diagnosis</label>
                <input id="ns-diagnosis" type="text" placeholder="e.g. Anterior STEMI" oninput="nsUpdateProgress()">
              </div>
              <div class="form-group">
                <label>ICD-10 Code <span class="text-muted" style="font-weight:400">(optional)</span></label>
                <input id="ns-icd10" type="text" placeholder="e.g. I21.0" maxlength="8"
                       style="font-family:'IBM Plex Mono',monospace">
              </div>
            </div>
            <div class="form-group">
              <label>Clinical Summary</label>
              <textarea id="ns-summary" rows="5" oninput="nsUpdateProgress()"
                        placeholder="Narrative of the admission, key events, investigations performed, and management\u2026"></textarea>
            </div>
            <div class="compose-ai-strip">
              <button class="btn btn--primary btn--sm" onclick="nsDraftWithAI()">&#10022; Draft with AI</button>
              <span id="ns-draft-status" class="compose-ai-result"></span>
            </div>
            <div id="ns-draft-box" style="display:none;margin-top:14px;padding-top:14px;border-top:1px solid var(--tether-border)">
              <div class="ns-draft-header">
                <span id="ns-draft-label" class="ns-draft-header-label">AI Draft</span>
                <button class="btn btn--ghost btn--sm" onclick="nsCopyDraft()">Copy to Summary</button>
                <button class="btn btn--ghost btn--sm" onclick="nsRegenerateDraft()">&#8635; Regenerate</button>
              </div>
              <textarea id="ns-draft-textarea"
                        placeholder="Draft will appear here\u2026"></textarea>
            </div>
          </div>
        </div>

        <!-- ── Section 3: Medication Changes ────────── -->
        <div class="compose-section" id="ns-sec-3">
          <div class="compose-section__header">
            <div>
              <div class="compose-section__title">3 &mdash; Medication Changes</div>
              <div class="compose-section__subtitle">All changes to the patient&apos;s medication regimen</div>
            </div>
          </div>
          <div class="compose-section__body">
            <div class="dyn-rows" id="ns-med-rows"></div>
            <button class="dyn-add" onclick="nsAddMedRow()">+ Add medication change</button>
            <div class="compose-ai-strip">
              <button class="btn btn--ghost btn--sm" onclick="nsSuggestMeds()">&#10022; Suggest from Summary</button>
              <span id="ns-med-ai-status" class="compose-ai-result"></span>
            </div>
          </div>
        </div>

        <!-- ── Section 4: Pending Investigations ──────── -->
        <div class="compose-section" id="ns-sec-4">
          <div class="compose-section__header">
            <div>
              <div class="compose-section__title">4 &mdash; Pending Investigations</div>
              <div class="compose-section__subtitle">Outstanding tests and results to follow up</div>
            </div>
          </div>
          <div class="compose-section__body">
            <div class="dyn-rows" id="ns-inv-rows"></div>
            <button class="dyn-add" onclick="nsAddInvRow()">+ Add investigation</button>
          </div>
        </div>

        <!-- ── Section 5: GP Actions Required ─────────── -->
        <div class="compose-section" id="ns-sec-5">
          <div class="compose-section__header">
            <div>
              <div class="compose-section__title">5 &mdash; GP Actions Required</div>
              <div class="compose-section__subtitle">Specific tasks for the receiving GP practice</div>
            </div>
          </div>
          <div class="compose-section__body">
            <div class="dyn-rows" id="ns-gp-rows"></div>
            <button class="dyn-add" onclick="nsAddGPRow()">+ Add GP action</button>
            <div class="compose-ai-strip">
              <button class="btn btn--ghost btn--sm" onclick="nsSuggestGPTasks()">&#10022; Suggest GP Tasks</button>
              <span id="ns-gp-ai-status" class="compose-ai-result"></span>
            </div>
          </div>
        </div>

        <!-- ── Section 6: Send via Tether ─────────────── -->
        <div class="compose-section" id="ns-sec-6">
          <div class="compose-section__header">
            <div>
              <div class="compose-section__title">6 &mdash; Send via Tether</div>
              <div class="compose-section__subtitle">Delivery method and final transmission</div>
            </div>
          </div>
          <div class="compose-section__body">
            <div class="form-row">
              <div class="form-group">
                <label>GP Practice ODS Code</label>
                <input id="ns-ods" type="text" placeholder="e.g. A83006" maxlength="10"
                       style="font-family:'IBM Plex Mono',monospace" oninput="nsUpdateProgress()">
              </div>
              <div class="form-group">
                <label>Delivery Method</label>
                <select id="ns-delivery" onchange="nsUpdateProgress()">
                  <option value="">&#8212; Select method &#8212;</option>
                  <option value="tether">Tether Secure Message</option>
                  <option value="fhir">FHIR R4 API</option>
                  <option value="pdf">PDF Email</option>
                  <option value="print">Print</option>
                </select>
              </div>
            </div>
            <p id="ns-validation-msg" class="compose-validation" style="display:none"></p>
            <div class="compose-send-actions">
              <button class="btn btn--ghost btn--sm" onclick="nsSaveDraft()">Save Draft</button>
              <button class="btn btn--primary" onclick="nsSend()">Send via Tether &#8594;</button>
            </div>
          </div>
        </div>

      </div>`;

    // ── Helpers ────────────────────────────────────────────────
    const DRAFT_KEY = 'tether_ns_draft';

    function _getRows(containerId, fields) {
      return Array.from(document.querySelectorAll('#' + containerId + ' .dyn-row')).map(row =>
        Object.fromEntries(fields.map(([cls, key]) => [key, row.querySelector('.' + cls)?.value || '']))
      );
    }

    function _nsSaveDraft(silent) {
      const g = id => document.getElementById(id)?.value || '';
      const draft = {
        nhs: g('ns-nhs'), name: g('ns-name'), dob: g('ns-dob'), ward: g('ns-ward'),
        consultant: g('ns-consultant'), admitted: g('ns-admitted'), discharged: g('ns-discharged'),
        gpPractice: g('ns-gp-practice'), gpSystem: g('ns-gp-system'),
        diagnosis: g('ns-diagnosis'), icd10: g('ns-icd10'), summary: g('ns-summary'),
        aiDraft: g('ns-draft-textarea'), ods: g('ns-ods'), delivery: g('ns-delivery'),
        meds: _getRows('ns-med-rows', [['med-drug','drug'],['med-change','change'],['med-dose','dose'],['med-reason','reason']]),
        invs: _getRows('ns-inv-rows', [['inv-test','test'],['inv-date','date'],['inv-party','party']]),
        gps:  _getRows('ns-gp-rows',  [['gp-task','task'],['gp-due','due']]),
        savedAt: new Date().toISOString(),
      };
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch {}
      if (!silent) TetherToast.success('Draft saved');
    }

    function _nsLoadDraft() {
      try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (!raw) return;
        const d = JSON.parse(raw);
        const s = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ''; };
        s('ns-nhs', d.nhs); s('ns-name', d.name); s('ns-dob', d.dob); s('ns-ward', d.ward);
        s('ns-consultant', d.consultant); s('ns-admitted', d.admitted); s('ns-discharged', d.discharged);
        s('ns-gp-practice', d.gpPractice); s('ns-gp-system', d.gpSystem);
        s('ns-diagnosis', d.diagnosis); s('ns-icd10', d.icd10); s('ns-summary', d.summary);
        s('ns-draft-textarea', d.aiDraft); s('ns-ods', d.ods); s('ns-delivery', d.delivery);
        if (d.meds?.length) {
          document.getElementById('ns-med-rows').innerHTML = '';
          d.meds.forEach(m => {
            nsAddMedRow();
            const r = document.getElementById('ns-med-rows').lastElementChild;
            r.querySelector('.med-drug').value   = m.drug   || '';
            r.querySelector('.med-change').value = m.change || '';
            r.querySelector('.med-dose').value   = m.dose   || '';
            r.querySelector('.med-reason').value = m.reason || '';
          });
        }
        if (d.invs?.length) {
          document.getElementById('ns-inv-rows').innerHTML = '';
          d.invs.forEach(v => {
            nsAddInvRow();
            const r = document.getElementById('ns-inv-rows').lastElementChild;
            r.querySelector('.inv-test').value  = v.test  || '';
            r.querySelector('.inv-date').value  = v.date  || '';
            r.querySelector('.inv-party').value = v.party || '';
          });
        }
        if (d.gps?.length) {
          document.getElementById('ns-gp-rows').innerHTML = '';
          d.gps.forEach(g => {
            nsAddGPRow();
            const r = document.getElementById('ns-gp-rows').lastElementChild;
            r.querySelector('.gp-task').value = g.task || '';
            r.querySelector('.gp-due').value  = g.due  || '';
          });
        }
        if (d.aiDraft) document.getElementById('ns-draft-box').style.display = '';
        if (d.savedAt) TetherToast.success('Draft restored \u2014 last saved ' + new Date(d.savedAt).toLocaleTimeString('en-GB'));
      } catch {}
    }

    // ── Window functions ────────────────────────────────────────
    window.nsUpdateProgress = function() {
      const val = id => document.getElementById(id)?.value?.trim() || '';
      let activated = false;
      const steps = [
        { label: 'Patient',        done: !!(val('ns-nhs') && val('ns-name')) },
        { label: 'Diagnosis',      done: !!(val('ns-diagnosis') && val('ns-summary')) },
        { label: 'Medications',    done: Array.from(document.querySelectorAll('#ns-med-rows .med-drug')).some(i => i.value.trim()) },
        { label: 'Investigations', done: Array.from(document.querySelectorAll('#ns-inv-rows .inv-test')).some(i => i.value.trim()) },
        { label: 'GP Actions',     done: Array.from(document.querySelectorAll('#ns-gp-rows .gp-task')).some(i => i.value.trim()) },
        { label: 'Send',           done: !!(val('ns-ods') && val('ns-delivery')) },
      ];
      const prog = document.getElementById('ns-progress');
      if (!prog) return;
      prog.innerHTML = steps.map((s, i) => {
        const cls = s.done ? 'compose-progress__step--done' : (!activated ? (activated = true, 'compose-progress__step--active') : '');
        return '<div class="compose-progress__step ' + cls + '">' +
          '<div class="compose-progress__dot">' + (s.done ? '&#10003;' : (i + 1)) + '</div>' +
          '<div class="compose-progress__label">' + s.label + '</div>' +
          '</div>';
      }).join('');
    };

    window.nsAddMedRow = function() {
      const c = document.getElementById('ns-med-rows'); if (!c) return;
      const r = document.createElement('div');
      r.className = 'dyn-row dyn-row--med';
      r.innerHTML =
        '<input class="med-drug" type="text" placeholder="Drug name" oninput="nsUpdateProgress()">' +
        '<select class="med-change"><option value="">Change type</option>' +
          '<option value="started">Started</option><option value="stopped">Stopped</option>' +
          '<option value="dose-changed">Dose changed</option><option value="continued">Continued</option>' +
        '</select>' +
        '<input class="med-dose" type="text" placeholder="Dose / route">' +
        '<input class="med-reason" type="text" placeholder="Reason">' +
        '<button class="dyn-row__del" onclick="this.closest(\'.dyn-row\').remove();nsUpdateProgress()" title="Remove">&#215;</button>';
      c.appendChild(r);
    };

    window.nsAddInvRow = function() {
      const c = document.getElementById('ns-inv-rows'); if (!c) return;
      const r = document.createElement('div');
      r.className = 'dyn-row dyn-row--inv';
      r.innerHTML =
        '<input class="inv-test" type="text" placeholder="Investigation name" oninput="nsUpdateProgress()">' +
        '<input class="inv-date" type="date">' +
        '<select class="inv-party"><option value="">Responsible party</option>' +
          '<option>GP</option><option>Outpatients</option><option>Radiology</option>' +
          '<option>Haematology</option><option>Biochemistry</option>' +
          '<option>Cardiology</option><option>Respiratory</option>' +
        '</select>' +
        '<button class="dyn-row__del" onclick="this.closest(\'.dyn-row\').remove();nsUpdateProgress()" title="Remove">&#215;</button>';
      c.appendChild(r);
    };

    window.nsAddGPRow = function() {
      const c = document.getElementById('ns-gp-rows'); if (!c) return;
      const r = document.createElement('div');
      r.className = 'dyn-row dyn-row--gp';
      r.innerHTML =
        '<input class="gp-task" type="text" placeholder="Task description" oninput="nsUpdateProgress()">' +
        '<input class="gp-due" type="date">' +
        '<button class="dyn-row__del" onclick="this.closest(\'.dyn-row\').remove();nsUpdateProgress()" title="Remove">&#215;</button>';
      c.appendChild(r);
    };

    let _lastDraftParams = null;

    window.nsDraftWithAI = async function() {
      const g = id => document.getElementById(id)?.value?.trim() || '';
      const medRows = Array.from(document.querySelectorAll('#ns-med-rows .dyn-row')).map(row => {
        const drug = row.querySelector('.med-drug')?.value.trim(); if (!drug) return null;
        const change = row.querySelector('.med-change')?.value   || 'change';
        const dose   = row.querySelector('.med-dose')?.value.trim()   || 'TBC';
        const reason = row.querySelector('.med-reason')?.value.trim() || 'not specified';
        return drug + ' \u2014 ' + change + ', ' + dose + '. Reason: ' + reason;
      }).filter(Boolean).join('\n') || 'None stated';
      const invRows = Array.from(document.querySelectorAll('#ns-inv-rows .dyn-row')).map(row => {
        const test = row.querySelector('.inv-test')?.value.trim(); if (!test) return null;
        const party = row.querySelector('.inv-party')?.value;
        return test + (party ? ' (' + party + ')' : '');
      }).filter(Boolean).join('\n') || 'None stated';
      const params = {
        name:           g('ns-name')      || 'Unknown patient',
        nhs:            g('ns-nhs')       || 'Not provided',
        diagnosis:      g('ns-diagnosis') || 'Not provided',
        events:         g('ns-summary')   || 'Not provided',
        medications:    medRows,
        pendingResults: invRows,
      };
      _lastDraftParams = params;
      const draftBox = document.getElementById('ns-draft-box');
      const draftTA  = document.getElementById('ns-draft-textarea');
      const statusEl = document.getElementById('ns-draft-status');
      const draftLbl = document.getElementById('ns-draft-label');
      if (draftBox)  draftBox.style.display = '';
      if (draftTA)   draftTA.value = '';
      if (statusEl)  statusEl.innerHTML = '<span class="ai-spinner ai-spinner--dark"></span>Generating\u2026';
      if (draftLbl)  draftLbl.textContent = 'AI Draft';
      try {
        for await (const chunk of TetherAI.streamDischargeDraft(params)) {
          if (draftTA) { draftTA.value += chunk; draftTA.scrollTop = draftTA.scrollHeight; }
        }
        if (statusEl) statusEl.textContent = 'Generated ' + new Date().toLocaleTimeString('en-GB');
      } catch {
        if (statusEl) statusEl.textContent = '';
        TetherToast.error('AI draft failed \u2014 check that server.js is running');
      }
    };

    window.nsRegenerateDraft = function() { if (_lastDraftParams) window.nsDraftWithAI(); };

    window.nsCopyDraft = function() {
      const ta  = document.getElementById('ns-draft-textarea'); if (!ta?.value) return;
      const sum = document.getElementById('ns-summary');
      if (sum) { sum.value = ta.value; nsUpdateProgress(); }
      navigator.clipboard?.writeText(ta.value)
        .then(() => TetherToast.success('Draft copied to Summary field'))
        .catch(() => { ta.select(); document.execCommand('copy'); TetherToast.success('Draft copied to Summary field'); });
    };

    window.nsSuggestMeds = async function() {
      const diagnosis = document.getElementById('ns-diagnosis')?.value.trim();
      const summary   = document.getElementById('ns-summary')?.value.trim();
      const statusEl  = document.getElementById('ns-med-ai-status');
      const btn       = document.querySelector('button[onclick="nsSuggestMeds()"]');
      if (!diagnosis && !summary) { TetherToast.warning('Enter a diagnosis and summary first'); return; }
      if (btn) { btn.disabled = true; btn.innerHTML = '<span class="ai-spinner ai-spinner--dark"></span>Suggesting\u2026'; }
      if (statusEl) statusEl.textContent = '';
      try {
        const text  = await TetherAI.suggestMedChanges({ diagnosis: diagnosis || 'Not specified', summary: summary || 'Not provided' });
        const lines = text.split(/\n+/).filter(l => l.includes('|')).map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
        lines.forEach(line => {
          const parts = line.split('|').map(s => s.trim());
          nsAddMedRow();
          const row = document.getElementById('ns-med-rows')?.lastElementChild;
          if (!row) return;
          row.querySelector('.med-drug').value   = parts[0] || '';
          const cv = (parts[1] || '').toLowerCase().replace(/\s+/g, '-');
          const changeEl = row.querySelector('.med-change');
          if (changeEl && ['started','stopped','dose-changed','continued'].includes(cv)) changeEl.value = cv;
          row.querySelector('.med-dose').value   = parts[2] || '';
          row.querySelector('.med-reason').value = parts[3] || '';
        });
        nsUpdateProgress();
        if (statusEl) statusEl.textContent = lines.length + ' suggestion' + (lines.length !== 1 ? 's' : '') + ' added';
      } catch {
        TetherToast.error('Medication suggester offline \u2014 check that server.js is running');
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = '&#10022; Suggest from Summary'; }
      }
    };

    window.nsSuggestGPTasks = async function() {
      const diagnosis = document.getElementById('ns-diagnosis')?.value.trim();
      const summary   = document.getElementById('ns-summary')?.value.trim();
      const statusEl  = document.getElementById('ns-gp-ai-status');
      const btn       = document.querySelector('button[onclick="nsSuggestGPTasks()"]');
      if (!diagnosis && !summary) { TetherToast.warning('Enter a diagnosis and summary first'); return; }
      if (btn) { btn.disabled = true; btn.innerHTML = '<span class="ai-spinner ai-spinner--dark"></span>Suggesting\u2026'; }
      if (statusEl) statusEl.textContent = '';
      try {
        const text  = await TetherAI.suggestGPTasks({ diagnosis: diagnosis || 'Not specified', summary: summary || 'Not provided' });
        const items = text.split(/\n+/).filter(l => /^\d+\./.test(l.trim())).map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
        items.forEach(task => {
          nsAddGPRow();
          const row = document.getElementById('ns-gp-rows')?.lastElementChild;
          if (row) row.querySelector('.gp-task').value = task;
        });
        nsUpdateProgress();
        if (statusEl) statusEl.textContent = items.length + ' task' + (items.length !== 1 ? 's' : '') + ' added';
      } catch {
        TetherToast.error('GP task suggester offline \u2014 check that server.js is running');
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = '&#10022; Suggest GP Tasks'; }
      }
    };

    window.nsSaveDraft = function() { _nsSaveDraft(false); };

    window.nsSend = function() {
      const g   = id => document.getElementById(id)?.value?.trim() || '';
      const msg = document.getElementById('ns-validation-msg');
      const errors = [];
      if (!g('ns-nhs'))       errors.push('NHS Number required');
      if (!g('ns-name'))      errors.push('Patient name required');
      if (!g('ns-diagnosis')) errors.push('Diagnosis required');
      if (!g('ns-ods'))       errors.push('ODS code required');
      if (!g('ns-delivery'))  errors.push('Delivery method required');
      if (errors.length) {
        if (msg) { msg.textContent = errors.join(' \u00b7 '); msg.style.display = ''; }
        TetherToast.error('Complete required fields before sending');
        return;
      }
      if (msg) msg.style.display = 'none';
      _nsSaveDraft(true);
      const nhsNum = g('ns-nhs').replace(/\s/g,'');
      const matched = TetherData.getPatients().find(p => p.nhsNumber.replace(/\s/g,'') === nhsNum);
      if (matched) { TetherData.updatePatientStatus(matched.id, 'sent'); TetherViews.refreshBadges(); }
      TetherToast.success('Discharge summary sent via Tether');
    };

    // ── Init ──────────────────────────────────────────────────
    nsAddMedRow();
    nsAddInvRow();
    nsAddGPRow();
    _nsLoadDraft();
    nsUpdateProgress();
    _nsAutoSaveTimer = setInterval(() => {
      _nsSaveDraft(true);
      TetherToast.success('Auto-saved \u2014 ' + new Date().toLocaleTimeString('en-GB'));
    }, 30000);
  }

  // ══════════════════════════════════════════════════════════
  // Public: build tab defs + render into container
  // ══════════════════════════════════════════════════════════
  function getTabDefs() {
    const patients     = TetherData.getPatients();
    const changedMeds  = patients.reduce((n, p) => n + p.medications.filter(m => m.changed).length, 0);
    const pendingTasks = patients.reduce((n, p) => n + p.followUp.filter(f => !f.done).length, 0);
    const urgentRes    = PENDING_RESULTS.filter(r => r.urgency === 'urgent' && !r.owned).length;

    return [
      { id: 'live-dashboard',            label: 'Live Dashboard',            badge: null,           urgent: false, render: renderLiveDashboard       },
      { id: 'discharge-summaries',       label: 'Discharge Summaries',       badge: patients.length, urgent: false, render: renderDischargeSummaries  },
      { id: 'pending-results',           label: 'Pending Results',           badge: urgentRes,       urgent: true,  render: renderPendingResults       },
      { id: 'task-tracker',              label: 'Task Tracker',              badge: pendingTasks,    urgent: false, render: renderTaskTracker          },
      { id: 'medication-reconciliation', label: 'Medication Reconciliation', badge: changedMeds,     urgent: true,  render: renderMedReconciliation    },
      { id: 'hospital-sync',             label: 'Hospital Sync',             badge: null,            urgent: false, render: renderHospitalSync         },
      { id: 'new-summary',               label: '+ New Summary',             badge: null,            urgent: false, isAction: true, render: renderNewSummary },
    ];
  }

  function refreshBadges() {
    const patients     = TetherData.getPatients();
    const pendingTasks = patients.reduce((n,p) => n + p.followUp.filter(f=>!f.done).length, 0);
    const changedMeds  = patients.reduce((n,p) => n + p.medications.filter(m=>m.changed).length, 0);
    const urgentRes    = PENDING_RESULTS.filter(r => r.urgency==='urgent' && !r.owned).length;

    [
      { id:'discharge-summaries',       count:patients.length, urgent:false },
      { id:'pending-results',           count:urgentRes,       urgent:true  },
      { id:'task-tracker',              count:pendingTasks,    urgent:false },
      { id:'medication-reconciliation', count:changedMeds,     urgent:true  },
    ].forEach(({ id, count, urgent }) => {
      const btn = document.getElementById(`tab-btn-${id}`);
      if (!btn) return;
      let badge = btn.querySelector('.tab-badge');
      if (!badge) { badge = document.createElement('span'); btn.appendChild(badge); }
      badge.className = `tab-badge${urgent?' tab-badge--urgent':''}`;
      badge.setAttribute('aria-label', `${count} items${urgent?', urgent':''}`);
      badge.textContent = count;
    });

    TetherNav.updateStats();

    const kpiValues = document.querySelectorAll('.kpi-card__value');
    if (kpiValues.length >= 4) {
      const urgentPts = patients.filter(p => p.alerts.length > 0 && p.status === 'pending');
      const awaitPts  = patients.filter(p => p.status === 'sent');
      const doneCount = patients.filter(p => p.status === 'acknowledged').length;
      kpiValues[0].textContent = patients.length;
      kpiValues[1].textContent = urgentPts.length;
      kpiValues[2].textContent = awaitPts.length;
      kpiValues[3].textContent = doneCount;
    }

    const urgentBadge = document.querySelector('.sidebar-panel__head--urgent .tab-badge');
    if (urgentBadge) {
      urgentBadge.textContent = patients.filter(p => p.alerts.length > 0 && p.status === 'pending').length;
    }
    const awaitBadge = document.querySelector('.sidebar-panel__head--amber span[style]');
    if (awaitBadge) {
      awaitBadge.textContent = patients.filter(p => p.status === 'sent').length;
    }

    const completedPanel = document.getElementById('sidebar-completed-panel');
    if (completedPanel) {
      const completed = patients.filter(p => p.status === 'acknowledged');
      const badge = completedPanel.querySelector('.sidebar-panel__head span');
      if (badge) badge.textContent = completed.length;
      const body = completedPanel.querySelector('.sidebar-panel__body');
      if (body) {
        body.innerHTML = completed.length
          ? completed.map(p => `
              <div class="sidebar-item">
                <span class="risk-dot risk-dot--green" style="margin-top:3px;flex-shrink:0"></span>
                <div>
                  <div class="sidebar-item__name">${p.name}</div>
                  <div class="sidebar-item__detail">${p.diagnosis} · GP acknowledged</div>
                </div>
              </div>`).join('')
          : `<p class="text-sm text-muted" style="padding:4px 0">No completions yet this week</p>`;
      }
    }

    const urgentHead = document.querySelector('.sidebar-panel__head--urgent');
    const urgentBody = urgentHead ? urgentHead.nextElementSibling : null;
    if (urgentBody) {
      const urgentPts = patients.filter(p => p.alerts.length > 0 && p.status === 'pending');
      urgentBody.innerHTML = urgentPts.length
        ? urgentPts.map(p => `
            <div class="sidebar-item">
              <span class="risk-dot risk-dot--red" style="margin-top:3px;flex-shrink:0"></span>
              <div>
                <div class="sidebar-item__name">${p.name}</div>
                <div class="sidebar-item__detail">${p.alerts[0]}${p.alerts.length > 1 ? ` +${p.alerts.length-1} more` : ''}</div>
              </div>
            </div>`).join('')
        : `<p class="text-sm text-muted" style="padding:4px 0">No urgent actions</p>`;
    }

    const liveTableBody = document.querySelector('.kpi-row ~ * tbody');
    if (liveTableBody) {
      function riskDot(p) {
        if (p.alerts.length > 0 && p.status === 'pending')
          return `<span class="risk-dot risk-dot--red" title="High risk"></span>`;
        if (p.status === 'sent' || p.status === 'acknowledged')
          return `<span class="risk-dot risk-dot--green" title="Low risk"></span>`;
        return `<span class="risk-dot risk-dot--amber" title="Medium risk"></span>`;
      }
      liveTableBody.querySelectorAll('tr').forEach((row, i) => {
        const p = patients[i];
        if (!p) return;
        const cells = row.querySelectorAll('td');
        if (cells[0]) cells[0].innerHTML = riskDot(p);
        if (cells[5]) cells[5].innerHTML = statusBadge(p.status);
      });
    }
  }

  function renderMainView(container) {
    TetherTabs.render(container, getTabDefs(), { defaultTab: 'live-dashboard', sticky: true });
  }

  return { renderMainView, refreshBadges };
})();
/* ============================================================
   app.js — Application entry point and router
   ============================================================ */

const TetherApp = (() => {

  // ----- Views registry -------------------------------------
  const views = {};
  let currentView = null;

  function registerView(name, renderFn) {
    views[name] = renderFn;
  }

  // ----- Router ---------------------------------------------
  function navigate(viewName, params = {}) {
    const render = views[viewName];
    if (!render) {
      console.warn(`[Tether] Unknown view: ${viewName}`);
      return;
    }
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    render(main, params);
    currentView = viewName;
  }

  // ----- Bootstrap ------------------------------------------
  function init() {
    TetherData.init();
    TetherNav.render(document.getElementById('nav-root'));
    TetherToast.init();
    TetherModal.init();

    // Register main view
    registerView('dashboard', (container) => TetherViews.renderMainView(container));

    navigate('dashboard');
  }

  // ----- Public ---------------------------------------------
  return { init, navigate, registerView };
})();

// Boot when DOM is ready
document.addEventListener('DOMContentLoaded', TetherApp.init);
