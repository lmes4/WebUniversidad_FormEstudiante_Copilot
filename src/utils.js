// Utilidades compartidas para el formulario (funciona en navegador y Node)
(function(exports){
  const regexIdent = /^[A-Za-z0-9]+$/;
  const regexName = /^[A-Za-zÀ-ÖØ-öø-ÿÑñ\s'-]+$/u;

  function calculateAge(dobValue){
    if(!dobValue) return null;
    const dob = new Date(dobValue);
    if(!(dob instanceof Date) || isNaN(dob)) return null;
    const now = new Date();
    if(dob > now) return null;
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if(m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
    return age;
  }

  function validateIdent(val){
    const v = (val||'').toString().trim();
    if(!v) return 'Identificación requerida.';
    if(v.length < 5) return 'Mínimo 5 caracteres.';
    if(!regexIdent.test(v)) return 'Solo caracteres alfanuméricos.';
    return '';
  }

  function validateName(val){
    const v = (val||'').toString().trim();
    if(!v) return 'Nombre requerido.';
    if(v.length < 2) return 'Mínimo 2 caracteres.';
    if(!regexName.test(v)) return 'Solo letras, espacios o guiones.';
    return '';
  }

  function validateApellido(val){
    const v = (val||'').toString().trim();
    if(!v) return 'Apellido requerido.';
    if(v.length < 2) return 'Mínimo 2 caracteres.';
    if(!regexName.test(v)) return 'Solo letras, espacios o guiones.';
    return '';
  }

  function validateCorreo(val){
    const v = (val||'').toString().trim();
    if(!v) return 'Correo requerido.';
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    if(!re.test(v)) return 'Formato de correo inválido.';
    return '';
  }

  function validatePais(val){
    const v = (val||'').toString().trim();
    if(!v) return 'País requerido.';
    return '';
  }

  function validateCarrera(val){
    const v = (val||'').toString().trim();
    if(!v) return 'Carrera requerida.';
    return '';
  }

  function validateFnac(val){
    const v = (val||'').toString().trim();
    if(!v) return 'Fecha de nacimiento requerida.';
    const age = calculateAge(v);
    if(age === null) return 'Fecha inválida o en el futuro.';
    return '';
  }

  function isDuplicate(list, idVal, emailVal){
    if(!Array.isArray(list)) return false;
    return list.some(s => (s.ident||'').toString().toLowerCase() === (idVal||'').toString().toLowerCase() || (s.correo||'').toString().toLowerCase() === (emailVal||'').toString().toLowerCase());
  }

  function escapeHtml(text){
    return (text+'').replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m];});
  }

  function formatDate(d){
    if(!d) return '';
    const dt = new Date(d);
    if(isNaN(dt)) return d;
    return dt.toLocaleDateString();
  }

  exports.calculateAge = calculateAge;
  exports.validateIdent = validateIdent;
  exports.validateName = validateName;
  exports.validateApellido = validateApellido;
  exports.validateCorreo = validateCorreo;
  exports.validatePais = validatePais;
  exports.validateCarrera = validateCarrera;
  exports.validateFnac = validateFnac;
  exports.isDuplicate = isDuplicate;
  exports.escapeHtml = escapeHtml;
  exports.formatDate = formatDate;

  if(typeof module !== 'undefined' && module.exports){
    module.exports = exports;
  }
  if(typeof window !== 'undefined'){
    window.Utils = exports;
  }
})(typeof exports === 'undefined' ? {} : exports);
