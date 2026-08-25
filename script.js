// Lógica del formulario: validaciones, cálculo de edad, render de tabla
(function(){
  const Utils = (typeof window !== 'undefined' && window.Utils) ? window.Utils : require('./src/utils');
  const form = document.getElementById('student-form');
  const ident = document.getElementById('ident');
  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const correo = document.getElementById('correo');
  const pais = document.getElementById('pais');
  const carrera = document.getElementById('carrera');
  const fnac = document.getElementById('fnac');
  const edadEl = document.getElementById('edad');
  const btnClear = document.getElementById('btn-clear');
  const message = document.getElementById('message');
  const tableBody = document.querySelector('#students-table tbody');
  const btnRegister = document.getElementById('btn-register');

  let students = [];

  function setError(el, msg){
    const id = el.id + '-err';
    const node = document.getElementById(id);
    if(msg){
      node.textContent = msg;
      node.classList.add('visible');
      el.setAttribute('aria-invalid','true');
    } else {
      node.textContent = '';
      node.classList.remove('visible');
      el.removeAttribute('aria-invalid');
    }
  }

  function validateField(field){
    const val = field.value && field.value.trim();
    switch(field.id){
      case 'ident': return Utils.validateIdent(val);
      case 'nombre': return Utils.validateName(val);
      case 'apellido': return Utils.validateApellido(val);
      case 'correo': return Utils.validateCorreo(val);
      case 'pais': return Utils.validatePais(val);
      case 'carrera': return Utils.validateCarrera(val);
      case 'fnac': return Utils.validateFnac(val);
      default: return '';
    }
  }

  function updateEdad(){
    const v = fnac.value;
    const age = Utils.calculateAge(v);
    if(age === null){
      edadEl.value = '—';
      setError(fnac, v ? 'Fecha inválida o en el futuro.' : 'Fecha de nacimiento requerida.');
      return false;
    }
    edadEl.value = String(age);
    setError(fnac, '');
    return true;
  }

  // Attach live validation
  ['ident','nombre','apellido','correo','pais','carrera','fnac'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', ()=>{
      const err = validateField(el);
      setError(el, err);
      if(el.id === 'fnac') updateEdad();
      toggleSubmit();
    });
    el.addEventListener('blur', ()=>{
      const err = validateField(el);
      setError(el, err);
      if(el.id === 'fnac') updateEdad();
      toggleSubmit();
    });
  });

  function toggleSubmit(){
    // Basic enable/disable depending on required filled and no visible errors
    const fields = [ident,nombre,apellido,correo,pais,carrera,fnac];
    const anyEmpty = fields.some(f => !(f.value && f.value.toString().trim()));
    const anyError = fields.some(f => {
      const id = f.id + '-err';
      return document.getElementById(id).classList.contains('visible');
    });
    btnRegister.disabled = anyEmpty || anyError;
  }

  function showMessage(text, type='success'){
    message.hidden = false;
    message.textContent = text;
    message.className = 'message ' + (type==='success'?'success':'error');
    message.setAttribute('aria-live','polite');
    setTimeout(()=>{ message.hidden = true; }, 4000);
  }

  function formatDate(d){
    if(!d) return '';
    const dt = new Date(d);
    if(isNaN(dt)) return d;
    return dt.toLocaleDateString();
  }

  function isDuplicate(idVal, emailVal){
    return Utils.isDuplicate(students, idVal, emailVal);
  }

  function addStudentToTable(s){
    const tr = document.createElement('tr');
    tr.classList.add('row-added');
    tr.innerHTML = `
      <td>${escapeHtml(s.ident)}</td>
      <td>${escapeHtml(s.nombre)}</td>
      <td>${escapeHtml(s.apellido)}</td>
      <td>${escapeHtml(s.correo)}</td>
      <td>${escapeHtml(s.pais)}</td>
      <td>${escapeHtml(s.carrera)}</td>
      <td>${escapeHtml(Utils.formatDate(s.fnac))}</td>
      <td>${escapeHtml(String(s.edad))}</td>
    `;
    tableBody.prepend(tr);
    setTimeout(()=> tr.classList.remove('row-added'),600);
  }

  function escapeHtml(text){
    return Utils.escapeHtml(text);
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // Validate all
    const fields = [ident,nombre,apellido,correo,pais,carrera,fnac];
    let ok = true;
    fields.forEach(f => {
      const err = validateField(f);
      setError(f, err);
      if(err) ok = false;
    });
    if(!updateEdad()) ok = false;
    if(!ok){ showMessage('Corrige los errores antes de registrar.','error'); return; }

    const payload = {
      ident: ident.value.trim(),
      nombre: nombre.value.trim(),
      apellido: apellido.value.trim(),
      correo: correo.value.trim(),
      pais: pais.value,
      carrera: carrera.value,
      fnac: fnac.value,
      edad: Number(edadEl.value) || 0
    };

    if(isDuplicate(payload.ident, payload.correo)){
      showMessage('Identificación o correo ya registrado.', 'error');
      return;
    }

    students.push(payload);
    addStudentToTable(payload);
    showMessage('Estudiante registrado correctamente.','success');
    form.reset();
    edadEl.value = '—';
    // Clear visible errors
    ['ident-err','nombre-err','apellido-err','correo-err','pais-err','carrera-err','fnac-err'].forEach(id => {
      const n = document.getElementById(id); if(n){ n.textContent=''; n.classList.remove('visible'); }
    });
    toggleSubmit();
  });

  btnClear.addEventListener('click', ()=>{
    form.reset();
    edadEl.value = '—';
    message.hidden = true;
    ['ident-err','nombre-err','apellido-err','correo-err','pais-err','carrera-err','fnac-err'].forEach(id => {
      const n = document.getElementById(id); if(n){ n.textContent=''; n.classList.remove('visible'); }
    });
    toggleSubmit();
    ident.focus();
  });

  // Initialize
  toggleSubmit();
})();
