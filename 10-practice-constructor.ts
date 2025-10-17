// TODO 1: Tạo class Email với constructor
// - Validate email format (phải có @)
// - Lưu email
// - Set createdAt = new Date()
// - Có method: isValid()

class Email {
  // Viết code
  email: string;
  createdAt: Date;

  constructor(email: string) {
    if (!this.validateEmail(email)) {
      throw new Error("invalid email format")
    }
    this.email = email;
    this.createdAt = new Date();
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  isValid(): boolean {
    return this.validateEmail(this.email);
  }
}

// TODO 2: Tạo class BankAccount với constructor
// - Validate: accountNumber length = 10
// - Validate: initialBalance >= 1000
// - Tính toán: interestRate dựa trên balance
// - Có method: deposit(amount), withdraw(amount)

class BankAccount {
  accountNumber: string;
  balance: number;
  interestRate: number;

  private calculateInterestRate(value: number): number {
    return value >= 10000 ? 0.05 : 0.03;
  }

  constructor(accountNumber: string, initialBalance: number) {
    if (accountNumber.length !== 10) {
      throw new Error("account must be 10 characters");
    }
    if (initialBalance < 1000) {
      throw new Error("initialBalance must be at least 1000");
    }
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.interestRate = this.calculateInterestRate(initialBalance);
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("deposit amount > 0")
    }
    this.balance += amount;
  }
  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("withdraw amount > 0")
    }
    if (amount > this.balance) {
      throw new Error("insufficient balance")
    }
    this.balance -= amount;
  }
}

// TODO 3: Tạo class ShoppingCart với constructor
// - Khởi tạo: items = []
// - Khởi tạo: totalPrice = 0
// - Có method: addItem(name, price, quantity)
// - Có method: removeItem(name)
// - Có method: getTotal()

interface Item {
  name: string;
  price: number;
  quantity: number;
}
class ShoppingCart {
  // Viết code
  items: Item[] = [];
  totalPrice: number = 0;

  constructor() {
    this.items = [];
    this.totalPrice = 0;
  }

  addItem({ name, price, quantity }: Item): void {
    if (this.items.find(item => item.name === name)) {
      throw new Error("item already exists")
    }
    this.items.push({ name, price, quantity });
  }

  removeItem(name: string): void {
    if (!this.items.find(item => item.name === name)) {
      throw new Error("item not found")
    }
    this.items = this.items.filter(item => item.name !== name);
  }

  getTotal(): number {
    this.totalPrice = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    return this.totalPrice;
  }
}

// TODO 4: Test các class
// Viết code test

const email = new Email("huybeofficial@gmail.com")
console.log("🚀 ~ email:", email)
console.log("🚀 ~ email valid?", email.isValid())

const bankAccount = new BankAccount("1900996699", 5000)
bankAccount.deposit(2000)
bankAccount.withdraw(8000)
console.log("🚀 ~ bankAccount interest rate:", bankAccount.interestRate)
console.log("🚀 ~ bankAccount:", bankAccount)


const cart = new ShoppingCart()
cart.addItem({ name: "Phone1", price: 1000, quantity: 2 })
console.log("🚀 ~ cart:", cart)
cart.addItem({ name: "Phone2", price: 2000, quantity: 3 })
cart.addItem({ name: "Phone3", price: 3000, quantity: 4 })

cart.removeItem("Phone2")

console.log("🚀 ~ cart total price:", cart.getTotal())
console.log("🚀 ~ cart:", cart)
