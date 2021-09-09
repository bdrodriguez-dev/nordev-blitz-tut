import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import createRequest from "app/requests/mutations/createRequest";
import { RequestForm, FORM_ERROR } from "app/requests/components/RequestForm";

const NewRequestPage: BlitzPage = () => {
  const router = useRouter();
  const [createRequestMutation] = useMutation(createRequest);

  return (
    <div>
      <h1>Create New Request</h1>

      <RequestForm
        submitText="Create Request"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRequest}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const request = await createRequestMutation(values);
            await router.push(Routes.ShowRequestPage({ requestId: request.id }));
          } catch (error) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.RequestsPage()}>
          <a>Requests</a>
        </Link>
      </p>
      <p>
        <Link href={Routes.ProductsPage()}>
          <a>Products</a>
        </Link>
      </p>
    </div>
  );
};

NewRequestPage.authenticate = true;
NewRequestPage.getLayout = (page) => <Layout title={"Create New Request"}>{page}</Layout>;

export default NewRequestPage;
