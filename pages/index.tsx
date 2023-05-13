import Link from "next/link";
import Head from "next/head";

export default function IndexPage() {
  return (
    <div>
      <Head>
        <title>😄BlinkSpeak😃</title>
      </Head>
      とにかくここに基本機能を実装する。
      <br />
      API機能は簡潔に、キーだけ隠す感じにする。 Hello Worldkkdkkk.dddd{" "}
      認証なども後で良い。 ここでAPIを取得してアクセスができるのか？？？
      <br />
      <Link href="/about">About</Link>
      <br />
      <Link href="/day">Day</Link>
    </div>
  );
}
