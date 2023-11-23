let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '÷'];
const specialOperators = ['+/-', '%'];
const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = '0';
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;

    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            
            clearAll();
            a += key;
            out.textContent = a;
        } else {
            b += key;
            out.textContent = b;
        }
    } else if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        finish = false;
    } else if (specialOperators.includes(key)) {
        if (key === '+/-') {
            if (b !== '') {
                b = (-parseFloat(b)).toString();
                out.textContent = b;
            } else if (a !== '') {
                a = (-parseFloat(a)).toString();
                out.textContent = a;
            }
        } else if (key === '%') {
            if (b !== '') {
                b = (parseFloat(b) / 100).toString();
                out.textContent = b;
            } else if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                out.textContent = a;
            }
        }
        finish = false;
    } else if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = a - b;
                break;
            case '*':
                a = a * b;
                break;
            case '÷':
                if (b === '0') {
                    out.textContent = 'Ошибка!';
                    clearAll();
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;
        out.textContent = a;
    }
};