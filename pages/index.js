import { useRouter } from "next/router";
import Header from "../components/header";

export default function App() {
  const router = useRouter();

  return (
    < div>
      <Header />
      Fat Cats
      < button type="button" onClick={() => router.push('/mint')}> Mint</button >
    </div >
  );
}
