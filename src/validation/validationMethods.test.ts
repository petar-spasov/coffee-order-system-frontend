import * as validation from './validationMethods';
import {errors} from "../constants/errors";


test('should be correct amount', () => {
    expect(validation.validateAmount(2)).toBe('');
});

test('should be too low', () => {
   expect(validation.validateAmount(-2)).toBe(errors.amount.outOfRange);
});


test('should be too high', () => {
    expect(validation.validateAmount(6)).toBe(errors.amount.outOfRange);
});

test('should be empty amount', () => {
    // @ts-ignore Hier wird der Error ignoriert, damit man einen String als Parameter eingeben kann
    // um zu schauen ob die Validierung korrekt funktioniert.
    expect(validation.validateAmount(null)).toBe(errors.general.empty);
});

test('should not be a number', () => {
    // @ts-ignore Hier wird der Error ignoriert, damit man einen String als Parameter eingeben kann
    // um zu schauen ob die Validierung korrekt funktioniert.
    expect(validation.validateAmount('abc')).toBe(errors.amount.notNumber);
});

test('should be correct name', () => {
    expect(validation.validateName("Josh")).toBe('');
})

test('should be empty name', () => {
    expect(validation.validateName("")).toBe(errors.general.empty);
})

test ('should be matching', () => {
    expect(validation.validatePasswordMatching("1234", "1234")).toBe('');
})

test ('should not be matching', () => {
    expect(validation.validatePasswordMatching("1234", "12345"))
        .toBe(errors.password.notMatching);
})

test ('should be empty repeated password', () => {
    expect(validation.validatePasswordMatching("1234", ""))
        .toBe(errors.general.empty);
})

test('should be correct password', () => {
    expect(validation.validatePasswordForRegister("Abcd-123")).toBe("");
})

test('should be incorrect password', () => {
    expect(validation.validatePasswordForRegister("abcd-123")).toBe(errors.password.invalid);
})

test('should be incorrect because it is empty password ', () => {
    expect(validation.validatePasswordForRegister("")).toBe(errors.password.invalid);
})

test('should be allowed login password', () => {
    expect(validation.validatePassword("12345678")).toBe("");
})

test('should be empty login password', () => {
    expect(validation.validatePassword("")).toBe(errors.general.empty);
})

test('should be correct email', () => {
    expect(validation.validateEmail("abcd.abb@test.ch")).toBe("");
})

test('should be incorrect email', () => {
    expect(validation.validateEmail("abcd.teh")).toBe(errors.email.invalid);
})

test('should be empty incorrect email', () => {
    expect(validation.validateEmail("")).toBe(errors.general.empty);
})


