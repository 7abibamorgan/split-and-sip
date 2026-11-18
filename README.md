# Split & Sip

**Course:** Electronic Business Development (BINF 503) · Winter 2026
**Instructor:** Dr. Nourhan Hamdi
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa, Ms. Mariam Khalid, Mr. Younes Zied, Mr. Mahmoud Hani

## 1. Team

| Name | Student ID | Tutorial group | GitHub username |
|---|---|---|---|
| Habiba Morgan | 16006242 | T8 | 7abibamorgan |
| Hana Hatem | 16005973 | T6 | HanaWGhanem / hanahatemm |
| Farida Khaled | 16006199 | T8 | faridahkhaled |
| Hana Yahya | 16003660 | T4 | Cherie-Hannah |
| Sara Nassar | 13005826 | T3 | SaraNassar25 |
| Haneen Amr | 16003197 | T6 | Haneengiu |

## 2. The idea

Split & Sip is a web app for friends who share costs, such as trips, dinners, rent and gifts. It is for students and young people who go out in groups and lose track of who paid what. A user creates a group with her friends, adds what each person paid, and the app works out who owes whom. When someone pays back, she marks the debt as paid. Users can also set personal savings goals (for example, a summer trip), track their progress, and plan hangouts with their friends. It solves the awkward "who still owes me?" problem and helps friends save for plans together.

## 3. Features

### 3.1 The full product

- Register and log in
- Create groups with friends, rename and delete them
- Add and delete shared expenses, split equally between group members
- See each member's balance in a group, and mark debts as paid
- Edit expenses and savings goals after creating them
- Personal savings goals with a progress bar
- Plan hangouts with friends (title, place, date)
- Split expenses unequally (by percentage or exact amounts)
- Invite friends to a group by email, so every member has her own account
- Upload a photo of the receipt for each expense
- Reminders to friends who haven't paid back
- Pay back directly through InstaPay or a mobile wallet
- Expenses in different currencies, with automatic conversion
- Monthly spending reports and charts per category
- Shared savings goals that several friends add money to

### 3.2 The use cases we will build

| # | Use case | What the user does | What they see | What is stored |
|---|---|---|---|---|
| 1 | Registration and login | Registers with name, email and password; logs in with email and password | Their home page, with their name in the header | A User, with the password hashed |
| 2 | Create and manage a group | Creates a group with a name and the members' names; renames or deletes it | The group in "My groups", with links to its expenses and balances | A Group: name, members, owner |
| 3 | Add an expense | In a group, adds an expense with a description, amount and who paid it; deletes it | The expense in the group's list, with each member's share | An Expense: group, description, amount, who paid, members it is split between, owner |
| 4 | Mark a debt as paid | Opens a group's balances and records that one member paid another back ("Sara paid Habiba 300 EGP"); undoes it | Each member's updated balance, and the payment in the list | A Payment: group, from, to, amount, owner |
| 5 | Savings goal | Creates a goal with a title and target amount, adds money to it, deletes it | The goal with a progress bar of saved vs target | A SavingsGoal: title, target amount, saved amount, owner |
| 6 | Plan a hangout | Plans an outing with friends with a title, place and date; deletes it | The plan in "My hangout plans" | A Plan: title, place, date, owner |

## 4. Who owns what

| Member | Use case |
|---|---|
| Habiba Morgan | 1. Registration and login |
| Hana Hatem | 2. Create and manage a group |
| Farida Khaled | 3. Add an expense |
| Hana Yahya | 4. Mark a debt as paid |
| Sara Nassar | 5. Savings goal |
| Haneen Amr | 6. Plan a hangout |

## 5. Data model

### User

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stored hashed, never as plain text
});
```

### Group

```js
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: { type: [String], required: true }, // the members' names
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
```

### Expense

```js
const expenseSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  paidBy: { type: String, required: true }, // a member's name
  splitBetween: { type: [String], required: true }, // the members' names
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
```

### Payment

```js
const paymentSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  from: { type: String, required: true }, // who paid back
  to: { type: String, required: true }, // who received the money
  amount: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
```

### SavingsGoal

```js
const savingsGoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  savedAmount: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
```

### Plan

```js
const planSchema = new mongoose.Schema({
  title: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: String, required: true }, // e.g. "2026-12-20"
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
```

## 6. Run it locally

### Back end

```bash
cd backend
npm install
# create backend/.env from backend/.env.example (see the table below)
npm start
```

The API runs on http://localhost:3000.

| Variable in `.env` | What it is |
|---|---|
| `MONGODB_URI` | The connection string of your MongoDB Atlas database |
| `JWT_SECRET` | Any long random text, used to sign login tokens |
| [Any other variable] | [What it is] |

### Front end

```bash
cd frontend
npm install
npm run dev
```

The app runs on [the address `npm run dev` prints, e.g. http://localhost:5173].