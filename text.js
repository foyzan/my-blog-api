class User {
  constructor(id) {
    this.id = id;

    // The IIFE returns a Promise
    return (async () => {
      try {
        // Using a real sample API URL
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) throw new Error("User not found");

        const data = await response.json();
        this.userData = data;
        
        return this; // This becomes the result of 'new User()'
      } catch (error) {
        console.error(`Failed to initialize User ${id}:`, error.message);
        // If we don't throw, the 'user' variable will be 'undefined' or incomplete
        throw error; 
      }
    })();
  }
}

// In Node.js, you need an async wrapper to use 'await' 
// unless you are using ES Modules (.mjs)
async function main() {
  try {
    console.log("Starting fetch...");
    
    // You MUST await the 'new' keyword here
    const user = await new User(1); 
    
    console.log("Success! User Name:", user.userData.name);
  } catch (err) {
    console.error("Main caught error:", err.message);
  }
}

main();