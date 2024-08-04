import { writable } from "svelte/store";
import type { Expense } from "./Expenses/Expenses.svelte";
import type { Income } from "./Incomes/Incomes.svelte";

export const incomesStore = writable<Income[]>([]);
export const expensesStore = writable<Expense[]>([]);
