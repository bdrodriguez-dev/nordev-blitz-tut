import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { z } from "zod";
import LabeledSelectField from "../../core/components/LabeledSelectField";
import { useQuery } from "blitz";
import getProducts from "../../products/queries/getProducts";

export { FORM_ERROR } from "app/core/components/Form";

export function RequestForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [{ products }] = useQuery(getProducts, {});

  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField name="description" label="Description" placeholder="Description" />
      {/*<LabeledSelectField name="productId" label="Pick a product for your request">*/}
      {/*  {products.map((product) => {*/}
      {/*    return <option key={product.name} value={product.id}>{product.name}</option>;*/}
      {/*  })}*/}
      {/*</LabeledSelectField>*/}
    </Form>
  );
}
