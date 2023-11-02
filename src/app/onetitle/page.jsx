import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useState } from "react";

export default async function SingleTitleDisplay() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { title, setTitle } = useState("");

  const { data, error } = await supabase
    .from("Products")
    .select(
      `
    id, 
    name, 
    category,
    Audiobooks ( * ),
    Ebooks ( * ),
    PrintedBooks ( *, 
      options:PrintOptions ( *, 
        size:PrintSize( * )
      ),
      cover:PrintedCover( * )
    ),
    Awards ( * ) 
  `
    )
    // .eq("name", "Awesome Title");
    .eq("name", title);

  onSubmit = (event) => {
    setTitle("Awesome Title");
  };

  return (
    <div>
      <p>Single title test</p>

      <form action="onSubmit">
        <input type="text" />
        <input type="submit" />
      </form>

      {data?.map((product) => (
        <ul key={product.id}>
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

          {product.Audiobooks?.map((audioBook) => (
            <li key={audioBook.id}>
              <p> AudioBook ID : {audioBook.id} </p>
              <p> AudioBook duration : {audioBook.duration} </p>
              <p> AudioBook fileExtention : {audioBook.fileExtention} </p>
              <p> AudioBook source : {audioBook.src} </p>
            </li>
          ))}

          {product.Ebooks?.map((eBook) => (
            <li key={eBook.id}>
              <p> eBook ID : {eBook.id} </p>
              <p> eBook extention : {eBook.extention} </p>
              <p> eBook source : {eBook.source} </p>
            </li>
          ))}

          {product.PrintedBooks?.map((Book) => (
            <li key={Book.id}>
              <p> Book ID : {Book.id} </p>
              <p> Book thesis : {Book.thesis} </p>
              <p> Book description : {Book.description} </p>
              <p> Book trailer : {Book.trailer} </p>
              <p> Book pages : {Book.pages} </p>
              <p> Book age restriction : {Book.ageRestriction} </p>

              {Book.cover?.map((cover) => (
                <div key={cover.id}>
                  <p> Cover ID : {cover.id} </p>
                  <p> Cover source : {cover.source} </p>
                  <p> Cover shade : {cover.shade} </p>
                  <p> Cover blurhash : {cover.blurHash} </p>
                </div>
              ))}

              {Book.options?.map((option) => (
                <div key={option.id}>
                  <p> Print Options ID : {option.id} </p>
                  <p> Print Options bindings : {option.bindings} </p>
                  <p> Print Options cover : {option.cover} </p>
                  <p> Print Options paper : {option.paper} </p>
                  <p> Print Options illustrations : {option.illustrations} </p>

                  {option.size?.map((item) => (
                    <div key={item.id}>
                      <p>
                        Print Size : {item.width} x {item.height}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
