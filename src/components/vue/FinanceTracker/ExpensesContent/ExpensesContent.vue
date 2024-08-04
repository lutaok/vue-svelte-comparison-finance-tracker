<script lang="ts">
export type Expense = {
  title: string;
  expense: number;
  date: string;
};

type ExpensesProps = {
  expenses: Expense[];
};

type ExpenseForm = {
  title: Field;
  expense: Field;
  date: Field;
};

type ExpenseEvents = {
  (e: "addExpense", value: Expense): void;
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
import type { Field } from "../../types/field";
import InputField from "../../InputField/InputField.vue";
import { REGEXP } from "../../../../const/regexp";
import type { Transaction } from "../Transaction/TransactionList.vue";
import TransactionList from "../Transaction/TransactionList.vue";

const emit = defineEmits<ExpenseEvents>();
const { expenses } = defineProps<ExpensesProps>();

const initialExpenseFormValue: ExpenseForm = {
  title: { error: null, value: null },
  expense: { error: null, value: null },
  date: { error: null, value: null },
};

const assignFormInitialValues = (): ExpenseForm => {
  try {
    return structuredClone(initialExpenseFormValue);
  } catch (e) {
    console.error("Something went wrong", e);
    return initialExpenseFormValue;
  }
};

const expenseForm = ref(assignFormInitialValues());

const handleExpenseSubmit = (e: Event) => {
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

  emit("addExpense", expense);

  expenseForm.value = assignFormInitialValues();
};

const handleExpenseChange = (e: Event) => {
  if (!e.target) return;
  const target = e.target as HTMLInputElement;

  if (!target.checkValidity()) {
    expenseForm.value.expense.error = "Only numbers up to two decimal digits are allowed";
  }
};

const transformExpensesToTransactions = (expenses: Expense[]): Transaction[] => {
  return expenses.map((expense) => ({ ...expense, value: expense.expense }));
};
</script>

<template>
  <form name="expense" @submit.prevent="handleExpenseSubmit" novalidate class="flex flex-col gap-4">
    <InputField
      id="expense-name"
      name="expense-title"
      required
      label="Expense Name"
      v-model:value="expenseForm.title.value"
      v-model:error="expenseForm.title.error"
      :maxLength="30"
      placeholder="Insert title"
    />

    <InputField
      id="expense-value"
      name="expense-value"
      required
      label="How much did you spend?"
      v-model:value="expenseForm.expense.value"
      v-model:error="expenseForm.expense.error"
      placeholder="Insert expense"
      :pattern="REGEXP.decimalNumbers"
      v-on:change="handleExpenseChange"
    />

    <InputField
      id="expense-value"
      name="expense-date"
      required
      label="When did it happen?"
      v-model:value="expenseForm.date.value"
      v-model:error="expenseForm.date.error"
      placeholder="Insert date"
    />

    <button type="submit">Send</button>
  </form>

  <TransactionList :transactions="transformExpensesToTransactions(expenses)" />
</template>
