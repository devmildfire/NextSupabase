import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { format as prettyFormat } from "pretty-format"; // ES2015 modules

export default async function BooksDisplay() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase
    .from("Products")
    .select(
      `
    id, 
    name, 
    category,
    Audiobooks ( * ),
    Awards ( * ) 
  `
    )
    .eq("category", "AudioBook");

  // console.log("data ...", prettyFormat(JSON.stringify(data)));
  console.log("data ...", prettyFormat(data));

  return (
    <div>
      <p>Audiobooks</p>

      {data?.map((product) => (
        <ul key={product.id}>
          {product.Audiobooks.length != 0 && (
            <>
              <li key={product.name}>
                <p> product ID : {product.id} </p>
                <p> product name : {product.name}</p>
                <p> product category : {product.category} </p>
              </li>

              {product.Awards?.map((award) => (
                <li key={award.id}>
                  <p> Award ID : {award.id} </p>
                  <p> Award Title : {award.title} </p>
                  <p> Award source : {award.source} </p>
                </li>
              ))}
            </>
          )}

          {product.Audiobooks?.map((audioBook) => (
            <li key={audioBook.id}>
              <p> AudioBook ID : {audioBook.id} </p>
              <p> AudioBook duration : {audioBook.duration} </p>
              <p> AudioBook fileExtention : {audioBook.fileExtention} </p>
              <p> AudioBook source : {audioBook.src} </p>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
