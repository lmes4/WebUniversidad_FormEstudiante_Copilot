const Utils = require('./src/utils');

const tests = [];

function add(name, fn){ tests.push({name, fn}); }

function assert(cond, msg){ if(!cond) throw new Error(msg || 'Assertion failed'); }

add('calculateAge exact years', ()=>{
  const now = new Date();
  const dob = new Date(now.getFullYear()-30, now.getMonth(), now.getDate());
  const iso = dob.toISOString().slice(0,10);
  assert(Utils.calculateAge(iso) === 30, 'Expected age 30');
});

add('calculateAge future -> null', ()=>{
  const future = new Date(); future.setFullYear(future.getFullYear()+1);
  const iso = future.toISOString().slice(0,10);
  assert(Utils.calculateAge(iso) === null, 'Expected null for future date');
});

add('validateIdent cases', ()=>{
  assert(Utils.validateIdent('') === 'Identificación requerida.');
  assert(Utils.validateIdent('123') === 'Mínimo 5 caracteres.');
  assert(Utils.validateIdent('abc$%') === 'Solo caracteres alfanuméricos.');
  assert(Utils.validateIdent('A1234') === '');
});

add('validateName accented', ()=>{
  assert(Utils.validateName('Álvaro') === '');
  assert(Utils.validateName('J') === 'Mínimo 2 caracteres.');
});

add('validateCorreo', ()=>{
  assert(Utils.validateCorreo('') === 'Correo requerido.');
  assert(Utils.validateCorreo('notanemail') === 'Formato de correo inválido.');
  assert(Utils.validateCorreo('u@x.com') === '');
});

add('isDuplicate', ()=>{
  const list = [{ident:'A1', correo:'a@x.com'},{ident:'B2', correo:'b@x.com'}];
  assert(Utils.isDuplicate(list,'A1','new@x.com') === true);
  assert(Utils.isDuplicate(list,'X9','b@x.com') === true);
  assert(Utils.isDuplicate(list,'X9','z@x.com') === false);
});

add('escapeHtml and formatDate', ()=>{
  assert(Utils.escapeHtml('<b>O</b>') === '&lt;b&gt;O&lt;/b&gt;');
  assert(Utils.formatDate('invalid-date') === 'invalid-date');
});

// Run tests
let passed = 0, failed = 0;
console.log('Running tests: ' + tests.length + '\n');
tests.forEach(t => {
  try{
    t.fn();
    console.log('✓ ' + t.name);
    passed++;
  }catch(err){
    console.log('✗ ' + t.name);
    console.error('  ' + err.message);
    failed++;
  }
});

console.log('\nResults: ' + passed + ' passed, ' + failed + ' failed.');
if(failed>0) process.exitCode = 2;
