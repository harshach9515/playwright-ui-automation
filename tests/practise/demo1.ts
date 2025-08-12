let textMessage : string = "Hello, World!";
console
let num : number = 2;
let isTrue : boolean = true;
console.log(textMessage, num, isTrue);
    
let arr : Array<number> = [1, 2, 3];
let arr2 : number[] = [1, 2, 3];
let arr3 : Array<string> = ["a", "b", "c"];
let arr4 : string[] = ["a", "b", "c"];
console.log(arr, arr2, arr3, arr4);

let data : any = "Hello, World!";
data = 2;
data = true;
console.log(data);
let data2 : unknown = "Hello, World!";
data2 = 2;
data2 = true;
console.log(data2);

function greet(name: string): string {
    return `Hello, ${name}!`;
}
console.log(greet("Alice"));

let person: { name: string; age: number; location?: string } = { name: "Alice", age: 30, location: "Wonderland" };
person.location = "Wonderland"; // Adding a new property dynamically
console.log(person);

class HomePage {
    constructor(public title: string) {}
    
    displayTitle(): void {
        console.log(`Home Page Title: ${this.title}`);
    }
}
let homePage = new HomePage("Welcome to the Home Page");
homePage.displayTitle();