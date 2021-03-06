import { Suspense } from "react";
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import getRequest from "app/requests/queries/getRequest";
import updateRequest from "app/requests/mutations/updateRequest";
import { RequestForm, FORM_ERROR } from "app/requests/components/RequestForm";

export const EditRequest = () => {
  const router = useRouter();
  const requestId = useParam("requestId", "number");
  const [request, { setQueryData }] = useQuery(
    getRequest,
    { id: requestId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateRequestMutation] = useMutation(updateRequest);

  return (
    <>
      <Head>
        <title>Edit Request {request.id}</title>
      </Head>

      <div>
        <h1>Edit Request {request.id}</h1>
        <pre>{JSON.stringify(request, null, 2)}</pre>

        <RequestForm
          submitText="Update Request"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateRequest}
          initialValues={request}
          onSubmit={async (values) => {
            try {
              const updated = await updateRequestMutation({
                id: request.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(Routes.ShowRequestPage({ requestId: updated.id }));
            } catch (error) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditRequestPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRequest />
      </Suspense>

      <p>
        <Link href={Routes.RequestsPage()}>
          <a>Requests</a>
        </Link>
      </p>
    </div>
  );
};

EditRequestPage.authenticate = true;
EditRequestPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditRequestPage;
