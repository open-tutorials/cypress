const a = {
    a: 10,
    b: 20,
    calc() {
        return this.a * this.b;
    }
}

// Я бы привел такой пример.

class SalaryCalculator {
    numberOfYears = 10;
    salary = 1000;
    calculate() {
        return this.numberOfYears * this.salary;
    }
}

const calculator = new SalaryCalculator();
console.log(calculator.calculate());
calculator.numberOfYears = 20;
console.log(calculator.calculate());
