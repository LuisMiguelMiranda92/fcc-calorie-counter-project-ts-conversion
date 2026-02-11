# 🥗 Calorie Counter - TypeScript Migration

A functional web application that helps users track their daily caloric intake and expenditure. Originally a JavaScript project from the FreeCodeCamp curriculum, I have fully refactored this into **TypeScript** to implement strict type checking and improved error handling.

**[🔗 Live Demo Link](https://LuisMiguelMiranda92.github.io/fcc-calorie-counter-project-ts-conversion/)

## 🛠️ Technical Refactor Highlights

This project focuses on handling complex DOM interactions and data validation using TypeScript.

* **Type Guarding & Assertions:** Utilized `as HTMLInputElement`, `HTMLSelectElement`, and `HTMLFormElement` to ensure safe access to specific element properties like `.value` and `.reset()`.
* **Regex Validation:** Implemented a custom validation engine to sanitize string inputs and block scientific notation (e.g., `1e10`) using `RegExpMatchArray`.
* **Dynamic DOM Injection:** Managed the dynamic generation of input fields using `insertAdjacentHTML` while maintaining type safety for the target containers.
* **Union Types:** Handled input collections using `NodeListOf<HTMLInputElement> | HTMLInputElement[]` to allow the utility functions to accept both standard DOM queries and manual arrays.

## 🚀 Features

- **Dynamic Entry Addition:** Users can add multiple entries for Breakfast, Lunch, Dinner, Snacks, and Exercise.
- **Real-time Sanitization:** Automatically removes spaces and special characters from numeric inputs.
- **Calorie Calculation:** Calculates total consumed vs. budgeted calories, including exercise offsets.
- **Visual Feedback:** Displays a clear summary of Surplus or Deficit with dynamic CSS class switching.

## ⚙️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/fcc-calorie-counter-project-ts-conversion.git](https://github.com/your-username/fcc-calorie-counter-project-ts-conversion.git)
