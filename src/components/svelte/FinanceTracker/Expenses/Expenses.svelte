<script context="module" lang="ts">
  export type Expense = {
    title: string;
    expense: number;
    date: string;
  };

  type ExpenseForm = {
    title: Field;
    expense: Field;
    date: Field;
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { REGEXP } from "../../../../const/regexp";
  import Input from "../../Input/Input.svelte";
  import type { Field } from "../../types/field";
  import TransactionList, { type Transaction } from "../Transaction/TransactionList.svelte";

  export let expenses: Expense[];

  const dispatch = createEventDispatcher();

  const initialExpenseFormValue: ExpenseForm = {
    expense: { error: null, value: null },
    title: { error: null, value: null },
    date: { error: null, value: null },
  };
  let expenseForm: ExpenseForm = assignFormInitialValues();

  function assignFormInitialValues(): ExpenseForm {
    try {
      return structuredClone(initialExpenseFormValue);
    } catch (e) {
      console.error("Something went wrong", e);
      return initialExpenseFormValue;
    }
  }

  const handleExpenseSubmit = (e: SubmitEvent) => {
    if (!e.target) return;
    const formElement = e.target as HTMLFormElement;

    if (!formElement.checkValidity()) return;

    const formData = new FormData(formElement);
    const title = formData.get("expense-title");
    const value = formData.get("expense-value");
    const date = formData.get("expense-date");

    if (!date || !title || !value || value instanceof File || title instanceof File || date instanceof File) return;

    const numberValue = parseFloat(value);
    if (Number.isNaN(numberValue)) return;

    const expense: Expense = {
      expense: numberValue,
      title: title,
      date: date,
    };

    dispatch("addExpense", expense);

    expenseForm = assignFormInitialValues();
  };

  const handleExpenseChange = (e: Event) => {
    if (!e.target) return;
    const target = e.target as HTMLInputElement;

    if (!target.checkValidity()) {
      expenseForm.expense.error = "Only numbers up to two decimal digits are allowed";
    }
  };

  const transformExpensesToTransactions = (expenses: Expense[]): Transaction[] => {
    return expenses.map((expense) => ({ ...expense, value: expense.expense }));
  };
</script>

<form name="expense" on:submit|preventDefault={handleExpenseSubmit} novalidate class="flex flex-col gap-4">
  <Input
    id="expense-name"
    name="expense-title"
    required
    label="Expense Name"
    bind:value={expenseForm.title.value}
    bind:error={expenseForm.title.error}
    maxLength={30}
    placeholder="Insert title"
  />

  <Input
    id="expense-value"
    name="expense-value"
    required
    label="How much did you spend?"
    bind:value={expenseForm.expense.value}
    bind:error={expenseForm.expense.error}
    placeholder="Insert expense"
    pattern={REGEXP.decimalNumbers}
    on:change={handleExpenseChange}
  />

  <Input
    id="expense-value"
    name="expense-date"
    required
    label="When did it happen?"
    bind:value={expenseForm.date.value}
    bind:error={expenseForm.date.error}
    placeholder="Insert date"
  />

  <button type="submit"> Send </button>
</form>

<TransactionList transactions={transformExpensesToTransactions(expenses)} />
