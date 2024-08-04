<script context="module" lang="ts">
  export type Income = {
    title: string;
    income: number;
    date: string;
  };

  type IncomeForm = {
    title: Field;
    income: Field;
    date: Field;
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { REGEXP } from "../../../../const/regexp";
  import Input from "../../Input/Input.svelte";
  import type { Field } from "../../types/field";
  import type { Transaction } from "../Transaction/TransactionList.svelte";
  import TransactionList from "../Transaction/TransactionList.svelte";

  export let incomes: Income[];

  const dispatch = createEventDispatcher();

  const baseIncomeFormValue: IncomeForm = {
    income: { error: null, value: null },
    title: { error: null, value: null },
    date: { error: null, value: null },
  };
  let incomeForm: IncomeForm = assignFormInitialValues();

  function assignFormInitialValues(): IncomeForm {
    try {
      return structuredClone(baseIncomeFormValue);
    } catch (e) {
      console.error("Something went wrong", e);
      return baseIncomeFormValue;
    }
  }

  const handleIncomeSubmit = (e: SubmitEvent) => {
    if (!e.target) return;
    const formElement = e.target as HTMLFormElement;

    if (!formElement.checkValidity()) return;

    const formData = new FormData(formElement);
    const title = formData.get("income-title");
    const value = formData.get("income-value");
    const date = formData.get("income-date");

    if (!title || !value || !date || value instanceof File || title instanceof File || date instanceof File) return;

    const numberValue = parseFloat(value);
    if (Number.isNaN(numberValue)) return;

    const income: Income = {
      income: numberValue,
      title: title,
      date: date,
    };

    dispatch("addExpense", income);

    incomeForm = assignFormInitialValues();
  };

  const handleIncomeChange = (e: Event) => {
    if (!e.target) return;
    const target = e.target as HTMLInputElement;

    if (!target.checkValidity()) {
      incomeForm.income.error = "Only numbers up to two decimal digits are allowed";
    }
  };

  const transformIncomesToTransactions = (incomes: Income[]): Transaction[] => {
    return incomes.map((income) => ({ ...income, value: income.income }));
  };
</script>

<form name="income" on:submit|preventDefault={handleIncomeSubmit} novalidate class="flex flex-col gap-4">
  <Input
    id="income-title"
    name="income-title"
    required
    label="Income Name"
    bind:value={incomeForm.title.value}
    bind:error={incomeForm.title.error}
    placeholder="Insert title"
  />

  <Input
    id="income-value"
    name="income-value"
    required
    label="How much did you earn?"
    bind:value={incomeForm.income.value}
    bind:error={incomeForm.income.error}
    placeholder="Insert income"
    pattern={REGEXP.decimalNumbers}
    on:change={handleIncomeChange}
  />

  <Input
    id="income-value"
    name="income-date"
    required
    label="When did you earn it?"
    bind:value={incomeForm.date.value}
    bind:error={incomeForm.date.error}
    placeholder="Insert date"
  />

  <button type="submit"> Send </button>
</form>

<TransactionList transactions={transformIncomesToTransactions(incomes)} />
