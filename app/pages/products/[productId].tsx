import { Suspense } from "react";
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import getProduct from "app/products/queries/getProduct";
import deleteProduct from "app/products/mutations/deleteProduct";

export const Product = () => {
  const router = useRouter();
  const productId = useParam("productId", "number");
  const [deleteProductMutation] = useMutation(deleteProduct);
  const [product] = useQuery(getProduct, { id: productId });

  return (
    <>
      <Head>
        <title>Product {product.id}</title>
      </Head>

      <div>
        <h1>Product {product.id}</h1>
        <h2 className="text-lg font-extrabold leading-tight tracking-tight">
          Product Feature Requests
        </h2>
        {/*<pre>{JSON.stringify(product, null, 2)}</pre>*/}
        <ul className="space-y-6">
          {product.requests.map((request) => {
            return (
              <li className="p-4 rounded-md shadow flex flex-row" key={request.id}>
                <div className="border">
                  <button className="">Vote</button>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl">{request.title}</span>
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
