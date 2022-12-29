import { FormEventHandler, useState } from "react";

export default function ImageForm() {
  const [file, setFile] = useState<File>();
  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("name", "laptop");
    body.append("price", "13");
    body.append("description", "This is my personal laptop");
    body.append("userId", "63a45d004d6f4256e7dd09bd");
    body.append("email", "jobayerahammed31@gmail.com");
    if (file !== undefined) {
      body.append("image", file);
    }
    fetch("http://localhost:8080/api/v1/admin/book", {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files !== null) {
            // console.log(typeof e.target.files);
            setFile(e.target.files[0]);
          }
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
