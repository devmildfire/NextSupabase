import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function BooksDisplay() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  //   console.log(supabase);

  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();

  //   console.log(session);

  //   const { data: products, error } = await supabase.from("Products").select(`
  //         id,
  //         AudioBooks (
  //             duration
  //         )
  //     `);

  const profiles = await supabase.from("profiles").select("*");

  console.log("error: ...", profiles.error);
  console.log("profiles data: ...", profiles);

  const audioBooks = await supabase.from("Audiobooks").select("*");

  console.log("error: ...", audioBooks.error);
  console.log("books data: ...", audioBooks);

  const { data, error } = await supabase.from("Products").select(`
    id, name,
    Audiobooks ( id, duration ),
    Ebooks (id, extention)
  `);

  console.log("error: ...", error);
  console.log("data: ...", data);

  return (
    <div>
      <p>Booktest</p>

      {data?.map((product) => (
        <li key={product.name}>
          {product.name} - {product.id} - {product.Audiobooks?.id} -{" "}
          {product.Audiobooks?.duration}
          {product.Audiobooks?.map((book) => (
            <li key={book.id}>
              {" "}
              {book.id} - {book.duration}{" "}
            </li>
          ))}
        </li>
      ))}
    </div>
  );
}
