import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import React, { useEffect, useRef } from "react";

const getAge = async (name: string) => {
  const res = await fetch(`https://api.agify.io/?name=${name}`);
  const { age } = await res.json();
  return age;
};
export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const name = form.get("name") as string;
  const age = await getAge(name);
  return age;
};
export default function Index() {
  const age = useActionData<typeof action>();
  const formRef = useRef(null);
  useEffect(() => {
    formRef.current.reset();
  }, [age]);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen font-serif ">
      <h1 className="mx-auto my-2 text-xl font-semibold">
        {age ? `The AI guessed that the name is ${age} years old` : ""}
      </h1>
      <Form
        ref={formRef}
        className="relative flex flex-col items-center justify-center w-1/2 bg-gray-100 rounded-lg shadow-2xl h-1/2"
        method="post"
      >
        <div className="flex flex-col items-center justify-center">
          <label className="pb-1 text-lg font-semibold">
            Let the AI guess your age when entering your name
          </label>
          <input
            name="name"
            className="p-1 rounded-lg"
            placeholder="your name"
          />
          <button
            type="submit"
            className="w-32 h-8 my-2 text-white bg-red-600 rounded-lg shadow-xl"
          >
            Enter
          </button>
        </div>
      </Form>
    </div>
  );
}
