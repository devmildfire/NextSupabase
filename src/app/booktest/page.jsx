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

  // const profiles = await supabase.from("profiles").select("*");

  // console.log("error: ...", profiles.error);
  // console.log("profiles data: ...", profiles);

  // const audioBooks = await supabase.from("Audiobooks").select("*");

  // console.log("error: ...", audioBooks.error);
  // console.log("books data: ...", audioBooks);

  const { data, error } = await supabase.from("Products").select(`
    id, 
    name, 
    category,
    Audiobooks ( * ),
    Ebooks ( * ),
    PrintedBooks ( *, 
      options:PrintOptions ( *, 
        size:PrintSize( * )
      )
    ),
    Awards ( * ) 
  `);

  console.log("error: ...", error);
  console.log("data: ...", data);

  console.log("printed data: ...", data[1]);
  console.log("printed data options: ...", data[1].PrintedBooks[0].options);

  // const printOptData = await supabase.from("PrintOptions").select();
  // console.log("printOptData: ...", printOptData);

  return (
    <div>
      <p>Booktest</p>

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
