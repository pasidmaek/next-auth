import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <div>
      <strong>
        Hi, {data?.username}
      </strong>
      <br/>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
      possimus beatae ipsa facere, cumque, fuga, nostrum adipisci quo amet
      dolorum quia repellat magni non minus veniam harum rem modi enim.
    </div>
  );
}
