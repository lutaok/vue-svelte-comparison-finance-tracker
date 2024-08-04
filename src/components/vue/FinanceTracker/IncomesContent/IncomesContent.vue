<script lang="ts">
export type Income = {
  title: string;
  income: number;
  date: string;
};

type IncomesProps = {
  incomes: Income[];
};

type IncomeForm = {
  title: Field;
  income: Field;
  date: Field;
};

type IncomeEvents = {
  (e: "addIncome", value: Income): void;
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
import type { Field } from "../../types/field";
import InputField from "../../InputField/InputField.vue";
import { REGEXP } from "../../../../const/regexp";
import type { Transaction } from "../Transaction/TransactionList.vue";
import TransactionList from "../Transaction/TransactionList.vue";

const emit = defineEmits<IncomeEvents>();
const { incomes } = defineProps<IncomesProps>();

const initialIncomeFormValue: IncomeForm = {
  title: { error: null, value: null },
  income: { error: null, value: null },
  date: { error: null, value: null },
};

const assignFormInitialValues = (): IncomeForm => {
  try {
    return structuredClone(initialIncomeFormValue);
  } catch (e) {
    console.error("Something went wrong", e);
    return initialIncomeFormValue;
  }
};

const incomeForm = ref(assignFormInitialValues());

const handleExpenseSubmit = (e: Event) => {
  if (!e.target) return;
  const formElement = e.target as HTMLFormElement;

  if (!formElement.checkValidity()) return;

  const formData = new FormData(formElement);
  const title = formData.get("income-title");
  const value = formData.get("income-value");
  const date = formData.get("income-date");

  if (!date || !title || !value || value instanceof File || title instanceof File || date instanceof File) return;

  const numberValue = parseFloat(value);
  if (Number.isNaN(numberValue)) return;

  const income: Income = {
    income: numberValue,
    title: title,
    date: date,
  };

  emit("addIncome", income);

  incomeForm.value = assignFormInitialValues();
};

const handleIncomeChange = (e: Event) => {
  if (!e.target) return;
  const target = e.target as HTMLInputElement;

  if (!target.checkValidity()) {
    incomeForm.value.income.error = "Only numbers up to two decimal digits are allowed";
  }
};

const transformIncomesToTransactions = (incomes: Income[]): Transaction[] => {
  return incomes.map((income) => ({ ...income, value: income.income }));
};
</script>

<template>
  <form name="income" @submit.prevent="handleExpenseSubmit" novalidate class="flex flex-col gap-4">
    <InputField
      id="income-name"
      name="income-title"
      required
      label="Income Name"
      v-model:value="incomeForm.title.value"
      v-model:error="incomeForm.title.error"
      :maxLength="30"
      placeholder="Insert title"
    />

    <InputField
      id="income-value"
      name="income-value"
      required
      label="How much did you earn?"
      v-model:value="incomeForm.income.value"
      v-model:error="incomeForm.income.error"
      placeholder="Insert income"
      :pattern="REGEXP.decimalNumbers"
      v-on:change="handleIncomeChange"
    />

    <InputField
      id="income-value"
      name="income-date"
      required
      label="When did you earn it?"
      v-model:value="incomeForm.date.value"
      v-model:error="incomeForm.date.error"
      placeholder="Insert date"
    />

    <button type="submit">Send</button>
  </form>

  <TransactionList :transactions="transformIncomesToTransactions(incomes)" />
</template>
