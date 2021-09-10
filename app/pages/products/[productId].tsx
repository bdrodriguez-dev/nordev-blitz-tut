import { Suspense } from "react";
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import getProduct from "app/products/queries/getProduct";
import deleteProduct from "app/products/mutations/deleteProduct";
import voteOnRequest from "../../requests/mutations/voteOnRequest";
import { useCurrentUser } from "../../core/hooks/useCurrentUser";

export const Product = () => {
  const router = useRouter();
  const productId = useParam("productId", "number");
  const [deleteProductMutation] = useMutation(deleteProduct);
  const [product] = useQuery(getProduct, { id: productId });
  const currentUser = useCurrentUser();

  // @ts-ignore
  const [voteOnRequestMutation] = useMutation(voteOnRequest);

  return (
    <>
      <Head>
        <title>Product {product.id}</title>
      </Head>

      <div>
        <h1>Product {product.id}</h1>
        <header className="flex flex-row items-center mb-4">
          <h2 className="text-base uppercase leading-tight tracking-wide font-semibold text-gray-600">
            Feature Requests
          </h2>
          <span className="ml-auto">
            <Link href={Routes.NewRequestPage()}>
              <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                New Request
              </a>
            </Link>
          </span>
        </header>
        <ul className="space-y-4 p-4 rounded bg-gray-300 m-2">
          {product.requests.map((request) => {
            return (
              <li
                className="flex flex-row p-4 rounded shadow bg-[#f8edeb] space-x-4"
                key={request.id}
              >
                <div className="border rounded">
                  <button
                    onClick={async () => {
                      await voteOnRequestMutation({
                        // @ts-ignore
                        data: {
                          requestId: request.id,
                          // @ts-ignore
                          userId: currentUser.id,
                        },
                      });
                    }}
                    className="flex flex-col space-y-4 p-3 rounded shadow-sm hover:bg-blue-200"
                  >
                    <span>123</span>
                    <span>Vote</span>
                  </button>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl">{request.title}</span>
                  <span className="text-xl">{request.description}</span>
                </div>
              </li>
            );
          })}
        </ul>
        {/*{product}*/}
        <Link href={Routes.EditProductPage({ productId: product.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProductMutation({ id: product.id });
              await router.push(Routes.ProductsPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowProductPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ProductsPage()}>
          <a>Products</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>
    </div>
  );
};

// Is this how you can give access to certain pages based on auth?
ShowProductPage.authenticate = true;
ShowProductPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowProductPage;
