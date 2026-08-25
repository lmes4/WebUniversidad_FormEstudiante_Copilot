const Utils = require('../src/utils');

describe('Utils validations and helpers', ()=>{
  test('calculateAge returns correct age for exact years', ()=>{
    const now = new Date();
    const dob = new Date(now.getFullYear()-30, now.getMonth(), now.getDate());
    const iso = dob.toISOString().slice(0,10);
    expect(Utils.calculateAge(iso)).toBe(30);
  });

  test('calculateAge returns null for future date', ()=>{
    const future = new Date(); future.setFullYear(future.getFullYear()+1);
    const iso = future.toISOString().slice(0,10);
    expect(Utils.calculateAge(iso)).toBeNull();
  });

  test('validateIdent rejects empty, short, invalid and accepts valid', ()=>{
    expect(Utils.validateIdent('')).toBe('Identificación requerida.');
    expect(Utils.validateIdent('123')).toBe('Mínimo 5 caracteres.');
    expect(Utils.validateIdent('abc$%')).toBe('Solo caracteres alfanuméricos.');
    expect(Utils.validateIdent('A1234')).toBe('');
  });

  test('validateName accepts accented and ñ', ()=>{
    expect(Utils.validateName('Álvaro')).toBe('');
    expect(Utils.validateName('J')).toBe('Mínimo 2 caracteres.');
  });

  test('validateCorreo basic checks', ()=>{
    expect(Utils.validateCorreo('')).toBe('Correo requerido.');
    expect(Utils.validateCorreo('notanemail')).toBe('Formato de correo inválido.');
    expect(Utils.validateCorreo('u@x.com')).toBe('');
  });

  test('isDuplicate finds duplicates by id or email', ()=>{
    const list = [{ident:'A1', correo:'a@x.com'},{ident:'B2', correo:'b@x.com'}];
    expect(Utils.isDuplicate(list, 'A1', 'new@x.com')).toBe(true);
    expect(Utils.isDuplicate(list, 'X9', 'b@x.com')).toBe(true);
    expect(Utils.isDuplicate(list, 'X9', 'z@x.com')).toBe(false);
  });

  test('escapeHtml and formatDate behavior', ()=>{
    expect(Utils.escapeHtml('<b>O</b>')).toBe('&lt;b&gt;O&lt;/b&gt;');
    expect(Utils.formatDate('invalid-date')).toBe('invalid-date');
  });
});
