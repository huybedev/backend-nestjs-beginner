// Bài tập 5: Decorators - NestJS sử dụng RẤT NHIỀU!

// Enable decorators in tsconfig.json:
// "experimentalDecorators": true
// "emitDecoratorMetadata": true

// ============ METHOD DECORATOR ============
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`[LOG] Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`[LOG] Method ${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}

// ============ CLASS DECORATOR ============
function Entity(tableName: string) {
  return function (constructor: any) {
    constructor.prototype.tableName = tableName;
    constructor.prototype.toJSON = function () {
      return {
        table: this.tableName,
        data: this
      };
    };
    return constructor;
  };
}

// ============ PROPERTY DECORATOR ============
function Required(target: any, propertyKey: string) {
  let value: any;

  Object.defineProperty(target, propertyKey, {
    get() {
      return value;
    },
    set(newValue: any) {
      if (!newValue) {
        throw new Error(`${propertyKey} is required`);
      }
      value = newValue;
    }
  });
}

// ============ PARAMETER DECORATOR ============
function ValidateNumber(target: any, propertyKey: string | symbol | undefined, parameterIndex: number) {
  const originalMethod = target[propertyKey as string];

  target[propertyKey as string] = function (...args: any[]) {
    if (typeof args[parameterIndex] !== "number") {
      throw new Error(`Parameter ${parameterIndex} must be a number`);
    }
    return originalMethod.apply(this, args);
  };
}

// ============ USAGE ============
@Entity("users")
class User {
  @Required
  name: string;

  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  @Log
  greet(greeting: string): string {
    return `${greeting}, ${this.name}`;
  }

  @Log
  calculateAge(@ValidateNumber age: number): string {
    return `You are ${age} years old`;
  }
}

// Test
const user = new User("Alice", "alice@example.com");

console.log("=== Testing Method Decorator ===");
console.log(user.greet("Hello"));

console.log("\n=== Testing Property Decorator ===");
try {
  const invalidUser = new User("", "test@example.com");
} catch (error: any) {
  console.log("Error:", error.message);
}

console.log("\n=== Testing Parameter Decorator ===");
console.log(user.calculateAge(25));
try {
  user.calculateAge("twenty-five" as any);
} catch (error: any) {
  console.log("Error:", error.message);
}

console.log("\n=== Testing Class Decorator ===");
console.log("Table name:", (user as any).tableName);